import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { PhotoConfig } from '@/config/photos';
import PhotoLightbox from '@/components/PhotoLightbox';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './index.module.less';

interface TimelineGalleryProps {
  images: PhotoConfig[];
  loading?: boolean;
}

interface DateGroup {
  date: string;
  label: string;
  photos: PhotoConfig[];
}

function groupByDate(photos: PhotoConfig[]): DateGroup[] {
  const map = new Map<string, PhotoConfig[]>();

  const sorted = [...photos].sort((a, b) => {
    const da = a.exif?.date || '0000-00-00';
    const db = b.exif?.date || '0000-00-00';
    return db.localeCompare(da);
  });

  for (const photo of sorted) {
    const date = photo.exif?.date || 'unknown';
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(photo);
  }

  return Array.from(map.entries()).map(([date, photos]) => ({
    date,
    label: formatDateLabel(date),
    photos,
  }));
}

function formatDateLabel(date: string): string {
  if (date === 'unknown') return '未知日期';
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  const months = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月',
  ];
  return `${d.getFullYear()} · ${months[d.getMonth()]} ${d.getDate()}日`;
}

const MAX_RETRY = 2;

const TimelineImage: React.FC<{
  image: PhotoConfig;
  onClick: () => void;
}> = ({ image, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [ratio, setRatio] = useState(0);
  const retryCount = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewSrc = image.thumbnail || image.src;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setRatio(img.naturalWidth / img.naturalHeight);
    img.src = previewSrc;
  }, [previewSrc]);

  const handleError = () => {
    if (retryCount.current < MAX_RETRY) {
      retryCount.current += 1;
      const el = imgRef.current;
      if (el) {
        const sep = previewSrc.includes('?') ? '&' : '?';
        el.src = `${previewSrc}${sep}_r=${retryCount.current}`;
      }
    } else {
      setErrored(true);
      setLoaded(true);
    }
  };

  return (
    <Box className={styles.timelineCard} onClick={onClick}>
      <Box
        className={styles.cardImgWrap}
        style={ratio > 0 ? { aspectRatio: `${ratio}` } : { paddingBottom: '66%' }}
      >
        {errored ? (
          <Box className={styles.cardError}>
            <Typography variant="caption" color="textSecondary">
              加载失败
            </Typography>
          </Box>
        ) : (
          <img
            ref={imgRef}
            src={previewSrc}
            alt={image.alt}
            loading="lazy"
            className={`${styles.cardImg} ${loaded ? styles.cardImgLoaded : ''}`}
            onLoad={() => {
              if (ratio === 0 && imgRef.current) {
                setRatio(imgRef.current.naturalWidth / imgRef.current.naturalHeight);
              }
              setLoaded(true);
            }}
            onError={handleError}
          />
        )}
        {!loaded && (
          <Skeleton
            variant="rectangular"
            className={styles.cardSkeleton}
            animation="wave"
          />
        )}
        <Box className={styles.cardOverlay}>
          <Typography className={styles.cardTitle}>{image.alt}</Typography>
          {image.exif && (
            <Typography className={styles.cardExif}>
              {[image.exif.focalLength, image.exif.aperture, image.exif.shutterSpeed, image.exif.iso ? `ISO${image.exif.iso}` : '']
                .filter(Boolean)
                .join('  ')}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const TimelineGallery: React.FC<TimelineGalleryProps> = ({ images, loading = false }) => {
  const [selectedImage, setSelectedImage] = useState<PhotoConfig | null>(null);

  if (loading) {
    return (
      <Box className={styles.timeline}>
        {[1, 2].map(i => (
          <Box key={i} className={styles.group}>
            <Skeleton width={160} height={28} sx={{ mb: 2 }} />
            <Box className={styles.photoRow}>
              {[1, 2, 3].map(j => (
                <Skeleton
                  key={j}
                  variant="rectangular"
                  className={styles.skeletonCard}
                  animation="wave"
                />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  const groups = groupByDate(images);

  return (
    <Box className={styles.timeline}>
      <Box className={styles.timelineLine} />

      {groups.map((group, gi) => (
        <ScrollReveal key={group.date} delay={gi * 80}>
          <Box className={styles.group}>
            <Box className={styles.groupHeader}>
              <Box className={styles.dot} />
              <Box className={styles.dateInfo}>
                <Typography className={styles.dateLabel}>{group.label}</Typography>
                <Typography className={styles.photoCount}>
                  {group.photos.length} 张
                </Typography>
              </Box>
            </Box>

            <Box className={styles.photoRow}>
              {group.photos.map(photo => (
                <TimelineImage
                  key={photo.id}
                  image={photo}
                  onClick={() => setSelectedImage(photo)}
                />
              ))}
            </Box>
          </Box>
        </ScrollReveal>
      ))}

      <PhotoLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Box>
  );
};

export default TimelineGallery;
