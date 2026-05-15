import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/servicesData';
import BrandBadge from '@/components/UI/BrandBadge';
import styles from './Navbar.module.css';

const ChevronIcon = ({ rotated }: { rotated?: boolean }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ transform: rotated ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className={styles.hamburgerInner}>
    <span className={`${styles.bar} ${open ? styles.bar1Open : ''}`} />
    <span className={`${styles.bar} ${open ? styles.bar2Open : ''}`} />
    <span className={`${styles.bar} ${open ? styles.bar3Open : ''}`} />
  </div>
);

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function openDrop() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropOpen(true);
  }

  function schedulClose() {
    closeTimer.current = setTimeout(() => {
      setDropOpen(false);
    }, 150);
  }

  function closeMenu() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        <div className={`glass ${styles.navInner}`}>
          <div className={styles.logoGroup}>
            <a href="/" className={styles.logo}>
              <img src="/logo.png" alt="S.media Hub Logo" className={styles.logoImg} />
            </a>

            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={styles.stickyBadge}
                >
                  <BrandBadge className={styles.navBadge} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop links */}
          <div className={styles.links}>
            <a href="/" className={styles.link}>Home</a>

            <div
              className={styles.navItem}
              onMouseEnter={openDrop}
              onMouseLeave={schedulClose}
            >
              <button className={`${styles.link} ${styles.dropTrigger} ${dropOpen ? styles.dropTriggerOpen : ''}`}>
                Services <ChevronIcon rotated={dropOpen} />
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
                          <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
            <a href="/contact" className={`btn btn-primary ${styles.ctaDesktop}`}>Let's Create</a>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay backdrop */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile slide-down drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerLinks}>
          <a href="/" className={styles.drawerLink} onClick={closeMenu}>
            Home
          </a>

          <button
            className={`${styles.drawerLink} ${styles.drawerServicesToggle}`}
            onClick={() => setServicesOpen(o => !o)}
          >
            Services <ChevronIcon rotated={servicesOpen} />
          </button>

          {servicesOpen && (
            <div className={styles.drawerServices}>
              {services.map(s => (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={styles.drawerServiceItem}
                  onClick={closeMenu}
                >
                  <span className={styles.dropIcon} style={{ background: s.bgColor }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          )}

          <a href="/about" className={styles.drawerLink} onClick={closeMenu}>
            About
          </a>
          <a href="/contact" className={styles.drawerLink} onClick={closeMenu}>
            Contact
          </a>

          <a href="/contact" className={`btn btn-primary ${styles.drawerCta}`} onClick={closeMenu}>
            Let's Create
          </a>
        </div>
      </div>
    </>
  );
}
