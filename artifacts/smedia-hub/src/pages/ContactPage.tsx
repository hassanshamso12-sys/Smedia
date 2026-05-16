import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useContent } from '@/lib/hooks/useContent';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';
import BrandBadge from '@/components/UI/BrandBadge';
import Typewriter from '@/components/UI/Typewriter';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="checkGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--accent-tertiary)" /><stop offset="1" stopColor="var(--accent-quaternary)" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="24" fill="url(#checkGrad)" opacity="0.12" />
    <path d="M14 24l8 8 12-16" stroke="url(#checkGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  const { content } = useContent();
  const email = content?.contact?.email || 'hello@smediahub.com';
  const phone = content?.contact?.phone || '+1 (555) 000-0000';

  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...form,
        createdAt: serverTimestamp(),
        status: 'new',
      });
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={styles.eyebrowRow}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AnimatePresence>
              {!scrolled && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                >
                  <BrandBadge className={styles.heroBadge} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Let's Build Something <br />
            <span className="text-grad">
              <Typewriter
                words={['Together', 'Remarkable', 'Impactful', 'Legendary']}
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2500}
              />
            </span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </section>

      <section className={styles.body}>
        <div className="container">
          <div className={styles.layout}>

            {/* ── Left info block ── */}
            <aside className={styles.infoBlock}>
              <div className={`glass ${styles.infoCard}`}>
                <div className={styles.infoHeader}>
                  <div className={styles.infoGlow} />
                  <h2 className={styles.infoTitle}>Contact Info</h2>
                  <p className={styles.infoSub}>We'd love to hear from you. Drop us a line or visit our studio.</p>
                </div>

                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon} style={{ background: 'rgba(255,77,77,0.1)', color: 'var(--accent-primary)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.infoLabel}>Phone</p>
                      <a href={`tel:${phone}`} className={styles.infoValue}>{phone}</a>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon} style={{ background: 'rgba(0, 77, 229, 0.1)', color: 'var(--accent-tertiary)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.infoLabel}>Email</p>
                      <a href={`mailto:${email}`} className={styles.infoValue}>{email}</a>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon} style={{ background: 'rgba(249,203,40,0.1)', color: 'var(--accent-secondary)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>
                    <div>
                      <p className={styles.infoLabel}>Instagram</p>
                      <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.infoValue}>
                        {content?.contact?.instagram || '@smediahub'}
                      </a>
                    </div>
                  </div>
                </div>

                <div className={styles.infoNote}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                  </svg>
                  <span>We respond to all inquiries within 24 hours on business days.</span>
                </div>
              </div>
            </aside>

            {/* ── Right form ── */}
            <div className={styles.formWrap}>
              {success ? (
                <div className={`glass ${styles.successBox}`}>
                  <CheckIcon />
                  <h2 className={styles.successTitle}>Message Sent!</h2>
                  <p className={styles.successBody}>Thanks for reaching out. We'll be in touch within 24 hours.</p>
                  <button className="btn btn-outline" onClick={() => { setSuccess(false); setForm({ name: '', phone: '', email: '', message: '' }); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form className={`glass ${styles.form}`} onSubmit={handleSubmit} noValidate>
                  <h2 className={styles.formTitle}>Send Us a Message</h2>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="c-name">Full Name <span className={styles.req}>*</span></label>
                      <input
                        id="c-name"
                        className={styles.input}
                        type="text"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="c-phone">Phone Number</label>
                      <input
                        id="c-phone"
                        className={styles.input}
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="c-email">Email Address <span className={styles.req}>*</span></label>
                    <input
                      id="c-email"
                      className={styles.input}
                      type="email"
                      placeholder="jane@yourcompany.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="c-message">Message <span className={styles.req}>*</span></label>
                    <textarea
                      id="c-message"
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="Tell us about your brand, your goals, and how we can help..."
                      rows={6}
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                    />
                  </div>

                  {error && <p className={styles.errorMsg}>{error}</p>}

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
