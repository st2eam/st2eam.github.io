/**
 * 增量同步 public/photos/ → src/config/photos.ts
 *
 * 用法：node scripts/sync-photos.js
 *
 * 行为：
 *   - 扫描 public/photos/（忽略 thumbnails 子目录）
 *   - 读取已有 photos.ts，以 src 为 key 做合并
 *   - 已有照片：保留手动编辑的 alt / tags（不会覆盖）
 *   - 新照片：自动推测 alt / tags，读取 EXIF 元信息，追加到列表
 *   - 已删除的照片：从列表中移除
 *   - thumbnail / exif 字段始终自动更新
 */

const fs = require('fs');
const path = require('path');
const exifr = require('exifr');

const PHOTOS_DIR = path.resolve(__dirname, '../public/photos');
const THUMB_DIR = path.resolve(PHOTOS_DIR, 'thumbnails');
const OUTPUT_FILE = path.resolve(__dirname, '../src/config/photos.ts');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
const TAG_KEYWORDS = ['城市', '风景', '人像', '建筑', '街头', '自然', '抽象', '黑白'];

function scanDir(dir, prefix = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'thumbnails') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDir(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name));
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push({
        fullPath,
        relativePath: prefix ? `${prefix}/${entry.name}` : entry.name,
        dirName: prefix || null,
        fileName: path.basename(entry.name, path.extname(entry.name)),
      });
    }
  }
  return results;
}

function guessTags(file) {
  const tags = [];
  if (file.dirName) {
    const match = TAG_KEYWORDS.find(c => file.dirName.includes(c));
    if (match) tags.push(match);
  }
  const match = TAG_KEYWORDS.find(c => file.fileName.includes(c));
  if (match && !tags.includes(match)) tags.push(match);
  return tags;
}

function generateAlt(file) {
  return file.fileName.replace(/[-_]/g, ' ').replace(/^\d+\s*/, '').trim() || file.fileName;
}

function hasThumbnail(relativePath) {
  return fs.existsSync(path.join(THUMB_DIR, relativePath));
}

function formatExposure(val) {
  if (!val || val >= 1) return val ? `${val}s` : undefined;
  const denom = Math.round(1 / val);
  return `1/${denom}`;
}

async function readExif(filePath) {
  try {
    const data = await exifr.parse(filePath, {
      pick: [
        'Make', 'Model', 'LensModel',
        'FocalLength', 'FocalLengthIn35mmFormat',
        'FNumber', 'ExposureTime', 'ISO',
        'DateTimeOriginal',
      ],
    });
    if (!data) return undefined;

    const exif = {};
    if (data.Make) exif.make = data.Make.trim();
    if (data.Model) exif.model = data.Model.trim();
    if (data.LensModel) exif.lens = data.LensModel.trim();
    if (data.FocalLengthIn35mmFormat) {
      exif.focalLength = `${data.FocalLengthIn35mmFormat}mm`;
    } else if (data.FocalLength) {
      exif.focalLength = `${data.FocalLength}mm`;
    }
    if (data.FNumber) exif.aperture = `f/${data.FNumber}`;
    if (data.ExposureTime) exif.shutterSpeed = formatExposure(data.ExposureTime);
    if (data.ISO) exif.iso = data.ISO;
    if (data.DateTimeOriginal) {
      const d = new Date(data.DateTimeOriginal);
      if (!isNaN(d.getTime())) {
        exif.date = d.toISOString().split('T')[0];
      }
    }

    return Object.keys(exif).length > 0 ? exif : undefined;
  } catch {
    return undefined;
  }
}

// ── 读取已有配置（保留 alt / tags） ──
function readExistingPhotos() {
  if (!fs.existsSync(OUTPUT_FILE)) return {};
  const content = fs.readFileSync(OUTPUT_FILE, 'utf-8');

  const match = content.match(/export const photos:\s*PhotoConfig\[\]\s*=\s*\[([\s\S]*?)\];/);
  if (!match) return {};

  const map = {};
  const itemRegex = /\{([^}]+)\}/g;
  let m;
  while ((m = itemRegex.exec(match[1])) !== null) {
    const obj = {};
    const body = m[1];

    for (const field of ['id', 'src', 'alt', 'thumbnail']) {
      const r = new RegExp(`${field}:\\s*'([^']*)'`);
      const fm = body.match(r);
      if (fm) obj[field] = fm[1];
    }

    const tagsMatch = body.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch && tagsMatch[1].trim()) {
      obj.tags = tagsMatch[1].match(/'([^']*)'/g).map(s => s.replace(/'/g, ''));
    }

    if (obj.src) map[obj.src] = obj;
  }
  return map;
}

