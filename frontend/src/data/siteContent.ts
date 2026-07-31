/** Homepage trust signals — honest claims only (never invent award names). */
export const TRUST_AWARDS = [
  {
    id: 1,
    title: '5-Star Client Feedback',
    organization: 'Reviews from delivered WordPress projects',
    year: 'Ongoing',
    badge_label: '5★',
  },
  {
    id: 2,
    title: 'WordPress Specialists',
    organization: 'Themes, plugins & WooCommerce focus',
    year: 'Daily',
    badge_label: 'WP',
  },
  {
    id: 3,
    title: 'Performance-First Builds',
    organization: 'Core Web Vitals checks before launch',
    year: 'Every launch',
    badge_label: 'CWV',
  },
  {
    id: 4,
    title: 'Trusted Delivery Partner',
    organization: 'Retainers, staging QA & clear handoffs',
    year: 'Long-term',
    badge_label: 'Care',
  },
  {
    id: 5,
    title: 'Secure Launch Standard',
    organization: 'Hardening, backups & update discipline',
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
  'freshharvest-shipping': {
    image_url: '/section-images/case-grocery.jpg',
    image_alt: 'Grocery shelves for a WooCommerce loyalty shipping case study',
    client_label: 'E-commerce Client — Grocery',
    result_summary: 'Repeat checkouts improved after loyalty shipping rules',
    tech_stack: 'WooCommerce + Custom PHP',
  },
  'eduvault-lms': {
    image_url: '/section-images/case-lms.jpg',
    image_alt: 'Learners collaborating for a gated LearnDash LMS case study',
    client_label: 'Education Client — Private Cohort',
    result_summary: 'Member access and course completions clarified',
    tech_stack: 'LearnDash + Custom Theme',
  },
  'stylebox-cart-recovery': {
    image_url: '/section-images/case-apparel.jpg',
    image_alt: 'Apparel retail floor for a WooCommerce cart recovery case study',
    client_label: 'E-commerce Client — Apparel',
    result_summary: 'Recovered carts improved with staged email triggers',
    tech_stack: 'Custom Plugin + Email API',
  },
  'clearview-subscriptions': {
    image_url: '/section-images/case-optics.jpg',
    image_alt: 'Eyewear display for attribute-driven WooCommerce subscriptions',
    client_label: 'E-commerce Client — Specialty Retail',
    result_summary: 'Renewals stabilized with attribute-based pricing',
    tech_stack: 'WooCommerce Subscriptions + Custom Logic',
  },
  'learnpoint-wallet': {
    image_url: '/section-images/case-courses.jpg',
    image_alt: 'Student studying online for wallet-based course checkout',
    client_label: 'Education Client — Online Courses',
    result_summary: 'Payment drop-offs reduced with wallet checkout',
    tech_stack: 'WordPress LMS + Wallet Checkout',
  },
};

export function getCaseStudyMedia(slug: string): CaseStudyMedia {
  return (
    CASE_STUDY_MEDIA[slug] ?? {
      image_url: '/section-images/case-courses.jpg',
      image_alt: 'WordPress project workspace for an agency case study',
      client_label: 'WordPress Client — Confidential',
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
};

export function getProductImage(slug: string, fallbackUrl?: string) {
  return PRODUCT_IMAGES[slug] ?? {
    image_url: fallbackUrl || '/section-images/plugin-quotes.jpg',
    image_alt: 'WooCommerce plugin for WordPress online stores',
  };
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
