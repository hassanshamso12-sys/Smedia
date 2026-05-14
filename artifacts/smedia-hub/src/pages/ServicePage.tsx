import { useParams } from 'wouter';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';
import BrandBadge from '@/components/UI/BrandBadge';
import { getServiceBySlug, services } from '@/lib/servicesData';
import styles from './ServicePage.module.css';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.12"/>
    <path d="M5 9l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ServicePage() {
  const params = useParams<{ slug: string }>();
  const service = getServiceBySlug(params.slug ?? '');

  if (!service) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Service not found</h1>
          <a href="/" className="btn btn-primary">Back to Home</a>
        </div>
      </div>
    );
  }

  const others = services.filter(s => s.slug !== service.slug);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ background: `radial-gradient(ellipse 60% 70% at 15% 50%, ${service.accentColor}14 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 85% 20%, ${service.accentColor}0a 0%, transparent 60%)` }} />
        <div className="container">
          <div className={styles.heroInner}>
            <a href="/#services" className={styles.backLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              All Services
            </a>
            <div className={styles.heroIconWrap} style={{ background: service.bgColor }}>
              <span className={styles.heroEmoji}>{service.icon}</span>
            </div>
            <BrandBadge />
            <h1 className={styles.heroTitle}>{service.label}</h1>
            <p className={styles.heroTagline} style={{ backgroundImage: service.gradient }}>{service.tagline}</p>
            <p className={styles.heroDesc}>{service.description}</p>
            <a href="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '15px 40px' }}>
              Get a Quote →
            </a>
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className={`section ${styles.offersSection}`}>
        <div className="container">
          <div className={styles.twoCol}>
            <div className={styles.offersLeft}>
              <h2 className={styles.sectionTitle}>What's <span className="text-grad">Included</span></h2>
              <p className={styles.sectionSub}>Everything we deliver as part of this service, from first briefing to final handoff.</p>
              <a href="/contact" className="btn btn-outline" style={{ marginTop: '32px' }}>
                Discuss Your Project
              </a>
            </div>
            <ul className={styles.offersList}>
              {service.offers.map((item, i) => (
                <li key={i} className={styles.offerItem} style={{ color: service.accentColor }}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className={`section ${styles.benefitsSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '16px' }}>
            Why Choose <span className="text-grad">S.media Hub</span>
          </h2>
          <p className={styles.sectionSub} style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px' }}>
            What sets our approach apart.
          </p>
          <div className={styles.benefitsGrid}>
            {service.benefits.map((b, i) => (
              <div key={i} className={`glass ${styles.benefitCard}`}>
                <div className={styles.benefitNum} style={{ backgroundImage: service.gradient }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitBody}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={`glass ${styles.ctaBox}`}>
            <h2>Ready to Get Started with <span className="text-grad">{service.label}?</span></h2>
            <p>Send us your brief and we'll come back with a tailored proposal within 24 hours.</p>
            <div className={styles.ctaActions}>
              <a href="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '15px 36px' }}>
                Book a Consultation
              </a>
              <a href="/about" className="btn btn-outline" style={{ padding: '15px 36px' }}>
                About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className={`section ${styles.otherSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle} style={{ marginBottom: '40px' }}>
            Explore Other <span className="text-grad">Services</span>
          </h2>
          <div className={styles.otherGrid}>
            {others.map(s => (
              <a key={s.slug} href={`/services/${s.slug}`} className={`glass ${styles.otherCard}`}>
                <div className={styles.otherIcon} style={{ background: s.bgColor }}>{s.icon}</div>
                <div>
                  <p className={styles.otherLabel}>{s.label}</p>
                  <p className={styles.otherTagline}>{s.tagline}</p>
                </div>
                <svg className={styles.otherArrow} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
