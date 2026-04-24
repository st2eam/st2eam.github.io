import type { PhotoConfig } from '@/config/photos';

/** 按拍摄日期新→旧；无 exif.date 的排在末尾 */
export function sortPhotosByDateDesc(list: PhotoConfig[]): PhotoConfig[] {
  return [...list].sort((a, b) => {
    const da = a.exif?.date;
    const db = b.exif?.date;
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return db.localeCompare(da);
  });
}
