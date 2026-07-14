import React, { useState, useRef, useCallback, useMemo } from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, Card, Fade, Skeleton, Typography } from '@mui/material';
import { LocationOn as LocationOnIcon, LocalOffer as TagIcon } from '@mui/icons-material';
import { PhotoConfig } from '@/config/photos';
import PhotoLightbox from '@/components/PhotoLightbox';
import styles from './index.module.less';

interface MasonryGalleryProps {
  images: PhotoConfig[];
  loading?: boolean;
}

const MAX_RETRY = 2;
const MASONRY_COLUMNS = { xs: 1, sm: 2, md: 3, lg: 4 };
const MASONRY_SPACING = 2.5;
const SKELETON_HEIGHTS = [280, 340, 260, 380, 300, 320, 350, 290];
const SKELETON_SX = { borderRadius: '16px' };

interface AutoImageProps {
  image: PhotoConfig;
  onSelect: (img: PhotoConfig) => void;
  delay: number;
}

const AutoImage = React.memo<AutoImageProps>(({ image, onSelect, delay }) => {
  // 固定宽高比，避免图片 onLoad 改高度导致 Masonry 整列重排闪动
  const ratio =
    image.width && image.height ? image.width / image.height : 3 / 4;
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const retryCount = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const previewSrc = image.thumbnail || image.src;

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

  const handleSelect = useCallback(() => onSelect(image), [onSelect, image]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(image);
      }
    },
    [onSelect, image],
  );

  const wrapStyle = useMemo(() => ({ aspectRatio: `${ratio}` }), [ratio]);

  const fadeStyle = useMemo(() => ({ transitionDelay: `${delay}ms` }), [delay]);

  return (
    <Fade in timeout={600} style={fadeStyle}>
      <Box className={styles.cardOuter}>
        <Box
          component="button"
          type="button"
          className={styles.cardButton}
          onClick={handleSelect}
          onKeyDown={handleKeyDown}
          aria-label={`查看作品：${image.alt}`}
        >
          <Card className={styles.card}>
            <Box className={styles.imgWrap} style={wrapStyle}>
              {errored ? (
                <Box className={styles.imgError}>
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
                  decoding="async"
                  className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
                  onLoad={() => setLoaded(true)}
                  onError={handleError}
                />
              )}
              {!loaded && (
                <Skeleton variant="rectangular" className={styles.imgSkeleton} animation="wave" />
              )}
            </Box>
            <Box className={styles.overlay}>
              <Box className={styles.overlayInner}>
                <Typography className={styles.imgTitle}>{image.alt}</Typography>
                {image.tags && image.tags.length > 0 && (
                  <Typography className={styles.imgCat}>
                    <TagIcon sx={{ fontSize: 13, mr: 0.5 }} />
                    {image.tags.join(' · ')}
                  </Typography>
                )}
                {image.location && (
                  <Typography className={styles.imgLocation}>
                    <LocationOnIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {[image.location.province, image.location.city].filter(Boolean).join(' · ')}
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Fade>
  );
});

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images, loading = false }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSelect = useCallback((img: PhotoConfig) => {
    const idx = images.findIndex(i => i.id === img.id);
    setSelectedIndex(idx);
  }, [images]);
  const handleClose = useCallback(() => setSelectedIndex(-1), []);
  const handleNavigate = useCallback((index: number) => setSelectedIndex(index), []);

  if (loading) {
    return (
      <Box className={styles.gallery}>
        <Masonry columns={MASONRY_COLUMNS} spacing={MASONRY_SPACING}>
          {SKELETON_HEIGHTS.map((h, i) => (
            <Card key={`sk-${i}`} className={styles.skeletonCard}>
              <Skeleton variant="rectangular" height={h} animation="wave" sx={SKELETON_SX} />
            </Card>
          ))}
        </Masonry>
      </Box>
    );
  }

  return (
    <Box className={styles.gallery}>
      <Masonry columns={MASONRY_COLUMNS} spacing={MASONRY_SPACING}>
        {images.map((img, i) => (
          <AutoImage
            key={img.id}
            image={img}
            onSelect={handleSelect}
            delay={Math.min(i * 60, 600)}
          />
        ))}
      </Masonry>

      <PhotoLightbox images={images} currentIndex={selectedIndex} onNavigate={handleNavigate} onClose={handleClose} />
    </Box>
  );
};

export default MasonryGallery;
