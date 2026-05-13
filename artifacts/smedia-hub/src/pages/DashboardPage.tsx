import Sidebar from '@/components/Sidebar/Sidebar';
import { BentoGrid, BentoItem } from '@/components/Dashboard/BentoGrid';
import StatCard from '@/components/Dashboard/StatCard';
import ChartPlaceholder from '@/components/Dashboard/ChartPlaceholder';
import styles from '@/app/dashboard/page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <Sidebar />
      
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={`${styles.title} animate-fade-in`}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, Hassan. Here's what's happening today.</p>
        </header>

        <BentoGrid>
          <BentoItem>
            <StatCard 
              title="Total Followers" 
              value="128.4K" 
              trend="12%" 
              icon="👥" 
            />
          </BentoItem>
          <BentoItem>
            <StatCard 
              title="Avg. Engagement" 
              value="4.2%" 
              trend="0.8%" 
              icon="🔥" 
            />
          </BentoItem>
          <BentoItem>
            <StatCard 
              title="Reach" 
              value="1.2M" 
              trend="5.4%" 
              isUp={false} 
              icon="🌍" 
            />
          </BentoItem>
          <BentoItem>
            <StatCard 
              title="Post Shares" 
              value="8.5K" 
              trend="22%" 
              icon="🔄" 
            />
          </BentoItem>

          <BentoItem colSpan={3} rowSpan={2}>
            <div className={`glass ${styles.listCard}`}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Performance Overview</h2>
                <span className={styles.viewAll}>Last 30 Days</span>
              </div>
              <ChartPlaceholder height={340} />
            </div>
          </BentoItem>

          <BentoItem colSpan={1} rowSpan={2}>
            <div className={`glass ${styles.listCard}`}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Connections</h2>
              </div>
              <div className={styles.nav}>
                {[
                  { name: 'Instagram', status: 'Connected', icon: '📸' },
                  { name: 'TikTok', status: 'Connected', icon: '🎵' },
                  { name: 'LinkedIn', status: 'Action Required', icon: '💼', warning: true },
                  { name: 'X (Twitter)', status: 'Connected', icon: '🐦' },
                ].map((p) => (
                  <div key={p.name} className={styles.listItem}>
                    <div className={styles.itemIcon}>{p.icon}</div>
                    <div className={styles.itemContent}>
                      <div className={styles.itemName}>{p.name}</div>
                      <div className={styles.itemMeta}>Active Session</div>
                    </div>
                    <span className={`${styles.status} ${p.warning ? styles.statusPending : styles.statusSuccess}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BentoItem>

          <BentoItem colSpan={4}>
            <div className={`glass ${styles.listCard}`}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Upcoming Content Calendar</h2>
                <span className={styles.viewAll}>View Full Calendar</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                {[
                  { date: 'May 06', time: '10:00 AM', title: 'Product Launch Reveal', platform: 'Instagram' },
                  { date: 'May 06', time: '02:30 PM', title: 'Behind the Scenes', platform: 'TikTok' },
                  { date: 'May 07', time: '09:00 AM', title: 'Weekly Tech Insights', platform: 'LinkedIn' },
                  { date: 'May 08', time: '04:00 PM', title: 'Community Q&A', platform: 'X (Twitter)' },
                ].map((post, i) => (
                  <div key={i} className="glass-hover" style={{ 
                    minWidth: '250px', 
                    padding: '16px', 
                    background: 'var(--bg-card)', 
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-glass)'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '8px' }}>
                      {post.date} • {post.time}
                    </div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{post.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.platform}</div>
                  </div>
                ))}
              </div>
            </div>
          </BentoItem>
        </BentoGrid>
      </main>
    </div>
  );
}
