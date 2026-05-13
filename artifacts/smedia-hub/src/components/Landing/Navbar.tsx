import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`glass ${styles.navInner}`}>
        <a href="/" className={styles.logo}>
          <img src="/logo.png" alt="S.media Hub Logo" className={styles.logoImg} />
        </a>
        
        <div className={styles.links}>
          <a href="#portfolio" className={styles.link}>Portfolio</a>
          <a href="#services" className={styles.link}>Services</a>
          <a href="#about" className={styles.link}>About</a>
          <a href="#contact" className={styles.link}>Contact</a>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-primary">Let's Create</button>
        </div>
      </div>
    </nav>
  );
}
