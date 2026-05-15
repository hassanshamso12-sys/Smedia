import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { getServiceBySlug, services } from '@/lib/servicesData';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';
import BrandBadge from '@/components/UI/BrandBadge';
import Typewriter from '@/components/UI/Typewriter';
import styles from './ServicePage.module.css';

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [scrolled, setScrolled] = useState(false);
  const slug = params?.slug || '';
  const service = getServiceBySlug(slug);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!service) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', flexDirection: 'column', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Service Not Found</h1>
        <p style={{ color: 'var(--text-muted)' }}>The service you're looking for doesn't exist or has been moved.</p>
        <Link href="/" style={{ color: 'var(--accent-primary)', marginTop: '20px', textDecoration: 'none', fontWeight: 600 }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />
      
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ 
          background: `radial-gradient(circle at 80% 20%, ${service.bgColor}15 0%, transparent 60%)` 
        }} />
        <div className="container">
          <Link href="/" className={styles.backLink}>
            <ChevronLeft /> Back to Home
          </Link>

          <div className={styles.heroInner}>
            <motion.div 
              className={styles.heroIconWrap}
              style={{ background: service.bgColor }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className={styles.heroEmoji}>{service.icon}</span>
            </motion.div>
            
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                >
                  <BrandBadge className={styles.heroBadge} />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Typewriter 
                words={[service.label, 'Premium Results', 'Creative Strategy', 'Expert Production']}
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2500}
              />
            </motion.h1>
            <motion.p 
              className={styles.heroTagline}
              style={{ backgroundImage: service.gradient }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {service.tagline}
            </motion.p>
            <motion.p 
              className={styles.heroDesc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              {service.description}
            </motion.p>
            <motion.a 
              href="/contact" 
              className="btn btn-primary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Start Your Project
            </motion.a>
          </div>
        </div>
      </section>

      <section className={`section ${styles.offersSection}`}>
        <div className="container">
          <div className={styles.twoCol}>
            <div className={styles.offersLeft}>
              <h2 className={styles.sectionTitle}>What's Included</h2>
              <p className={styles.sectionSub}>Comprehensive solutions tailored to your brand's unique needs and goals.</p>
            </div>
            <ul className={styles.offersList}>
              {service.offers.map((f, i) => (
                <motion.li 
                  key={i}
                  className={styles.offerItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={service.accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`section ${styles.benefitsSection}`}>
        <div className="container">
          <div className={styles.benefitsGrid}>
            {[
              { t: 'Strategic Alignment', d: 'Every visual and message is crafted to meet your core business objectives.' },
              { t: 'High-End Quality', d: 'Using state-of-the-art equipment and software to deliver premium results.' },
              { t: 'Consistent Identity', d: 'Maintaining a unified brand voice across all platforms and content.' }
            ].map((b, i) => (
              <motion.div 
                key={i}
                className={`glass ${styles.benefitCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className={styles.benefitTitle}>{b.t}</h3>
                <p className={styles.benefitDesc}>{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── More Services ── */}
      <section className={`section ${styles.moreSection}`}>
        <div className="container">
          <h2 className={styles.moreTitle}>Explore Other Services</h2>
          <div className={styles.moreGrid}>
            {services.filter(s => s.slug !== params.slug).map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className={`glass-hover ${styles.moreCard}`}>
                <span className={styles.moreIcon} style={{ background: s.bgColor }}>{s.icon}</span>
                <span className={styles.moreLabel}>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
