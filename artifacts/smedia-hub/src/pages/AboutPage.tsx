import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/Landing/Footer';
import styles from './About.module.css';

const services = [
  {
    label: 'Photography',
    desc: 'Editorial, product, and lifestyle shoots that capture your brand\'s soul — crafted for scroll-stopping impact across every platform.',
    gradient: 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)',
    bg: 'rgba(255,77,77,0.07)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="photoG1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4d4d"/>
            <stop offset="1" stopColor="#f9cb28"/>
          </linearGradient>
        </defs>
        {/* Camera body */}
        <rect x="8" y="24" width="64" height="44" rx="8" fill="url(#photoG1)" opacity="0.15"/>
        <rect x="8" y="24" width="64" height="44" rx="8" stroke="url(#photoG1)" strokeWidth="2.5"/>
        {/* Viewfinder bump */}
        <rect x="28" y="14" width="24" height="12" rx="4" fill="url(#photoG1)" opacity="0.25"/>
        <rect x="28" y="14" width="24" height="12" rx="4" stroke="url(#photoG1)" strokeWidth="2.5"/>
        {/* Lens outer ring */}
        <circle cx="40" cy="46" r="14" stroke="url(#photoG1)" strokeWidth="2.5"/>
        {/* Lens inner */}
        <circle cx="40" cy="46" r="8" fill="url(#photoG1)" opacity="0.2"/>
        <circle cx="40" cy="46" r="8" stroke="url(#photoG1)" strokeWidth="2"/>
        {/* Lens highlight */}
        <circle cx="44" cy="42" r="2.5" fill="white" opacity="0.7"/>
        {/* Flash */}
        <rect x="58" y="30" width="8" height="6" rx="2" fill="url(#photoG1)" opacity="0.5"/>
        {/* Shutter button */}
        <circle cx="18" cy="32" r="3" fill="url(#photoG1)" opacity="0.6"/>
      </svg>
    ),
  },
  {
    label: 'Videography',
    desc: 'Cinematic brand films, reels, and campaign videos that tell your story with professional-grade production from pre to post.',
    gradient: 'linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)',
    bg: 'rgba(124,77,255,0.07)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="videoG1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c4dff"/>
            <stop offset="1" stopColor="#00e5ff"/>
          </linearGradient>
        </defs>
        {/* Camera body */}
        <rect x="6" y="22" width="46" height="36" rx="8" fill="url(#videoG1)" opacity="0.12"/>
        <rect x="6" y="22" width="46" height="36" rx="8" stroke="url(#videoG1)" strokeWidth="2.5"/>
        {/* Lens */}
        <circle cx="29" cy="40" r="11" stroke="url(#videoG1)" strokeWidth="2.5"/>
        <circle cx="29" cy="40" r="6" fill="url(#videoG1)" opacity="0.2"/>
        <circle cx="29" cy="40" r="6" stroke="url(#videoG1)" strokeWidth="1.5"/>
        <circle cx="32" cy="37" r="2" fill="white" opacity="0.65"/>
        {/* Tape reel triangles on body */}
        <rect x="43" y="30" width="6" height="20" rx="2" fill="url(#videoG1)" opacity="0.2"/>
        {/* Viewfinder arm */}
        <path d="M52 28 L72 18 L72 62 L52 52" stroke="url(#videoG1)" strokeWidth="2.5" strokeLinejoin="round" fill="url(#videoG1)" fillOpacity="0.1"/>
        {/* Film strip notches */}
        <rect x="10" y="22" width="4" height="6" rx="1" fill="url(#videoG1)" opacity="0.35"/>
        <rect x="18" y="22" width="4" height="6" rx="1" fill="url(#videoG1)" opacity="0.35"/>
        <rect x="10" y="52" width="4" height="6" rx="1" fill="url(#videoG1)" opacity="0.35"/>
        <rect x="18" y="52" width="4" height="6" rx="1" fill="url(#videoG1)" opacity="0.35"/>
        {/* Record dot */}
        <circle cx="44" cy="26" r="3" fill="#ff4d4d" opacity="0.8"/>
      </svg>
    ),
  },
  {
    label: 'Content Creation',
    desc: 'Graphics, copy, short-form video, and creative assets built for every format — consistently on-brand and engineered to perform.',
    gradient: 'linear-gradient(135deg, #f9cb28 0%, #ff4d4d 100%)',
    bg: 'rgba(249,203,40,0.07)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="contentG1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f9cb28"/>
            <stop offset="1" stopColor="#ff4d4d"/>
          </linearGradient>
        </defs>
        {/* Pencil body */}
        <rect x="48" y="8" width="16" height="52" rx="4" transform="rotate(45 48 8)" fill="url(#contentG1)" opacity="0.18"/>
        <rect x="48" y="8" width="16" height="52" rx="4" transform="rotate(45 48 8)" stroke="url(#contentG1)" strokeWidth="2.5"/>
        {/* Pencil tip */}
        <path d="M14 66 L20 44 L36 60 Z" fill="url(#contentG1)" opacity="0.45"/>
        <path d="M14 66 L20 44 L36 60 Z" stroke="url(#contentG1)" strokeWidth="2"/>
        {/* Eraser band */}
        <line x1="54" y1="18" x2="62" y2="26" stroke="url(#contentG1)" strokeWidth="3" opacity="0.6"/>
        {/* Sparkles */}
        <path d="M64 10 L65.5 14 L70 10 L65.5 6 Z" fill="url(#contentG1)" opacity="0.8"/>
        <path d="M72 20 L73 23 L76 20 L73 17 Z" fill="url(#contentG1)" opacity="0.6"/>
        <path d="M60 4 L61 7 L64 4 L61 1 Z" fill="url(#contentG1)" opacity="0.5"/>
        {/* Squiggly lines representing text */}
        <path d="M8 46 Q12 42 16 46 Q20 50 24 46" stroke="url(#contentG1)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <path d="M8 54 Q12 50 16 54 Q20 58 24 54" stroke="url(#contentG1)" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    label: 'Brand Identity & Design',
    desc: 'Logos, colour systems, typography, and visual guidelines that forge a distinct identity your audience will instantly recognise and trust.',
    gradient: 'linear-gradient(135deg, #00e5ff 0%, #7c4dff 100%)',
    bg: 'rgba(0,229,255,0.07)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brandG1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00e5ff"/>
            <stop offset="1" stopColor="#7c4dff"/>
          </linearGradient>
        </defs>
        {/* Diamond / gem shape */}
        <polygon points="40,8 62,30 40,72 18,30" fill="url(#brandG1)" opacity="0.12"/>
        <polygon points="40,8 62,30 40,72 18,30" stroke="url(#brandG1)" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Gem facet top */}
        <polygon points="40,8 62,30 18,30" stroke="url(#brandG1)" strokeWidth="1.5" opacity="0.5"/>
        {/* Gem inner sparkle lines */}
        <line x1="40" y1="8" x2="40" y2="72" stroke="url(#brandG1)" strokeWidth="1" opacity="0.25"/>
        <line x1="29" y1="19" x2="51" y2="41" stroke="url(#brandG1)" strokeWidth="1" opacity="0.25"/>
        <line x1="51" y1="19" x2="29" y2="41" stroke="url(#brandG1)" strokeWidth="1" opacity="0.25"/>
        {/* Shine */}
        <polygon points="40,8 50,24 40,24 30,24" fill="white" opacity="0.18"/>
        {/* Sparkle dots */}
        <circle cx="68" cy="14" r="3" fill="url(#brandG1)" opacity="0.7"/>
        <circle cx="12" cy="14" r="2" fill="url(#brandG1)" opacity="0.5"/>
        <circle cx="72" cy="50" r="2" fill="url(#brandG1)" opacity="0.4"/>
      </svg>
    ),
  },
  {
    label: 'Social Media Marketing',
    desc: 'Full-funnel social strategies across Instagram, TikTok, X, and more — blending data and creativity to grow your audience and drive conversions.',
    gradient: 'linear-gradient(135deg, #ff4d4d 0%, #7c4dff 100%)',
    bg: 'rgba(255,77,77,0.07)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="socialG1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4d4d"/>
            <stop offset="1" stopColor="#7c4dff"/>
          </linearGradient>
        </defs>
        {/* Rocket body */}
        <path d="M40 8 C52 8 62 20 62 36 L62 52 L40 68 L18 52 L18 36 C18 20 28 8 40 8Z" fill="url(#socialG1)" opacity="0.13"/>
        <path d="M40 8 C52 8 62 20 62 36 L62 52 L40 68 L18 52 L18 36 C18 20 28 8 40 8Z" stroke="url(#socialG1)" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Window */}
        <circle cx="40" cy="34" r="8" stroke="url(#socialG1)" strokeWidth="2.5"/>
        <circle cx="40" cy="34" r="4" fill="url(#socialG1)" opacity="0.3"/>
        <circle cx="42" cy="32" r="1.5" fill="white" opacity="0.7"/>
        {/* Fins */}
        <path d="M18 52 L8 62 L18 62 Z" fill="url(#socialG1)" opacity="0.35"/>
        <path d="M62 52 L72 62 L62 62 Z" fill="url(#socialG1)" opacity="0.35"/>
        {/* Flame */}
        <path d="M32 68 Q40 80 48 68" fill="url(#socialG1)" opacity="0.5"/>
        {/* Social dots orbiting */}
        <circle cx="12" cy="28" r="4" stroke="url(#socialG1)" strokeWidth="2"/>
        <circle cx="68" cy="28" r="4" stroke="url(#socialG1)" strokeWidth="2"/>
        <circle cx="40" cy="10" r="3" fill="url(#socialG1)" opacity="0.6"/>
        {/* Connecting lines */}
        <line x1="16" y1="28" x2="24" y2="32" stroke="url(#socialG1)" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2"/>
        <line x1="64" y1="28" x2="56" y2="32" stroke="url(#socialG1)" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    label: 'Studio Rental',
    desc: 'A fully equipped professional space available for your shoots — lighting rigs, backdrops, and gear ready so you can focus on creating.',
    gradient: 'linear-gradient(135deg, #f9cb28 0%, #00e5ff 100%)',
    bg: 'rgba(249,203,40,0.07)',
    icon: (
      <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="studioG1" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f9cb28"/>
            <stop offset="1" stopColor="#00e5ff"/>
          </linearGradient>
        </defs>
        {/* Building */}
        <rect x="12" y="28" width="56" height="44" rx="4" fill="url(#studioG1)" opacity="0.1"/>
        <rect x="12" y="28" width="56" height="44" rx="4" stroke="url(#studioG1)" strokeWidth="2.5"/>
        {/* Roof / triangle */}
        <path d="M8 30 L40 10 L72 30" stroke="url(#studioG1)" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* Door */}
        <rect x="30" y="52" width="20" height="20" rx="3" stroke="url(#studioG1)" strokeWidth="2"/>
        <circle cx="46" cy="62" r="1.5" fill="url(#studioG1)" opacity="0.7"/>
        {/* Windows */}
        <rect x="16" y="36" width="14" height="12" rx="2" stroke="url(#studioG1)" strokeWidth="1.5" opacity="0.7"/>
        <rect x="50" y="36" width="14" height="12" rx="2" stroke="url(#studioG1)" strokeWidth="1.5" opacity="0.7"/>
        {/* Studio light */}
        <circle cx="40" cy="8" r="5" fill="url(#studioG1)" opacity="0.5"/>
        <line x1="40" y1="13" x2="40" y2="28" stroke="url(#studioG1)" strokeWidth="2" opacity="0.4"/>
        {/* Light rays */}
        <path d="M36 14 L28 22" stroke="url(#studioG1)" strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
        <path d="M44 14 L52 22" stroke="url(#studioG1)" strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
        <path d="M34 12 L24 16" stroke="url(#studioG1)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
        <path d="M46 12 L56 16" stroke="url(#studioG1)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const values = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    color: 'var(--accent-primary)',
    title: 'Strategy First',
    description: 'Every project starts with a deep understanding of your goals, audience, and market — so every creative decision drives real growth.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    color: 'var(--accent-tertiary)',
    title: 'Creative Production',
    description: 'From cinematic videography to editorial photography, our in-house production team delivers visuals that stop the scroll and tell your story.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: 'var(--accent-secondary)',
    title: 'Community & Growth',
    description: 'We build engaged communities, not just follower counts — through authentic storytelling, data-driven posting, and real-time analytics.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: 'var(--accent-quaternary)',
    title: 'Quality Without Compromise',
    description: 'Whether it\'s a social reel or a full brand identity system, we hold every deliverable to a high standard — because your brand deserves it.',
  },
];

