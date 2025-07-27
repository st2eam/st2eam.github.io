/// <reference types="react-scripts" />

declare module '*.less' {
  const content: Record<string, string>;
  export default content;
}

declare module 'react-masonry-css' {
  import { ReactNode } from 'react';

  interface MasonryProps {
    breakpointCols?: number | { [key: string]: number };
    className?: string;
    columnClassName?: string;
    children?: ReactNode;
  }

  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}
