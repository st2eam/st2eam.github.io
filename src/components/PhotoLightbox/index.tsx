import React from 'react';
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

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ image, onClose }) => (
  <Dialog
    open={!!image}
    onClose={onClose}
    maxWidth={false}
    PaperProps={{ className: styles.dialogPaper }}
    classes={{ root: styles.dialogRoot }}
    transitionDuration={{ enter: 380, exit: 240 }}
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
          <img src={image.src} alt={image.alt} className={styles.dialogImg} />
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

export default PhotoLightbox;
