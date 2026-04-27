import React, { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { Box, Card, Fade, Skeleton, Typography } from '@mui/material';
import { PhotoConfig } from '@/config/photos';
import PhotoLightbox from '@/components/PhotoLightbox';
import GlareHover from '@/components/reactbits/GlareHover/GlareHover';
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

const MAX_RETRY = 2;

function useInView(ref: React.RefObject<HTMLElement | null>, rootMargin = '200px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

const AutoImage: React.FC<{
  image: PhotoConfig;
  onClick: () => void;
  delay: number;
}> = ({ image, onClick, delay }) => {
  const [ratio, setRatio] = useState(image.width && image.height ? image.width / image.height : 0);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const retryCount = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);

  const previewSrc = image.thumbnail || image.src;

  useEffect(() => {
    if (!inView || ratio > 0) return;
    const img = new Image();
    img.onload = () => {
      setRatio(img.naturalWidth / img.naturalHeight);
    };
    img.src = previewSrc;
  }, [previewSrc, ratio, inView]);

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
    <Fade in timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <Box className={styles.cardOuter} onClick={onClick} ref={wrapRef}>
        <GlareHover
          width="100%"
          height="100%"
          background="transparent"
          borderRadius="20px"
          borderColor="transparent"
          glareColor="#ffffff"
          glareOpacity={0.18}
          glareAngle={-45}
          glareSize={220}
          transitionDuration={750}
          className={styles.glareWrap}
        >
          <Card className={styles.card}>
            <Box className={styles.borderTrail} aria-hidden />
            <Box
              className={styles.imgWrap}
              style={ratio > 0 ? { aspectRatio: `${ratio}` } : { minHeight: 240 }}
            >
              {errored ? (
                <Box className={styles.imgError}>
                  <Typography variant="caption" color="textSecondary">
                    加载失败
                  </Typography>
                </Box>
              ) : inView ? (
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
              ) : null}
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
        </GlareHover>
      </Box>
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
