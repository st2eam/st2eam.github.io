import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.less';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [displayedPath, setDisplayedPath] = useState(pathname);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const timerRef = useRef<number | null>(null);
  const childrenRef = useRef(children);
  childrenRef.current = children;

  if (pathname === displayedPath && children !== displayedChildren) {
    setDisplayedChildren(children);
  }

  useEffect(() => {
    if (pathname === displayedPath) return;

    setPhase('out');
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setDisplayedChildren(childrenRef.current);
      setDisplayedPath(pathname);
      setPhase('in');
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 220);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [pathname, displayedPath]);

  return (
    <div className={`${styles.transition} ${phase === 'in' ? styles.in : styles.out}`}>
      {displayedChildren}
    </div>
  );
};

export default PageTransition;
