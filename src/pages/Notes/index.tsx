import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
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
    </Box>
  );
};

export default Notes;
