import Navbar from '@/components/Landing/Navbar';
import styles from './About.module.css';

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: 'var(--accent-primary)',
    title: 'Strategy First',
    description: 'Every project starts with a deep understanding of your goals, audience, and market — so every creative decision drives real growth.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    color: 'var(--accent-tertiary)',
    title: 'Creative Production',
    description: 'From cinematic videography to editorial photography, our in-house production team delivers visuals that stop the scroll and tell your story.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: 'var(--accent-secondary)',
    title: 'Community & Growth',
    description: 'We build engaged communities, not just follower counts — through authentic storytelling, data-driven posting, and real-time analytics.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: 'var(--accent-quaternary)',
    title: 'Quality Without Compromise',
    description: 'Whether it\'s a social reel or a full brand identity system, we hold every deliverable to a high standard — because your brand deserves it.',
  },
];

const pillars = [
  { label: 'Brand Identity', desc: 'Logo, visual language, tone of voice' },
  { label: 'Social Media Management', desc: 'Strategy, scheduling, analytics' },
  { label: 'Photography', desc: 'Product, lifestyle, editorial' },
  { label: 'Videography', desc: 'Reels, campaigns, brand films' },
  { label: 'Content Creation', desc: 'Copy, graphics, short-form video' },
  { label: 'Consulting', desc: 'Growth strategy and market positioning' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Who We Are</span>
          <h1 className={styles.heroTitle}>
            More Than a <br />
            <span className="text-grad">Marketing Agency</span>
          </h1>
          <p className={styles.heroBody}>
            At S.media Hub, we combine creativity, strategy, and production under one roof.
            From building brand identities and managing digital presence to producing
            high-quality photography and videography, we provide businesses and creators
            with the tools, visuals, and space they need to grow professionally.
          </p>
          <div className={styles.heroActions}>
            <a href="#contact" className="btn btn-primary">Work With Us</a>
            <a href="#what-we-do" className="btn btn-outline">What We Do</a>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section id="what-we-do" className={`section ${styles.pillarsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Everything Under <span className="text-grad">One Roof</span></h2>
            <p>We handle every layer of your brand's presence — so you can focus on what you do best.</p>
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((p, i) => (
              <div key={i} className={`glass ${styles.pillarCard}`}>
                <span className={styles.pillarNum}>0{i + 1}</span>
                <h3 className={styles.pillarTitle}>{p.label}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How We <span className="text-grad">Think & Work</span></h2>
            <p>The principles that shape every project we take on.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={`glass-hover ${styles.valueCard}`}>
                <div className={styles.valueIcon} style={{ color: v.color }}>
                  {v.icon}
                </div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={`glass ${styles.ctaBox}`}>
            <h2>Ready to Grow <span className="text-grad">Professionally?</span></h2>
            <p>Tell us about your brand and let's build something that lasts.</p>
            <a href="mailto:hello@smediahub.com" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '80px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <img src="/logo.png" alt="S.media Hub Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>© 2026 S.media Hub. All rights reserved.</p>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="/support" className="link-hover">Support</a>
              <a href="#" className="link-hover">Privacy</a>
              <a href="#" className="link-hover">Terms</a>
              <a href="/" className="link-hover">Home</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
