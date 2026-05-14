import React from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Link, useLocation } from 'wouter';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { user, userDoc } = useAuth();
  const [location] = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: '📊', path: '/support' },
    { name: 'Calendar', icon: '📅', path: '/support/calendar' },
    { name: 'Content Hub', icon: '🎨', path: '#' },
    { name: 'Analytics', icon: '📈', path: '#' },
    { name: 'Settings', icon: '⚙️', path: '#' },
  ];

  return (
    <aside className={styles.sidebar}>
      <Link href="/">
        <div className={styles.logo} style={{ cursor: 'pointer' }}>
          S.Media Hub
        </div>
      </Link>
      
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className={`${styles.navItem} ${location === item.path ? styles.active : ''}`}>
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
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
