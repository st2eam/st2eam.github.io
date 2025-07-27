import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Avatar,
} from '@mui/material';
import { CalendarToday, AccessTime } from '@mui/icons-material';
import './Notes.less';

// 模拟笔记数据
const mockNotes = [
  {
    id: '1',
    title: '摄影构图的基本原则',
    excerpt: '在摄影中，构图是决定照片成败的关键因素之一。本文将介绍几种经典的构图方法...',
    content: '三分法则、对称构图、引导线等构图技巧的详细解析',
    date: '2024-01-15',
    readTime: '5 分钟',
    tags: ['摄影技巧', '构图'],
    category: '摄影教程',
  },
  {
    id: '2',
    title: '光线在摄影中的重要性',
    excerpt: '光线是摄影的灵魂，掌握不同光线条件下的拍摄技巧，能让你的作品更加出色...',
    content: '自然光、人工光源的运用技巧和拍摄要点',
    date: '2024-01-10',
    readTime: '8 分钟',
    tags: ['光线', '摄影技巧'],
    category: '摄影教程',
  },
  {
    id: '3',
    title: '后期处理工作流程',
    excerpt: '一个高效的后期处理流程可以大大提升工作效率，本文分享我的后期工作流程...',
    content: 'Lightroom和Photoshop的配合使用技巧',
    date: '2024-01-05',
    readTime: '12 分钟',
    tags: ['后期处理', 'Lightroom', 'Photoshop'],
    category: '后期技术',
  },
  {
    id: '4',
    title: '街头摄影的拍摄心得',
    excerpt: '街头摄影需要敏锐的观察力和快速的反应能力，分享一些实战经验...',
    content: '如何在街头捕捉决定性瞬间，设备选择和拍摄技巧',
    date: '2023-12-28',
    readTime: '6 分钟',
    tags: ['街头摄影', '人文摄影'],
    category: '摄影分享',
  },
  {
    id: '5',
    title: '相机设备选购指南',
    excerpt: '针对不同预算和需求，推荐适合的相机设备组合...',
    content: '从入门到专业级别的设备推荐和选购建议',
    date: '2023-12-20',
    readTime: '10 分钟',
    tags: ['设备推荐', '相机'],
    category: '设备分享',
  },
];

const Notes: React.FC = () => {
  return (
    <Box className="notes-page">
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box className="page-header">
          <Typography variant="h3" component="h1" className="page-title">
            摄影笔记
          </Typography>
          <Typography variant="h6" className="page-subtitle">
            记录摄影路上的思考与成长
          </Typography>
        </Box>

        {/* Notes Grid */}
        <Grid container spacing={3} className="notes-grid">
          {mockNotes.map((note) => (
            <Grid item xs={12} md={6} lg={4} key={note.id}>
              <Card className="note-card">
                <CardContent>
                  {/* Note Category */}
                  <Chip 
                    label={note.category} 
                    size="small" 
                    className="note-category"
                    color="primary"
                    variant="outlined"
                  />
                  
                  {/* Note Title */}
                  <Typography variant="h6" component="h2" className="note-title">
                    {note.title}
                  </Typography>
                  
                  {/* Note Excerpt */}
                  <Typography variant="body2" className="note-excerpt">
                    {note.excerpt}
                  </Typography>
                  
                  {/* Note Meta */}
                  <Box className="note-meta">
                    <Box className="meta-item">
                      <CalendarToday fontSize="small" />
                      <span>{note.date}</span>
                    </Box>
                    <Box className="meta-item">
                      <AccessTime fontSize="small" />
                      <span>{note.readTime}</span>
                    </Box>
                  </Box>
                  
                  {/* Note Tags */}
                  <Box className="note-tags">
                    {note.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        variant="outlined"
                        className="tag-chip"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Coming Soon Section */}
        <Box className="coming-soon">
          <Typography variant="h5" className="coming-soon-title">
            更多内容即将到来...
          </Typography>
          <Typography variant="body1" className="coming-soon-text">
            我会持续分享摄影技巧、后期处理心得和设备使用经验
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Notes;
