/** Homepage trust signals — honest delivery standards only (never invent award names or star ratings). */
export const TRUST_AWARDS = [
  {
    id: 1,
    title: 'Written scopes before build',
    organization: 'Clear inclusions, exclusions, and success criteria for WordPress work',
    year: 'Every project',
    badge_label: 'Scope',
  },
  {
    id: 2,
    title: 'WordPress specialists',
    organization: 'Themes, plugins, WooCommerce, and LearnDash — not generic web packages',
    year: 'Daily focus',
    badge_label: 'WP',
  },
  {
    id: 3,
    title: 'Performance-minded launches',
    organization: 'Core Web Vitals reviewed on real templates before go-live',
    year: 'Pre-launch',
    badge_label: 'CWV',
  },
  {
    id: 4,
    title: 'Staging-first changes',
    organization: 'Meaningful updates reviewed on staging when hosting allows',
    year: 'Standard',
    badge_label: 'QA',
  },
  {
    id: 5,
    title: 'Secure launch habits',
    organization: 'Hardening, backups, and update discipline as part of delivery',
    year: 'Standard',
    badge_label: 'Secure',
  },
] as const;

export interface CaseStudyMedia {
  image_url: string;
  image_alt: string;
  client_label: string;
  result_summary: string;
  tech_stack: string;
}

/**
 * Local images live in `frontend/public/section-images/`.
 * Replace any file with the same filename — no code change needed.
 */
export const CASE_STUDY_MEDIA: Record<string, CaseStudyMedia> = {
  'grocery-loyalty-shipping': {
    image_url: '/section-images/case-grocery.jpg',
    image_alt: 'Grocery shelves for a WooCommerce loyalty shipping case study',
    client_label: 'Anonymized grocery WooCommerce store',
    result_summary: 'Loyalty shipping rules clarified without manual coupons',
    tech_stack: 'WooCommerce + Custom PHP',
  },
  'cohort-lms-access': {
    image_url: '/section-images/case-lms.jpg',
    image_alt: 'Learners collaborating for a gated LearnDash LMS case study',
    client_label: 'Anonymized private cohort LMS',
    result_summary: 'Member access rules and progress views clarified',
    tech_stack: 'LearnDash + Custom Theme',
  },
  'apparel-cart-recovery': {
    image_url: '/section-images/case-apparel.jpg',
    image_alt: 'Apparel retail floor for a WooCommerce cart recovery case study',
    client_label: 'Anonymized apparel WooCommerce store',
    result_summary: 'Cart recovery tied to real WooCommerce order events',
    tech_stack: 'Custom Plugin + Email API',
  },
  'attribute-subscription-pricing': {
    image_url: '/section-images/case-optics.jpg',
    image_alt: 'Eyewear display for attribute-driven WooCommerce subscriptions',
    client_label: 'Anonymized specialty retail store',
    result_summary: 'Subscription pricing driven by selected attributes',
    tech_stack: 'WooCommerce Subscriptions + Custom Logic',
  },
  'course-wallet-checkout': {
    image_url: '/section-images/case-courses.jpg',
    image_alt: 'Student studying online for wallet-based course checkout',
    client_label: 'Anonymized online course team',
    result_summary: 'Wallet checkout and team seat assignment simplified',
    tech_stack: 'WordPress LMS + Wallet Checkout',
  },
};

/** Old invented-brand slugs → current SEO-safe slugs (live DB may still have legacy rows) */
const CASE_STUDY_SLUG_ALIASES: Record<string, string> = {
  'freshharvest-shipping': 'grocery-loyalty-shipping',
  'eduvault-lms': 'cohort-lms-access',
  'stylebox-cart-recovery': 'apparel-cart-recovery',
  'clearview-subscriptions': 'attribute-subscription-pricing',
  'learnpoint-wallet': 'course-wallet-checkout',
};

export function normalizeCaseStudySlug(slug: string | null | undefined): string {
  if (!slug) return '';
  return CASE_STUDY_SLUG_ALIASES[slug] || slug;
}

export function getCaseStudyMedia(slug: string): CaseStudyMedia {
  const key = normalizeCaseStudySlug(slug);
  return (
    CASE_STUDY_MEDIA[key] ?? {
      image_url: '/section-images/case-courses.jpg',
      image_alt: 'WordPress project workspace for an agency case study',
      client_label: 'Anonymized WordPress engagement',
      result_summary: 'Outcomes documented after staging QA and launch',
      tech_stack: 'WordPress',
    }
  );
}

