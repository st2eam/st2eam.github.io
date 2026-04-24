import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" className={styles.footer}>
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
            <IconButton
              size="small"
              href="https://github.com/st2eam"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton size="small" href="mailto:379403404@qq.com" className={styles.socialBtn}>
              <Email fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
