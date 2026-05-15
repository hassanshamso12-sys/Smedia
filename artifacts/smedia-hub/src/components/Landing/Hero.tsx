import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/lib/hooks/useContent';
import BrandBadge from '@/components/UI/BrandBadge';
import Typewriter from '@/components/UI/Typewriter';
import styles from './Hero.module.css';

const SvgCamera = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#cameraGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="cameraGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff4d4d" /><stop offset="100%" stopColor="#f9cb28" /></linearGradient></defs>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const SvgVideo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#videoGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="videoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c4dff" /><stop offset="100%" stopColor="#00e5ff" /></linearGradient></defs>
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const SvgChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#chartGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f9cb28" /><stop offset="100%" stopColor="#00e5ff" /></linearGradient></defs>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const SvgSparkle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#sparkleGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff4d4d" /><stop offset="100%" stopColor="#7c4dff" /></linearGradient></defs>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const SvgFacebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#fbGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="fbGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1877F2" /><stop offset="100%" stopColor="#00E5FF" /></linearGradient></defs>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const SvgInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#instaGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="instaGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f9cb28" /><stop offset="50%" stopColor="#ff4d4d" /><stop offset="100%" stopColor="#7c4dff" /></linearGradient></defs>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const SvgX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#xGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="xGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#101012" /><stop offset="100%" stopColor="#718096" /></linearGradient></defs>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const SvgTikTok = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#tiktokGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="tiktokGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00f2ea" /><stop offset="100%" stopColor="#ff0050" /></linearGradient></defs>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const title = content?.hero?.title || 'Elevate Your Digital Presence';
  // ...
  const subtitle = content?.hero?.subtitle || 'Creative social media marketing and multimedia production that builds trust and drives growth. Positive vibes, professional results.';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundGlow} />

      <div className={styles.iconContainer}>
        <FloatingIcon className={styles.animFloat1} style={{ top: '15%', left: '12%' }}><SvgCamera /></FloatingIcon>
        <FloatingIcon className={styles.animFloat2} style={{ top: '25%', right: '18%' }}><SvgVideo /></FloatingIcon>
        <FloatingIcon className={styles.animFloat3} style={{ bottom: '20%', left: '15%' }}><SvgChart /></FloatingIcon>
        <FloatingIcon className={styles.animFloat4} style={{ bottom: '30%', right: '12%' }}><SvgSparkle /></FloatingIcon>
        <FloatingIcon className={styles.animFloat2} style={{ top: '10%', right: '40%' }}><SvgInstagram /></FloatingIcon>
        <FloatingIcon className={styles.animFloat3} style={{ top: '45%', left: '5%' }}><SvgFacebook /></FloatingIcon>
        <FloatingIcon className={styles.animFloat1} style={{ bottom: '15%', right: '45%' }}><SvgTikTok /></FloatingIcon>
        <FloatingIcon className={styles.animFloat4} style={{ bottom: '50%', right: '5%' }}><SvgX /></FloatingIcon>
      </div>

      <motion.div
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.innerContent}>
          <motion.div variants={itemVariants}>
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                >
                  <BrandBadge className={styles.heroBadge} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Elevate Your <br />
            <span className="text-grad">
              <Typewriter
                words={['Digital Presence', 'Brand Story', 'Social Growth', 'Creative Vision']}
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2500}
              />
            </span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <a href="/contact" className="btn btn-primary">Let's Create Together</a>
            <a href="#portfolio" className="btn btn-outline">Explore Portfolio</a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