/** Plugin card images — local files in /section-images */
export const PRODUCT_IMAGES: Record<string, { image_url: string; image_alt: string }> = {
  'quote-flow-pro': {
    image_url: '/section-images/plugin-quotes.jpg',
    image_alt: 'Store counter conversation for WooCommerce product quote enquiries',
  },
  'smart-pricing': {
    image_url: '/section-images/plugin-pricing.jpg',
    image_alt: 'Analytics charts for role-based WooCommerce pricing',
  },
  bundlecraft: {
    image_url: '/section-images/plugin-bundles.jpg',
    image_alt: 'Gift and shopping bags for WooCommerce product bundles',
  },
  'sales-boost-pack': {
    image_url: '/section-images/plugin-urgency.jpg',
    image_alt: 'Campaign planning desk for WooCommerce urgency tools',
  },
  'stock-alert-pro': {
    image_url: '/section-images/plugin-stock.jpg',
    image_alt: 'Warehouse racks for WooCommerce low-stock alerts',
  },
  'review-boost': {
    image_url: '/section-images/plugin-reviews.jpg',
    image_alt: 'Team reviewing feedback for WooCommerce review collection',
  },
  subscripto: {
    image_url: '/section-images/plugin-subscriptions.jpg',
    image_alt: 'Billing paperwork for WooCommerce subscription management',
  },
  'checkout-flow': {
    image_url: '/section-images/plugin-checkout.jpg',
    image_alt: 'Mobile payment moment for one-page WooCommerce checkout',
  },
  'catalog-cloak': {
    image_url: '/section-images/plugin-catalog-cloak.jpg',
    image_alt: 'Organized product shelves representing role-gated WooCommerce catalog visibility',
  },
  'relate-lane': {
    image_url: '/section-images/plugin-relate-lane.jpg',
    image_alt: 'Curated retail product display for rule-based related WooCommerce products',
  },
  'kit-lane': {
    image_url: '/section-images/plugin-kit-lane.jpg',
    image_alt: 'Component parts kit for inventory-honest WooCommerce product kits',
  },
  'sticky-lane': {
    image_url: '/section-images/plugin-sticky-lane.jpg',
    image_alt: 'Secure online payment moment supporting sticky add-to-cart conversion',
  },
  'banner-forge': {
    image_url: '/section-images/plugin-banner-forge.jpg',
    image_alt: 'Editorial campaign imagery for scheduled WooCommerce banner slots',
  },
  'stock-map': {
    image_url: '/section-images/plugin-stock-map.jpg',
    image_alt: 'Warehouse forklift and pallet racks for multi-location WooCommerce stock',
  },
  'restock-pulse': {
    image_url: '/section-images/plugin-restock-pulse.jpg',
    image_alt: 'Planning board and charts for WooCommerce restock digests',
  },
  'seal-strip': {
    image_url: '/section-images/plugin-seal-strip.jpg',
    image_alt: 'Checkout UI with trust cues near complete-order actions',
  },
  'cycle-flex': {
    image_url: '/section-images/plugin-cycle-flex.jpg',
    image_alt: 'Delivered parcel moment for pause and skip subscription controls',
  },
  'tier-access': {
    image_url: '/section-images/plugin-tier-access.jpg',
    image_alt: 'Membership stamp graphic for WooCommerce tiered catalog access',
  },
};

export function getProductImage(slug: string, fallbackUrl?: string) {
  return PRODUCT_IMAGES[slug] ?? {
    image_url: fallbackUrl || '/section-images/plugin-quotes.jpg',
    image_alt: 'WooCommerce plugin for WordPress online stores',
  };
}

/**
 * Service card / detail images — put files in `public/section-images/services/`
 * with the exact filename listed below (JPG or WebP ok if you keep the name).
 */
