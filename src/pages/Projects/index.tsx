import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { GitHub, Launch, Code } from '@mui/icons-material';
import styles from './index.module.less';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'ST2EAM 个人站点',
    description:
      '基于 React + TypeScript + MUI 构建的个人网站，包含项目展示、技术笔记和个人介绍，部署于 GitHub Pages。',
    tags: ['React', 'TypeScript', 'Material UI', 'Less'],
    github: 'https://github.com/st2eam/st2eam.github.io',
    demo: 'https://st2eam.github.io',
    featured: true,
  },
  {
    id: '2',
    title: '技术笔记',
    description: '个人技术学习笔记文档站，涵盖前端开发、算法、工具使用等多个技术领域的知识整理。',
    tags: ['Docsify', 'Markdown', 'GitHub Pages'],
    github: 'https://github.com/st2eam/notes',
    demo: 'https://st2eam.github.io/notes/',
    featured: true,
  },
  {
    id: '3',
    title: '更多项目',
    description: '访问我的 GitHub 主页查看更多开源项目和代码仓库，持续更新中。',
    tags: ['Open Source'],
    github: 'https://github.com/st2eam',
  },
];

const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter(p => p.tags.includes(selectedTag))
    : projects;

  return (
    <Box className={styles.projectsPage}>
      <Box className={styles.pageHeader}>
        <Container maxWidth="lg">
          <Box className={styles.headerContent}>
            <Code className={styles.headerIcon} />
            <Typography variant="h3" component="h1" className={styles.pageTitle}>
              项目展示
            </Typography>
            <Typography variant="body1" className={styles.pageDesc}>
              个人开源项目和实践作品集合
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className={styles.content}>
        <Box className={styles.tagFilter}>
          <Chip
            label="全部"
            onClick={() => setSelectedTag(null)}
            color={selectedTag === null ? 'secondary' : 'default'}
            variant={selectedTag === null ? 'filled' : 'outlined'}
            className={styles.filterChip}
          />
          {allTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              color={tag === selectedTag ? 'secondary' : 'default'}
              variant={tag === selectedTag ? 'filled' : 'outlined'}
              className={styles.filterChip}
            />
          ))}
        </Box>

        <Box className={styles.projectGrid}>
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <Card className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}>
    <CardContent className={styles.cardContent}>
      <Box className={styles.cardHeader}>
        <Typography variant="h6" className={styles.projectTitle}>
          {project.title}
        </Typography>
        <Box className={styles.cardActions}>
          {project.github && (
            <IconButton
              size="small"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
            >
              <GitHub fontSize="small" />
            </IconButton>
          )}
          {project.demo && (
            <IconButton
              size="small"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
            >
              <Launch fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>

      <Typography variant="body2" className={styles.projectDesc}>
        {project.description}
      </Typography>

      <Box className={styles.projectTags}>
        {project.tags.map(tag => (
          <Chip key={tag} label={tag} size="small" variant="outlined" className={styles.tagChip} />
        ))}
      </Box>

      {project.demo && (
        <Button
          size="small"
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<Launch fontSize="small" />}
          className={styles.demoBtn}
        >
          在线预览
        </Button>
      )}
    </CardContent>
  </Card>
);

export default Projects;
