import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from '@/app/support/support.module.css';

export default function SupportPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [content, setContent] = useState({
    hero: {
      title: 'Elevate Your Digital Presence',
      subtitle: 'Creative social media marketing and multimedia production that builds trust and drives growth.'
    },
    contact: {
      email: 'hello@smediahub.com',
      phone: '+1 (555) 000-0000',
      address: 'Dubai, UAE',
      instagram: '@smediahub',
      facebook: 'smediahub',
      x: 'smediahub',
      tiktok: '@smediahub'
    },
    stats: {
      projects: '120+',
      retention: '95%',
      reach: '10M+',
      support: '24/7'
    },
    services: [
      { title: 'Social Media Management', description: 'Complete strategy and execution.' },
      { title: 'Multimedia Production', description: 'Cinematic video and photography.' }
    ],
    portfolio: [
      {
        title: "Social Growth Strategy",
        category: "Marketing",
        metric: "+240% Engagement",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Lifestyle Branding",
        category: "Photography",
        metric: "Premium Visuals",
        image: "https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=800"
      }
    ],
    theme: {
      primaryColor: '#ff4d4d',
      secondaryColor: '#f9cb28',
      fontHeading: 'Lexend',
      fontBody: 'Outfit',
      backgroundColor: '#ffffff'
    }
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000);

    async function fetchContent() {
      try {
        const docRef = doc(db, 'site_content', 'config');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContent(docSnap.data() as any);
        }
      } catch (error) {
        console.error("Firebase/Firestore Error:", error);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    }
    fetchContent();
    return () => clearTimeout(timeoutId);
  }, [loading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'smedia2026') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'site_content', 'config'), content);
      alert('Changes published successfully!');
    } catch (error) {
      console.error("Error saving:", error);
      alert('Failed to publish changes. Check your connection.');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <form className={`glass ${styles.loginBox}`} onSubmit={handleLogin}>
          <h1 className={styles.loginTitle}>Admin <span className="text-grad">Access</span></h1>
          <div className={styles.field}>
            <label>Username</label>
            <input 
              type="text" 
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              placeholder="Enter username"
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input 
              type="password" 
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  if (loading) return <div className={styles.loading}>Initializing Workspace...</div>;

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo} style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="S.media Hub Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <nav className={styles.sideNav}>
          <button onClick={() => setActiveTab('general')} className={activeTab === 'general' ? styles.active : ''}>General Content</button>
          <button onClick={() => setActiveTab('services')} className={activeTab === 'services' ? styles.active : ''}>Services</button>
          <button onClick={() => setActiveTab('portfolio')} className={activeTab === 'portfolio' ? styles.active : ''}>Portfolio</button>
          <button onClick={() => setActiveTab('theme')} className={activeTab === 'theme' ? styles.active : ''}>Style & Theme</button>
        </nav>
        <button onClick={() => setIsAuthenticated(false)} className={styles.logoutBtn}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Editing: <span className="text-grad">{activeTab.toUpperCase()}</span></h2>
          <button className={`btn btn-primary ${saving ? styles.saving : ''}`} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Publish Live'}
          </button>
        </header>

        <div className={styles.formContainer}>
          {activeTab === 'general' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Hero Section</h3>
                <div className={styles.field}>
                  <label>Headline</label>
                  <input value={content.hero.title} onChange={(e) => setContent({...content, hero: {...content.hero, title: e.target.value}})} />
                </div>
                <div className={styles.field}>
                  <label>Sub-headline</label>
                  <textarea value={content.hero.subtitle} onChange={(e) => setContent({...content, hero: {...content.hero, subtitle: e.target.value}})} />
                </div>
              </section>
              
              <section className={`glass ${styles.section}`}>
                <h3>Contact Details</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}><label>Email</label><input value={content.contact.email} onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})} /></div>
                  <div className={styles.field}><label>Phone</label><input value={content.contact.phone} onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})} /></div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'services' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Manage Services</h3>
                {content.services.map((service, idx) => (
                  <div key={idx} className={styles.itemEditor}>
                    <input value={service.title} placeholder="Service Title" onChange={(e) => {
                      const newServices = [...content.services];
                      newServices[idx].title = e.target.value;
                      setContent({...content, services: newServices});
                    }} />
                    <textarea value={service.description} placeholder="Description" onChange={(e) => {
                      const newServices = [...content.services];
                      newServices[idx].description = e.target.value;
                      setContent({...content, services: newServices});
                    }} />
                    <div className={styles.imageInput}>
                      <label>Icon/Image URL</label>
                      <input value={(service as any).image || ''} placeholder="https://..." onChange={(e) => {
                        const newServices = [...content.services];
                        (newServices[idx] as any).image = e.target.value;
                        setContent({...content, services: newServices});
                      }} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline" onClick={() => setContent({...content, services: [...content.services, { title: '', description: '', image: '' } as any]})}>Add Service</button>
              </section>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Manage Portfolio</h3>
                {content.portfolio.map((project, idx) => (
                  <div key={idx} className={styles.itemEditor}>
                    <div className={styles.fieldGrid}>
                      <input value={project.title} placeholder="Project Title" onChange={(e) => {
                        const newP = [...content.portfolio];
                        newP[idx].title = e.target.value;
                        setContent({...content, portfolio: newP});
                      }} />
                      <input value={project.category} placeholder="Category" onChange={(e) => {
                        const newP = [...content.portfolio];
                        newP[idx].category = e.target.value;
                        setContent({...content, portfolio: newP});
                      }} />
                    </div>
                    <div className={styles.fieldGrid}>
                      <input value={project.metric} placeholder="Metric (e.g. +200% Reach)" onChange={(e) => {
                        const newP = [...content.portfolio];
                        newP[idx].metric = e.target.value;
                        setContent({...content, portfolio: newP});
                      }} />
                      <input value={project.image} placeholder="Image URL" onChange={(e) => {
                        const newP = [...content.portfolio];
                        newP[idx].image = e.target.value;
                        setContent({...content, portfolio: newP});
                      }} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline" onClick={() => setContent({...content, portfolio: [...content.portfolio, { title: '', category: '', metric: '', image: '' }]})}>Add Project</button>
              </section>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Design System</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Primary Accent</label>
                    <input type="color" value={content.theme.primaryColor} onChange={(e) => setContent({...content, theme: {...content.theme, primaryColor: e.target.value}})} />
                  </div>
                  <div className={styles.field}>
                    <label>Background Color</label>
                    <input type="color" value={content.theme.backgroundColor} onChange={(e) => setContent({...content, theme: {...content.theme, backgroundColor: e.target.value}})} />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Heading Font</label>
                  <select value={content.theme.fontHeading} onChange={(e) => setContent({...content, theme: {...content.theme, fontHeading: e.target.value}})}>
                    <option value="Lexend">Lexend (Modern)</option>
                    <option value="Inter">Inter (Clean)</option>
                    <option value="Outfit">Outfit (Friendly)</option>
                    <option value="Playfair Display">Playfair (Elegant)</option>
                  </select>
                </div>
              </section>
              
              <section className={`glass ${styles.section}`}>
                <h3>Image Assets</h3>
                <div className={styles.field}>
                  <label>Hero Image / Placeholder</label>
                  <div className={styles.uploadPlaceholder} onClick={() => alert('Image upload system connected. Selecting placeholder...')}>
                    <span>Click to Upload Image</span>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
