import Navbar from '@/components/Landing/Navbar';
import Hero from '@/components/Landing/Hero';
import Trust from '@/components/Landing/Trust';
import Services from '@/components/Landing/Services';
import PortfolioGrid from '@/components/Landing/PortfolioGrid';
import Footer from '@/components/Landing/Footer';
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

        <section id="contact" className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <div className="glass" style={{ padding: 'clamp(40px, 8vw, 80px) var(--space-xl)', borderRadius: 'var(--radius-xl)' }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', marginBottom: '24px', lineHeight: 1.15 }}>Ready to <span className="text-grad">Transform</span> Your Brand?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)', marginBottom: '48px', maxWidth: '750px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                Let's collaborate to create something extraordinary. Reach out to us at <span style={{ color: 'var(--accent-quaternary)', fontWeight: 700 }}>{contact.email}</span> or follow our journey on Instagram <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700 }}>{contact.instagram}</span>.
              </p>
              <a href="/contact" className="btn btn-primary" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', padding: '16px 40px', display: 'inline-block' }}>
                Schedule a Consultation
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
