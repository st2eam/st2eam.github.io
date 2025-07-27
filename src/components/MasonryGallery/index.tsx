import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import {
  Box,
  Card,
  CardMedia,
  Fade,
  Skeleton,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import styles from './index.module.less';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

interface MasonryGalleryProps {
  images: ImageItem[];
  loading?: boolean;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ images, loading = false }) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  // 响应式瀑布流列数配置
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1100: 2,
    700: 1,
  };

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <Card key={`skeleton-${index}`} className={styles.galleryItem}>
        <Skeleton variant="rectangular" height={Math.random() * 200 + 200} animation="wave" />
      </Card>
    ));
  };

  if (loading) {
    return (
      <Box className={styles.masonryGallery}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridColumn}
        >
          {renderSkeletons()}
        </Masonry>
      </Box>
    );
  }

  return (
    <Box className={styles.masonryGallery}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {images.map((image, index) => (
          <Fade
            in={true}
            timeout={500}
            style={{ transitionDelay: `${index * 100}ms` }}
            key={image.id}
          >
            <Card className={styles.galleryItem} onClick={() => handleImageClick(image)}>
              <CardMedia
                component="img"
                image={image.src}
                alt={image.alt}
                loading="lazy"
                className={styles.galleryImage}
                style={{
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              />
              <Box className={styles.imageOverlay}>
                <Box className={styles.imageInfo}>
                  <span className={styles.imageTitle}>{image.alt}</span>
                  {image.category && <span className={styles.imageCategory}>{image.category}</span>}
                </Box>
              </Box>
            </Card>
          </Fade>
        ))}
      </Masonry>

      {/* 图片预览模态框 */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent style={{ padding: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <Box>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 8,
                }}
              />
              <Box
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  color: 'white',
                  padding: '20px',
                }}
              >
                <Typography variant="h6">{selectedImage.alt}</Typography>
                {selectedImage.category && (
                  <Typography variant="body2" style={{ opacity: 0.8 }}>
                    {selectedImage.category}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MasonryGallery;
