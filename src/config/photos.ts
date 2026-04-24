/**
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

];

export const categories = ['全部', ...Array.from(new Set(photos.flatMap(p => p.tags ?? [])))];
