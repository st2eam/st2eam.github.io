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
import { PhotoCamera, Email, GitHub, Camera, Palette, Code, CameraAlt } from '@mui/icons-material';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './index.module.less';

const skills = [
  { name: '摄影技巧', icon: <PhotoCamera />, level: 90 },
  { name: '后期处理', icon: <Palette />, level: 85 },
  { name: '创意构图', icon: <Camera />, level: 88 },
  { name: '网站开发', icon: <Code />, level: 80 },
];

const equipment = [
  'Sony A7C2',
  'Tamron 28-200mm f/2.8-5.6',
  'Sony FE 55mm f/1.8',
  'Adobe Lightroom',
  'Adobe Photoshop',
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
              <Typography className={styles.tagline}>摄影师 · 视觉艺术家 · 前端开发者</Typography>
              <Box className={styles.socialRow}>
                <IconButton
                  href="https://github.com/st2eam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  <GitHub />
                </IconButton>
                <IconButton href="mailto:379403404@qq.com" className={styles.socialBtn}>
                  <Email />
                </IconButton>
              </Box>
            </Box>
          </ScrollReveal>
        </Container>
      </Box>

      {/* ── Content ── */}
      <Container maxWidth="lg" className={styles.content}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <ScrollReveal>
              <Card className={styles.glassCard}>
                <CardContent className={styles.cardInner}>
                  <Typography className={styles.cardLabel}>About</Typography>
                  <Typography variant="h5" className={styles.cardTitle}>
                    关于我
                  </Typography>
                  <Typography className={styles.bodyText}>
                    你好！我是
                    ST2EAM，一位热爱摄影和视觉艺术的创作者。我专注于捕捉生活中的美好瞬间，
                    通过镜头记录世界的多样性和美丽。
                  </Typography>
                  <Typography className={styles.bodyText}>
                    在摄影的道路上，我不断探索不同的拍摄风格和技巧，从街头摄影到风景摄影，
                    从人像写真到建筑艺术，每一次按下快门都是对美的追求和表达。
                  </Typography>
                  <Typography className={styles.bodyText}>
                    除了摄影创作，我也是一名前端开发者，喜欢用代码构建美丽的界面和用户体验。
                    这个网站就是我技术与艺术结合的作品。
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          </Grid>

          <Grid item xs={12} md={5}>
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
                          primaryTypographyProps={{ className: styles.skillName }}
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
            <ScrollReveal delay={160}>
              <Card className={styles.glassCard}>
                <CardContent className={styles.cardInner}>
                  <Typography className={styles.cardLabel}>Philosophy</Typography>
                  <Typography variant="h6" className={styles.cardTitle}>
                    创作理念
                  </Typography>
                  <Typography className={styles.quote}>
                    "摄影不仅仅是记录现实，更是表达内心的艺术。每一张照片都承载着拍摄者的情感和观点，
                    通过光影、构图和色彩的结合，将瞬间的美好永恒化。"
                  </Typography>
                  <Divider className={styles.divider} />
                  <Typography className={styles.bodyText}>
                    我相信真正的摄影作品应该能够触动人心，让观者产生共鸣。
                    无论是记录生活的平凡瞬间，还是捕捉自然的壮丽景象，
                    我都希望通过我的镜头为世界带来更多的美好和思考。
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
