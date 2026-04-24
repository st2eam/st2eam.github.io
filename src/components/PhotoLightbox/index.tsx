import React, { useEffect, useState } from 'react';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  CameraAlt,
  Camera,
  Iso,
  ShutterSpeed,
  CalendarToday,
} from '@mui/icons-material';
import { PhotoConfig, ExifData } from '@/config/photos';
import styles from './index.module.less';

const ExifBar: React.FC<{ exif: ExifData }> = ({ exif }) => {
  const items: { icon: React.ReactNode; label: string }[] = [];

  if (exif.model) items.push({ icon: <CameraAlt />, label: exif.model });
  if (exif.lens) items.push({ icon: <Camera />, label: exif.lens });
  if (exif.focalLength || exif.aperture || exif.shutterSpeed) {
    const params = [exif.focalLength, exif.aperture, exif.shutterSpeed].filter(Boolean).join('  ');
    items.push({ icon: <ShutterSpeed />, label: params });
  }
  if (exif.iso) items.push({ icon: <Iso />, label: `ISO ${exif.iso}` });
  if (exif.date) items.push({ icon: <CalendarToday />, label: exif.date });

  if (items.length === 0) return null;

  return (
    <Box className={styles.exifBar}>
      {items.map((item, i) => (
        <Box key={i} className={styles.exifItem}>
          {item.icon}
          <span>{item.label}</span>
        </Box>
      ))}
    </Box>
  );
};

interface PhotoLightboxProps {
  image: PhotoConfig | null;
  onClose: () => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ image, onClose }) => {
  const [fullLoaded, setFullLoaded] = useState(false);

  useEffect(() => {
    if (!image) {
      setFullLoaded(false);
      return;
    }
    setFullLoaded(false);
    const fullSrc = image.src;
    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.src = fullSrc;
    let cancelled = false;
    const onDone = () => {
      if (!cancelled) setFullLoaded(true);
    };
    if (preloader.complete && preloader.naturalWidth > 0) {
      onDone();
    } else {
      preloader.onload = onDone;
      preloader.onerror = onDone;
    }
    return () => {
      cancelled = true;
      preloader.onload = null;
      preloader.onerror = null;
    };
  }, [image]);

  const displaySrc = image
    ? fullLoaded
      ? image.src
      : image.thumbnail || image.src
    : '';

  return (
    <Dialog
      open={!!image}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ className: styles.dialogPaper }}
      classes={{ root: styles.dialogRoot }}
      transitionDuration={{ enter: 240, exit: 180 }}
    >
      {image && (
        <>
          <Box className={styles.dialogActions}>
            <a
              className={styles.viewOriginal}
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OpenInNewIcon className={styles.viewOriginalIcon} />
              查看原图
            </a>
            <IconButton onClick={onClose} className={styles.dialogClose} aria-label="关闭">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.dialogContent}>
            <img
              key={image.id}
              src={displaySrc}
              alt={image.alt}
              decoding="async"
              loading="eager"
              fetchPriority="high"
              className={`${styles.dialogImg} ${
                fullLoaded ? styles.dialogImgReady : styles.dialogImgLoading
              }`}
            />
            <Box className={styles.dialogMeta}>
              <Box className={styles.dialogMetaTop}>
                <Box>
                  <Typography className={styles.dialogTitle}>{image.alt}</Typography>
                  {image.tags && image.tags.length > 0 && (
                    <Typography className={styles.dialogCat}>
                      {image.tags.join(' · ')}
                    </Typography>
                  )}
                </Box>
              </Box>
              {image.exif && <ExifBar exif={image.exif} />}
            </Box>
          </Box>
        </>
      )}
    </Dialog>
  );
};

export default PhotoLightbox;