function serializeExif(exif) {
  const parts = [];
  if (exif.make) parts.push(`make: '${exif.make}'`);
  if (exif.model) parts.push(`model: '${exif.model}'`);
  if (exif.lens) parts.push(`lens: '${exif.lens}'`);
  if (exif.focalLength) parts.push(`focalLength: '${exif.focalLength}'`);
  if (exif.aperture) parts.push(`aperture: '${exif.aperture}'`);
  if (exif.shutterSpeed) parts.push(`shutterSpeed: '${exif.shutterSpeed}'`);
  if (exif.iso) parts.push(`iso: ${exif.iso}`);
  if (exif.date) parts.push(`date: '${exif.date}'`);
  return `{ ${parts.join(', ')} }`;
}

async function run() {
  const files = scanDir(PHOTOS_DIR);
  files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  const existing = readExistingPhotos();
  const existingSrcs = new Set(Object.keys(existing));

  let added = 0;
  let kept = 0;
  let removed = 0;

  console.log(`扫描到 ${files.length} 张照片，读取 EXIF 中...`);

  const photosArr = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const src = `/photos/${file.relativePath.replace(/\\/g, '/')}`;
    const thumbnail = hasThumbnail(file.relativePath)
      ? `/photos/thumbnails/${file.relativePath.replace(/\\/g, '/')}`
      : undefined;
    const exif = await readExif(file.fullPath);

    if (existing[src]) {
      kept++;
      existingSrcs.delete(src);
      const prev = existing[src];
      photosArr.push({
        id: (i + 1).toString(),
        src,
        alt: prev.alt,
        tags: prev.tags || [],
        thumbnail,
        exif,
      });
    } else {
      added++;
      photosArr.push({
        id: (i + 1).toString(),
        src,
        alt: generateAlt(file),
        tags: guessTags(file),
        thumbnail,
        exif,
      });
    }
  }

  removed = existingSrcs.size;

  const photosCode = photosArr
    .map(p => {
      const parts = [`id: '${p.id}'`, `src: '${p.src}'`, `alt: '${p.alt}'`];
      if (p.tags.length > 0) parts.push(`tags: [${p.tags.map(t => `'${t}'`).join(', ')}]`);
      if (p.thumbnail) parts.push(`thumbnail: '${p.thumbnail}'`);
      if (p.exif) parts.push(`exif: ${serializeExif(p.exif)}`);
      return `  { ${parts.join(', ')} },`;
    })
    .join('\n');

  const output = `/**
 * 摄影作品配置（由 scripts/sync-photos.js 自动生成）
 *
 * 重新生成：npm run photos
 * 手动编辑后可自由调整 alt / tags，再次同步不会覆盖
 */

export interface ExifData {
  make?: string;
  model?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  date?: string;
}

export interface PhotoConfig {
  id: string;
  src: string;
  alt: string;
  tags?: string[];
  thumbnail?: string;
  exif?: ExifData;
  width?: number;
  height?: number;
}

export const photos: PhotoConfig[] = [
${photosCode}
];

export const categories = ['全部', ...Array.from(new Set(photos.flatMap(p => p.tags ?? [])))];
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log(`  保留: ${kept}  新增: ${added}  移除: ${removed}`);
  photosArr.forEach(p => {
    const exifInfo = p.exif
      ? ` | ${[p.exif.model, p.exif.lens, p.exif.focalLength, p.exif.aperture, p.exif.shutterSpeed, p.exif.iso ? `ISO${p.exif.iso}` : ''].filter(Boolean).join(' ')}`
      : '';
    const status = existing[p.src] ? '  ' : '+ ';
    console.log(`  ${status}${p.id}. "${p.alt}" [${p.tags.join(', ') || '未分类'}]${exifInfo}`);
  });
  if (removed > 0) {
    console.log('\n已移除：');
    for (const src of existingSrcs) console.log(`  - ${src}`);
  }
  console.log(`\n已写入 ${OUTPUT_FILE}`);
}

run().catch(err => {
  console.error('同步失败:', err);
  process.exit(1);
});
