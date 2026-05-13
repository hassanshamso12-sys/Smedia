'use client';
import { useContent } from '@/lib/hooks/useContent';
import styles from './Trust.module.css';

export default function Trust() {
  const { content } = useContent();
  const stats = content?.stats || { projects: '120+', retention: '95%', reach: '10M+', support: '24/7' };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-primary)' }}>{stats.projects}</h3>
            <p className={styles.label}>Projects Completed</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-secondary)' }}>{stats.retention}</h3>
            <p className={styles.label}>Client Retention</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-tertiary)' }}>{stats.reach}</h3>
            <p className={styles.label}>Reach Generated</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-quaternary)' }}>{stats.support}</h3>
            <p className={styles.label}>Dedicated Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
