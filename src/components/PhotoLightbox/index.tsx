import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Dialog, IconButton, Typography, CircularProgress } from '@mui/material';
import {
  Close as CloseIcon,
  ChevronLeft,
  ChevronRight,
  CameraAlt,
  Camera,
  Iso,
  ShutterSpeed,
  CalendarToday,
  LocationOn as LocationOnIcon,
  LocalOffer as TagIcon,
  Refresh as RefreshIcon,
  PhotoSizeSelectActual as OriginalIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { PhotoConfig, ExifData } from '@/config/photos';
import styles from './index.module.less';

const DIALOG_SLOT_PROPS = { paper: { className: styles.dialogPaper } };
const DIALOG_CLASSES = { root: styles.dialogRoot };
const DIALOG_TRANSITION = { enter: 280, exit: 200 };
const SWIPE_THRESHOLD = 50;

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
  images: PhotoConfig[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

type OriginalState = 'idle' | 'loading' | 'loaded' | 'error';

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ images, currentIndex, onNavigate, onClose }) => {
  const [originalState, setOriginalState] = useState<OriginalState>('idle');
  const preloaderRef = useRef<HTMLImageElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const open = currentIndex >= 0 && images.length > 0;
  const image = open ? images[currentIndex] ?? null : null;

  const previewSrc = image ? (image.thumbnail || image.src) : '';
  const fullSrc = image ? image.src : '';
  const hasThumbnail = image ? !!image.thumbnail : false;

  useEffect(() => {
    setOriginalState('idle');
    if (preloaderRef.current) {
      preloaderRef.current.onload = null;
      preloaderRef.current.onerror = null;
      preloaderRef.current = null;
    }
  }, [image?.id]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        e.preventDefault();
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, currentIndex, images.length, onNavigate]);

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      t: Date.now(),
    };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchStartRef.current;
    if (!start) return;
    touchStartRef.current = null;

    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    const dt = Date.now() - start.t;

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx) || dt > 500) return;

    if (dx < 0 && currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else if (dx > 0 && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, images.length, onNavigate]);

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
      open={open}
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

          {currentIndex > 0 && (
            <IconButton
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => onNavigate(currentIndex - 1)}
              aria-label="上一张"
            >
              <ChevronLeft />
            </IconButton>
          )}
          {currentIndex < images.length - 1 && (
            <IconButton
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => onNavigate(currentIndex + 1)}
              aria-label="下一张"
            >
              <ChevronRight />
            </IconButton>
          )}

          <Box
            className={styles.dialogContent}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Box className={styles.imgContainer}>
              <img
                key={image.id}
                src={displaySrc}
                alt={image.alt}
                decoding="async"
                loading="eager"
                fetchPriority="high"
                draggable={false}
                className={`${styles.dialogImg} ${
                  originalState === 'loading' ? styles.dialogImgLoading : styles.dialogImgReady
                }`}
              />

              {originalState === 'loading' && (
                <Box className={styles.loadingOverlay}>
                  <CircularProgress size={32} sx={{ color: 'rgba(255,255,255,0.45)' }} />
                </Box>
              )}

              <Box className={styles.dialogMeta}>
                <Box className={styles.dialogMetaTop}>
                  <Box>
                    <Typography className={styles.dialogTitle}>{image.alt}</Typography>
                    {image.tags && image.tags.length > 0 && (
                      <Typography className={styles.dialogCat}>
                        <TagIcon sx={{ fontSize: 14, mr: 0.5 }} />
                        {image.tags.join(' · ')}
                      </Typography>
                    )}
                    {image.location && (
                      <Typography className={styles.dialogLocation}>
                        <LocationOnIcon sx={{ fontSize: 15, mr: 0.5 }} />
                        {[image.location.province, image.location.city].filter(Boolean).join(' · ')}
                      </Typography>
                    )}
                  </Box>
                </Box>
                {image.exif && <ExifBar exif={image.exif} />}
              </Box>
            </Box>

            {images.length > 1 && (
              <span className={styles.positionIndicator} aria-live="polite">
                {currentIndex + 1} / {images.length}
              </span>
            )}
          </Box>
        </>
      )}
    </Dialog>
  );
};

export default PhotoLightbox;
