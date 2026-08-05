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
      client: 'Anonymized grocery WooCommerce store',
      challenge: 'Returning shoppers paid shipping on every order, which hurt repeat checkouts.',
      solution:
        'Built WooCommerce rules that unlock free shipping for eligible returning customers using order history and address matching.',
      metric1_label: 'Repeat Checkouts',
      metric1_value: 'Clearer rules',
      metric2_label: 'Cart Completion',
      metric2_value: 'Fewer blockers',
      metric3_label: 'Ops Effort',
      metric3_value: 'Less manual work',
      slug: 'grocery-loyalty-shipping',
      full_content:
        'Staging QA covered cart, coupons, and address edge cases before cutover. Editors received a short rule sheet so marketing could adjust thresholds without developer tickets.',
    },
    {
      id: 2,
      title: 'Member-Only LMS With Controlled Access',
      client: 'Anonymized private cohort LMS',
      challenge: 'A private training community needed gated courses and admin tools beyond stock LMS plugins.',
      solution:
        'Delivered a LearnDash setup with custom access rules, scheduling helpers, and clearer progress views for members and staff.',
      metric1_label: 'Course Access',
      metric1_value: 'Role-gated',
      metric2_label: 'Admin Hours',
      metric2_value: 'Fewer exceptions',
      metric3_label: 'Delivery',
      metric3_value: 'Staging-first',
      slug: 'cohort-lms-access',
      full_content:
        'Access rules were rehearsed with sample cohorts on staging. Staff handoff covered enrollment, drip schedules, and how to add a new cohort without breaking prior members.',
    },
    {
      id: 3,
      title: 'Event-Tied Cart Recovery for Apparel',
      client: 'Anonymized apparel WooCommerce store',
      challenge: 'Abandoned carts recovered poorly because reminders ignored real order and inventory events.',
      solution:
        'Wired recovery messaging to WooCommerce order lifecycle events so shoppers only saw offers that matched stock and checkout state.',
      metric1_label: 'Recovery Clarity',
      metric1_value: 'Event-tied',
      metric2_label: 'Checkout Path',
      metric2_value: 'Fewer dead ends',
      metric3_label: 'Ops Trust',
      metric3_value: 'Honest stock',
      slug: 'apparel-cart-recovery',
      full_content:
        'Templates and triggers were documented so marketing could pause campaigns without breaking transactional email. Staging covered guest and logged-in carts.',
    },
    {
      id: 4,
      title: 'Attribute-Driven Subscription Pricing',
      client: 'Anonymized specialty retail store',
      challenge: 'Subscription renewals ignored product attributes, creating manual pricing exceptions.',
      solution:
        'Extended WooCommerce subscription logic so renewals respected selected attributes with clearer admin controls.',
      metric1_label: 'Pricing Exceptions',
      metric1_value: 'Reduced',
      metric2_label: 'Renewals',
      metric2_value: 'Attribute-aware',
      metric3_label: 'Support Load',
      metric3_value: 'Fewer tickets',
      slug: 'attribute-subscription-pricing',
      full_content:
        'Admins received a short matrix of attribute → price behavior. Changes were staged against a sample subscription catalog before production.',
    },
    {
      id: 5,
      title: 'Wallet Checkout for Course Seats',
      client: 'Anonymized online course team',
      challenge: 'Team buyers struggled to assign seats after purchase without support intervention.',
      solution:
        'Built a wallet-style checkout and seat assignment flow so managers could allocate access after payment without custom tickets every time.',
      metric1_label: 'Seat Assignment',
      metric1_value: 'Self-serve',
      metric2_label: 'Support',
      metric2_value: 'Fewer handoffs',
      metric3_label: 'Checkout',
      metric3_value: 'Clearer path',
      slug: 'course-wallet-checkout',
      full_content:
        'Handoff covered wallet top-ups, seat limits, and how to refund unused seats. Staging validated guest vs organization buyers.',
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
      price: 'From $4,200',
      original_price: '',
      discount_label: '',
      is_best_seller: false,
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
      original_price: '',
      discount_label: '',
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
      description: 'WooCommerce catalogs, checkout paths, and shipping rules shaped for retailers that sell online and in-store.',
      has_case_study: true,
    },
    {
      id: 2,
      title: 'Education & E-Learning',
      description: 'LearnDash courses, drip schedules, and learner dashboards built for cohorts and self-paced programs.',
      has_case_study: true,
    },
    {
      id: 3,
      title: 'Healthcare & Wellness',
      description: 'WordPress sites with clear booking flows, accessible layouts, and form handling for clinics and wellness brands.',
      has_case_study: false,
    },
    {
      id: 4,
      title: 'Corporate & B2B',
      description: 'Service sites, lead capture, and member-style portals for teams that sell expertise, not just products.',
      has_case_study: true,
    },
    {
      id: 5,
      title: 'Hospitality & Travel',
      description: 'WordPress booking-friendly pages and destination storytelling without bloated page-builder stacks.',
      has_case_study: false,
    },
    {
      id: 6,
      title: 'Non-Profit & NGO',
      description: 'Donation-ready WordPress layouts, campaign pages, and editor-friendly storytelling templates.',
      has_case_study: false,
    },
    {
      id: 7,
      title: 'Real Estate',
      description: 'Listing-friendly WordPress structures, inquiry forms, and gallery-heavy property pages.',
      has_case_study: false,
    },
    {
      id: 8,
      title: 'Startup & Tech',
      description: 'Launch sites and product marketing pages on WordPress with room to add docs, blogs, and gated content.',
      has_case_study: false,
    },
  ] as Industry[],

  portfolio: [
    { id: 1, title: 'Specialty retail WooCommerce storefront', category: 'WooCommerce Store', image_url: '/section-images/portfolio-coffee.jpg' },
    { id: 2, title: 'Services company WordPress marketing site', category: 'Corporate Website', image_url: '/section-images/portfolio-corporate.jpg' },
    { id: 3, title: 'Course team LearnDash dashboard', category: 'LMS Dashboard', image_url: '/section-images/portfolio-lms.jpg' },
    { id: 4, title: 'B2B member catalog portal', category: 'B2B Portal', image_url: '/section-images/portfolio-b2b.jpg' },
  ] as PortfolioItem[],

  awards: [
    { id: 1, title: 'Written scopes before build', organization: 'Clear inclusions, exclusions, and success criteria for WordPress work', year: 'Every project', badge_label: 'Scope' },
    { id: 2, title: 'WordPress specialists', organization: 'Themes, plugins, WooCommerce, and LearnDash — not generic web packages', year: 'Daily focus', badge_label: 'WP' },
    { id: 3, title: 'Performance-minded launches', organization: 'Core Web Vitals reviewed on real templates before go-live', year: 'Pre-launch', badge_label: 'CWV' },
    { id: 4, title: 'Staging-first changes', organization: 'Meaningful updates reviewed on staging when hosting allows', year: 'Standard', badge_label: 'QA' },
    { id: 5, title: 'Secure launch habits', organization: 'Hardening, backups, and update discipline as part of delivery', year: 'Standard', badge_label: 'Secure' },
  ],

  tools: [
    {
      id: 1,
      title: 'Bug Fixing Bot',
      slug: 'bug-fixing-bot',
      description: 'Isolate common WordPress breakage — white screens, plugin clashes, and checkout errors — with a clear first-pass checklist.',
      icon: 'bug',
      is_new: true,
    },
    {
      id: 2,
      title: 'Design Bot',
      slug: 'design-bot',
      description: 'Explore WordPress page layouts and section ideas before theme build so stakeholders align on structure early.',
      icon: 'palette',
      is_new: false,
    },
    {
      id: 3,
      title: 'WordPress Consultation Bot',
      slug: 'consultation-bot',
      description: 'Get a second opinion on theme debt, WooCommerce limits, and retainer vs project trade-offs.',
      icon: 'message-circle',
      is_new: false,
    },
    {
      id: 4,
      title: 'Website Speed Analyzer',
      slug: 'speed-analyzer',
      description: 'Spot WordPress and WooCommerce bottlenecks across LCP, CLS, and heavy templates without guessing.',
      icon: 'zap',
      is_new: false,
    },
    {
      id: 5,
      title: 'Conversion Rate Audit Tool',
      slug: 'conversion-audit',
      description: 'Find friction on WordPress landing pages and WooCommerce checkout paths that quietly kill enquiries and orders.',
      icon: 'trending-up',
      is_new: false,
    },
    {
      id: 6,
      title: 'Security Vulnerability Scanner',
      slug: 'security-scanner',
      description: 'Surface common WordPress hardening gaps before they become downtime or malware cleanup work.',
      icon: 'shield',
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
    { stat_value: 'WordPress', stat_label: 'Custom themes & rebuilds' },
    { stat_value: 'WooCommerce', stat_label: 'Stores built for checkout' },
    { stat_value: 'Plugins', stat_label: 'Purpose-built store extensions' },
    { stat_value: 'Performance', stat_label: 'Core Web Vitals before launch' },
    { stat_value: 'Migrations', stat_label: 'Redirect maps & staging QA' },
    { stat_value: 'Care plans', stat_label: 'Updates, backups & retainers' },
  ],
};

export async function fetchWithFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}
