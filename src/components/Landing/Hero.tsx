'use client';
import styles from './Hero.module.css';

const SvgCamera = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#cameraGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="cameraGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff4d4d"/><stop offset="100%" stopColor="#f9cb28"/></linearGradient></defs>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

const SvgVideo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#videoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="videoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c4dff"/><stop offset="100%" stopColor="#00e5ff"/></linearGradient></defs>
    <path d="M23 7l-7 5 7 5V7z"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const SvgChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#chartGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f9cb28"/><stop offset="100%" stopColor="#00e5ff"/></linearGradient></defs>
    <path d="M3 3v18h18"/>
    <path d="m19 9-5 5-4-4-3 3"/>
  </svg>
);

const SvgSparkle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#sparkleGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff4d4d"/><stop offset="100%" stopColor="#7c4dff"/></linearGradient></defs>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const FloatingIcon = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <div className={`${styles.floatingIcon} ${className}`} style={style}>
    <div className={`glass ${styles.iconGlass}`}>
      {children}
    </div>
  </div>
);

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundGlow} />
      
      {/* Animated Icons Ecosystem - More dynamic */}
      <div className={styles.iconContainer}>
        <FloatingIcon className={styles.animFloat1} style={{ top: '20%', left: '15%' }}>
          <SvgCamera />
        </FloatingIcon>
        <FloatingIcon className={styles.animFloat2} style={{ top: '30%', right: '20%' }}>
          <SvgVideo />
        </FloatingIcon>
        <FloatingIcon className={styles.animFloat3} style={{ bottom: '25%', left: '20%' }}>
          <SvgChart />
        </FloatingIcon>
        <FloatingIcon className={styles.animFloat4} style={{ bottom: '35%', right: '15%' }}>
          <SvgSparkle />
        </FloatingIcon>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.innerContent}>
          <h1 className={styles.title}>
            Elevate Your <br />
            <span className="text-grad">Digital Presence</span>
          </h1>
          <p className={styles.subtitle}>
            Creative social media marketing and multimedia production <br />
            that builds trust and drives growth. Positive vibes, professional results.
          </p>
          
          <div className={styles.actions}>
            <button className="btn btn-primary">Let's Create Together</button>
            <button className="btn btn-outline">Explore Portfolio</button>
          </div>
        </div>
      </div>
    </section>
  );
}
