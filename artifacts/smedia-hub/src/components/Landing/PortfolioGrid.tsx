import { useContent } from '@/lib/hooks/useContent';
import styles from './PortfolioGrid.module.css';

export default function PortfolioGrid() {
  const { content, loading } = useContent();

  const projects = content?.portfolio || [
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
      image: "https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=800"
    }
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
                <img src={project.image} alt={project.title} className={styles.image} />
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
