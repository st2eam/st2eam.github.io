/**
 * 增量同步 public/photos/ → src/config/photos.ts
 *
 * 用法：node scripts/sync-photos.cjs
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

// ── 加载 .env ──
const ENV_FILE = path.resolve(__dirname, '../.env');
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ── 代理支持 ──
let proxyDispatcher = null;
function setupProxy() {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!proxy) return;
  try {
    const { ProxyAgent } = require('undici');
    proxyDispatcher = new ProxyAgent(proxy);
    console.log(`🌐 使用代理: ${proxy}`);
  } catch {
    console.warn('⚠ 未安装 undici，无法使用代理（npm i -D undici）');
  }
}

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
        'GPSLatitude', 'GPSLatitudeRef', 'GPSLongitude', 'GPSLongitudeRef',
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

    if (data.latitude && data.longitude) {
      exif.latitude = Math.round(data.latitude * 1e6) / 1e6;
      exif.longitude = Math.round(data.longitude * 1e6) / 1e6;
    }

    return Object.keys(exif).length > 0 ? exif : undefined;
  } catch {
    return undefined;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── 反向地理编码（Nominatim / OpenStreetMap，免费无需 Key） ──

function parseCityFromDisplay(displayName) {
  if (!displayName) return null;
  const parts = displayName.split(',').map(s => s.trim());
  const cityPart = parts.find(p => /市$/.test(p));
  if (cityPart) return cityPart.replace(/市$/, '');
  return null;
}

async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=zh&zoom=18`;
    const fetchOpts = { headers: { 'User-Agent': 'photo-sync-script/1.0' } };
    if (proxyDispatcher) fetchOpts.dispatcher = proxyDispatcher;
    const resp = await fetch(url, fetchOpts);
    if (!resp.ok) return null;
    const data = await resp.json();
    const addr = data.address;
    if (!addr) return null;

    const country = (addr.country || '').replace(/^中国$/, '中国');
    if (!country) return null;

    const state = addr.state || addr.province || '';
    const cityFromAddr = addr.city || addr.town || addr.municipality || '';
    const county = addr.county || '';
    const cityFromDisplay = parseCityFromDisplay(data.display_name);

    const strip = s => s.replace(/(省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区)$/, '');

    let province = '', city = '';

    if (country === '中国') {
      const isSpecial = /^(香港|澳門|澳门|台湾|台灣)/.test(state);
      if (isSpecial) {
        province = state === '澳門' ? '澳门' : state;
        city = '';
      } else {
        province = strip(state);
        city = cityFromDisplay || strip(cityFromAddr || county);
      }
    } else {
      province = strip(state);
      city = strip(cityFromAddr || county);
    }

    return { country, province, city };
  } catch {
    return null;
  }
}

async function batchGeocode(photosArr) {
  const coordCache = new Map();
  let resolved = 0;
  const needGeo = photosArr.filter(p => p.exif?.latitude);
  if (needGeo.length === 0) return;

  const regeo = process.argv.includes('--regeo');
  if (regeo) needGeo.forEach(p => { p.location = undefined; });
  const toQuery = needGeo.filter(p => !p.location);
  if (toQuery.length === 0) return;

  console.log(`\n📍 正在为 ${toQuery.length} 张有 GPS 的照片解析地点...`);
  for (const p of toQuery) {
    const cacheKey = `${p.exif.latitude.toFixed(2)},${p.exif.longitude.toFixed(2)}`;
    let result;
    if (coordCache.has(cacheKey)) {
      result = coordCache.get(cacheKey);
    } else {
      result = await reverseGeocode(p.exif.latitude, p.exif.longitude);
      coordCache.set(cacheKey, result);
      await sleep(1100);
    }
    if (result) {
      p.location = result;
      resolved++;
      const label = [result.country, result.province, result.city].filter(Boolean).join(' > ');
      console.log(`  ✓ ${path.basename(p.src)}: ${label}`);
    }
  }
  console.log(`  地点解析完成：${resolved}/${toQuery.length} 成功`);
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

    const locMatch = body.match(/location:\s*\{([^}]*)\}/);
    if (locMatch) {
      const loc = {};
      for (const f of ['country', 'province', 'city']) {
        const lm = locMatch[1].match(new RegExp(`${f}:\\s*'([^']*)'`));
        if (lm) loc[f] = lm[1];
      }
      if (Object.keys(loc).length > 0) obj.location = loc;
    }

    const tagsMatch = body.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch && tagsMatch[1].trim()) {
      obj.tags = tagsMatch[1].match(/'([^']*)'/g).map(s => s.replace(/'/g, ''));
    }

    if (obj.src) map[obj.src] = obj;
  }
  return map;
}

function isLocationLikeTag(tag) {
  return /(区|县|市|镇|乡|旗|盟|州|門|门|填海|路氹|澳門|澳门|香港|丽江|武汉|钦州)/.test(tag);
}

function serializeLocation(loc) {
  const parts = [];
  if (loc.country) parts.push(`country: '${loc.country}'`);
  if (loc.province) parts.push(`province: '${loc.province}'`);
  if (loc.city) parts.push(`city: '${loc.city}'`);
  return `{ ${parts.join(', ')} }`;
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
  if (exif.latitude) parts.push(`latitude: ${exif.latitude}`);
  if (exif.longitude) parts.push(`longitude: ${exif.longitude}`);
  return `{ ${parts.join(', ')} }`;
}

async function run() {
  setupProxy();
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
        location: prev.location,
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

  photosArr.sort((a, b) => {
    const da = a.exif?.date;
    const db = b.exif?.date;
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.localeCompare(da);
  });
  photosArr.forEach((p, i) => {
    p.id = String(i + 1);
  });

  await batchGeocode(photosArr);

  const photosCode = photosArr
    .map(p => {
      const parts = [`id: '${p.id}'`, `src: '${p.src}'`, `alt: '${p.alt}'`];
      const cleanTags = (p.tags || []).filter(t => !isLocationLikeTag(t));
      if (cleanTags.length > 0) parts.push(`tags: [${cleanTags.map(t => `'${t}'`).join(', ')}]`);
      if (p.location) parts.push(`location: ${serializeLocation(p.location)}`);
      if (p.thumbnail) parts.push(`thumbnail: '${p.thumbnail}'`);
      if (p.exif) parts.push(`exif: ${serializeExif(p.exif)}`);
      return `  { ${parts.join(', ')} },`;
    })
    .join('\n');

  const output = `/**
 * 摄影作品配置（由 scripts/sync-photos.cjs 自动生成）
 *
 * 重新生成：npm run photos
 * 手动编辑后可自由调整 alt / tags，再次同步不会覆盖
 *
 * 列表顺序：按拍摄日期新→旧（无 EXIF 日期的条目排在末尾）
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
  latitude?: number;
  longitude?: number;
}

export interface LocationData {
  country?: string;
  province?: string;
  city?: string;
}

export interface PhotoConfig {
  id: string;
  src: string;
  alt: string;
  tags?: string[];
  location?: LocationData;
  thumbnail?: string;
  exif?: ExifData;
  width?: number;
  height?: number;
}

export const photos: PhotoConfig[] = [
${photosCode}
];

export const contentTags = ['全部', ...Array.from(new Set(photos.flatMap(p => p.tags ?? [])))];
export const locationTags = (() => {
  const set = new Set<string>();
  photos.forEach(p => {
    if (p.location?.province) set.add(p.location.province);
    if (p.location?.city) set.add(p.location.city);
  });
  return ['全部', ...set];
})();
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log(`  保留: ${kept}  新增: ${added}  移除: ${removed}`);
  photosArr.forEach(p => {
    const exifInfo = p.exif
      ? ` | ${[p.exif.model, p.exif.lens, p.exif.focalLength, p.exif.aperture, p.exif.shutterSpeed, p.exif.iso ? `ISO${p.exif.iso}` : ''].filter(Boolean).join(' ')}`
      : '';
    const status = existing[p.src] ? '  ' : '+ ';
    const cleanTags = (p.tags || []).filter(t => !isLocationLikeTag(t));
    const locLabel = p.location ? ` 📍 ${[p.location.province, p.location.city].filter(Boolean).join('·')}` : '';
    console.log(`  ${status}${p.id}. "${p.alt}" [${cleanTags.join(', ') || '未分类'}]${locLabel}${exifInfo}`);
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
