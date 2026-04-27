/**
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
  { id: '1', src: '/photos/DSC07196.jpg', alt: 'DSC07196', thumbnail: '/photos/thumbnails/DSC07196.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/80', iso: 160, date: '2026-04-12' } },
  { id: '2', src: '/photos/DSC06734.jpg', alt: 'DSC06734', thumbnail: '/photos/thumbnails/DSC06734.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/200', iso: 100, date: '2026-04-04' } },
  { id: '3', src: '/photos/DSC04330.jpg', alt: 'DSC04330', thumbnail: '/photos/thumbnails/DSC04330.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '76mm', aperture: 'f/5.6', shutterSpeed: '1/800', iso: 160, date: '2025-07-05' } },
  { id: '4', src: '/photos/DSC04373.jpg', alt: 'DSC04373', thumbnail: '/photos/thumbnails/DSC04373.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '52mm', aperture: 'f/3.5', shutterSpeed: '1/320', iso: 160, date: '2025-07-05' } },
  { id: '5', src: '/photos/DSC04410.jpg', alt: 'DSC04410', thumbnail: '/photos/thumbnails/DSC04410.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '108mm', aperture: 'f/4.5', shutterSpeed: '1/320', iso: 160, date: '2025-07-05' } },
  { id: '6', src: '/photos/DSC04146.jpg', alt: 'DSC04146', thumbnail: '/photos/thumbnails/DSC04146.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '29mm', aperture: 'f/2.8', shutterSpeed: '1/160', iso: 160, date: '2025-07-04' } },
  { id: '7', src: '/photos/DSC04232.jpg', alt: 'DSC04232', thumbnail: '/photos/thumbnails/DSC04232.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '97mm', aperture: 'f/16', shutterSpeed: '1/320', iso: 640, date: '2025-07-04' } },
  { id: '8', src: '/photos/DSC04130.jpg', alt: 'DSC04130', thumbnail: '/photos/thumbnails/DSC04130.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '61mm', aperture: 'f/4', shutterSpeed: '1/30', iso: 80, date: '2025-07-03' } },
  { id: '9', src: '/photos/DSC03826(1).jpg', alt: 'DSC03826(1)', thumbnail: '/photos/thumbnails/DSC03826(1).jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '59mm', aperture: 'f/4', shutterSpeed: '1/320', iso: 320, date: '2025-06-14' } },
  { id: '10', src: '/photos/DSC03489.jpg', alt: 'DSC03489', thumbnail: '/photos/thumbnails/DSC03489.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '176mm', aperture: 'f/5.6', shutterSpeed: '1/160', iso: 160, date: '2025-05-27' } },
  { id: '11', src: '/photos/IMG_5818.jpg', alt: 'IMG 5818', thumbnail: '/photos/thumbnails/IMG_5818.jpg', exif: { make: 'Apple', model: 'iPhone 16 Pro', lens: 'iPhone 16 Pro back triple camera 6.765mm f/1.78', focalLength: '24mm', aperture: 'f/1.7799999713880652', shutterSpeed: '1/60', iso: 160, date: '2025-05-09' } },
  { id: '12', src: '/photos/DSC01855_(3).jpg', alt: 'DSC01855 (3)', thumbnail: '/photos/thumbnails/DSC01855_(3).jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/60', iso: 640, date: '2025-04-19' } },
  { id: '13', src: '/photos/DSC01374.jpg', alt: 'DSC01374', thumbnail: '/photos/thumbnails/DSC01374.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/160', iso: 64, date: '2025-04-12' } },
  { id: '14', src: '/photos/DSC01613-已增强-RD-SR.jpg', alt: 'DSC01613 已增强 RD SR', thumbnail: '/photos/thumbnails/DSC01613-已增强-RD-SR.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '176mm', aperture: 'f/5.6', shutterSpeed: '1/200', iso: 320, date: '2025-04-12' } },
  { id: '15', src: '/photos/DSC01629.jpg', alt: 'DSC01629', thumbnail: '/photos/thumbnails/DSC01629.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/800', iso: 200, date: '2025-04-12' } },
  { id: '16', src: '/photos/DSC01640.jpg', alt: 'DSC01640', thumbnail: '/photos/thumbnails/DSC01640.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/2000', iso: 200, date: '2025-04-12' } },
  { id: '17', src: '/photos/DSC09325.jpg', alt: 'DSC09325', thumbnail: '/photos/thumbnails/DSC09325.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '147mm', aperture: 'f/6.3', shutterSpeed: '1/640', iso: 160, date: '2025-03-23' } },
  { id: '18', src: '/photos/DSC09329.jpg', alt: 'DSC09329', thumbnail: '/photos/thumbnails/DSC09329.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '122mm', aperture: 'f/6.3', shutterSpeed: '1/500', iso: 160, date: '2025-03-23' } },
  { id: '19', src: '/photos/DSC09331.jpg', alt: 'DSC09331', thumbnail: '/photos/thumbnails/DSC09331.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/6.3', shutterSpeed: '1/800', iso: 160, date: '2025-03-23' } },
  { id: '20', src: '/photos/DSC0813.jpg', alt: 'DSC0813', thumbnail: '/photos/thumbnails/DSC0813.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/16', shutterSpeed: '1/160', iso: 640, date: '2025-02-22' } },
  { id: '21', src: '/photos/DSC08692.jpg', alt: 'DSC08692', thumbnail: '/photos/thumbnails/DSC08692.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/18', shutterSpeed: '1/160', iso: 640, date: '2025-02-22' } },
  { id: '22', src: '/photos/DSC08717.jpg', alt: 'DSC08717', thumbnail: '/photos/thumbnails/DSC08717.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/640', iso: 640, date: '2025-02-22' } },
  { id: '23', src: '/photos/DSC08545.jpg', alt: 'DSC08545', thumbnail: '/photos/thumbnails/DSC08545.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/1250', iso: 640, date: '2025-01-30' } },
  { id: '24', src: '/photos/DSC08586.jpg', alt: 'DSC08586', thumbnail: '/photos/thumbnails/DSC08586.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '101mm', aperture: 'f/5', shutterSpeed: '1/30', iso: 64, date: '2025-01-30' } },
  { id: '25', src: '/photos/DSC04046.jpg', alt: 'DSC04046', thumbnail: '/photos/thumbnails/DSC04046.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/6.3', shutterSpeed: '1/640', iso: 80, date: '2024-10-05' } },
  { id: '26', src: '/photos/DSC03504.jpg', alt: 'DSC03504', thumbnail: '/photos/thumbnails/DSC03504.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '53mm', aperture: 'f/3.5', shutterSpeed: '1/640', iso: 64, date: '2024-10-03' } },
  { id: '27', src: '/photos/DSC03615.jpg', alt: 'DSC03615', thumbnail: '/photos/thumbnails/DSC03615.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/2.8', shutterSpeed: '1/640', iso: 160, date: '2024-10-03' } },
  { id: '28', src: '/photos/DSC03619.jpg', alt: 'DSC03619', thumbnail: '/photos/thumbnails/DSC03619.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '187mm', aperture: 'f/5.6', shutterSpeed: '1/640', iso: 125, date: '2024-10-03' } },
  { id: '29', src: '/photos/DSC02968-HDR.jpg', alt: 'DSC02968 HDR', thumbnail: '/photos/thumbnails/DSC02968-HDR.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/160', iso: 160, date: '2024-09-18' } },
  { id: '30', src: '/photos/DSC02301.jpg', alt: 'DSC02301', thumbnail: '/photos/thumbnails/DSC02301.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/2.8', shutterSpeed: '1/160', iso: 160, date: '2024-09-16' } },
  { id: '31', src: '/photos/DSC02310.jpg', alt: 'DSC02310', thumbnail: '/photos/thumbnails/DSC02310.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '64mm', aperture: 'f/4', shutterSpeed: '1/320', iso: 64, date: '2024-09-16' } },
  { id: '32', src: '/photos/DSC02347-2.jpg', alt: 'DSC02347 2', thumbnail: '/photos/thumbnails/DSC02347-2.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '64mm', aperture: 'f/4', shutterSpeed: '1/320', iso: 160, date: '2024-09-16' } },
  { id: '33', src: '/photos/DSC02361.jpg', alt: 'DSC02361', thumbnail: '/photos/thumbnails/DSC02361.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/6.3', shutterSpeed: '1/640', iso: 64, date: '2024-09-16' } },
  { id: '34', src: '/photos/DSC02121.jpg', alt: 'DSC02121', thumbnail: '/photos/thumbnails/DSC02121.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '140mm', aperture: 'f/6.3', shutterSpeed: '1/400', iso: 50, date: '2024-09-07' } },
  { id: '35', src: '/photos/DSC02240.jpg', alt: 'DSC02240', thumbnail: '/photos/thumbnails/DSC02240.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/640', iso: 64, date: '2024-09-07' } },
  { id: '36', src: '/photos/DSC02059.jpg', alt: 'DSC02059', thumbnail: '/photos/thumbnails/DSC02059.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '44mm', aperture: 'f/5', shutterSpeed: '1/1000', iso: 100, date: '2024-09-01' } },
  { id: '37', src: '/photos/DSC02074.jpg', alt: 'DSC02074', thumbnail: '/photos/thumbnails/DSC02074.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '50mm', aperture: 'f/3.5', shutterSpeed: '1/1000', iso: 100, date: '2024-09-01' } },
  { id: '38', src: '/photos/DSC01983.jpg', alt: 'DSC01983', thumbnail: '/photos/thumbnails/DSC01983.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '47mm', aperture: 'f/8', shutterSpeed: '1/640', iso: 100, date: '2024-08-30' } },
  { id: '39', src: '/photos/DSC01996.JPG', alt: 'DSC01996', thumbnail: '/photos/thumbnails/DSC01996.JPG', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '61mm', aperture: 'f/6.3', shutterSpeed: '1/320', iso: 100, date: '2024-08-30' } },
  { id: '40', src: '/photos/DSC02012.JPG', alt: 'DSC02012', thumbnail: '/photos/thumbnails/DSC02012.JPG', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/6.3', shutterSpeed: '1/1000', iso: 200, date: '2024-08-30' } },
  { id: '41', src: '/photos/DSC02016.jpg', alt: 'DSC02016', thumbnail: '/photos/thumbnails/DSC02016.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '33mm', aperture: 'f/6.3', shutterSpeed: '1/1000', iso: 160, date: '2024-08-30' } },
  { id: '42', src: '/photos/DSC01957.jpg', alt: 'DSC01957', thumbnail: '/photos/thumbnails/DSC01957.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '65mm', aperture: 'f/4', shutterSpeed: '1/160', iso: 50, date: '2024-08-29' } },
  { id: '43', src: '/photos/DSC01971.jpg', alt: 'DSC01971', thumbnail: '/photos/thumbnails/DSC01971.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '43mm', aperture: 'f/6.3', shutterSpeed: '1/320', iso: 125, date: '2024-08-29' } },
  { id: '44', src: '/photos/DSC02222.jpg', alt: 'DSC02222', thumbnail: '/photos/thumbnails/DSC02222.jpg' },
];

export const categories = ['全部', ...Array.from(new Set(photos.flatMap(p => p.tags ?? [])))];
