'use client';
import { useContent } from '@/lib/hooks/useContent';
import styles from './Services.module.css';

const SvgManagement = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

const SvgProduction = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.889L15 14"/>
    <rect x="1" y="6" width="15" height="12" rx="2"/>
  </svg>
);

const SvgBrand = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
  </svg>
);

const defaultServices = [
  { title: 'Social Media Management', description: 'Strategic growth and community engagement tailored to your brand voice. From content planning to analytics, we handle it all.', icon: <SvgManagement />, color: 'var(--accent-primary)' },
  { title: 'Multimedia Production', description: 'Cinematic video production and high-end photography that tells your story and stops the scroll.', icon: <SvgProduction />, color: 'var(--accent-tertiary)' },
  { title: 'Brand Identity', description: 'Developing a unique visual language that resonates with your target audience and builds lasting recognition.', icon: <SvgBrand />, color: 'var(--accent-secondary)' }
];

export default function Services() {
  const { content } = useContent();
  const services = content?.services || defaultServices;

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span className="text-grad">Specialties</span></h2>
          <p className={styles.subtitle}>Unified solutions designed to amplify your digital presence and drive meaningful results.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service: any, idx: number) => {
            const def = defaultServices[idx % defaultServices.length];
            return (
              <div key={idx} className={styles.card}>
                <div className={styles.iconWrapper} style={{ color: def?.color || 'var(--accent-primary)' }}>
                  {def?.icon || <SvgManagement />}
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
                <a href="#contact" className={styles.learnMore}>
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
