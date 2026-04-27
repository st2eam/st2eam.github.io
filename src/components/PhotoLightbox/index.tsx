import React, { useEffect, useState, useCallback } from 'react';
import { Box, Dialog, IconButton, Typography, Button, CircularProgress } from '@mui/material';
import {
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  CameraAlt,
  Camera,
  Iso,
  ShutterSpeed,
  CalendarToday,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { PhotoConfig, ExifData } from '@/config/photos';
import styles from './index.module.less';

const DIALOG_SLOT_PROPS = { paper: { className: styles.dialogPaper } };
const DIALOG_CLASSES = { root: styles.dialogRoot };
const DIALOG_TRANSITION = { enter: 240, exit: 180 };

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
  const [loadError, setLoadError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const previewSrc = image ? (image.thumbnail || image.src) : '';
  const fullSrc = image ? image.thumbnail || image.src : '';

  useEffect(() => {
    if (!image) {
      setFullLoaded(false);
      setLoadError(false);
      return;
    }
    setFullLoaded(false);
    setLoadError(false);
    const preloader = new Image();
    preloader.decoding = 'async';
    preloader.src = fullSrc;
    let cancelled = false;
    const onSuccess = () => {
      if (!cancelled) setFullLoaded(true);
    };
    const onFail = () => {
      if (!cancelled) {
        setLoadError(true);
        setFullLoaded(true);
      }
    };
    if (preloader.complete && preloader.naturalWidth > 0) {
      onSuccess();
    } else {
      preloader.onload = onSuccess;
      preloader.onerror = onFail;
    }
    return () => {
      cancelled = true;
      preloader.onload = null;
      preloader.onerror = null;
    };
  }, [image, fullSrc, retryKey]);

  const handleRetry = useCallback(() => {
    setRetryKey(k => k + 1);
  }, []);

  const displaySrc = image
    ? fullLoaded && !loadError
      ? fullSrc
      : previewSrc
    : '';

  return (
    <Dialog
      open={!!image}
      onClose={onClose}
      maxWidth={false}
      slotProps={DIALOG_SLOT_PROPS}
      classes={DIALOG_CLASSES}
      transitionDuration={DIALOG_TRANSITION}
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
              key={`${image.id}-${retryKey}`}
              src={displaySrc}
              alt={image.alt}
              decoding="async"
              loading="eager"
              fetchPriority="high"
              className={`${styles.dialogImg} ${
                fullLoaded && !loadError ? styles.dialogImgReady : styles.dialogImgLoading
              }`}
              onError={() => setLoadError(true)}
            />
            {!fullLoaded && (
              <Box className={styles.loadingOverlay}>
                <CircularProgress size={32} sx={{ color: 'rgba(255,255,255,0.5)' }} />
              </Box>
            )}
            {loadError && (
              <Box className={styles.errorOverlay}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                  图片加载失败
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshIcon />}
                  onClick={handleRetry}
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.6)' },
                  }}
                >
                  重试
                </Button>
              </Box>
            )}
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
