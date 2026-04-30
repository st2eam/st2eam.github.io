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
  { id: '1', src: '/photos/DSC07365.jpg', alt: 'DSC07365', tags: ['风光'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07365.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/800', iso: 160, date: '2026-04-25' } },
  { id: '2', src: '/photos/DSC07378.jpg', alt: 'DSC07378', tags: ['人文'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07378.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/40', iso: 640, date: '2026-04-25' } },
  { id: '3', src: '/photos/DSC07389.jpg', alt: 'DSC07389', tags: ['风光', '夜景'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07389.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/5', shutterSpeed: '30s', iso: 50, date: '2026-04-25' } },
  { id: '4', src: '/photos/DSC07435.jpg', alt: 'DSC07435', tags: ['风光', '夜景'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07435.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/160', iso: 320, date: '2026-04-25' } },
  { id: '5', src: '/photos/DSC07465.jpg', alt: 'DSC07465', tags: ['风光'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07465.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/8', shutterSpeed: '1/100', iso: 200, date: '2026-04-25' } },
  { id: '6', src: '/photos/DSC07491.jpg', alt: 'DSC07491', tags: ['风光'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07491.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/3.2', shutterSpeed: '1/640', iso: 125, date: '2026-04-25' } },
  { id: '7', src: '/photos/DSC07539.jpg', alt: 'DSC07539', tags: ['风光'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07539.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/2.8', shutterSpeed: '1/4000', iso: 64, date: '2026-04-25' } },
  { id: '8', src: '/photos/DSC07082.jpg', alt: 'DSC07082', tags: ['建筑'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07082.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/16', shutterSpeed: '1/60', iso: 100, date: '2026-04-12' } },
  { id: '9', src: '/photos/DSC07084.jpg', alt: 'DSC07084', location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07084.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/500', iso: 64, date: '2026-04-12', latitude: 30.585122, longitude: 114.290254 } },
  { id: '10', src: '/photos/DSC07087.jpg', alt: 'DSC07087', tags: ['建筑'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07087.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/160', iso: 64, date: '2026-04-12', latitude: 30.585243, longitude: 114.290316 } },
  { id: '11', src: '/photos/DSC07147.jpg', alt: 'DSC07147', location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07147.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/80', iso: 640, date: '2026-04-12', latitude: 30.591485, longitude: 114.29443 } },
  { id: '12', src: '/photos/DSC07163.jpg', alt: 'DSC07163', location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07163.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/250', iso: 250, date: '2026-04-12', latitude: 30.590658, longitude: 114.295904 } },
  { id: '13', src: '/photos/DSC07196.jpg', alt: '旧墙犬吠春风里', tags: ['人文'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07196.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/80', iso: 160, date: '2026-04-12', latitude: 30.591131, longitude: 114.295152 } },
  { id: '14', src: '/photos/DSC07199.jpg', alt: 'DSC07199', location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07199.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/50', iso: 160, date: '2026-04-12', latitude: 30.588206, longitude: 114.291426 } },
  { id: '15', src: '/photos/DSC07215.jpg', alt: 'DSC07215', location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC07215.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/100', iso: 160, date: '2026-04-12', latitude: 30.583709, longitude: 114.294583 } },
  { id: '16', src: '/photos/DSC04330.jpg', alt: '平湖临野岸，村居枕烟波', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC04330.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '76mm', aperture: 'f/5.6', shutterSpeed: '1/800', iso: 160, date: '2025-07-05' } },
  { id: '17', src: '/photos/DSC04373.jpg', alt: '云山含远黛，乡野入清宁', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC04373.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '52mm', aperture: 'f/3.5', shutterSpeed: '1/320', iso: 160, date: '2025-07-05' } },
  { id: '18', src: '/photos/DSC04410.jpg', alt: '烟笼湖畔舍，云水共清悠', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC04410.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '108mm', aperture: 'f/4.5', shutterSpeed: '1/320', iso: 160, date: '2025-07-05' } },
  { id: '19', src: '/photos/DSC04146.jpg', alt: '林深生晓雾，幽径隐青山', tags: ['风光'], location: { country: '中国', province: '云南', city: '丽江' }, thumbnail: '/photos/thumbnails/DSC04146.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '29mm', aperture: 'f/2.8', shutterSpeed: '1/160', iso: 160, date: '2025-07-04', latitude: 27.138731, longitude: 100.237152 } },
  { id: '20', src: '/photos/DSC04232.jpg', alt: '青山浮薄雾，碧涧映流云', tags: ['风光'], location: { country: '中国', province: '云南', city: '丽江' }, thumbnail: '/photos/thumbnails/DSC04232.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '97mm', aperture: 'f/16', shutterSpeed: '1/320', iso: 640, date: '2025-07-04', latitude: 27.130374, longitude: 100.239157 } },
  { id: '21', src: '/photos/DSC04130.jpg', alt: '火树银花合，星桥铁锁开', tags: ['人文'], location: { country: '中国', province: '云南', city: '丽江' }, thumbnail: '/photos/thumbnails/DSC04130.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '61mm', aperture: 'f/4', shutterSpeed: '1/30', iso: 80, date: '2025-07-03', latitude: 26.87558, longitude: 100.232897 } },
  { id: '22', src: '/photos/DSC03826(1).jpg', alt: '市井藏童趣，烟火慰流年', tags: ['人文'], thumbnail: '/photos/thumbnails/DSC03826(1).jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '59mm', aperture: 'f/4', shutterSpeed: '1/320', iso: 320, date: '2025-06-14' } },
  { id: '23', src: '/photos/DSC03489.jpg', alt: '长桥穿城过，车流逐晨昏', tags: ['建筑'], thumbnail: '/photos/thumbnails/DSC03489.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '176mm', aperture: 'f/5.6', shutterSpeed: '1/160', iso: 160, date: '2025-05-27' } },
  { id: '24', src: '/photos/IMG_5818.jpg', alt: '晚霞铺远水，平湖敛清光', tags: ['风光'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/IMG_5818.jpg', exif: { make: 'Apple', model: 'iPhone 16 Pro', lens: 'iPhone 16 Pro back triple camera 6.765mm f/1.78', focalLength: '24mm', aperture: 'f/1.7799999713880652', shutterSpeed: '1/60', iso: 160, date: '2025-05-09', latitude: 30.543519, longitude: 114.422469 } },
  { id: '25', src: '/photos/DSC01855_(3).jpg', alt: '二十四桥明月夜', tags: ['夜景'], thumbnail: '/photos/thumbnails/DSC01855_(3).jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'FE 55mm F1.8 ZA', focalLength: '55mm', aperture: 'f/1.8', shutterSpeed: '1/60', iso: 640, date: '2025-04-19' } },
  { id: '26', src: '/photos/DSC01613-已增强-RD-SR.jpg', alt: '独立苍茫自咏诗', tags: ['动物'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC01613-已增强-RD-SR.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '176mm', aperture: 'f/5.6', shutterSpeed: '1/200', iso: 320, date: '2025-04-12', latitude: 30.545656, longitude: 114.418106 } },
  { id: '27', src: '/photos/DSC01640.jpg', alt: '枝间新绿一重重', tags: ['动物'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC01640.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/2000', iso: 200, date: '2025-04-12', latitude: 30.545427, longitude: 114.417556 } },
  { id: '28', src: '/photos/DSC09325.jpg', alt: '昨日雪如花，今日花如雪', tags: ['花草'], thumbnail: '/photos/thumbnails/DSC09325.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '147mm', aperture: 'f/6.3', shutterSpeed: '1/640', iso: 160, date: '2025-03-23' } },
  { id: '29', src: '/photos/DSC09329.jpg', alt: '云净天如水，樱开一树白', tags: ['花草'], thumbnail: '/photos/thumbnails/DSC09329.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '122mm', aperture: 'f/6.3', shutterSpeed: '1/500', iso: 160, date: '2025-03-23' } },
  { id: '30', src: '/photos/DSC09331.jpg', alt: '春风拂远岫，樱雪落晴空', tags: ['花草'], thumbnail: '/photos/thumbnails/DSC09331.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/6.3', shutterSpeed: '1/800', iso: 160, date: '2025-03-23' } },
  { id: '31', src: '/photos/DSC0813.jpg', alt: '枯藤老树昏鸦', tags: ['黑白', '动物'], thumbnail: '/photos/thumbnails/DSC0813.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/16', shutterSpeed: '1/160', iso: 640, date: '2025-02-22' } },
  { id: '32', src: '/photos/DSC08717.jpg', alt: '轻鸿掠烟水，寒雾笼平湖', tags: ['风光', '动物'], thumbnail: '/photos/thumbnails/DSC08717.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/640', iso: 640, date: '2025-02-22' } },
  { id: '33', src: '/photos/DSC08545.jpg', alt: '金畴铺暖日，蜂逐菜花黄', tags: ['花草', '动物'], location: { country: '中国', province: '广西', city: '钦州' }, thumbnail: '/photos/thumbnails/DSC08545.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/1250', iso: 640, date: '2025-01-30', latitude: 21.950769, longitude: 108.740343 } },
  { id: '34', src: '/photos/DSC08586.jpg', alt: '乱花渐欲迷人眼', tags: ['花草'], location: { country: '中国', province: '广西', city: '钦州' }, thumbnail: '/photos/thumbnails/DSC08586.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '101mm', aperture: 'f/5', shutterSpeed: '1/30', iso: 64, date: '2025-01-30', latitude: 21.949801, longitude: 108.738139 } },
  { id: '35', src: '/photos/DSC04046.jpg', alt: '白云千载空悠悠', tags: ['建筑'], location: { country: '中国', city: '香港' }, thumbnail: '/photos/thumbnails/DSC04046.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/6.3', shutterSpeed: '1/640', iso: 80, date: '2024-10-05', latitude: 22.285233, longitude: 114.161976 } },
  { id: '36', src: '/photos/DSC03504.jpg', alt: '深巷明朝卖杏花', tags: ['人文'], location: { country: '中国', province: '澳门' }, thumbnail: '/photos/thumbnails/DSC03504.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '53mm', aperture: 'f/3.5', shutterSpeed: '1/640', iso: 64, date: '2024-10-03', latitude: 22.194341, longitude: 113.545662 } },
  { id: '37', src: '/photos/DSC03615.jpg', alt: '危楼高百尺，手可摘星辰', tags: ['建筑'], location: { country: '中国', province: '澳门' }, thumbnail: '/photos/thumbnails/DSC03615.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/2.8', shutterSpeed: '1/640', iso: 160, date: '2024-10-03', latitude: 22.144005, longitude: 113.562413 } },
  { id: '38', src: '/photos/DSC03619.jpg', alt: '古今多少事，都付笑谈中', tags: ['建筑'], location: { country: '中国', province: '澳门' }, thumbnail: '/photos/thumbnails/DSC03619.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '187mm', aperture: 'f/5.6', shutterSpeed: '1/640', iso: 125, date: '2024-10-03', latitude: 22.144296, longitude: 113.563406 } },
  { id: '39', src: '/photos/DSC02968-HDR.jpg', alt: '长空悬皓月，夜色静无边', tags: ['夜景'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC02968-HDR.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/160', iso: 160, date: '2024-09-18', latitude: 30.467173, longitude: 114.398993 } },
  { id: '40', src: '/photos/DSC02301.jpg', alt: '庭院深深深几许', tags: ['黑白'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC02301.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/2.8', shutterSpeed: '1/160', iso: 160, date: '2024-09-16', latitude: 30.564987, longitude: 114.234071 } },
  { id: '41', src: '/photos/DSC02310.jpg', alt: '废庭生蔓草，旧院落沧桑', tags: ['黑白'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC02310.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '64mm', aperture: 'f/4', shutterSpeed: '1/320', iso: 64, date: '2024-09-16', latitude: 30.564211, longitude: 114.233874 } },
  { id: '42', src: '/photos/DSC02347-2.jpg', alt: '断壁残垣忆旧年', tags: ['黑白'], thumbnail: '/photos/thumbnails/DSC02347-2.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '64mm', aperture: 'f/4', shutterSpeed: '1/320', iso: 160, date: '2024-09-16' } },
  { id: '43', src: '/photos/DSC02361.jpg', alt: '残阳铺江水，长桥卧晚波', tags: ['风光'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC02361.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '28mm', aperture: 'f/6.3', shutterSpeed: '1/640', iso: 64, date: '2024-09-16', latitude: 30.550988, longitude: 114.288321 } },
  { id: '44', src: '/photos/DSC02121.jpg', alt: '层林遮古阁，江风送远声', tags: ['建筑'], thumbnail: '/photos/thumbnails/DSC02121.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '140mm', aperture: 'f/6.3', shutterSpeed: '1/400', iso: 50, date: '2024-09-07' } },
  { id: '45', src: '/photos/DSC02240.jpg', alt: '飞驰穿楚地，古楼伴征途', tags: ['建筑'], location: { country: '中国', province: '湖北', city: '武汉' }, thumbnail: '/photos/thumbnails/DSC02240.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/5.6', shutterSpeed: '1/640', iso: 64, date: '2024-09-07', latitude: 30.548753, longitude: 114.289459 } },
  { id: '46', src: '/photos/DSC02059.jpg', alt: '星垂平野阔，月涌大江流', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC02059.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '44mm', aperture: 'f/5', shutterSpeed: '1/1000', iso: 100, date: '2024-09-01' } },
  { id: '47', src: '/photos/DSC02074.jpg', alt: '行到水穷处，坐看云起时', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC02074.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '50mm', aperture: 'f/3.5', shutterSpeed: '1/1000', iso: 100, date: '2024-09-01' } },
  { id: '48', src: '/photos/DSC01983.jpg', alt: '江作青罗带，山如碧玉簪', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC01983.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '47mm', aperture: 'f/8', shutterSpeed: '1/640', iso: 100, date: '2024-08-30' } },
  { id: '49', src: '/photos/DSC01996.JPG', alt: '暧暧远人村，依依墟里烟', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC01996.JPG', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '61mm', aperture: 'f/6.3', shutterSpeed: '1/320', iso: 100, date: '2024-08-30' } },
  { id: '50', src: '/photos/DSC02012.JPG', alt: '轻舟已过万重山', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC02012.JPG', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '200mm', aperture: 'f/6.3', shutterSpeed: '1/1000', iso: 200, date: '2024-08-30' } },
  { id: '51', src: '/photos/DSC02016.jpg', alt: '山色空蒙雨亦奇', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC02016.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '33mm', aperture: 'f/6.3', shutterSpeed: '1/1000', iso: 160, date: '2024-08-30' } },
  { id: '52', src: '/photos/DSC01957.jpg', alt: '孤山临江立，秀色满漓江', tags: ['风光'], thumbnail: '/photos/thumbnails/DSC01957.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '65mm', aperture: 'f/4', shutterSpeed: '1/160', iso: 50, date: '2024-08-29' } },
  { id: '53', src: '/photos/DSC01971.jpg', alt: '双塔浮明镜，湖光映古容', tags: ['建筑'], thumbnail: '/photos/thumbnails/DSC01971.jpg', exif: { make: 'SONY', model: 'ILCE-7CM2', lens: 'E 28-200mm F2.8-5.6 A071', focalLength: '43mm', aperture: 'f/6.3', shutterSpeed: '1/320', iso: 125, date: '2024-08-29' } },
  { id: '54', src: '/photos/DSC02222.jpg', alt: '凭桥观城色，举镜揽风华', tags: ['人文', '建筑'], thumbnail: '/photos/thumbnails/DSC02222.jpg' },
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
