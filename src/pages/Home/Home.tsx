import React, { useState } from 'react';
import { Container, Typography, Box, Chip, Button, useMediaQuery, useTheme } from '@mui/material';
import { PhotoCamera, Refresh } from '@mui/icons-material';
import MasonryGallery from '@/components/MasonryGallery/MasonryGallery';
import './Home.less';

// 生成随机尺寸的摄影作品数据
const generateRandomPhotos = (count: number) => {
  const categories = [
    '城市摄影',
    '风景摄影',
    '人像摄影',
    '建筑摄影',
    '街头摄影',
    '自然摄影',
    '抽象艺术',
    '黑白摄影',
  ];
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

  return Array.from({ length: count }, (_, index) => {
    // 生成随机宽度和高度，让图片更加灵动
    const baseWidth = 300 + Math.random() * 200; // 300-500px
    const aspectRatios = [0.6, 0.75, 1, 1.25, 1.5, 1.8]; // 不同的宽高比
    const aspectRatio = aspectRatios[Math.floor(Math.random() * aspectRatios.length)];
    const height = baseWidth / aspectRatio;

    return {
      id: (index + 1).toString(),
      src: `https://picsum.photos/${Math.floor(baseWidth)}/${Math.floor(height)}?random=${index + 1}`,
      alt: titles[Math.floor(Math.random() * titles.length)],
      width: Math.floor(baseWidth),
      height: Math.floor(height),
      category: categories[Math.floor(Math.random() * categories.length)],
    };
  });
};

const mockPhotos = generateRandomPhotos(24);

const categories = [
  '全部',
  '城市摄影',
  '风景摄影',
  '人像摄影',
  '建筑摄影',
  '街头摄影',
  '自然摄影',
  '抽象艺术',
  '黑白摄影',
];

const Home: React.FC = () => {
  const [photos, setPhotos] = useState(mockPhotos);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredPhotos =
    selectedCategory === '全部'
      ? photos
      : photos.filter(photo => photo.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleRefresh = () => {
    setLoading(true);
    // 生成新的随机图片
    setTimeout(() => {
      const newPhotos = generateRandomPhotos(24);
      setPhotos(newPhotos);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box className="home-page">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" className="hero-title">
              stream 个人小站
            </Typography>
            <Typography variant="h6" className="hero-subtitle">
              所有内容均由AI生成，网站有待完善，不代表本人真实想法以及水平
            </Typography>
            <Box className="hero-stats">
              <Box className="stat-item">
                <PhotoCamera />
                <span>{photos.length} 张作品</span>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Container maxWidth="xl" className="gallery-section">
        {/* Category Filter */}
        <Box className="category-filter">
          <Typography variant="h5" className="section-title">
            作品展示
          </Typography>
          <Box className="filter-chips">
            {categories.map(category => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryChange(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                className="category-chip"
              />
            ))}
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
            className="refresh-button"
          >
            {loading ? '加载中...' : '刷新图片'}
          </Button>
        </Box>

        {/* Photo Gallery */}
        <MasonryGallery images={filteredPhotos} loading={loading} />
      </Container>
    </Box>
  );
};

export default Home;
