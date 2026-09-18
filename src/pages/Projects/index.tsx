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
    title: 'ST2EAM 摄影作品集',
    description: '以摄影作品为核心的个人站点，收录旅行、自然与人文影像，也汇集其他个人项目与笔记。',
    tags: ['React', 'TypeScript', 'Material UI', 'Less'],
    github: 'https://github.com/st2eam/st2eam.github.io',
    demo: 'https://st2eam.github.io',
    featured: true,
  },
  {
    id: '2',
    title: "Steam's Notes",
    description: '个人技术学习笔记，记录前端开发、算法和工具使用等方面的知识整理与实践。',
    tags: ['Docsify', 'Markdown', 'GitHub Pages'],
    github: 'https://github.com/st2eam/notes',
    demo: 'https://st2eam.github.io/notes/',
    featured: true,
  },
  {
    id: '3',
    title: 'The Game Shelf',
    description: '一个整理桌游与游戏体验的个人项目，提供轻量、直观的浏览入口。',
    tags: ['Web', 'Games'],
    demo: 'https://st2eam.github.io/boardgames/',
  },
  {
    id: '4',
    title: 'AES 加解密工具',
    description: '面向日常使用的 AES 加密与解密工具，数据处理在浏览器中完成。',
    tags: ['Web Tool', 'Security'],
    demo: 'https://st2eam.github.io/crypto/',
  },
  {
    id: '5',
    title: 'Prompt Field',
    description: '用于整理和浏览提示词的个人工具，帮助沉淀可复用的 AI 工作流素材。',
    tags: ['AI', 'Web Tool'],
    demo: 'https://st2eam.github.io/prompts/',
  },
  {
    id: '6',
    title: 'AI Tarot',
    description: '结合 AI 的塔罗体验项目，以轻量的互动方式探索牌面与文字解读。',
    tags: ['AI', 'Interactive'],
    demo: 'https://st2eam.github.io/tarot/',
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
