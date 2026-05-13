import { useContent } from '@/lib/hooks/useContent';
import styles from './Trust.module.css';

export default function Trust() {
  const { content } = useContent();
  const s = content?.stats;
  const projects  = (s?.projects  && String(s.projects).trim())  || '120+';
  const retention = (s?.retention && String(s.retention).trim()) || '95%';
  const reach     = (s?.reach     && String(s.reach).trim())     || '10M+';
  const support   = (s?.support   && String(s.support).trim())   || '24/7';

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-primary)' }}>{projects}</h3>
            <p className={styles.label}>Projects Completed</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-secondary)' }}>{retention}</h3>
            <p className={styles.label}>Client Retention</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-tertiary)' }}>{reach}</h3>
            <p className={styles.label}>Reach Generated</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.number} style={{ color: 'var(--accent-quaternary)' }}>{support}</h3>
            <p className={styles.label}>Dedicated Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
