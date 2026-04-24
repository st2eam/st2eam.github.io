import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.less';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [displayed, setDisplayed] = useState({ pathname, children });
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (pathname === displayed.pathname) {
      setDisplayed({ pathname, children });
      return;
    }
    setPhase('out');
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setDisplayed({ pathname, children });
      setPhase('in');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 220);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [pathname, children, displayed.pathname]);

  return (
    <div className={`${styles.transition} ${phase === 'in' ? styles.in : styles.out}`}>
      {displayed.children}
    </div>
  );
};

export default PageTransition;
