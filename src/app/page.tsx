import Navbar from '@/components/Landing/Navbar';
import Hero from '@/components/Landing/Hero';
import PortfolioGrid from '@/components/Landing/PortfolioGrid';

export default function LandingPage() {
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
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)' }}>120+</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Projects Completed</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)' }}>95%</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Client Retention</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-tertiary)' }}>10M+</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Reach Generated</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-quaternary)' }}>24/7</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Dedicated Support</p>
              </div>
            </div>
          </div>
        </section>

        <PortfolioGrid />

        {/* CTA Section */}
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <div className="glass" style={{ padding: '60px', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Ready to <span className="text-grad">Transform</span> Your Brand?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Let's collaborate to create something extraordinary. Our team is ready to bring your vision to life with professional multimedia and strategic marketing.
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
              <a href="#" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Privacy</a>
              <a href="#" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Terms</a>
              <a href="#" className="glass-hover" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)' }}>Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