export const SERVICE_IMAGES: Record<string, { file: string; image_alt: string; downloadHint: string }> = {
  'wordpress-website-development': {
    file: 'service-wordpress-website-development.jpg',
    image_alt: 'Custom WordPress website design on a laptop screen',
    downloadHint: 'Laptop showing modern website mockup / web design workspace',
  },
  'wordpress-setup': {
    file: 'service-wordpress-setup.jpg',
    image_alt: 'Clean WordPress installation and setup on a computer',
    downloadHint: 'WordPress dashboard on monitor OR fresh website launch checklist on desk',
  },
  'woocommerce-setup': {
    file: 'service-woocommerce-setup.jpg',
    image_alt: 'Online store product grid ready for WooCommerce setup',
    downloadHint: 'E-commerce product listing / online shop on laptop',
  },
  'learndash-setup': {
    file: 'service-learndash-setup.jpg',
    image_alt: 'Online course platform setup for LearnDash LMS',
    downloadHint: 'Online course / e-learning platform on tablet or laptop',
  },
  'wordpress-customization': {
    file: 'service-wordpress-customization.jpg',
    image_alt: 'Developer customizing a WordPress theme layout',
    downloadHint: 'Web designer editing website layout / Figma to browser',
  },
  'woocommerce-customization': {
    file: 'service-woocommerce-customization.jpg',
    image_alt: 'Custom WooCommerce checkout and cart experience',
    downloadHint: 'Shopping cart / checkout page on laptop or phone',
  },
  'learndash-customization': {
    file: 'service-learndash-customization.jpg',
    image_alt: 'Customized online learning dashboard for students',
    downloadHint: 'Student dashboard / progress tracking on screen',
  },
  'wordpress-migration': {
    file: 'service-wordpress-migration.jpg',
    image_alt: 'Website migration and data transfer concept',
    downloadHint: 'Cloud transfer / moving files / server migration visual',
  },
  'migrate-woocommerce': {
    file: 'service-migrate-woocommerce.jpg',
    image_alt: 'Moving an online store catalog to WooCommerce',
    downloadHint: 'Online shopping bags with laptop / store migration',
  },
  'migrate-learndash': {
    file: 'service-migrate-learndash.jpg',
    image_alt: 'Migrating courses and learners into LearnDash',
    downloadHint: 'Students with laptops / transferring education content',
  },
  'wordpress-maintenance': {
    file: 'service-wordpress-maintenance.jpg',
    image_alt: 'WordPress site maintenance and updates',
    downloadHint: 'IT support / software updates / wrench with laptop',
  },
  'website-management': {
    file: 'service-website-management.jpg',
    image_alt: 'Ongoing website management for a business site',
    downloadHint: 'Team managing website content / content calendar desk',
  },
  'hire-wordpress-developers': {
    file: 'service-hire-wordpress-developers.jpg',
    image_alt: 'WordPress developers collaborating on code',
    downloadHint: 'Developers pair programming / coding team at desks',
  },
  'hire-woocommerce-developers': {
    file: 'service-hire-woocommerce-developers.jpg',
    image_alt: 'E-commerce developers working on a WooCommerce store',
    downloadHint: 'Developers with shopping / e-commerce analytics screens',
  },
  'hire-learndash-developers': {
    file: 'service-hire-learndash-developers.jpg',
    image_alt: 'LMS developers building education features',
    downloadHint: 'Education tech team / developers with classroom screen',
  },
  'wordpress-redesign': {
    file: 'service-wordpress-redesign.jpg',
    image_alt: 'Website redesign wireframes and new WordPress UI',
    downloadHint: 'Before-after website redesign / wireframes on desk',
  },
  'landing-page-redesign': {
    file: 'service-landing-page-redesign.jpg',
    image_alt: 'High-converting landing page design on screen',
    downloadHint: 'Marketing landing page mockup / conversion page design',
  },
  'wordpress-speed-optimization': {
    file: 'service-wordpress-speed-optimization.jpg',
    image_alt: 'Website speed and Core Web Vitals performance work',
    downloadHint: 'Fast loading / speedometer / performance analytics chart',
  },
  'woocommerce-speed-optimization': {
    file: 'service-woocommerce-speed-optimization.jpg',
    image_alt: 'Fast WooCommerce product and checkout pages',
    downloadHint: 'Mobile shopping with speed / stopwatch e-commerce',
  },
  'api-integrations': {
    file: 'service-api-integrations.jpg',
    image_alt: 'API and system integrations connected to WordPress',
    downloadHint: 'Connected apps / API network / integration nodes',
  },
  'wordpress-ai-automation': {
    file: 'service-wordpress-ai-automation.jpg',
    image_alt: 'Workflow automation for WordPress operations',
    downloadHint: 'Automation workflow / AI assistant with laptop (no brand logos)',
  },
  'wordpress-seo-services': {
    file: 'service-wordpress-seo-services.jpg',
    image_alt: 'WordPress SEO and search ranking work',
    downloadHint: 'SEO analytics / search ranking graph / keyword research desk',
  },
  'plugin-development': {
    file: 'service-plugin-development.jpg',
    image_alt: 'Custom WordPress plugin development on a code editor',
    downloadHint: 'PHP code editor / developer writing plugin code',
  },
  'woocommerce-development': {
    file: 'service-woocommerce-development.jpg',
    image_alt: 'Full WooCommerce store development workspace',
    downloadHint: 'Building online store / e-commerce website on dual monitors',
  },
  'learndash-development': {
    file: 'service-learndash-development.jpg',
    image_alt: 'Full LearnDash LMS platform development',
    downloadHint: 'Building online academy / course platform UI on screen',
  },
};

