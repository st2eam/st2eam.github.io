import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Email, GitHub, Camera, Palette, Code, CameraAlt, Casino } from '@mui/icons-material';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/reactbits/CountUp/CountUp';
import Magnet from '@/components/reactbits/Magnet/Magnet';
import { photos as realPhotos } from '@/config/photos';
import styles from './index.module.less';

const skills = [
  { name: '摄影技巧', icon: <PhotoCamera />, level: 80 },
  { name: '后期处理', icon: <Palette />, level: 65 },
  { name: '应用开发', icon: <Code />, level: 88 },
  { name: '创意构图', icon: <Camera />, level: 76 },
];

const equipment = [
  'Sony A7C2',
  'Tamron 28-200mm f/2.8-5.6',
  'Sony FE 55mm f/1.8',
  'Adobe Lightroom',
  'Adobe Photoshop',
];

const photoCount = realPhotos.length || 28;
const uniqueCameras = new Set(realPhotos.map(p => p.exif?.model).filter(Boolean)).size || 2;
const uniqueLenses = new Set(realPhotos.map(p => p.exif?.lens).filter(Boolean)).size || 3;

const stats = [
  { label: 'Photos', value: photoCount, suffix: '+' },
  { label: 'Cameras', value: uniqueCameras, suffix: '' },
  { label: 'Lenses', value: uniqueLenses, suffix: '' },
  { label: 'Years', value: 5, suffix: '+' },
];

const About: React.FC = () => {
  return (
    <Box className={styles.aboutPage}>
      {/* ── Header ── */}
      <Box className={styles.header}>
        <Container maxWidth="md">
          <ScrollReveal>
            <Box className={styles.profileWrap}>
              <Box className={styles.logoMark}>
                <CameraAlt className={styles.logoIcon} />
              </Box>
              <Typography variant="h3" component="h1" className={styles.name}>
                ST2EAM
              </Typography>
              <Typography className={styles.tagline}>AI · 摄影师 · 视觉艺术家 · 桌游店老板</Typography>
              <Typography className={styles.slogan}>雨涧听溪，山野春行</Typography>
              <Box className={styles.socialRow}>
                <Magnet padding={70} magnetStrength={2.5}>
                  <IconButton
                    href="https://github.com/st2eam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="GitHub"
                  >
                    <GitHub />
                  </IconButton>
                </Magnet>
                <Magnet padding={70} magnetStrength={2.5}>
                  <IconButton
                    href="https://st2eam.github.io/boardgames/zh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialBtn} ${styles.casinoBtn}`}
                    aria-label="The Game Shelf 桌游站"
                  >
                    <Casino />
                  </IconButton>
                </Magnet>
                <Magnet padding={70} magnetStrength={2.5}>
                  <IconButton
                    href="mailto:379403404@qq.com"
                    className={styles.socialBtn}
                    aria-label="Email"
                  >
                    <Email />
                  </IconButton>
                </Magnet>
              </Box>
            </Box>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <Box className={styles.statsGrid}>
              {stats.map((s, i) => (
                <Box key={s.label} className={styles.statCell} style={{ transitionDelay: `${i * 60}ms` }}>
                  <Typography className={styles.statValue}>
                    <CountUp to={s.value} duration={1.6} />
                    <span className={styles.statSuffix}>{s.suffix}</span>
                  </Typography>
                  <Typography className={styles.statLabel}>{s.label}</Typography>
                </Box>
              ))}
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Container maxWidth="lg" className={styles.content}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <ScrollReveal>
              <Card className={styles.glassCard}>
                <CardContent className={styles.cardInner}>
                  <Typography className={styles.cardLabel}>About</Typography>
                  <Typography variant="h5" className={styles.cardTitle}>
                    关于我
                  </Typography>
                  <Typography className={styles.bodyText}>
                    你好，我是 STREAM。
                    背着相机穿行山野是我的日常：在雨后山涧等溪声漫过石滩，在春日田埂任风擦过镜头。
                    我从不把摄影当作刻意的创作，它更像行走路上，与光影偶然相撞的细碎惊喜。
                  </Typography>
                  <Typography className={styles.bodyText}>
                    我着迷于自然与人文交织的瞬间 —— 山谷晨雾、老街落雨、黄昏时层叠晕染的远山。
                    每一次快门落下，都是为了接住那些安静却有重量的时刻。
                  </Typography>
                  <Typography className={styles.bodyText}>
                    镜头之外，我经营着一家
                    <a
                      href="https://st2eam.github.io/boardgames/zh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inlineLink}
                    >
                      桌游店
                    </a>
                    。推演规则、拆封新盒、把喜欢的游戏分享给同好。
                    无论是取景器里的光影，还是牌桌上的回合，于我都是同一件事：认真沉浸于每一个「在场」的当下。
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <ScrollReveal delay={100}>
              <Card className={styles.glassCard}>
                <CardContent className={styles.cardInner}>
                  <Typography className={styles.cardLabel}>Skills</Typography>
                  <Typography variant="h6" className={styles.cardTitle}>
                    技能专长
                  </Typography>
                  <List disablePadding>
                    {skills.map((skill, i) => (
                      <ListItem key={i} disableGutters className={styles.skillRow}>
                        <ListItemIcon className={styles.skillIcon}>{skill.icon}</ListItemIcon>
                        <ListItemText
                          primary={skill.name}
                          slotProps={{ primary: { className: styles.skillName } }}
                          secondary={
                            <Box className={styles.barTrack}>
                              <Box
                                className={styles.barFill}
                                style={{ width: `${skill.level}%` }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ScrollReveal delay={80}>
              <Card className={styles.glassCard}>
                <CardContent className={styles.cardInner}>
                  <Typography className={styles.cardLabel}>Equipment</Typography>
                  <Typography variant="h6" className={styles.cardTitle}>
                    器材与工具
                  </Typography>
                  <Box className={styles.chipWrap}>
                    {equipment.map((item, i) => (
                      <Chip key={i} label={item} variant="outlined" className={styles.eqChip} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ScrollReveal delay={160}>
              <Card className={styles.glassCard}>
                <CardContent className={styles.cardInner}>
                  <Typography className={styles.cardLabel}>Philosophy</Typography>
                  <Typography variant="h6" className={styles.cardTitle}>
                    创作理念
                  </Typography>
                  <Typography className={styles.quote}>
                    "雨涧听溪，山野春行——最好的照片，往往诞生在脚步慢下来的地方。"
                  </Typography>
                  <Divider className={styles.divider} />
                  <Typography className={styles.bodyText}>
                    我相信摄影的本质是一种在场：在山间、在雨中、在季节更替的缝隙里，
                    安静地感受，然后按下快门。不追求完美的构图，只忠于那一刻真实的触动。
                    希望这些画面，也能让你听见风声、闻到大自然的气息。
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
