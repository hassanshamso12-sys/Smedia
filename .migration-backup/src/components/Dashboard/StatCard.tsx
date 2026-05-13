import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  isUp?: boolean;
  icon: string;
}

const StatCard = ({ title, value, trend, isUp = true, icon }: StatCardProps) => {
  return (
    <div className={`glass glass-hover ${styles.card}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div>
        <div className={styles.value}>{value}</div>
        <div className={`${styles.footer} ${isUp ? styles.trendUp : styles.trendDown}`}>
          {isUp ? '↗' : '↘'} {trend}
          <span style={{ color: 'var(--text-muted)' }}> vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
