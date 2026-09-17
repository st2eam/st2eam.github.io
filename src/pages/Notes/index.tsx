import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import styles from './index.module.less';

const notesUrl = 'https://st2eam.github.io/notes/Web/?embed=true';

const Notes: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Box component="section" className={styles.notesPage} aria-labelledby="notes-title">
      {!loaded && (
        <Box className={styles.loading} role="status">
          <Typography id="notes-title">正在打开技术笔记…</Typography>
        </Box>
      )}
      <iframe title="ST2EAM 技术笔记" src={notesUrl} onLoad={() => setLoaded(true)} />
      <Box className={`${styles.fallback} ${loaded ? styles.fallbackLoaded : ''}`}>
        <Typography>如果笔记无法嵌入，可直接访问：</Typography>
        <Button
          href={notesUrl.replace('?embed=true', '')}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNew />}
        >
          打开技术笔记
        </Button>
      </Box>
    </Box>
  );
};

export default Notes;
