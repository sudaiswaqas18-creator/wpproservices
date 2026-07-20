import type {
  Testimonial,
  CaseStudy,
  Service,
  PricingPlan,
  FAQ,
  BlogPost,
  Industry,
  PortfolioItem,
} from './client';

export const fallbackData = {
  testimonials: [
    { id: 1, name: 'Sarah Mitchell', company: 'Horizon Analytics | USA', country: 'USA', quote: 'PixelForge delivered beyond expectations. Their team understood our analytics platform needs and built a WordPress site that converts visitors into qualified leads consistently.', metric_label: 'Monthly lead growth' },
    { id: 2, name: 'David Chen', company: 'SkillBridge Academy | Singapore', country: 'Singapore', quote: 'What impressed me most was their thorough discovery process. They asked questions we never considered and built an LMS that our students actually enjoy using.', metric_label: 'Student engagement' },
    { id: 3, name: 'Anna Kowalski', company: 'GreenPath Retail | Poland', country: 'Poland', quote: 'We migrated from a legacy platform with zero downtime. PixelForge handled every detail — speed, SEO, and checkout flow all improved dramatically.', metric_label: 'Checkout conversion' },
  ] as Testimonial[],

  caseStudies: [
    { id: 1, title: 'Smart Shipping Rules Boost Repeat Orders', client: 'FreshHarvest Market (E-commerce)', challenge: 'Repeat customers were charged shipping on every order, reducing cart completion and loyalty.', solution: 'Built a custom WooCommerce plugin that auto-applies free shipping for returning customers based on address history and order thresholds.', metric1_label: 'Returning Orders', metric1_value: '+38%', metric2_label: 'Cart Conversion', metric2_value: '+29%', metric3_label: 'Average Order Value', metric3_value: '+15%', slug: 'freshharvest-shipping' },
    { id: 2, title: 'Gated LMS for Private Education Community', client: 'EduVault Members', challenge: 'A closed learning community needed secure access, live sessions, and custom workflows beyond standard plugins.', solution: 'Developed a LearnDash-powered platform with bespoke access control, scheduling, and member-only content delivery.', metric1_label: 'Completion Rate', metric1_value: '+32%', metric2_label: 'Admin Time Saved', metric2_value: '-45%', metric3_label: 'Uptime', metric3_value: '99.9%', slug: 'eduvault-lms' },
  ] as CaseStudy[],

  services: [
    { id: 1, title: 'Website Design', subtitle: 'Build a powerful first impression', description: 'We craft user-friendly, modern, and conversion-focused WordPress websites that reflect your brand and engage your audience from the first click.', icon: 'palette' },
    { id: 2, title: 'Custom Development', subtitle: 'Beyond setup, built to perform', description: 'From optimized hosting to advanced WordPress architecture, we create secure, scalable environments that run flawlessly under real-world traffic.', icon: 'code' },
    { id: 3, title: 'Ongoing Maintenance', subtitle: 'Hassle-free website management', description: 'Regular updates, automated backups, and proactive security monitoring keep your site running smoothly without interruptions.', icon: 'shield' },
    { id: 4, title: 'Payment Integration', subtitle: 'Simplify online payments', description: 'We integrate Stripe, PayPal, Razorpay, and Authorize.net for seamless, secure checkout experiences your customers trust.', icon: 'credit-card' },
    { id: 5, title: 'Speed & SEO Optimization', subtitle: 'Rank higher, load faster', description: 'Core Web Vitals optimization, mobile-first design, and SEO best practices to drive organic traffic and conversions.', icon: 'zap' },
    { id: 6, title: 'Theme & Plugin Customization', subtitle: 'Tailored solutions for your needs', description: 'Custom themes, bespoke plugins, and extended functionality — WordPress shaped exactly to your business goals.', icon: 'puzzle' },
  ] as Service[],

  pricing: [
    { id: 1, name: 'Build & Launch', tagline: 'Built for businesses that need a robust, future-ready WordPress presence from day one.', price: '$4,200', original_price: '$6,800', discount_label: '38% Off', is_best_seller: true, features: ['Foundational SEO audit for launch readiness', 'Core keyword mapping & SEO-friendly structure', 'Website design & development — 5 key pages', 'Conversion-focused, responsive layouts', 'Complete setup, testing & launch', 'Google Analytics & Search Console setup'] },
    { id: 2, name: 'Re-Design & Convert', tagline: 'For sites with outdated design that aren\'t converting.', price: 'Custom Quote', original_price: '$5,200', discount_label: '45% Off', is_best_seller: false, features: ['Custom design tailored to your brand identity', 'CTA-focused wireframe planning', 'UX improvements for clarity & engagement', 'WordPress build with Elementor or Gutenberg', 'Advanced analytics & conversion reporting', 'SEO-optimized copywriting included'] },
  ] as PricingPlan[],

  faqs: [
    { id: 1, question: 'Does PixelForge provide custom themes and plugins?', answer: 'Yes. We design and develop custom WordPress themes aligned with your brand and build plugins that extend functionality exactly how your business needs.' },
    { id: 2, question: 'Why choose PixelForge for WordPress development?', answer: 'We specialize in scalable, conversion-focused WordPress websites. Our team combines design excellence with clean code and long-term maintainability.' },
    { id: 3, question: 'What is the cost of building a WordPress website?', answer: 'Cost varies by complexity, features, and customization. We provide detailed quotes after understanding your goals.' },
    { id: 4, question: 'How long does development typically take?', answer: 'Most projects take 4–8 weeks depending on scope — covering discovery, design, development, testing, and revisions.' },
  ] as FAQ[],

  blog: [
    { id: 1, title: 'How to Migrate WordPress Without Breaking Your SEO', slug: 'migrate-wordpress-seo', excerpt: 'Most migrations break something the founder discovers too late.', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600', published_at: '2025-06-12' },
    { id: 2, title: 'Website Redesign Checklist for Growing Businesses', slug: 'website-redesign-checklist', excerpt: 'Your website could be your biggest liability. Use this checklist before you scale.', image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600', published_at: '2025-05-15' },
    { id: 3, title: 'Why Stock WooCommerce Stops Working at Scale', slug: 'woocommerce-customization-scale', excerpt: 'Five customizations most founders need first when revenue crosses $1M ARR.', image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', published_at: '2025-04-08' },
  ] as BlogPost[],

  industries: [
    { id: 1, title: 'E-Commerce & Retail', description: 'Launch WooCommerce stores with sub-2-second load times and app-like mobile experiences.', has_case_study: true },
    { id: 2, title: 'Education & E-Learning', description: 'Interactive lessons, progress tracking, and mobile-first LMS interfaces.', has_case_study: false },
    { id: 3, title: 'Healthcare & Wellness', description: 'Patient-friendly navigation, online booking, and secure forms.', has_case_study: false },
    { id: 4, title: 'Corporate & B2B', description: 'Clear service showcases, lead-generation forms, and professional layouts.', has_case_study: true },
  ] as Industry[],

  portfolio: [
    { id: 1, title: 'Urban Brew Coffee', category: 'WooCommerce Store', image_url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800' },
    { id: 2, title: 'AccessAbility UK', category: 'Corporate Website', image_url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800' },
    { id: 3, title: 'LearnSphere Academy', category: 'LMS Dashboard', image_url: 'https://images.unsplash.com/photo-1501504905252-473a47ee5617?w=800' },
    { id: 4, title: 'NovaTech Solutions', category: 'B2B Portal', image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800' },
  ] as PortfolioItem[],
};

export async function fetchWithFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}
