import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Content Hub', icon: '🎨', active: false },
    { name: 'Analytics', icon: '📈', active: false },
    { name: 'Calendar', icon: '📅', active: false },
    { name: 'Messages', icon: '💬', active: false },
    { name: 'Settings', icon: '⚙️', active: false },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        S.media Hub
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <div 
            key={item.name} 
            className={`${styles.navItem} ${item.active ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.profile}>
          <div className={styles.avatar}></div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Hassan A.</div>
            <div className={styles.userRole}>Brand Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
