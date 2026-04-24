import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  PhotoCamera,
  Refresh,
  KeyboardArrowDown,
  ViewQuilt,
  Timeline,
  ArrowForward,
} from '@mui/icons-material';
import MasonryGallery from '@/components/MasonryGallery';
import TimelineGallery from '@/components/TimelineGallery';
import ScrollReveal from '@/components/ScrollReveal';
import BlurText from '@/components/reactbits/BlurText/BlurText';
import RotatingText from '@/components/reactbits/RotatingText/RotatingText';
import ShinyText from '@/components/reactbits/ShinyText/ShinyText';
import CountUp from '@/components/reactbits/CountUp/CountUp';
import { PhotoConfig, photos as realPhotos, categories } from '@/config/photos';
import styles from './index.module.less';

const generatePlaceholders = (count: number): PhotoConfig[] => {
  const cats = ['城市', '风景', '人像', '建筑', '街头', '自然', '抽象', '黑白'];
  const titles = [
    '城市夜景',
    '自然风光',
    '人像写真',
    '建筑艺术',
    '街头印象',
    '山水之间',
    '光影游戏',
    '时光印记',
    '城市韵律',
    '静谧时刻',
    '生活片段',
    '艺术瞬间',
    '色彩交响',
    '几何美学',
    '纹理探索',
    '情感表达',
    '动态瞬间',
    '诗意空间',
  ];
  return Array.from({ length: count }, (_, i) => {
    const w = 300 + Math.random() * 200;
    const ratios = [0.6, 0.75, 1, 1.25, 1.5, 1.8];
    const h = w / ratios[Math.floor(Math.random() * ratios.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const d = new Date(Date.now() - daysAgo * 86400000);
    const date = d.toISOString().split('T')[0];
    return {
      id: (i + 1).toString(),
      src: `https://picsum.photos/${Math.floor(w)}/${Math.floor(h)}?random=${i + 1}`,
      alt: titles[Math.floor(Math.random() * titles.length)],
      width: Math.floor(w),
      height: Math.floor(h),
      tags: [cats[Math.floor(Math.random() * cats.length)]],
      exif: { date },
    };
  });
};

const useRealPhotos = realPhotos.length > 0;
const initialPhotos = useRealPhotos ? realPhotos : generatePlaceholders(24);

type ViewMode = 'masonry' | 'timeline';

const Home: React.FC = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredPhotos =
    selectedCategory === '全部' ? photos : photos.filter(p => p.tags?.includes(selectedCategory));

  const handleRefresh = () => {
    if (useRealPhotos) return;
    setLoading(true);
    setTimeout(() => {
      setPhotos(generatePlaceholders(24));
      setLoading(false);
    }, 1200);
  };

  const scrollToGallery = () => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroBgImage = useMemo(() => {
    const first = realPhotos[0];
    return first ? first.src : '';
  }, []);

  return (
    <Box className={styles.homePage}>
      <Box className={styles.hero}>
        {heroBgImage && (
          <Box
            className={styles.heroBg}
            style={{ backgroundImage: `url(${heroBgImage})` }}
            aria-hidden
          />
        )}
        <Box className={styles.heroOverlay} aria-hidden />

        <Container maxWidth="lg" className={styles.heroInner}>
          <ShinyText
            text="PHOTOGRAPHY PORTFOLIO"
            className={styles.heroLabel}
            color="#b09472"
            shineColor="#f3e2c8"
            speed={3.5}
            spread={120}
          />
          <Typography variant={isMobile ? 'h3' : 'h1'} component="h1" className={styles.heroTitle}>
            <BlurText
              text="捕捉光影"
              animateBy="letters"
              direction="top"
              delay={70}
              stepDuration={0.4}
              className={styles.heroTitleLine}
            />
            <span className={styles.titleItalic}>
              <BlurText
                text="定格"
                animateBy="letters"
                direction="top"
                delay={70}
                stepDuration={0.4}
                className={styles.heroTitleLine}
              />
              <RotatingText
                texts={['瞬间', '故事', '旅途', '光阴']}
                rotationInterval={2400}
                staggerDuration={0.025}
                staggerFrom="first"
                mainClassName={styles.titleRotate}
                splitLevelClassName={styles.titleRotateLevel}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
              />
            </span>
          </Typography>
          <Typography className={styles.heroDesc}>
            用镜头探索世界的纹理与色彩，记录那些转瞬即逝的美好
          </Typography>
          <Button
            onClick={scrollToGallery}
            className={styles.heroCta}
            variant="contained"
            disableElevation
            endIcon={<ArrowForward />}
            aria-label="查看作品集"
          >
            <PhotoCamera className={styles.ctaIcon} />
            <span>
              查看 <CountUp to={photos.length} duration={1.4} /> 张作品
            </span>
          </Button>
        </Container>

        <IconButton className={styles.scrollHint} onClick={scrollToGallery} aria-label="滚动到作品集">
          <KeyboardArrowDown />
        </IconButton>
      </Box>

      <Box id="gallery" className={styles.galleryWrap}>
        <Container maxWidth="xl">
          <ScrollReveal>
            <Box className={styles.galleryHeader}>
              <Box>
                <Typography variant="h4" className={styles.galleryTitle}>
                  作品集
                </Typography>
                <Typography className={styles.gallerySubtitle}>Selected Works</Typography>
              </Box>
              <Box className={styles.headerActions}>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, v) => v && setViewMode(v as ViewMode)}
                  className={styles.viewToggle}
                  size="small"
                >
                  <ToggleButton value="masonry" className={styles.toggleBtn}>
                    <ViewQuilt />
                  </ToggleButton>
                  <ToggleButton value="timeline" className={styles.toggleBtn}>
                    <Timeline />
                  </ToggleButton>
                </ToggleButtonGroup>
                {!useRealPhotos && (
                  <IconButton
                    onClick={handleRefresh}
                    disabled={loading}
                    className={styles.refreshBtn}
                  >
                    <Refresh className={loading ? styles.spinning : ''} />
                  </IconButton>
                )}
              </Box>
            </Box>
          </ScrollReveal>

          {viewMode === 'masonry' && (
            <ScrollReveal delay={120}>
              <Box className={styles.filterBar}>
                {categories.map(cat => (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`${styles.filterChip} ${selectedCategory === cat ? styles.chipActive : ''}`}
                  />
                ))}
              </Box>
            </ScrollReveal>
          )}

          <ScrollReveal delay={200}>
            {viewMode === 'masonry' ? (
              <MasonryGallery images={filteredPhotos} loading={loading} />
            ) : (
              <TimelineGallery images={filteredPhotos} loading={loading} />
            )}
          </ScrollReveal>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