export function getServiceImage(slug: string) {
  const entry = SERVICE_IMAGES[slug];
  if (!entry) {
    return {
      image_url: '/section-images/services/service-wordpress-website-development.jpg',
      image_alt: 'WordPress service delivery',
      downloadHint: 'WordPress website on laptop',
    };
  }
  return {
    image_url: `/section-images/services/${entry.file}`,
    image_alt: entry.image_alt,
    downloadHint: entry.downloadHint,
  };
}

/** Blog card images — local files preferred over remote API URLs */
export const BLOG_IMAGES: Record<string, string> = {
  'migrate-wordpress-seo': '/section-images/blog-migrate-wordpress-seo.jpg',
  'website-redesign-checklist': '/section-images/blog-website-redesign-checklist.jpg',
  'woocommerce-customization-scale': '/section-images/blog-woocommerce-customization-scale.jpg',
  'core-web-vitals-wordpress': '/section-images/blog-core-web-vitals-wordpress.jpg',
  'hire-wordpress-agency': '/section-images/blog-hire-wordpress-agency.jpg',
};

export function getBlogImage(slug: string, apiUrl?: string | null) {
  return BLOG_IMAGES[slug] || apiUrl || '/section-images/blog-migrate-wordpress-seo.jpg';
}

/** Portfolio showcase images — keyed by live titles, legacy titles, and category */
export const PORTFOLIO_IMAGES: Record<string, string> = {
  // Current API titles
  'Urban Brew Coffee': '/section-images/portfolio-coffee.jpg',
  'AccessAbility UK': '/section-images/portfolio-corporate.jpg',
  'LearnSphere Academy': '/section-images/portfolio-lms.jpg',
  'NovaTech Solutions': '/section-images/portfolio-b2b.jpg',
  // Descriptive titles
  'Specialty retail WooCommerce storefront': '/section-images/portfolio-coffee.jpg',
  'Services company WordPress marketing site': '/section-images/portfolio-corporate.jpg',
  'Course team LearnDash dashboard': '/section-images/portfolio-lms.jpg',
  'B2B member catalog portal': '/section-images/portfolio-b2b.jpg',
  // Legacy titles (older DB rows)
  'E-commerce Client — Specialty Coffee': '/section-images/portfolio-coffee.jpg',
  'Services Client — Corporate Site': '/section-images/portfolio-corporate.jpg',
  'Education Client — LMS Dashboard': '/section-images/portfolio-lms.jpg',
  'B2B Client — Member Portal': '/section-images/portfolio-b2b.jpg',
};

const PORTFOLIO_BY_CATEGORY: Record<string, string> = {
  'WooCommerce Store': '/section-images/portfolio-coffee.jpg',
  'Corporate Website': '/section-images/portfolio-corporate.jpg',
  'LMS Dashboard': '/section-images/portfolio-lms.jpg',
  'B2B Portal': '/section-images/portfolio-b2b.jpg',
};

export function getPortfolioImage(title: string, apiUrl?: string | null, category?: string | null) {
  if (PORTFOLIO_IMAGES[title]) return PORTFOLIO_IMAGES[title];
  if (category && PORTFOLIO_BY_CATEGORY[category]) return PORTFOLIO_BY_CATEGORY[category];
  // Prefer local assets over broken/expired remote URLs
  if (apiUrl && apiUrl.startsWith('/')) return apiUrl;
  return '/section-images/portfolio-corporate.jpg';
}

/** Guidebook card images — one unique asset per slug */
export const GUIDEBOOK_IMAGES: Record<string, string> = {
  'pre-launch-checklist': '/section-images/guidebook-pre-launch-checklist.jpg',
  'woocommerce-speed-playbook': '/section-images/guidebook-woocommerce-speed-playbook.jpg',
  'woocommerce-migration-checklist': '/section-images/guidebook-woocommerce-migration.jpg',
  'learndash-diy-setup': '/section-images/guidebook-learndash-setup.jpg',
  'learndash-tips-tricks': '/section-images/guidebook-learndash-tips.jpg',
  'woocommerce-plugin-guide': '/section-images/guidebook-woocommerce-plugins.jpg',
  'plugin-developer-guide': '/section-images/guidebook-plugin-developer.jpg',
};

export function getGuidebookImage(slug: string, apiUrl?: string | null) {
  return GUIDEBOOK_IMAGES[slug] || apiUrl || '/section-images/guidebook-pre-launch-checklist.jpg';
}

const FAKE_AWARD_MARKERS = [
  'css design awards',
  'clutch',
  'designrush',
  'awwwards',
  'best ui design',
  'best ux design',
  'best innovation',
  'top wordpress agency',
  'top design agency',
];

export function isFakeAwardContent(title: string, organization: string) {
  const hay = `${title} ${organization}`.toLowerCase();
  return FAKE_AWARD_MARKERS.some((m) => hay.includes(m));
}
