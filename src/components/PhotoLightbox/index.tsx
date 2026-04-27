import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Dialog, IconButton, Typography, Button, CircularProgress } from '@mui/material';
import {
  Close as CloseIcon,
  CameraAlt,
  Camera,
  Iso,
  ShutterSpeed,
  CalendarToday,
  Refresh as RefreshIcon,
  PhotoSizeSelectActual as OriginalIcon,
  Check as CheckIcon,
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

type OriginalState = 'idle' | 'loading' | 'loaded' | 'error';

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ image, onClose }) => {
  const [originalState, setOriginalState] = useState<OriginalState>('idle');
  const preloaderRef = useRef<HTMLImageElement | null>(null);

  const previewSrc = image ? (image.thumbnail || image.src) : '';
  const fullSrc = image ? image.src : '';
  const hasThumbnail = image ? !!image.thumbnail : false;

  useEffect(() => {
    if (!image) {
      setOriginalState('idle');
      if (preloaderRef.current) {
        preloaderRef.current.onload = null;
        preloaderRef.current.onerror = null;
        preloaderRef.current = null;
      }
    }
  }, [image]);

  const handleLoadOriginal = useCallback(() => {
    if (originalState !== 'idle' || !image) return;
    setOriginalState('loading');

    const preloader = new Image();
    preloaderRef.current = preloader;
    preloader.decoding = 'async';
    preloader.onload = () => setOriginalState('loaded');
    preloader.onerror = () => setOriginalState('error');
    preloader.src = fullSrc;

    if (preloader.complete && preloader.naturalWidth > 0) {
      setOriginalState('loaded');
    }
  }, [originalState, image, fullSrc]);

  const handleRetry = useCallback(() => {
    setOriginalState('idle');
    setTimeout(() => {
      setOriginalState('loading');
      const preloader = new Image();
      preloaderRef.current = preloader;
      preloader.decoding = 'async';
      preloader.onload = () => setOriginalState('loaded');
      preloader.onerror = () => setOriginalState('error');
      preloader.src = fullSrc + (fullSrc.includes('?') ? '&' : '?') + '_r=' + Date.now();
    }, 0);
  }, [fullSrc]);

  const showOriginal = originalState === 'loaded';
  const displaySrc = showOriginal ? fullSrc : previewSrc;

  const originalBtnLabel = (() => {
    switch (originalState) {
      case 'idle': return '查看原图';
      case 'loading': return '加载中…';
      case 'loaded': return '已加载原图';
      case 'error': return '加载失败';
    }
  })();

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
            {hasThumbnail && (
              originalState === 'error' ? (
                <button className={styles.viewOriginal} onClick={handleRetry}>
                  <RefreshIcon className={styles.viewOriginalIcon} />
                  重试加载原图
                </button>
              ) : (
                <button
                  className={`${styles.viewOriginal} ${showOriginal ? styles.viewOriginalDone : ''}`}
                  onClick={handleLoadOriginal}
                  disabled={originalState !== 'idle'}
                >
                  {originalState === 'loading' ? (
                    <CircularProgress size={14} sx={{ color: 'inherit' }} />
                  ) : showOriginal ? (
                    <CheckIcon className={styles.viewOriginalIcon} />
                  ) : (
                    <OriginalIcon className={styles.viewOriginalIcon} />
                  )}
                  {originalBtnLabel}
                </button>
              )
            )}
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
                originalState === 'loading' ? styles.dialogImgLoading : styles.dialogImgReady
              }`}
            />
            {originalState === 'loading' && (
              <Box className={styles.loadingOverlay}>
                <CircularProgress size={32} sx={{ color: 'rgba(255,255,255,0.5)' }} />
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
