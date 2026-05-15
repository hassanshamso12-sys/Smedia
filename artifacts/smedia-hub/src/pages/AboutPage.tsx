import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';
import BrandBadge from '@/components/UI/BrandBadge';
import Typewriter from '@/components/UI/Typewriter';
import styles from './About.module.css';

const pillars = [
  {
    id: 'strategy',
    icon: '🎯',
    title: 'Strategy & Identity',
    desc: 'Building consistent, professional brand languages.',
    color: '#7c4dff',
  },
  {
    id: 'management',
    icon: '⚡',
    title: 'Digital Presence',
    desc: 'Unified social media management and growth.',
    color: '#00e5ff',
  },
  {
    id: 'production',
    icon: '📸',
    title: 'Visual Production',
    desc: 'High-end photography and videography studio.',
    color: '#ff4d4d',
  }
];

const team = [
  {
    id: 'hassan-shamseddine',
    name: 'Hassan Shamseddine',
    post: 'Founder & Creative Director',
    bio: 'Visionary behind S.media Hub strategy.',
    bio2: 'Expert in brand growth and visual identity.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rami-fakhoury',
    name: 'Rami Fakhoury',
    post: 'Content Producer',
    bio: 'Creates social-first content and edits.',
    bio2: 'Focuses on visuals that connect and convert.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div 
          className={`container ${styles.heroContent}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BrandBadge className={styles.heroBadge} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            More Than a <br />
            <span className="text-grad">
              <Typewriter 
                words={['Marketing Agency', 'Creative Studio', 'Strategic Partner', 'Production House']}
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2500}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className={styles.heroBody}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            At S.media Hub, we combine creativity, strategy, and production under one roof.
            From building brand identities and managing digital presence to producing
            high-quality photography and videography, we provide businesses and creators
            with the tools, visuals, and space they need to grow professionally.
          </motion.p>
          
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <a href="/contact" className="btn btn-primary">Work With Us</a>
            <a href="#what-we-do" className="btn btn-outline">What We Do</a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Pillars ── */}
      <section id="what-we-do" className={`section ${styles.pillarsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Core Pillars
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We provide a holistic approach to brand growth through three specialized domains.
            </motion.p>
          </div>

          <div className={styles.servicesGrid}>
            {pillars.map((p, i) => (
              <motion.div 
                key={p.id}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.serviceIconWrap} style={{ background: `${p.color}08` }}>
                  <span style={{ fontSize: '3rem' }}>{p.icon}</span>
                </div>
                <div className={styles.serviceInfo}>
                  <h3 className={styles.serviceTitle} style={{ color: p.color }}>{p.title}</h3>
                  <p className={styles.serviceDesc}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Meet The Visionaries
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The creative minds driving the success of S.media Hub and our clients.
            </motion.p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((t, i) => (
              <motion.div 
                key={t.id}
                className={styles.teamCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.teamPhotoCluster}>
                  <img src={t.photo} alt={t.name} className={styles.teamPhoto} />
                </div>
                <div className={styles.teamInfo}>
                  <h3>{t.name}</h3>
                  <p className={styles.teamPost}>{t.post}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={`glass ${styles.ctaBox}`}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to scale your brand?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's talk about your next project and how we can help you grow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a href="/contact" className="btn btn-primary">Get Started Today</a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
