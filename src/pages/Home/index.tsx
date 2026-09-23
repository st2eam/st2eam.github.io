import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  PhotoCamera,
  KeyboardArrowDown,
  ViewQuilt,
  Timeline,
  ArrowForward,
  LocationOn,
  LocalOffer,
} from '@mui/icons-material';
import MasonryGallery from '@/components/MasonryGallery';
import TimelineGallery from '@/components/TimelineGallery';
import ScrollReveal from '@/components/ScrollReveal';
import { photos as realPhotos, contentTags, locationTags } from '@/config/photos';
import { sortPhotosByDateDesc } from '@/utils/sortPhotosByDate';
import styles from './index.module.less';

const heroCandidates = realPhotos.filter(photo => photo.tags?.includes('风光'));
const heroPool = heroCandidates.length > 0 ? heroCandidates : realPhotos;
const daysPerRotation = 7;
const rotationIndex = Math.floor(Date.now() / (daysPerRotation * 24 * 60 * 60 * 1000));
const heroPhoto = heroPool[rotationIndex % heroPool.length];
type ViewMode = 'masonry' | 'timeline';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedLocation, setSelectedLocation] = useState('全部');
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const photos = useMemo(() => sortPhotosByDateDesc(realPhotos), []);
  const filteredPhotos = photos.filter(photo => {
    if (selectedCategory !== '全部' && !photo.tags?.includes(selectedCategory)) return false;
    if (
      selectedLocation !== '全部' &&
      photo.location?.city !== selectedLocation &&
      photo.location?.province !== selectedLocation
    )
      return false;
    return true;
  });
  const scrollToGallery = () =>
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box className={styles.homePage}>
      <Box component="section" className={styles.hero} aria-labelledby="hero-title">
        <Container maxWidth="xl" className={styles.heroInner}>
          <Box className={styles.heroCopy}>
            <Typography className={styles.heroMeta}>ST2EAM · PHOTOGRAPHY ARCHIVE</Typography>
            <Typography id="hero-title" component="h1" className={styles.heroTitle}>
              雨涧听溪，
              <br />
              <em>山野春行</em>
            </Typography>
            <Typography className={styles.heroDesc}>
              在雾与光之间，记录山野的回声。这里收集行走途中真实遇见的风景、人物与片刻。
            </Typography>
            <Box className={styles.heroActions}>
              <Button
                onClick={scrollToGallery}
                className={styles.heroCta}
                variant="contained"
                disableElevation
                endIcon={<ArrowForward />}
              >
                <PhotoCamera className={styles.ctaIcon} /> 进入作品集
              </Button>
              <Typography className={styles.heroCount}>
                {photos.length} 张作品 · {locationTags.length - 1} 个地点
              </Typography>
            </Box>
          </Box>
          {heroPhoto && (
            <Box component="figure" className={styles.heroMedia}>
              <img
                src={heroPhoto.thumbnail || heroPhoto.src}
                alt={heroPhoto.alt}
                width={heroPhoto.width}
                height={heroPhoto.height}
                fetchPriority="high"
              />
              <Box component="figcaption" className={styles.heroCaption}>
                <span>{heroPhoto.alt}</span>
                <span>
                  {heroPhoto.location?.city ?? '山野'} · {heroPhoto.exif?.date ?? ''}
                </span>
              </Box>
            </Box>
          )}
        </Container>
        <Button className={styles.scrollHint} onClick={scrollToGallery} aria-label="滚动到作品集">
          <KeyboardArrowDown />
        </Button>
      </Box>

      <Box
        id="gallery"
        component="section"
        className={styles.galleryWrap}
        aria-labelledby="gallery-title"
      >
        <Container maxWidth="xl">
          <ScrollReveal>
            <Box className={styles.galleryHeader}>
              <Box>
                <Typography id="gallery-title" component="h2" className={styles.galleryTitle}>
                  作品选集
                </Typography>
                <Typography className={styles.gallerySubtitle}>
                  PHOTOGRAPHY ARCHIVE · {filteredPhotos.length} WORKS
                </Typography>
              </Box>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, value) => value && setViewMode(value)}
                className={styles.viewToggle}
                size="small"
                aria-label="作品视图"
              >
                <ToggleButton value="masonry" className={styles.toggleBtn} aria-label="瀑布流视图">
                  <ViewQuilt />
                </ToggleButton>
                <ToggleButton value="timeline" className={styles.toggleBtn} aria-label="时间轴视图">
                  <Timeline />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </ScrollReveal>

          {viewMode === 'masonry' && (
            <ScrollReveal delay={120}>
              <Box className={styles.filterSection}>
                <Box className={styles.categoryRow} aria-label="作品分类">
                  <LocalOffer className={styles.filterIcon} />
                  {contentTags.map(category => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`${styles.filterChip} ${selectedCategory === category ? styles.chipActive : ''}`}
                    />
                  ))}
                </Box>
                <FormControl size="small" className={styles.locationSelect}>
                  <InputLabel id="location-label">
                    <LocationOn fontSize="small" /> 地点
                  </InputLabel>
                  <Select
                    labelId="location-label"
                    value={selectedLocation}
                    label="地点"
                    onChange={event => setSelectedLocation(event.target.value)}
                  >
                    {locationTags.map(location => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </ScrollReveal>
          )}

          {filteredPhotos.length === 0 ? (
            <Box className={styles.emptyState}>
              <Typography component="p">暂时没有符合条件的作品。</Typography>
              <Button
                onClick={() => {
                  setSelectedCategory('全部');
                  setSelectedLocation('全部');
                }}
              >
                清除筛选
              </Button>
            </Box>
          ) : viewMode === 'masonry' ? (
            <MasonryGallery images={filteredPhotos} />
          ) : (
            <TimelineGallery images={filteredPhotos} />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
