'use client';
import Navbar from '@/components/Landing/Navbar';
import Hero from '@/components/Landing/Hero';
import PortfolioGrid from '@/components/Landing/PortfolioGrid';
import { useContent } from '@/lib/hooks/useContent';

export default function LandingPage() {
  const { content, loading } = useContent();

  const stats = content?.stats || {
    projects: '120+',
    retention: '95%',
    reach: '10M+',
    support: '24/7'
  };

  const contact = content?.contact || {
    email: 'hello@smediahub.com',
    instagram: '@smediahub'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Trust Section */}
        <section className="section" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)' }}>{stats.projects}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Projects Completed</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)' }}>{stats.retention}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Client Retention</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-tertiary)' }}>{stats.reach}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Reach Generated</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-quaternary)' }}>{stats.support}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Dedicated Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '3rem' }}>Our <span className="text-grad">Specialties</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Expert solutions tailored for the digital age.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {(content?.services || [
                { title: 'Social Media Management', description: 'Complete strategy and execution.' },
                { title: 'Multimedia Production', description: 'Cinematic video and photography.' },
                { title: 'Brand Identity', description: 'Visual storytelling and design.' }
              ]).map((service: any, idx: number) => (
                <div key={idx} className="glass" style={{ padding: '40px', transition: 'transform 0.3s ease' }}>
                  {service.image && <img src={service.image} alt={service.title} style={{ width: '50px', marginBottom: '20px' }} />}
                  <h3 style={{ marginBottom: '15px' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PortfolioGrid />

        {/* CTA Section */}
        <section id="contact" className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <div className="glass" style={{ padding: '60px', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Ready to <span className="text-grad">Transform</span> Your Brand?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Let's collaborate to create something extraordinary. Reach out to us at <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{contact.email}</span> or follow our journey on Instagram <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700 }}>{contact.instagram}</span>.
              </p>
              <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '16px 40px' }}>
                Schedule a Consultation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: '60px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>
                <span className="text-grad">S.media</span> Hub
              </div>
              <p style={{ color: 'var(--text-muted)' }}>© 2026 S.media Hub. All rights reserved.</p>
            </div>
            <div style={{ display: 'flex', gap: '40px' }}>
              <a href="/support" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Support</a>
              <a href="#" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Privacy</a>
              <a href="#" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Terms</a>
              <a href="#contact" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
