/**
 * 压缩 public/photos/ 中的图片，生成缩略图到 public/photos/thumbnails/
 *
 * 用法：node scripts/compress-photos.cjs
 * 快捷：npm run photos:compress
 *
 * 策略：
 *   - 长边缩放到 1200px（保持比例）
 *   - JPEG 质量 82（视觉几乎无损，体积大幅减小）
 *   - 已存在且比原图新的缩略图会跳过（增量处理）
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.resolve(__dirname, '../public/photos');
const THUMB_DIR = path.resolve(PHOTOS_DIR, 'thumbnails');
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const MAX_LONG_EDGE = 1200;
const JPEG_QUALITY = 82;

function scanPhotos(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'thumbnails') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanPhotos(full));
    } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

async function compressOne(srcPath) {
  const relative = path.relative(PHOTOS_DIR, srcPath);
  const outPath = path.join(THUMB_DIR, relative);
  const outDir = path.dirname(outPath);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (fs.existsSync(outPath)) {
    const srcStat = fs.statSync(srcPath);
    const outStat = fs.statSync(outPath);
    if (outStat.mtimeMs >= srcStat.mtimeMs) {
      return { file: relative, status: 'skipped' };
    }
  }

  const metadata = await sharp(srcPath).metadata();
  const { width, height } = metadata;
  const longEdge = Math.max(width, height);

  let pipeline = sharp(srcPath).rotate();

  if (longEdge > MAX_LONG_EDGE) {
    if (width >= height) {
      pipeline = pipeline.resize({ width: MAX_LONG_EDGE });
    } else {
      pipeline = pipeline.resize({ height: MAX_LONG_EDGE });
    }
  }

  const ext = path.extname(srcPath).toLowerCase();
  if (ext === '.png') {
    pipeline = pipeline.png({ quality: JPEG_QUALITY, compressionLevel: 9 });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  await pipeline.toFile(outPath);

  const srcSize = fs.statSync(srcPath).size;
  const outSize = fs.statSync(outPath).size;
  const ratio = ((1 - outSize / srcSize) * 100).toFixed(1);

  return {
    file: relative,
    status: 'compressed',
    srcKB: (srcSize / 1024).toFixed(0),
    outKB: (outSize / 1024).toFixed(0),
    ratio,
  };
}

async function run() {
  const files = scanPhotos(PHOTOS_DIR);
  if (files.length === 0) {
    console.log('public/photos/ 中没有找到图片');
    return;
  }

  console.log(`找到 ${files.length} 张图片，开始压缩...\n`);

  for (const file of files) {
    const result = await compressOne(file);
    if (result.status === 'skipped') {
      console.log(`  ⏭ ${result.file} (已是最新)`);
    } else {
      console.log(
        `  ✓ ${result.file}  ${result.srcKB}KB → ${result.outKB}KB  (-${result.ratio}%)`
      );
    }
  }

  console.log('\n缩略图已生成到 public/photos/thumbnails/');
}

run().catch(err => {
  console.error('压缩失败:', err);
  process.exit(1);
});