const team = [
  {
    name: 'Maya Haddad',
    post: 'Founder & Creative Director',
    bio: 'Leads the studio vision and creative direction.',
    bio2: 'Shapes brand stories with strategy and polish.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Karim Saad',
    post: 'Head of Production',
    bio: 'Directs shoots and manages visual output.',
    bio2: 'Keeps every delivery sharp, timely, and consistent.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Nour El Sayegh',
    post: 'Brand Strategist',
    bio: 'Builds positioning and campaign frameworks.',
    bio2: 'Turns ideas into clear, engaging brand systems.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rami Fakhoury',
    post: 'Content Producer',
    bio: 'Creates social-first content and edits.',
    bio2: 'Focuses on visuals that connect and convert.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.eyebrow}>Who We Are</span>
          <h1 className={styles.heroTitle}>
            More Than a <br />
            <span className="text-grad">Marketing Agency</span>
          </h1>
          <p className={styles.heroBody}>
            At S.media Hub, we combine creativity, strategy, and production under one roof.
            From building brand identities and managing digital presence to producing
            high-quality photography and videography, we provide businesses and creators
            with the tools, visuals, and space they need to grow professionally.
          </p>
          <div className={styles.heroActions}>
            <a href="/contact" className="btn btn-primary">Work With Us</a>
            <a href="#what-we-do" className="btn btn-outline">What We Do</a>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.storyText}>
            <span className={styles.eyebrow}>Our Story</span>
            <h2>S.media Hub is built for brands that want to stand out.</h2>
            <p>
              S.media Hub is a creative studio and digital marketing agency based in Beirut,
              dedicated to helping brands, businesses, and creators establish a strong and
              professional presence in today’s digital world.
            </p>
            <p>
              What began as a passion for content creation and marketing evolved into a
              multi-service creative hub offering photography, videography, branding and studio
              rental services. Our mission is to create impactful visual experiences and strategic
              digital solutions that help businesses grow.
            </p>
            <p>
              At S.media Hub, we value creativity, innovation, and authenticity. Every project is
              approached with attention to detail, creative thinking, and a commitment to quality,
              ensuring that every brand we work with is represented in the best possible way.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="what-we-do" className={`section ${styles.pillarsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Everything Under <span className="text-grad">One Roof</span></h2>
            <p>We handle every layer of your brand's presence — so you can focus on what you do best.</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap} style={{ background: s.bg }}>
                  {s.icon}
                </div>
                <div className={styles.serviceInfo}>
                  <h3 className={styles.serviceTitle} style={{ backgroundImage: s.gradient }}>{s.label}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How We <span className="text-grad">Think & Work</span></h2>
            <p>The principles that shape every project we take on.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={`glass-hover ${styles.valueCard}`}>
                <div className={styles.valueIcon} style={{ color: v.color }}>
                  {v.icon}
                </div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Our Team</span>
            <h2>Our team</h2>
            <p>Meet the people behind the visuals, strategy, and production.</p>
          </div>

          <div className={styles.teamGrid}>
            {team.map(member => (
              <article key={member.name} className={styles.teamCard}>
                <img className={styles.teamPhoto} src={member.photo} alt={member.name} />
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.teamPost}>{member.post}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <p className={styles.teamBio}>{member.bio2}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={`glass ${styles.ctaBox}`}>
            <h2>Ready to Grow <span className="text-grad">Professionally?</span></h2>
            <p>Tell us about your brand and let's build something that lasts.</p>
            <a href="/contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
