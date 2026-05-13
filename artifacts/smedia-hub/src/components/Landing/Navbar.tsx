import { useState, useRef } from 'react';
import { services } from '@/lib/servicesData';
import styles from './Navbar.module.css';

const ChevronIcon = ({ rotated }: { rotated?: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ display: 'inline-block', marginLeft: 4, transition: 'transform 0.25s', transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {open ? (
      <>
        <path d="M5 5l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    ) : (
      <>
        <path d="M3 6h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </>
    )}
  </svg>
);

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openDrop() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropOpen(true);
  }

  function schedulClose() {
    closeTimer.current = setTimeout(() => setDropOpen(false), 120);
  }

  function closeMenu() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`glass ${styles.navInner}`}>
          <a href="/" className={styles.logo}>
            <img src="/logo.png" alt="S.media Hub Logo" className={styles.logoImg} />
          </a>

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
