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
          <Box className={styles.brandBlock}>
            <Typography className={styles.brand}>ST2EAM</Typography>
            <Typography className={styles.copy}>在雾与光之间，记录山野的回声</Typography>
            <Typography className={styles.copy}>&copy; {year} · Built with AI</Typography>
          </Box>
          <Box component="nav" aria-label="页脚导航" className={styles.links}>
            <Link to="/" className={styles.link}>
              作品
            </Link>
            <Link to="/projects" className={styles.link}>
              项目
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
              aria-label="GitHub"
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              href="mailto:379403404@qq.com"
              className={styles.socialBtn}
              aria-label="Email"
            >
              <Email fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
