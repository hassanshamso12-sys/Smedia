import React from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { user, userDoc } = useAuth();
  
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
        S.Media Hub
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
          <div className={styles.avatar}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userDoc?.name || user?.displayName || 'User'}</div>
            <div className={styles.userRole}>{userDoc?.role || 'Member'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
