import { useContent } from '@/lib/hooks/useContent';
import styles from './PortfolioGrid.module.css';

const FALLBACK_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
};

function PortfolioImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const gradients = [
    'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)',
    'linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)',
    'linear-gradient(135deg, #f9cb28 0%, #ff4d4d 100%)',
    'linear-gradient(135deg, #00e5ff 0%, #7c4dff 100%)',
  ];

  if (!src) {
    return (
      <div
        className={styles.imagePlaceholder}
        style={{ background: gradients[index % gradients.length] }}
        aria-label={alt}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={styles.image}
      onError={e => {
        const img = e.currentTarget;
        img.style.display = 'none';
        const placeholder = img.nextElementSibling as HTMLElement;
        if (placeholder) placeholder.style.display = 'flex';
      }}
    />
  );
}

const DEFAULT_PORTFOLIO = [
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
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
  }
];

export default function PortfolioGrid() {
  const { content, loading } = useContent();

  const rawProjects = content?.portfolio;
  const projects = Array.isArray(rawProjects) && rawProjects.length > 0
    ? rawProjects.map((p: any, i: number) => ({
        ...DEFAULT_PORTFOLIO[i] ?? {},
        ...p,
        image: p.image || DEFAULT_PORTFOLIO[i]?.image || '',
      }))
    : DEFAULT_PORTFOLIO;

  const gradients = [
    'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)',
    'linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)',
    'linear-gradient(135deg, #f9cb28 0%, #ff4d4d 100%)',
    'linear-gradient(135deg, #00e5ff 0%, #7c4dff 100%)',
  ];

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Featured <span className="text-grad">Work</span></h2>
          <p className={styles.subtitle}>A glimpse into the impact we create for our partners.</p>
        </div>

        <div className={styles.grid}>
          {projects.map((project: any, i: number) => (
            <div key={i} className={`glass-hover ${styles.card}`}>
              <div className={styles.imageWrapper}>
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.image}
                      onError={e => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const sib = img.nextElementSibling as HTMLElement;
                        if (sib) sib.style.display = 'flex';
                      }}
                    />
                    <div
                      className={styles.imagePlaceholder}
                      style={{ display: 'none', background: gradients[i % gradients.length] }}
                    >
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                    </div>
                  </>
                ) : (
                  <div
                    className={styles.imagePlaceholder}
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                )}
                <div className={styles.overlay}>
                  <span className={styles.metric}>{project.metric}</span>
                </div>
              </div>
              <div className={styles.content}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
