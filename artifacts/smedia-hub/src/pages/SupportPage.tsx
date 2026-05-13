import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from '@/app/support/support.module.css';

const TABS = [
  { id: 'hero', label: '✦ Hero' },
  { id: 'stats', label: '📊 Stats' },
  { id: 'services', label: '⚙️ Services' },
  { id: 'portfolio', label: '🖼 Portfolio' },
  { id: 'contact', label: '📬 Contact' },
  { id: 'theme', label: '🎨 Theme' },
];

const DEFAULT_CONTENT = {
  hero: {
    title: 'Elevate Your Digital Presence',
    subtitle: 'Creative social media marketing and multimedia production that builds trust and drives growth. Positive vibes, professional results.',
    ctaPrimary: "Let's Create Together",
    ctaSecondary: 'Explore Portfolio',
  },
  stats: [
    { value: '120+', label: 'Projects Completed' },
    { value: '95%', label: 'Client Retention' },
    { value: '10M+', label: 'Reach Generated' },
    { value: '24/7', label: 'Dedicated Support' },
  ],
  services: [
    { title: 'Social Media Management', description: 'Strategic growth and community engagement tailored to your brand voice. From content planning to analytics, we handle it all.' },
    { title: 'Multimedia Production', description: 'Cinematic video production and high-end photography that tells your story and stops the scroll.' },
    { title: 'Brand Identity', description: 'Developing a unique visual language that resonates with your target audience and builds lasting recognition.' },
  ],
  portfolio: [
    { title: 'Social Growth Strategy', category: 'Marketing', metric: '+240% Engagement', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { title: 'Lifestyle Branding', category: 'Photography', metric: 'Premium Visuals', image: 'https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=800' },
  ],
  contact: {
    email: 'hello@smediahub.com',
    phone: '+1 (555) 000-0000',
    address: 'Dubai, UAE',
    instagram: '@smediahub',
    facebook: 'smediahub',
    x: 'smediahub',
    tiktok: '@smediahub',
  },
  theme: {
    primaryColor: '#ff4d4d',
    secondaryColor: '#f9cb28',
    backgroundColor: '#ffffff',
    fontHeading: 'Lexend',
    fontBody: 'Outfit',
  },
};

type Content = typeof DEFAULT_CONTENT;

function ImagePreview({ url }: { url: string }) {
  const [ok, setOk] = useState(false);
  useEffect(() => { setOk(false); }, [url]);
  if (!url) return null;
  return ok ? (
    <img src={url} alt="preview" className={styles.imgPreview} onError={() => setOk(false)} />
  ) : (
    <img src={url} alt="preview" className={styles.imgPreview} style={{ display: 'none' }} onLoad={() => setOk(true)} onError={() => setOk(false)} />
  );
}

export default function SupportPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState<Content>(DEFAULT_CONTENT);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    async function fetch() {
      try {
        const snap = await getDoc(doc(db, 'site_content', 'config'));
        if (snap.exists()) {
          const data = snap.data() as any;
          setContent({
            hero: { ...DEFAULT_CONTENT.hero, ...data.hero },
            stats: Array.isArray(data.stats) ? data.stats : DEFAULT_CONTENT.stats,
            services: Array.isArray(data.services) ? data.services : DEFAULT_CONTENT.services,
            portfolio: Array.isArray(data.portfolio) ? data.portfolio : DEFAULT_CONTENT.portfolio,
            contact: { ...DEFAULT_CONTENT.contact, ...data.contact },
            theme: { ...DEFAULT_CONTENT.theme, ...data.theme },
          });
        }
      } catch (e) {
        console.error('Firestore fetch error:', e);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    }
    fetch();
    return () => clearTimeout(timeout);
  }, []);

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
    setSaveStatus('idle');
    try {
      await setDoc(doc(db, 'site_content', 'config'), content);
      setSaveStatus('ok');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      console.error('Save error:', e);
      setSaveStatus('err');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setSaving(false);
    }
  };

  const setHero = (key: keyof Content['hero'], val: string) =>
    setContent(c => ({ ...c, hero: { ...c.hero, [key]: val } }));

  const setStat = (idx: number, key: 'value' | 'label', val: string) =>
    setContent(c => { const s = [...c.stats]; s[idx] = { ...s[idx], [key]: val }; return { ...c, stats: s }; });

  const setService = (idx: number, key: string, val: string) =>
    setContent(c => { const s = [...c.services] as any[]; s[idx] = { ...s[idx], [key]: val }; return { ...c, services: s }; });

  const addService = () =>
    setContent(c => ({ ...c, services: [...c.services, { title: '', description: '', image: '' } as any] }));

  const removeService = (idx: number) =>
    setContent(c => ({ ...c, services: c.services.filter((_, i) => i !== idx) }));

  const setPortfolio = (idx: number, key: string, val: string) =>
    setContent(c => { const p = [...c.portfolio] as any[]; p[idx] = { ...p[idx], [key]: val }; return { ...c, portfolio: p }; });

  const addPortfolio = () =>
    setContent(c => ({ ...c, portfolio: [...c.portfolio, { title: '', category: '', metric: '', image: '' }] }));

  const removePortfolio = (idx: number) =>
    setContent(c => ({ ...c, portfolio: c.portfolio.filter((_, i) => i !== idx) }));

  const setContact = (key: keyof Content['contact'], val: string) =>
    setContent(c => ({ ...c, contact: { ...c.contact, [key]: val } }));

  const setTheme = (key: keyof Content['theme'], val: string) =>
    setContent(c => ({ ...c, theme: { ...c.theme, [key]: val } }));

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <form className={`glass ${styles.loginBox}`} onSubmit={handleLogin}>
          <h1 className={styles.loginTitle}>Admin <span className="text-grad">Access</span></h1>
          <div className={styles.field}>
            <label>Username</label>
            <input type="text" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} placeholder="Enter username" />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    );
  }

  if (loading) return <div className={styles.loading}>Loading workspace…</div>;

  const saveLabel = saving ? 'Saving…' : saveStatus === 'ok' ? '✓ Published!' : saveStatus === 'err' ? '✗ Failed' : 'Publish Live';

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <img src="/logo.png" alt="S.media Hub" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
        </div>
        <nav className={styles.sideNav}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={activeTab === t.id ? styles.active : ''}>
              {t.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setIsAuthenticated(false)} className={styles.logoutBtn}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Editing: <span className="text-grad">{TABS.find(t => t.id === activeTab)?.label.replace(/^[^\s]+ /, '')}</span></h2>
          <button
            className={`btn btn-primary ${saving ? styles.saving : ''}`}
            onClick={handleSave}
            disabled={saving}
            style={saveStatus === 'ok' ? { background: 'var(--accent-tertiary)' } : saveStatus === 'err' ? { background: '#ff4d4d' } : {}}
          >
            {saveLabel}
          </button>
        </header>

        <div className={styles.formContainer}>

          {/* ─── HERO ─── */}
          {activeTab === 'hero' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Hero Headline</h3>
                <div className={styles.field}>
                  <label>Main Title</label>
                  <input value={content.hero.title} onChange={e => setHero('title', e.target.value)} placeholder="Elevate Your Digital Presence" />
                </div>
                <div className={styles.field}>
                  <label>Subtitle / Tagline</label>
                  <textarea rows={3} value={content.hero.subtitle} onChange={e => setHero('subtitle', e.target.value)} placeholder="Your agency tagline…" />
                </div>
              </section>
              <section className={`glass ${styles.section}`}>
                <h3>Call-to-Action Buttons</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Primary Button Text</label>
                    <input value={content.hero.ctaPrimary || "Let's Create Together"} onChange={e => setHero('ctaPrimary', e.target.value)} placeholder="Let's Create Together" />
                  </div>
                  <div className={styles.field}>
                    <label>Secondary Button Text</label>
                    <input value={content.hero.ctaSecondary || 'Explore Portfolio'} onChange={e => setHero('ctaSecondary', e.target.value)} placeholder="Explore Portfolio" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ─── STATS ─── */}
          {activeTab === 'stats' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Trust / Stats Bar</h3>
                <p className={styles.sectionHint}>These four numbers appear below the hero section.</p>
                {content.stats.map((stat, idx) => (
                  <div key={idx} className={styles.statRow}>
                    <div className={styles.field} style={{ flex: '0 0 140px' }}>
                      <label>Value</label>
                      <input value={stat.value} onChange={e => setStat(idx, 'value', e.target.value)} placeholder="120+" />
                    </div>
                    <div className={styles.field} style={{ flex: 1 }}>
                      <label>Label</label>
                      <input value={stat.label} onChange={e => setStat(idx, 'label', e.target.value)} placeholder="Projects Completed" />
                    </div>
                  </div>
                ))}
              </section>
            </div>
          )}

          {/* ─── SERVICES ─── */}
          {activeTab === 'services' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Services</h3>
                <p className={styles.sectionHint}>These cards appear in the "Our Specialties" section.</p>
                {content.services.map((svc, idx) => (
                  <div key={idx} className={styles.itemEditor}>
                    <div className={styles.itemEditorHeader}>
                      <span className={styles.itemNum}>Service {idx + 1}</span>
                      <button className={styles.deleteBtn} onClick={() => removeService(idx)}>✕ Remove</button>
                    </div>
                    <div className={styles.field}>
                      <label>Title</label>
                      <input value={(svc as any).title || ''} onChange={e => setService(idx, 'title', e.target.value)} placeholder="Service title" />
                    </div>
                    <div className={styles.field}>
                      <label>Description</label>
                      <textarea rows={3} value={(svc as any).description || ''} onChange={e => setService(idx, 'description', e.target.value)} placeholder="Describe this service…" />
                    </div>
                    <div className={styles.field}>
                      <label>Image URL (optional)</label>
                      <input value={(svc as any).image || ''} onChange={e => setService(idx, 'image', e.target.value)} placeholder="https://…" />
                      <ImagePreview url={(svc as any).image || ''} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline" style={{ marginTop: 8 }} onClick={addService}>+ Add Service</button>
              </section>
            </div>
          )}

          {/* ─── PORTFOLIO ─── */}
          {activeTab === 'portfolio' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Portfolio Projects</h3>
                <p className={styles.sectionHint}>These cards appear in the "Featured Work" section. Paste any image URL or a direct link to your uploaded image.</p>
                {content.portfolio.map((proj, idx) => (
                  <div key={idx} className={styles.itemEditor}>
                    <div className={styles.itemEditorHeader}>
                      <span className={styles.itemNum}>Project {idx + 1}</span>
                      <button className={styles.deleteBtn} onClick={() => removePortfolio(idx)}>✕ Remove</button>
                    </div>
                    <div className={styles.fieldGrid}>
                      <div className={styles.field}>
                        <label>Project Title</label>
                        <input value={proj.title} onChange={e => setPortfolio(idx, 'title', e.target.value)} placeholder="Campaign name" />
                      </div>
                      <div className={styles.field}>
                        <label>Category</label>
                        <input value={proj.category} onChange={e => setPortfolio(idx, 'category', e.target.value)} placeholder="Marketing / Photo / Video" />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Result / Metric Badge</label>
                      <input value={proj.metric} onChange={e => setPortfolio(idx, 'metric', e.target.value)} placeholder="+240% Engagement" />
                    </div>
                    <div className={styles.field}>
                      <label>Image URL</label>
                      <input value={proj.image} onChange={e => setPortfolio(idx, 'image', e.target.value)} placeholder="https://…" />
                      <ImagePreview url={proj.image} />
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline" style={{ marginTop: 8 }} onClick={addPortfolio}>+ Add Project</button>
              </section>
            </div>
          )}

          {/* ─── CONTACT ─── */}
          {activeTab === 'contact' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Contact Details</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Email</label>
                    <input type="email" value={content.contact.email} onChange={e => setContact('email', e.target.value)} placeholder="hello@smediahub.com" />
                  </div>
                  <div className={styles.field}>
                    <label>Phone</label>
                    <input type="tel" value={content.contact.phone} onChange={e => setContact('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Address / Location</label>
                  <input value={content.contact.address} onChange={e => setContact('address', e.target.value)} placeholder="Dubai, UAE" />
                </div>
              </section>

              <section className={`glass ${styles.section}`}>
                <h3>Social Media Handles</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Instagram</label>
                    <input value={content.contact.instagram} onChange={e => setContact('instagram', e.target.value)} placeholder="@smediahub" />
                  </div>
                  <div className={styles.field}>
                    <label>Facebook</label>
                    <input value={content.contact.facebook} onChange={e => setContact('facebook', e.target.value)} placeholder="smediahub" />
                  </div>
                  <div className={styles.field}>
                    <label>X (Twitter)</label>
                    <input value={content.contact.x} onChange={e => setContact('x', e.target.value)} placeholder="smediahub" />
                  </div>
                  <div className={styles.field}>
                    <label>TikTok</label>
                    <input value={content.contact.tiktok} onChange={e => setContact('tiktok', e.target.value)} placeholder="@smediahub" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ─── THEME ─── */}
          {activeTab === 'theme' && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Colours</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Primary Accent</label>
                    <div className={styles.colorRow}>
                      <input type="color" value={content.theme.primaryColor} onChange={e => setTheme('primaryColor', e.target.value)} />
                      <input type="text" value={content.theme.primaryColor} onChange={e => setTheme('primaryColor', e.target.value)} placeholder="#ff4d4d" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Secondary Accent</label>
                    <div className={styles.colorRow}>
                      <input type="color" value={content.theme.secondaryColor} onChange={e => setTheme('secondaryColor', e.target.value)} />
                      <input type="text" value={content.theme.secondaryColor} onChange={e => setTheme('secondaryColor', e.target.value)} placeholder="#f9cb28" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Background Color</label>
                    <div className={styles.colorRow}>
                      <input type="color" value={content.theme.backgroundColor} onChange={e => setTheme('backgroundColor', e.target.value)} />
                      <input type="text" value={content.theme.backgroundColor} onChange={e => setTheme('backgroundColor', e.target.value)} placeholder="#ffffff" />
                    </div>
                  </div>
                </div>
              </section>

              <section className={`glass ${styles.section}`}>
                <h3>Typography</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Heading Font</label>
                    <select value={content.theme.fontHeading} onChange={e => setTheme('fontHeading', e.target.value)}>
                      <option value="Lexend">Lexend (Modern)</option>
                      <option value="Inter">Inter (Clean)</option>
                      <option value="Outfit">Outfit (Friendly)</option>
                      <option value="Playfair Display">Playfair (Elegant)</option>
                      <option value="DM Sans">DM Sans (Minimal)</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Body Font</label>
                    <select value={content.theme.fontBody} onChange={e => setTheme('fontBody', e.target.value)}>
                      <option value="Outfit">Outfit (Friendly)</option>
                      <option value="Inter">Inter (Clean)</option>
                      <option value="Lexend">Lexend (Modern)</option>
                      <option value="DM Sans">DM Sans (Minimal)</option>
                    </select>
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
