import React, { useState, useRef, useCallback, useMemo } from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, Card, Fade, Skeleton, Typography } from '@mui/material';
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
  const [ratio, setRatio] = useState(image.width && image.height ? image.width / image.height : 0);
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

  const handleClick = useCallback(() => onSelect(image), [onSelect, image]);

  const wrapStyle = useMemo(
    () => (ratio > 0 ? { aspectRatio: `${ratio}` } : { minHeight: 240 }),
    [ratio],
  );

  const fadeStyle = useMemo(() => ({ transitionDelay: `${delay}ms` }), [delay]);

  return (
    <Fade in timeout={600} style={fadeStyle}>
      <Box className={styles.cardOuter} onClick={handleClick}>
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
                className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
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
              <Skeleton variant="rectangular" className={styles.imgSkeleton} animation="wave" />
            )}
          </Box>
          <Box className={styles.overlay}>
            <Box className={styles.overlayInner}>
              <Typography className={styles.imgTitle}>{image.alt}</Typography>
              {image.tags && image.tags.length > 0 && (
                <Typography className={styles.imgCat}>{image.tags.join(' · ')}</Typography>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </Fade>
  );
});

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images, loading = false }) => {
  const [selectedImage, setSelectedImage] = useState<PhotoConfig | null>(null);

  const handleSelect = useCallback((img: PhotoConfig) => setSelectedImage(img), []);
  const handleClose = useCallback(() => setSelectedImage(null), []);

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

      <PhotoLightbox image={selectedImage} onClose={handleClose} />
    </Box>
  );
};

export default MasonryGallery;
