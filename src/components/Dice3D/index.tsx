import React from 'react';
import styles from './index.module.less';

const PIP_LAYOUTS: Record<number, string[]> = {
  1: ['c'],
  2: ['tl', 'br'],
  3: ['tl', 'c', 'br'],
  4: ['tl', 'tr', 'bl', 'br'],
  5: ['tl', 'tr', 'c', 'bl', 'br'],
  6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'],
};

const FACES: { value: number; face: string }[] = [
  { value: 1, face: 'front' },
  { value: 6, face: 'back' },
  { value: 2, face: 'right' },
  { value: 5, face: 'left' },
  { value: 3, face: 'top' },
  { value: 4, face: 'bottom' },
];

interface Dice3DProps {
  rolling?: boolean;
}

const Dice3D: React.FC<Dice3DProps> = ({ rolling = false }) => (
  <span className={styles.scene} aria-hidden>
    <span className={`${styles.cube} ${rolling ? styles.rolling : ''}`}>
      {FACES.map(({ value, face }) => (
        <span key={face} className={`${styles.face} ${styles[face]}`}>
          {PIP_LAYOUTS[value].map(pos => (
            <span key={pos} className={`${styles.pip} ${styles[pos]}`} />
          ))}
        </span>
      ))}
    </span>
  </span>
);

export default Dice3D;
