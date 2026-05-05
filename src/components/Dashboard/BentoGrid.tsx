import React from 'react';
import styles from './BentoGrid.module.css';

interface BentoGridProps {
  children: React.ReactNode;
}

export const BentoGrid = ({ children }: BentoGridProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
}

export const BentoItem = ({ children, colSpan = 1, rowSpan = 1 }: BentoItemProps) => {
  const spanClass = `${styles[`col${colSpan}`] || ''} ${styles[`row${rowSpan}`] || ''}`;
  
  return (
    <div className={`${styles.item} ${spanClass}`}>
      {children}
    </div>
  );
};
