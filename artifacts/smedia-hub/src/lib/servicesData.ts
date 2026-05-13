export interface ServiceData {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  gradient: string;
  accentColor: string;
  bgColor: string;
  offers: string[];
  benefits: { title: string; body: string }[];
  icon: string; // emoji fallback for nav
}

export const services: ServiceData[] = [
  {
    slug: 'photography',
    label: 'Photography',
    tagline: 'Visuals that stop the scroll.',
    description:
      'Professional photography tailored to your brand — from product and lifestyle shoots to editorial campaigns. Every frame is crafted to communicate quality and drive action.',
    gradient: 'linear-gradient(135deg, #ff4d4d 0%, #f9cb28 100%)',
    accentColor: '#ff4d4d',
    bgColor: 'rgba(255,77,77,0.07)',
    icon: '📷',
    offers: [
      'Product & e-commerce photography',
      'Lifestyle and brand shoots',
      'Editorial and campaign photography',
      'Social media content packages',
      'Professional lighting & studio setup',
      'Edited, export-ready final images',
    ],
    benefits: [
      { title: 'Studio-Quality Results', body: 'Shot in our fully-equipped studio or on location — every image is polished to the highest standard.' },
      { title: 'Brand-Consistent', body: 'We align every shot with your brand guidelines, colours, and visual language so your feed looks unified.' },
      { title: 'Fast Turnaround', body: 'Edited galleries delivered within 3–5 business days so you can start publishing immediately.' },
    ],
  },
  {
    slug: 'videography',
    label: 'Videography',
    tagline: 'Stories told in motion.',
    description:
      'Cinematic brand films, social reels, product demos, and campaign videos — produced from concept to final cut. We capture the emotion and energy behind your brand and turn it into content that converts.',
    gradient: 'linear-gradient(135deg, #7c4dff 0%, #00e5ff 100%)',
    accentColor: '#7c4dff',
    bgColor: 'rgba(124,77,255,0.07)',
    icon: '🎬',
    offers: [
      'Brand films and company stories',
      'Short-form reels and TikTok content',
      'Product showcase and demo videos',
      'Event and behind-the-scenes coverage',
      'Script, storyboard, and direction',
      'Full post-production and colour grading',
    ],
    benefits: [
      { title: 'End-to-End Production', body: 'We handle everything from script to final export — no briefing multiple agencies.' },
      { title: 'Platform-Optimised', body: 'Deliverables sized and formatted for Instagram, TikTok, YouTube, and beyond.' },
      { title: 'Cinematic Quality', body: 'Shot with professional cameras and stabilised rigs — not a smartphone in sight.' },
    ],
  },
  {
    slug: 'content-creation',
    label: 'Content Creation',
    tagline: 'Content that connects and converts.',
    description:
      'Graphics, copywriting, short-form video, and creative assets — built for every platform and format. Consistently on-brand, data-informed, and designed to perform in today\'s fast-moving feeds.',
    gradient: 'linear-gradient(135deg, #f9cb28 0%, #ff4d4d 100%)',
    accentColor: '#f9cb28',
    bgColor: 'rgba(249,203,40,0.07)',
    icon: '✏️',
    offers: [
      'Social media graphics and templates',
      'Caption writing and copywriting',
      'Story and reel creative production',
      'Monthly content calendars',
      'Infographics and data visuals',
      'Email and newsletter content',
    ],
    benefits: [
      { title: 'Consistent Posting', body: 'A steady flow of ready-to-publish content keeps your audience engaged without the last-minute scramble.' },
      { title: 'Performance-Driven', body: 'We analyse what works for your audience and refine the content strategy every month.' },
      { title: 'Multi-Platform Ready', body: 'Every piece of content is adapted for each platform\'s format, ratio, and algorithm preferences.' },
    ],
  },
  {
    slug: 'brand-identity-design',
    label: 'Brand Identity & Design',
    tagline: 'A brand your audience will never forget.',
    description:
      'Logos, colour systems, typography, and visual guidelines that forge a distinct identity. We build brand systems that scale — from your first Instagram post to a full campaign rollout.',
    gradient: 'linear-gradient(135deg, #00e5ff 0%, #7c4dff 100%)',
    accentColor: '#00e5ff',
    bgColor: 'rgba(0,229,255,0.07)',
    icon: '💎',
    offers: [
      'Logo design and brand mark creation',
      'Colour palette and typography system',
      'Brand guidelines document',
      'Social media profile kit',
      'Business card and stationery design',
      'Brand refresh and evolution',
    ],
    benefits: [
      { title: 'Strategic Foundation', body: 'Every design decision is rooted in your target audience, market position, and long-term vision.' },
      { title: 'Complete Toolkit', body: 'You receive a full brand kit — files, guidelines, and templates — ready to hand to any designer or printer.' },
      { title: 'Timeless Design', body: 'We focus on identity systems that stay relevant for years, not just the current trend cycle.' },
    ],
  },
  {
    slug: 'social-media-marketing',
    label: 'Social Media Marketing',
    tagline: 'Grow your audience. Drive real results.',
    description:
      'Full-funnel social strategies across Instagram, TikTok, X, and more — blending data and creativity to grow your following, boost engagement, and convert followers into customers.',
    gradient: 'linear-gradient(135deg, #ff4d4d 0%, #7c4dff 100%)',
    accentColor: '#ff4d4d',
    bgColor: 'rgba(255,77,77,0.07)',
    icon: '🚀',
    offers: [
      'Social media strategy and roadmap',
      'Account setup and optimisation',
      'Community management and engagement',
      'Paid social ad campaigns',
      'Influencer sourcing and coordination',
      'Monthly analytics and performance reports',
    ],
    benefits: [
      { title: 'Data-Led Decisions', body: 'We track every metric that matters and adjust strategy weekly — no guesswork, just growth.' },
      { title: 'Community First', body: 'Authentic engagement builds loyalty. We respond, interact, and nurture your community daily.' },
      { title: 'Transparent Reporting', body: 'Monthly reports in plain English — reach, engagement, conversions, and what\'s next.' },
    ],
  },
  {
    slug: 'studio-rental',
    label: 'Studio Rental',
    tagline: 'A professional space, ready when you are.',
    description:
      'A fully equipped studio available for your shoots by the hour or day. Lighting rigs, backdrops, and professional gear are all set up — you just bring your vision.',
    gradient: 'linear-gradient(135deg, #f9cb28 0%, #00e5ff 100%)',
    accentColor: '#f9cb28',
    bgColor: 'rgba(249,203,40,0.07)',
    icon: '🏠',
    offers: [
      'Hourly and full-day booking options',
      'Professional lighting rigs included',
      'Multiple backdrop options (colours & cyclorama)',
      'Changing room and styling area',
      'High-speed Wi-Fi and tethering setup',
      'On-site support available on request',
    ],
    benefits: [
      { title: 'Fully Equipped', body: 'Everything you need is already here — no hiring gear separately or hauling equipment across the city.' },
      { title: 'Flexible Booking', body: 'Book by the hour for quick shoots or take the whole day for larger productions. Last-minute slots available.' },
      { title: 'Private & Professional', body: 'Your shoot, your space. The studio is exclusively yours during your booking — no shared time.' },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find(s => s.slug === slug);
}
