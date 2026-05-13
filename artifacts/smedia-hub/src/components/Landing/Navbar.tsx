import { useState, useRef } from 'react';
import { services } from '@/lib/servicesData';
import styles from './Navbar.module.css';

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ display: 'inline-block', marginLeft: 4, transition: 'transform 0.25s' }}>
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDrop() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropOpen(true);
  }

  function schedulClose() {
    closeTimer.current = setTimeout(() => setDropOpen(false), 120);
  }

  return (
    <nav className={styles.navbar}>
      <div className={`glass ${styles.navInner}`}>
        <a href="/" className={styles.logo}>
          <img src="/logo.png" alt="S.media Hub Logo" className={styles.logoImg} />
        </a>

        <div className={styles.links}>
          <a href="#portfolio" className={styles.link}>Portfolio</a>

          {/* Services dropdown */}
          <div
            className={styles.navItem}
            onMouseEnter={openDrop}
            onMouseLeave={schedulClose}
          >
            <button className={`${styles.link} ${styles.dropTrigger} ${dropOpen ? styles.dropTriggerOpen : ''}`}>
              Services <ChevronIcon />
            </button>

            {dropOpen && (
              <div
                className={styles.dropdown}
                onMouseEnter={openDrop}
                onMouseLeave={schedulClose}
              >
                <div className={styles.dropInner}>
                  {services.map(s => (
                    <a
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={styles.dropItem}
                      onClick={() => setDropOpen(false)}
                    >
                      <span className={styles.dropIcon} style={{ background: s.bgColor }}>{s.icon}</span>
                      <span className={styles.dropText}>
                        <span className={styles.dropLabel}>{s.label}</span>
                        <span className={styles.dropTagline}>{s.tagline}</span>
                      </span>
                      <svg className={styles.dropArrow} width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="/about" className={styles.link}>About</a>
          <a href="/contact" className={styles.link}>Contact</a>
        </div>

        <div className={styles.actions}>
          <a href="/contact" className="btn btn-primary">Let's Create</a>
        </div>
      </div>
    </nav>
  );
}
