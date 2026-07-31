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
  testimonials: [] as Testimonial[],

  caseStudies: [
    {
      id: 1,
      title: 'Loyalty Shipping Rules That Cut Cart Friction',
      client: 'E-commerce Client — Retail',
      challenge: 'Returning shoppers paid shipping on every order, which hurt repeat checkouts.',
      solution:
        'Built WooCommerce rules that unlock free shipping for eligible returning customers using order history and address matching.',
      metric1_label: 'Repeat Checkouts',
      metric1_value: 'Improved',
      metric2_label: 'Cart Completion',
      metric2_value: 'Improved',
      metric3_label: 'Average Order Value',
      metric3_value: 'Improved',
      slug: 'freshharvest-shipping',
    },
    {
      id: 2,
      title: 'Member-Only LMS With Controlled Access',
      client: 'Education Client — Private Cohort',
      challenge: 'A private training community needed gated courses and admin tools beyond stock LMS plugins.',
      solution:
        'Delivered a LearnDash setup with custom access rules, scheduling helpers, and clearer progress views for members and staff.',
      metric1_label: 'Course Completions',
      metric1_value: 'Improved',
      metric2_label: 'Admin Hours',
      metric2_value: 'Reduced',
      metric3_label: 'Uptime',
      metric3_value: 'Stable',
      slug: 'eduvault-lms',
    },
  ] as CaseStudy[],

  services: [
    {
      id: 1,
      title: 'Custom WordPress Themes',
      subtitle: 'Editorial-ready front ends',
      description:
        'Block-friendly themes tailored to your brand, content types, and editor workflows — without fragile page-builder lock-in.',
      icon: 'palette',
    },
    {
      id: 2,
      title: 'WooCommerce Development',
      subtitle: 'Stores that stay maintainable',
      description:
        'Catalog structure, checkout UX, shipping logic, and payment integrations built for how your operations actually run.',
      icon: 'code',
    },
    {
      id: 3,
      title: 'WordPress Care & Updates',
      subtitle: 'Steady after launch',
      description:
        'Scheduled updates, backups, uptime checks, and small fixes so your site does not drift into plugin debt.',
      icon: 'shield',
    },
    {
      id: 4,
      title: 'Checkout & Payments',
      subtitle: 'Reliable purchase flows',
      description:
        'Stripe, PayPal, and related gateways wired carefully with testing for edge cases that break carts in production.',
      icon: 'credit-card',
    },
    {
      id: 5,
      title: 'Speed & Technical SEO',
      subtitle: 'Faster pages, clearer crawl paths',
      description:
        'Caching, image strategy, database cleanup, and on-page structure improvements aimed at Core Web Vitals and indexing health.',
      icon: 'zap',
    },
    {
      id: 6,
      title: 'Custom Plugin Development',
      subtitle: 'Features you cannot buy off the shelf',
      description:
        'Purpose-built plugins for pricing rules, memberships, integrations, and store workflows — documented for long-term ownership.',
      icon: 'puzzle',
    },
  ] as Service[],

  pricing: [
    {
      id: 1,
      name: 'Build & Launch',
      tagline: 'A solid WordPress foundation for marketing sites that need to ship cleanly.',
      price: '$4,200',
      original_price: '$6,800',
      discount_label: '38% Off',
      is_best_seller: true,
      features: [
        'Launch-ready SEO structure',
        'Core keyword mapping',
        'Up to 5 key page templates',
        'Responsive theme build',
        'Staging, QA & go-live',
        'Analytics & Search Console setup',
      ],
    },
    {
      id: 2,
      name: 'Re-Design & Convert',
      tagline: 'For WordPress sites that look dated or leak conversions.',
      price: 'Custom Quote',
      original_price: '$5,200',
      discount_label: '45% Off',
      is_best_seller: false,
      features: [
        'Brand-aligned redesign',
        'CTA-focused information architecture',
        'UX improvements for clarity',
        'Gutenberg or Elementor build',
        'Conversion reporting setup',
        'SEO-conscious copy support',
      ],
    },
  ] as PricingPlan[],

  faqs: [
    {
      id: 1,
      question: 'Do you build custom WordPress themes and plugins?',
      answer:
        'Yes. We design and develop custom themes and plugins when stock options cannot cover your workflow, pricing, or content model.',
    },
    {
      id: 2,
      question: 'Why work with a WordPress-focused studio?',
      answer:
        'We stay inside the WordPress ecosystem daily — WooCommerce, LearnDash, performance, and migrations — so delivery stays practical and maintainable.',
    },
    {
      id: 3,
      question: 'How is project pricing determined?',
      answer:
        'Scope, integrations, content volume, and timeline drive cost. After a short discovery call we provide a written estimate.',
    },
    {
      id: 4,
      question: 'How long does a typical build take?',
      answer:
        'Most marketing sites and mid-size stores take about 4–8 weeks from discovery through launch, depending on feedback cycles and content readiness.',
    },
  ] as FAQ[],

  blog: [
    {
      id: 1,
      title: 'A Safer WordPress Migration Checklist for SEO',
      slug: 'migrate-wordpress-seo',
      excerpt: 'Redirect maps, staging checks, and post-cutover Search Console habits that prevent ranking surprises.',
      image_url: '/section-images/blog-migrate-wordpress-seo.jpg',
      published_at: '2025-06-12',
    },
    {
      id: 2,
      title: 'When a WordPress Redesign Is Worth the Investment',
      slug: 'website-redesign-checklist',
      excerpt: 'Signals that your theme, UX, or conversion paths are costing more than a structured rebuild.',
      image_url: '/section-images/blog-website-redesign-checklist.jpg',
      published_at: '2025-05-15',
    },
    {
      id: 3,
      title: 'Where Stock WooCommerce Starts to Strain',
      slug: 'woocommerce-customization-scale',
      excerpt: 'Checkout friction, shipping rules, and plugin conflicts that show up as catalogs and traffic grow.',
      image_url: '/section-images/blog-woocommerce-customization-scale.jpg',
      published_at: '2025-04-08',
    },
    {
      id: 4,
      title: 'Core Web Vitals Fixes That Matter on WordPress',
      slug: 'core-web-vitals-wordpress',
      excerpt: 'Practical LCP, CLS, and INP improvements for theme and WooCommerce pages — not lab-only tips.',
      image_url: '/section-images/blog-core-web-vitals-wordpress.jpg',
      published_at: '2025-03-20',
    },
    {
      id: 5,
      title: 'Agency vs In-House WordPress Capacity',
      slug: 'hire-wordpress-agency',
      excerpt: 'How to decide between a retainer team and hiring when you need themes, plugins, and care coverage.',
      image_url: '/section-images/blog-hire-wordpress-agency.jpg',
      published_at: '2025-02-10',
    },
  ] as BlogPost[],

  industries: [
    {
      id: 1,
      title: 'E-Commerce & Retail',
      description: 'WooCommerce catalogs, checkout polish, and performance work for product-led businesses.',
      has_case_study: true,
    },
    {
      id: 2,
      title: 'Education & E-Learning',
      description: 'LearnDash and membership setups with clear progress tracking and gated content.',
      has_case_study: false,
    },
    {
      id: 3,
      title: 'Healthcare & Wellness',
      description: 'Accessible WordPress sites with booking forms and careful handling of sensitive content.',
      has_case_study: false,
    },
    {
      id: 4,
      title: 'Corporate & B2B',
      description: 'Service sites with lead capture, case study templates, and editor-friendly page patterns.',
      has_case_study: true,
    },
  ] as Industry[],

  portfolio: [
    { id: 1, title: 'E-commerce Client — Specialty Coffee', category: 'WooCommerce Store', image_url: '/section-images/portfolio-coffee.jpg' },
    { id: 2, title: 'Services Client — Corporate Site', category: 'Corporate Website', image_url: '/section-images/portfolio-corporate.jpg' },
    { id: 3, title: 'Education Client — LMS Dashboard', category: 'LMS Dashboard', image_url: '/section-images/portfolio-lms.jpg' },
    { id: 4, title: 'B2B Client — Member Portal', category: 'B2B Portal', image_url: '/section-images/portfolio-b2b.jpg' },
  ] as PortfolioItem[],

  awards: [
    { id: 1, title: '5-Star Client Feedback', organization: 'Reviews from delivered WordPress projects', year: 'Ongoing', badge_label: '5★' },
    { id: 2, title: 'WordPress Specialists', organization: 'Themes, plugins & WooCommerce focus', year: 'Daily', badge_label: 'WP' },
    { id: 3, title: 'Performance-First Builds', organization: 'Core Web Vitals checks before launch', year: 'Every launch', badge_label: 'CWV' },
    { id: 4, title: 'Trusted Delivery Partner', organization: 'Retainers, staging QA & clear handoffs', year: 'Long-term', badge_label: 'Care' },
    { id: 5, title: 'Secure Launch Standard', organization: 'Hardening, backups & update discipline', year: 'Standard', badge_label: 'Secure' },
  ],

  tools: [
    {
      id: 1,
      title: 'Core Web Vitals Scorecard',
      slug: 'speed-estimator',
      description: 'Estimate where your WordPress or WooCommerce pages lose time — LCP, CLS, and server response.',
      icon: 'zap',
      is_new: true,
    },
    {
      id: 2,
      title: 'WordPress Hardening Checklist',
      slug: 'security-checklist',
      description: 'Walk through login protection, file permissions, backups, and common misconfigurations before launch.',
      icon: 'shield',
      is_new: false,
    },
    {
      id: 3,
      title: 'Plugin Conflict Diagnostic',
      slug: 'plugin-troubleshooter',
      description: 'A structured isolation path to find which plugin or theme update broke your checkout or admin screens.',
      icon: 'bug',
      is_new: false,
    },
  ],

  guidebooks: [
    {
      id: 1,
      title: 'WordPress Pre-Launch Checklist (2026)',
      slug: 'pre-launch-checklist',
      description: 'Performance, SEO, security, and analytics checks to run before DNS cutover.',
      content: 'A practical launch checklist for WordPress site owners and agencies.',
      image_url: '/section-images/guidebook-pre-launch-checklist.jpg',
    },
    {
      id: 2,
      title: 'WooCommerce Core Web Vitals Playbook',
      slug: 'woocommerce-speed-playbook',
      description: 'Checkout, images, and query patterns that keep storefront pages responsive under load.',
      content: 'Field-tested notes for improving WooCommerce page experience.',
      image_url: '/section-images/guidebook-woocommerce-speed-playbook.jpg',
    },
  ],

  siteStats: [
    { stat_value: '180+', stat_label: 'WordPress Projects' },
    { stat_value: '14', stat_label: 'Countries Worked With' },
    { stat_value: '4.8★', stat_label: 'Client Satisfaction' },
    { stat_value: '8+', stat_label: 'Years on WordPress' },
  ],
};

export async function fetchWithFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}
