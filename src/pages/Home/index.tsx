import React, { useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ViewQuilt from '@mui/icons-material/ViewQuilt';
import Timeline from '@mui/icons-material/Timeline';
import ArrowForward from '@mui/icons-material/ArrowForward';
import LocationOn from '@mui/icons-material/LocationOn';
import LocalOffer from '@mui/icons-material/LocalOffer';
import MasonryGallery from '@/components/MasonryGallery';
import TimelineGallery from '@/components/TimelineGallery';
import ScrollReveal from '@/components/ScrollReveal';
import { photos as realPhotos, contentTags, locationTags } from '@/config/photos';
import { quotes } from '@/config/quotes';
import { sortPhotosByDateDesc } from '@/utils/sortPhotosByDate';
import styles from './index.module.less';

const heroCandidates = realPhotos.filter(photo => photo.tags?.includes('风光'));
const heroPool = heroCandidates.length > 0 ? heroCandidates : realPhotos;
// 每次打开页面分别随机选择封面和摘抄，在本次浏览中保持稳定。
const heroPhoto =
  heroPool.length > 0 ? heroPool[Math.floor(Math.random() * heroPool.length)] : undefined;
const heroQuote = quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : undefined;
type ViewMode = 'masonry' | 'timeline';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedLocation, setSelectedLocation] = useState('全部');
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [quoteExplanationOpen, setQuoteExplanationOpen] = useState(false);
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
                {[heroPhoto.location?.city ?? '山野', heroPhoto.exif?.date]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </Box>
          </Box>
        )}
        <Container maxWidth="xl" className={styles.heroInner}>
          <Box className={styles.heroBody}>
            <Box className={styles.heroCopy}>
              <Typography id="hero-title" component="h1" className={styles.heroTitle}>
                雨涧听溪，
                <br />
                <em>山野春行</em>
              </Typography>
              <Typography className={styles.heroDesc}>
                在雾与光之间，记录山野的回声。这里收集行走途中真实遇见的风景、人物与片刻。
              </Typography>
              <Button
                onClick={scrollToGallery}
                className={styles.heroCta}
                variant="outlined"
                endIcon={<ArrowForward />}
              >
                进入作品集
              </Button>
            </Box>
            {heroQuote && (
              <figure className={styles.heroQuote} aria-label="句子摘抄">
                <blockquote className={styles.quoteText}>
                  {heroQuote.explanation ? (
                    <ClickAwayListener onClickAway={() => setQuoteExplanationOpen(false)}>
                      <Tooltip
                        title={
                          <>
                            {heroQuote.source && (
                              <p className={styles.quoteSource}>
                                {[heroQuote.author, heroQuote.source].filter(Boolean).join(' · ')}
                              </p>
                            )}
                            <p className={styles.quoteExplanation}>{heroQuote.explanation}</p>
                          </>
                        }
                        placement="top"
                        enterDelay={0}
                        arrow
                        describeChild
                        disableTouchListener
                        open={quoteExplanationOpen}
                        onOpen={() => setQuoteExplanationOpen(true)}
                        onClose={() => setQuoteExplanationOpen(false)}
                        slotProps={{
                          tooltip: { className: styles.quoteTooltip },
                          arrow: { className: styles.quoteTooltipArrow },
                        }}
                      >
                        <button
                          type="button"
                          className={styles.quoteTrigger}
                          aria-expanded={quoteExplanationOpen}
                          onClick={() => setQuoteExplanationOpen(true)}
                          onBlur={() => setQuoteExplanationOpen(false)}
                        >
                          “{heroQuote.text}”<span className={styles.quoteHint}>释义</span>
                        </button>
                      </Tooltip>
                    </ClickAwayListener>
                  ) : (
                    <p>“{heroQuote.text}”</p>
                  )}
                </blockquote>
                {heroQuote.author && (
                  <figcaption className={styles.quoteAuthor}>——{heroQuote.author}</figcaption>
                )}
              </figure>
            )}
          </Box>
          <Box className={styles.heroFooter}>
            <Typography className={styles.heroCount}>
              {photos.length} 张作品 · {locationTags.length - 1} 个地点
            </Typography>
            <Button
              className={styles.scrollHint}
              onClick={scrollToGallery}
              aria-label="滚动到作品集"
            >
              <KeyboardArrowDown />
            </Button>
          </Box>
        </Container>
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
