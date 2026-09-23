import React from 'react';
import { ArrowForward, Home } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const NotFound: React.FC = () => (
  <Box component="section" className={styles.notFound} aria-labelledby="not-found-title">
    <Container maxWidth="xl" className={styles.content}>
      <Box className={styles.message}>
        <Typography id="not-found-title" component="h1" className={styles.title}>
          这段山路，
          <br />
          暂时走不通。
        </Typography>
        <Typography component="p" className={styles.description}>
          你访问的页面可能已经移走，或地址有误。沿着熟悉的路，回到作品集继续看山野。
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          disableElevation
          className={styles.homeButton}
          startIcon={<Home />}
          endIcon={<ArrowForward />}
        >
          返回首页
        </Button>
      </Box>

      <Box component="figure" className={styles.photo}>
        <Typography component="p" className={styles.code} aria-label="错误代码 404">
          404
        </Typography>
        <img
          src="/photos/thumbnails/DSC04146.jpg"
          alt="林深生晓雾，幽径隐青山"
          width="1200"
          height="800"
        />
        <Box component="figcaption" className={styles.caption}>
          <span>林深生晓雾，幽径隐青山</span>
          <span>云南 · 丽江</span>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default NotFound;
