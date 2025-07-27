import React from 'react';
import styles from './index.module.less';

const Notes: React.FC = () => {
  return (
    <iframe className={styles.notesPage} title="notes" src="https://st2eam.github.io/notes/#/" />
  );
};

export default Notes;
