import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase/config';
import { doc, getDoc, setDoc, collection, onSnapshot, query, where, deleteDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from '@/lib/context/AuthContext';
import styles from '@/app/support/support.module.css';

const TABS = [
  { id: 'hero', label: '✦ Hero', adminOnly: true },
  { id: 'stats', label: '📊 Stats', adminOnly: true },
  { id: 'services', label: '⚙️ Services', adminOnly: true },
  { id: 'portfolio', label: '🖼 Portfolio', adminOnly: false },
  { id: 'team', label: '👥 Team', adminOnly: true },
  { id: 'users', label: '🛡 Users', adminOnly: true },
  { id: 'contact', label: '📬 Contact', adminOnly: true },
  { id: 'theme', label: '🎨 Theme', adminOnly: true },
];

const DEFAULT_CONTENT = {
  hero: { title: '', subtitle: '', ctaPrimary: '', ctaSecondary: '' },
  stats: [],
  services: [],
  portfolio: [],
  team: [],
  contact: { email: '', phone: '', whatsapp: '', address: '', instagram: '', facebook: '', x: '', tiktok: '' },
  theme: { primaryColor: '#ff4d4d', secondaryColor: '#f9cb28', backgroundColor: '#ffffff', fontHeading: 'Lexend', fontBody: 'Outfit' },
};

export default function SupportPage() {
  const { user, userDoc, loading: authLoading, isAdmin } = useAuth();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [content, setContent] = useState<any>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [activeTab, setActiveTab] = useState('hero');
  
  // Passcode Protection for Users Tab
  const [isUsersLocked, setIsUsersLocked] = useState(true);
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [storedPasscode, setStoredPasscode] = useState('11223311');
  const [newPasscode, setNewPasscode] = useState('');

  // User Management State
  const [users, setUsers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'user' });

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Load Site Content
    const unsubContent = onSnapshot(doc(db, 'site_content', 'config'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        // Merge with defaults to ensure all nested objects exist
        setContent({
          ...DEFAULT_CONTENT,
          ...data,
          hero: { ...DEFAULT_CONTENT.hero, ...(data.hero || {}) },
          stats: data.stats || [],
          services: data.services || [],
          team: data.team || [],
          contact: { ...DEFAULT_CONTENT.contact, ...(data.contact || {}) },
          portfolio: data.portfolio || [],
          theme: { ...DEFAULT_CONTENT.theme, ...(data.theme || {}) }
        });
      }
      setLoading(false);
    });

    // Load Settings (Passcode)
    const unsubSettings = onSnapshot(doc(db, 'site_settings', 'access'), (snap) => {
      if (snap.exists()) {
        setStoredPasscode(snap.data().usersTabPasscode || '11223311');
      } else {
        // Initialize default passcode
        setDoc(doc(db, 'site_settings', 'access'), { usersTabPasscode: '11223311' });
      }
    });

    // Load Users & Invites (Admin Only)
    let unsubUsers = () => {};
    let unsubInvites = () => {};

    if (isAdmin) {
      unsubUsers = onSnapshot(collection(db, 'users'), (snap) => {
        setUsers(snap.docs.map(d => d.data()));
      });
      unsubInvites = onSnapshot(collection(db, 'invitations'), (snap) => {
        setInvites(snap.docs.map(d => d.data()));
      });
    }

    return () => {
      unsubContent();
      unsubSettings();
      unsubUsers();
      unsubInvites();
    };
  }, [user, isAdmin]);

  const handleTabChange = (tabId: string) => {
    if (tabId === 'users' && isUsersLocked) {
      setShowPasscodePrompt(true);
      return;
    }
    setActiveTab(tabId);
  };

  const verifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPasscode === storedPasscode) {
      setIsUsersLocked(false);
      setShowPasscodePrompt(false);
      setActiveTab('users');
      setEnteredPasscode('');
    } else {
      alert('Incorrect passcode. Access denied.');
      setEnteredPasscode('');
    }
  };

  const updatePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode) return;
    try {
      await setDoc(doc(db, 'site_settings', 'access'), { usersTabPasscode: newPasscode }, { merge: true });
      setNewPasscode('');
      alert('Passcode updated successfully!');
    } catch (err) {
      alert('Failed to update passcode');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Legacy check for the user's request
      let email = loginData.email;
      if (email === 'admin' && loginData.password === 'smedia2026') {
        email = 'admin@smediahub.com'; // Default legacy admin email
      }
      
      await signInWithEmailAndPassword(auth, email, loginData.password);
    } catch (err: any) {
      alert(err.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSave = async () => {
    if (!isAdmin) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'site_content', 'config'), content);
      setSaveStatus('ok');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (e) {
      setSaveStatus('err');
    } finally {
      setSaving(false);
    }
  };

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.email) return;
    try {
      const email = inviteForm.email.toLowerCase();
      await setDoc(doc(db, 'invitations', email), {
        ...inviteForm,
        email,
        createdAt: new Date().toISOString()
      });
      setInviteForm({ name: '', email: '', role: 'user' });
      alert('Invitation sent! User can now sign up at /signup');
    } catch (err) {
      alert('Failed to invite user');
    }
  };

  const deleteUser = async (uid: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteDoc(doc(db, 'users', uid));
    }
  };

  const deleteInvite = async (email: string) => {
    await deleteDoc(doc(db, 'invitations', email));
  };

  if (authLoading || (user && loading)) return <div className={styles.loading}>Loading workspace…</div>;

  if (!user) {
    return (
      <div className={styles.loginContainer}>
        <form className={`glass ${styles.loginBox}`} onSubmit={handleLogin}>
          <h1 className={styles.loginTitle}>Agency <span className="text-grad">Access</span></h1>
          <div className={styles.field}>
            <label>Email or Username</label>
            <input type="text" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} placeholder="admin@smediahub.com" />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            New here? <a href="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Sign up</a> with your invited email.
          </p>
        </form>
      </div>
    );
  }

  const visibleTabs = TABS.filter(t => !t.adminOnly || isAdmin);

  return (
    <div className={styles.dashboardLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <img src="/logo.png" alt="S.Media Hub" style={{ height: 40, width: 'auto' }} />
        </div>
        <div className={styles.userInfo} style={{ padding: '0 16px', marginBottom: '20px' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{userDoc?.name || user.email}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>{userDoc?.role}</p>
        </div>
        <nav className={styles.sideNav}>
          {visibleTabs.map(t => (
            <button key={t.id} onClick={() => handleTabChange(t.id)} className={activeTab === t.id ? styles.active : ''}>
              {t.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Section: <span className="text-grad">{TABS.find(t => t.id === activeTab)?.label.replace(/^[^\s]+ /, '')}</span></h2>
          {isAdmin && (activeTab !== 'users') && (
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Publish Live'}
            </button>
          )}
        </header>

        <div className={styles.formContainer}>
          {activeTab === 'users' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Invite Team Member</h3>
                <form onSubmit={sendInvite} className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <input value={inviteForm.name} onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })} placeholder="John Doe" />
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input type="email" value={inviteForm.email} onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })} placeholder="john@example.com" />
                  </div>
                  <div className={styles.field}>
                    <label>Role</label>
                    <select value={inviteForm.role} onChange={e => setInviteForm({ ...inviteForm, role: e.target.value })}>
                      <option value="user">Normal User</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </div>
                  <div className={styles.field} style={{ justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary">Send Invite</button>
                  </div>
                </form>
              </section>

              <section className={`glass ${styles.section}`}>
                <h3>Active Users</h3>
                <div className={styles.userList}>
                  {users.map(u => (
                    <div key={u.uid} className={styles.statRow} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>{u.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email} • {u.role}</p>
                      </div>
                      {u.uid !== user.uid && (
                        <button className={styles.deleteBtn} onClick={() => deleteUser(u.uid)}>Delete</button>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className={`glass ${styles.section}`}>
                <h3>Pending Invitations</h3>
                <div className={styles.userList}>
                  {invites.map(i => (
                    <div key={i.email} className={styles.statRow} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 700 }}>{i.name}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{i.email} • {i.role}</p>
                      </div>
                      <button className={styles.deleteBtn} onClick={() => deleteInvite(i.email)}>Cancel</button>
                    </div>
                  ))}
                  {invites.length === 0 && <p className={styles.sectionHint}>No pending invites.</p>}
                </div>
              </section>

              <section className={`glass ${styles.section}`}>
                <h3>Access Settings</h3>
                <form onSubmit={updatePasscode} className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>New Users Tab Passcode</label>
                    <input type="password" value={newPasscode} onChange={e => setNewPasscode(e.target.value)} placeholder="Enter new passcode" />
                  </div>
                  <div className={styles.field} style={{ justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary">Update Passcode</button>
                  </div>
                </form>
              </section>
            </div>
          )}

          {activeTab === 'hero' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Hero Content</h3>
                <div className={styles.field}>
                  <label>Title</label>
                  <input value={content?.hero?.title || ''} onChange={e => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })} />
                </div>
                <div className={styles.field}>
                  <label>Subtitle</label>
                  <textarea rows={3} value={content?.hero?.subtitle || ''} onChange={e => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })} />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'stats' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Platform Statistics</h3>
                <div className={styles.itemList}>
                  {(content.stats || []).map((stat: any, idx: number) => (
                    <div key={idx} className={styles.statRow}>
                      <input 
                        value={stat.label || ''} 
                        onChange={e => {
                          const s = [...content.stats];
                          s[idx].label = e.target.value;
                          setContent({ ...content, stats: s });
                        }} 
                        placeholder="Label (e.g. Clients)" 
                      />
                      <input 
                        value={stat.value || ''} 
                        onChange={e => {
                          const s = [...content.stats];
                          s[idx].value = e.target.value;
                          setContent({ ...content, stats: s });
                        }} 
                        placeholder="Value (e.g. 50+)" 
                      />
                      <button className={styles.deleteBtn} onClick={() => {
                        const s = content.stats.filter((_: any, i: number) => i !== idx);
                        setContent({ ...content, stats: s });
                      }}>×</button>
                    </div>
                  ))}
                  <button className="btn btn-outline" onClick={() => setContent({ ...content, stats: [...(content.stats || []), { label: '', value: '' }] })}>
                    + Add Statistic
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'services' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Agency Services</h3>
                <div className={styles.itemList}>
                  {(content.services || []).map((svc: any, idx: number) => (
                    <div key={idx} className={`glass ${styles.itemEditor}`}>
                      <input value={svc.title || ''} onChange={e => {
                        const s = [...content.services];
                        s[idx].title = e.target.value;
                        setContent({ ...content, services: s });
                      }} placeholder="Service Title" />
                      <textarea rows={2} value={svc.description || ''} onChange={e => {
                        const s = [...content.services];
                        s[idx].description = e.target.value;
                        setContent({ ...content, services: s });
                      }} placeholder="Service Description" />
                      <button className={styles.deleteBtn} onClick={() => {
                        const s = content.services.filter((_: any, i: number) => i !== idx);
                        setContent({ ...content, services: s });
                      }}>Remove Service</button>
                    </div>
                  ))}
                  <button className="btn btn-outline" onClick={() => setContent({ ...content, services: [...(content.services || []), { title: '', description: '', icon: '✨' }] })}>
                    + Add Service
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'team' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Our Team</h3>
                <div className={styles.itemList}>
                  {(content.team || []).map((member: any, idx: number) => (
                    <div key={idx} className={`glass ${styles.itemEditor}`}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input value={member.name || ''} onChange={e => {
                          const t = [...content.team];
                          t[idx].name = e.target.value;
                          setContent({ ...content, team: t });
                        }} placeholder="Full Name" />
                        <input value={member.post || member.role || ''} onChange={e => {
                          const t = [...content.team];
                          t[idx].post = e.target.value;
                          setContent({ ...content, team: t });
                        }} placeholder="Role/Post" />
                      </div>
                      <button className={styles.deleteBtn} onClick={() => {
                        const t = content.team.filter((_: any, i: number) => i !== idx);
                        setContent({ ...content, team: t });
                      }}>Remove Member</button>
                    </div>
                  ))}
                  <button className="btn btn-outline" onClick={() => setContent({ ...content, team: [...(content.team || []), { name: '', role: '', image: '' }] })}>
                    + Add Team Member
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'contact' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Contact & Social Links</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input value={content?.contact?.email || ''} onChange={e => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} />
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <input value={content?.contact?.phone || ''} onChange={e => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })} />
                  </div>
                  <div className={styles.field}>
                    <label>WhatsApp Link</label>
                    <input value={content?.contact?.whatsapp || ''} onChange={e => setContent({ ...content, contact: { ...content.contact, whatsapp: e.target.value } })} />
                  </div>
                  <div className={styles.field}>
                    <label>Instagram URL</label>
                    <input value={content?.contact?.instagram || ''} onChange={e => setContent({ ...content, contact: { ...content.contact, instagram: e.target.value } })} />
                  </div>
                  <div className={styles.field}>
                    <label>TikTok URL</label>
                    <input value={content?.contact?.tiktok || ''} onChange={e => setContent({ ...content, contact: { ...content.contact, tiktok: e.target.value } })} />
                  </div>
                  <div className={styles.field}>
                    <label>Facebook URL</label>
                    <input value={content?.contact?.facebook || ''} onChange={e => setContent({ ...content, contact: { ...content.contact, facebook: e.target.value } })} />
                  </div>
                </div>
              </section>
            </div>
          )}
          {activeTab === 'portfolio' && (
             <div className={styles.tabContent}>
                <section className={`glass ${styles.section}`}>
                  <h3>Project Portfolio</h3>
                  <p className={styles.sectionHint}>Manage your work samples here.</p>
                  {/* Simplified portfolio editor for all logged in users */}
                  {content.portfolio.map((proj: any, idx: number) => (
                    <div key={idx} className={styles.itemEditor}>
                      <input value={proj.title} onChange={e => {
                        const p = [...content.portfolio];
                        p[idx].title = e.target.value;
                        setContent({ ...content, portfolio: p });
                      }} placeholder="Project Title" />
                    </div>
                  ))}
                </section>
             </div>
          )}

          {activeTab === 'theme' && isAdmin && (
            <div className={styles.tabContent}>
              <section className={`glass ${styles.section}`}>
                <h3>Visual Identity</h3>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label>Primary Brand Color</label>
                    <div className={styles.colorRow}>
                      <input type="color" value={content?.theme?.primaryColor || '#ff4d4d'} onChange={e => setContent({ ...content, theme: { ...content.theme, primaryColor: e.target.value } })} />
                      <input type="text" value={content?.theme?.primaryColor || '#ff4d4d'} onChange={e => setContent({ ...content, theme: { ...content.theme, primaryColor: e.target.value } })} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Secondary Accent Color</label>
                    <div className={styles.colorRow}>
                      <input type="color" value={content?.theme?.secondaryColor || '#f9cb28'} onChange={e => setContent({ ...content, theme: { ...content.theme, secondaryColor: e.target.value } })} />
                      <input type="text" value={content?.theme?.secondaryColor || '#f9cb28'} onChange={e => setContent({ ...content, theme: { ...content.theme, secondaryColor: e.target.value } })} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Heading Font (Google Fonts)</label>
                    <input value={content?.theme?.fontHeading || ''} onChange={e => setContent({ ...content, theme: { ...content.theme, fontHeading: e.target.value } })} />
                  </div>
                  <div className={styles.field}>
                    <label>Body Font (Google Fonts)</label>
                    <input value={content?.theme?.fontBody || ''} onChange={e => setContent({ ...content, theme: { ...content.theme, fontBody: e.target.value } })} />
                  </div>
                </div>
              </section>
            </div>
          )}

          {(!isAdmin && activeTab !== 'portfolio') && (
            <div className={styles.tabContent}>
              <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-primary)' }}>Access Restricted</h3>
                <p>You do not have permission to edit this section. Please contact a Super Admin.</p>
              </div>
            </div>
          )}
        </div>

        {showPasscodePrompt && (
          <div className={styles.loginContainer} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, background: 'rgba(0,0,0,0.8)' }}>
             <form className={`glass ${styles.loginBox}`} onSubmit={verifyPasscode}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>🛡 Secure Section</h3>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '20px' }}>Enter the passcode to manage users.</p>
                <div className={styles.field}>
                  <label>Passcode</label>
                  <input type="password" autoFocus value={enteredPasscode} onChange={e => setEnteredPasscode(e.target.value)} placeholder="••••••••" />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setShowPasscodePrompt(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Unlock</button>
                </div>
             </form>
          </div>
        )}
      </main>
    </div>
  );
}
