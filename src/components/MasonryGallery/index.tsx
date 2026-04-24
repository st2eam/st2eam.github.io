import React, { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { Box, Card, Fade, Skeleton, Typography } from '@mui/material';
import { PhotoConfig } from '@/config/photos';
import PhotoLightbox from '@/components/PhotoLightbox';
import styles from './index.module.less';

interface MasonryGalleryProps {
  images: PhotoConfig[];
  loading?: boolean;
}

const breakpointColumns = {
  default: 4,
  1400: 3,
  900: 2,
  600: 1,
};

const AutoImage: React.FC<{
  image: PhotoConfig;
  onClick: () => void;
  delay: number;
}> = ({ image, onClick, delay }) => {
  const [ratio, setRatio] = useState(image.width && image.height ? image.width / image.height : 0);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const previewSrc = image.thumbnail || image.src;

  useEffect(() => {
    if (ratio > 0) return;
    const img = new Image();
    img.onload = () => {
      setRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = previewSrc;
  }, [previewSrc, ratio]);

  return (
    <Fade in timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <Card className={styles.card} onClick={onClick}>
        <Box
          className={styles.imgWrap}
          style={ratio > 0 ? { aspectRatio: `${ratio}` } : { minHeight: 240 }}
        >
          <img
            ref={imgRef}
            src={previewSrc}
            alt={image.alt}
            loading="lazy"
            className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
            onLoad={() => {
              if (ratio === 0 && imgRef.current) {
                setRatio(imgRef.current.naturalWidth / imgRef.current.naturalHeight);
              }
              setLoaded(true);
            }}
          />
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
    </Fade>
  );
};

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images, loading = false }) => {
  const [selectedImage, setSelectedImage] = useState<PhotoConfig | null>(null);

  if (loading) {
    return (
      <Box className={styles.gallery}>
        <Masonry
          breakpointCols={breakpointColumns}
          className={styles.grid}
          columnClassName={styles.column}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={`sk-${i}`} className={styles.skeletonCard}>
              <Skeleton
                variant="rectangular"
                height={220 + Math.random() * 160}
                animation="wave"
                sx={{ borderRadius: '16px' }}
              />
            </Card>
          ))}
        </Masonry>
      </Box>
    );
  }

  return (
    <Box className={styles.gallery}>
      <Masonry
        breakpointCols={breakpointColumns}
        className={styles.grid}
        columnClassName={styles.column}
      >
        {images.map((img, i) => (
          <AutoImage
            key={img.id}
            image={img}
            onClick={() => setSelectedImage(img)}
            delay={Math.min(i * 60, 600)}
          />
        ))}
      </Masonry>

      <PhotoLightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Box>
  );
};

export default MasonryGallery;
