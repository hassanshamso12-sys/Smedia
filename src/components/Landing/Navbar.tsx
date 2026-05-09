'use client';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`glass ${styles.navInner}`}>
        <div className={styles.logo}>
          <span className="text-grad">S.media</span> Hub
        </div>
        
        <div className={styles.links}>
          <Link href="#portfolio" className={styles.link}>Portfolio</Link>
          <Link href="#services" className={styles.link}>Services</Link>
          <Link href="#about" className={styles.link}>About</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-primary">Let's Create</button>
        </div>
      </div>
    </nav>
  );
}
