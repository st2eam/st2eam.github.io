import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoLoop from '@/components/reactbits/LogoLoop/LogoLoop';
import Magnet from '@/components/reactbits/Magnet/Magnet';
import styles from './index.module.less';

const tagItems = [
  '街头摄影',
  '风景',
  '人像',
  '建筑',
  'Sony A7C2',
  'Adobe Lightroom',
  '光影',
  '色彩',
  '构图',
  'TypeScript',
  'React',
  '前端开发',
  '设计',
  '旅行',
];

const tagLogos = tagItems.map((t, i) => ({
  node: (
    <Box className={styles.tagItem}>
      <span>{t}</span>
    </Box>
  ),
  ariaLabel: t,
  title: t,
  key: i,
}));

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" className={styles.footer}>
      <Box className={styles.marqueeWrap}>
        <LogoLoop
          logos={tagLogos}
          speed={42}
          direction="left"
          logoHeight={28}
          gap={36}
          pauseOnHover
          fadeOut
          fadeOutColor="rgba(250, 247, 242, 1)"
          scaleOnHover
          ariaLabel="标签"
        />
      </Box>
      <Container maxWidth="lg">
        <Box className={styles.inner}>
          <Box className={styles.left}>
            <Typography className={styles.brand}>ST2EAM</Typography>
            <Typography className={styles.copy}>&copy; {year} &middot; Built with AI</Typography>
          </Box>

          <Box className={styles.links}>
            <Link to="/" className={styles.link}>
              作品
            </Link>
            <Link to="/notes" className={styles.link}>
              笔记
            </Link>
            <Link to="/about" className={styles.link}>
              关于
            </Link>
          </Box>

          <Box className={styles.social}>
            <Magnet padding={60} magnetStrength={3}>
              <IconButton
                size="small"
                href="https://github.com/st2eam"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <GitHub fontSize="small" />
              </IconButton>
            </Magnet>
            <Magnet padding={60} magnetStrength={3}>
              <IconButton
                size="small"
                href="mailto:379403404@qq.com"
                className={styles.socialBtn}
                aria-label="Email"
              >
                <Email fontSize="small" />
              </IconButton>
            </Magnet>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
