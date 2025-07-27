import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  PhotoCamera,
  LocationOn,
  Email,
  GitHub,
  Instagram,
  Camera,
  Palette,
  Code,
} from '@mui/icons-material';
import styles from './index.module.less';

const About: React.FC = () => {
  const skills = [
    { name: '摄影技巧', icon: <PhotoCamera />, level: 90 },
    { name: '后期处理', icon: <Palette />, level: 85 },
    { name: '创意构图', icon: <Camera />, level: 88 },
    { name: '网站开发', icon: <Code />, level: 80 },
  ];

  const equipment = [
    'Canon EOS R5',
    'Sony A7R IV',
    'Canon RF 24-70mm f/2.8L',
    'Sony FE 85mm f/1.4 GM',
    'DJI Mavic 3',
    'Adobe Lightroom',
    'Adobe Photoshop',
  ];

  return (
    <Box className="about-page">
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box className="about-hero">
          <Avatar src="/api/placeholder/200/200" alt="ST2EAM" className="profile-avatar" />
          <Typography variant="h3" component="h1" className="profile-name">
            ST2EAM
          </Typography>
          <Typography variant="h6" className="profile-title">
            摄影师 · 视觉艺术家 · 前端开发者
          </Typography>

          {/* Contact Links */}
          <Box className="contact-links">
            <Box className="contact-item">
              <LocationOn />
              <span>中国 · 上海</span>
            </Box>
            <Box className="contact-item">
              <Email />
              <span>contact@st2eam.com</span>
            </Box>
          </Box>

          {/* Social Links */}
          <Box className="social-links">
            <GitHub className="social-icon" />
            <Instagram className="social-icon" />
            <PhotoCamera className="social-icon" />
          </Box>
        </Box>

        {/* About Content */}
        <Grid container spacing={4} className="about-content">
          {/* Bio Section */}
          <Grid item xs={12} md={8}>
            <Card className="bio-card">
              <CardContent>
                <Typography variant="h5" className="section-title">
                  关于我
                </Typography>
                <Typography variant="body1" className="bio-text">
                  你好！我是 ST2EAM，一位热爱摄影和视觉艺术的创作者。我专注于捕捉生活中的美好瞬间，
                  通过镜头记录世界的多样性和美丽。
                </Typography>
                <Typography variant="body1" className="bio-text">
                  在摄影的道路上，我不断探索不同的拍摄风格和技巧，从街头摄影到风景摄影，
                  从人像写真到建筑艺术，每一次按下快门都是对美的追求和表达。
                </Typography>
                <Typography variant="body1" className="bio-text">
                  除了摄影创作，我也是一名前端开发者，喜欢用代码构建美丽的界面和用户体验。
                  这个网站就是我技术与艺术结合的作品，希望能够更好地展示我的摄影作品和创作理念。
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={4}>
            <Card className="skills-card">
              <CardContent>
                <Typography variant="h6" className="section-title">
                  技能专长
                </Typography>
                <List className="skills-list">
                  {skills.map((skill, index) => (
                    <ListItem key={index} className="skill-item">
                      <ListItemIcon className="skill-icon">{skill.icon}</ListItemIcon>
                      <ListItemText
                        primary={skill.name}
                        secondary={
                          <Box className="skill-progress">
                            <Box className="progress-bar" style={{ width: `${skill.level}%` }} />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Equipment Section */}
          <Grid item xs={12}>
            <Card className="equipment-card">
              <CardContent>
                <Typography variant="h5" className="section-title">
                  器材与工具
                </Typography>
                <Box className="equipment-list">
                  {equipment.map((item, index) => (
                    <Chip key={index} label={item} variant="outlined" className="equipment-chip" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Philosophy Section */}
          <Grid item xs={12}>
            <Card className="philosophy-card">
              <CardContent>
                <Typography variant="h5" className="section-title">
                  创作理念
                </Typography>
                <Typography variant="body1" className="philosophy-text">
                  "摄影不仅仅是记录现实，更是表达内心的艺术。每一张照片都承载着拍摄者的情感和观点，
                  通过光影、构图和色彩的结合，将瞬间的美好永恒化。"
                </Typography>
                <Divider className="divider" />
                <Typography variant="body1" className="philosophy-text">
                  我相信真正的摄影作品应该能够触动人心，让观者产生共鸣。
                  无论是记录生活的平凡瞬间，还是捕捉自然的壮丽景象，
                  我都希望通过我的镜头为世界带来更多的美好和思考。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
