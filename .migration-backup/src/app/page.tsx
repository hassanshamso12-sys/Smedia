'use client';
import Navbar from '@/components/Landing/Navbar';
import Hero from '@/components/Landing/Hero';
import Trust from '@/components/Landing/Trust';
import Services from '@/components/Landing/Services';
import PortfolioGrid from '@/components/Landing/PortfolioGrid';
import { useContent } from '@/lib/hooks/useContent';

export default function LandingPage() {
  const { content } = useContent();

  const contact = content?.contact || {
    email: 'hello@smediahub.com',
    instagram: '@smediahub'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main>
        <Hero />
        <Trust />
        <Services />
        <PortfolioGrid />

        {/* CTA Section */}
        <section id="contact" className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <div className="glass" style={{ padding: '80px var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: 1.1 }}>Ready to <span className="text-grad">Transform</span> Your Brand?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '48px', maxWidth: '750px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                Let's collaborate to create something extraordinary. Reach out to us at <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{contact.email}</span> or follow our journey on Instagram <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700 }}>{contact.instagram}</span>.
              </p>
              <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '18px 48px' }}>
                Schedule a Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: '80px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <img src="/logo.png" alt="S.media Hub Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>© 2026 S.media Hub. All rights reserved.</p>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="/support" className="link-hover">Support</a>
              <a href="#" className="link-hover">Privacy</a>
              <a href="#" className="link-hover">Terms</a>
              <a href="#contact" className="link-hover">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

