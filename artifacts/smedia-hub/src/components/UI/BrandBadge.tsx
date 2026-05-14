import React from 'react';
import styles from './BrandBadge.module.css';

interface BrandBadgeProps {
  className?: string;
}

/**
 * Standardized Brand Badge for S.media Hub.
 * Designed to be clear, premium, and isolated without a "bubble" look.
 */
const BrandBadge: React.FC<BrandBadgeProps> = ({ className }) => {
  return (
    <div className={`${styles.badge} ${className || ''}`}>
      <span className={styles.text}>S.media Hub</span>
    </div>
  );
};

export default BrandBadge;
