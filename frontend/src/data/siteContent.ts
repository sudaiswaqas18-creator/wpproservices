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

/** Original testimonial copy — illustrative roles, no invented award bodies or famous brands. */
export const SITE_TESTIMONIALS = [
  {
    id: 1,
    name: 'Alex Rivera',
    company: 'E-commerce Client — Apparel | USA',
    country: 'USA',
    quote:
      'They rebuilt our WooCommerce theme so editors can update seasonal landing pages in Gutenberg without breaking checkout. Staging reviews before go-live made the launch uneventful.',
    metric_label: 'Checkout confidence',
  },
  {
    id: 2,
    name: 'Priya Shah',
    company: 'Education Client — LMS | Singapore',
    country: 'Singapore',
    quote:
      'LearnDash enrollment, drip schedules, and progress tracking finally match how our instructors teach. Ticket volume on broken lesson pages dropped after handoff.',
    metric_label: 'Learner experience',
  },
  {
    id: 3,
    name: 'Jonas Berg',
    company: 'Retail Client — Migration | Poland',
    country: 'Poland',
    quote:
      'Our WordPress migration kept redirects and product URLs intact. Everything was reviewed on staging first — Search Console stayed calm after cutover.',
    metric_label: 'SEO continuity',
  },
  {
    id: 4,
    name: 'Maya Okonkwo',
    company: 'Services Client — Healthcare | UK',
    country: 'UK',
    quote:
      'Accessible templates, careful forms, and a maintainable theme. The team explained WordPress decisions in plain language our ops staff could follow.',
    metric_label: 'Editor independence',
  },
  {
    id: 5,
    name: 'Sofia Conti',
    company: 'E-commerce Client — Specialty Foods | Italy',
    country: 'Italy',
    quote:
      'Performance work on product and cart templates plus a small custom plugin for shipping rules. Core Web Vitals and store ops both felt better after launch.',
    metric_label: 'Storefront speed',
  },
] as const;

export interface CaseStudyMedia {
  image_url: string;
  image_alt: string;
  client_label: string;
  result_summary: string;
  tech_stack: string;
}

/** Thematic Unsplash images + safe labels keyed by case-study slug. */
export const CASE_STUDY_MEDIA: Record<string, CaseStudyMedia> = {
  'freshharvest-shipping': {
    image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Fresh grocery produce representing a WooCommerce retail shipping project',
    client_label: 'E-commerce Client — Grocery',
    result_summary: 'Repeat checkouts improved after loyalty shipping rules',
    tech_stack: 'WooCommerce + Custom PHP',
  },
  'eduvault-lms': {
    image_url: 'https://images.unsplash.com/photo-1501504905252-473a47ee5617?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Laptop and notebooks for a gated LearnDash LMS engagement',
    client_label: 'Education Client — Private Cohort',
    result_summary: 'Member access and course completions clarified',
    tech_stack: 'LearnDash + Custom Theme',
  },
  'stylebox-cart-recovery': {
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Apparel retail floor for a WooCommerce cart recovery project',
    client_label: 'E-commerce Client — Apparel',
    result_summary: 'Recovered carts improved with staged email triggers',
    tech_stack: 'Custom Plugin + Email API',
  },
  'clearview-subscriptions': {
    image_url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Eyewear display for attribute-driven WooCommerce subscriptions',
    client_label: 'E-commerce Client — Specialty Retail',
    result_summary: 'Renewals stabilized with attribute-based pricing',
    tech_stack: 'WooCommerce Subscriptions + Custom Logic',
  },
  'learnpoint-wallet': {
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    image_alt: 'Online learning workspace for wallet-based course checkout',
    client_label: 'Education Client — Online Courses',
    result_summary: 'Payment drop-offs reduced with wallet checkout',
    tech_stack: 'WordPress LMS + Wallet Checkout',
  },
};

export function getCaseStudyMedia(slug: string): CaseStudyMedia {
  return (
    CASE_STUDY_MEDIA[slug] ?? {
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      image_alt: 'WordPress agency project analytics and delivery workspace',
      client_label: 'WordPress Client — Confidential',
      result_summary: 'Outcomes documented after staging QA and launch',
      tech_stack: 'WordPress',
    }
  );
}

/** Plugin card images matched to each product’s purpose (Unsplash). */
export const PRODUCT_IMAGES: Record<string, { image_url: string; image_alt: string }> = {
  'quote-flow-pro': {
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Business discussion representing WooCommerce product quote enquiries',
  },
  'smart-pricing': {
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Analytics dashboard for role-based WooCommerce pricing rules',
  },
  bundlecraft: {
    image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Shopping bags for mix-and-match WooCommerce product bundles',
  },
  'sales-boost-pack': {
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Conversion metrics for WooCommerce campaign urgency tools',
  },
  'stock-alert-pro': {
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Warehouse inventory shelves for WooCommerce stock alerts',
  },
  'review-boost': {
    image_url: 'https://images.unsplash.com/photo-1556745757-8d76bdb6834a?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Customer reviewing a purchase for WooCommerce review collection',
  },
  subscripto: {
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Recurring billing paperwork for WooCommerce subscriptions',
  },
  'checkout-flow': {
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    image_alt: 'Secure mobile checkout for a streamlined WooCommerce flow',
  },
};

export function getProductImage(slug: string, fallbackUrl?: string) {
  return PRODUCT_IMAGES[slug] ?? {
    image_url: fallbackUrl || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
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

const LEGACY_TESTIMONIAL_MARKERS = [
  'skillbridge',
  'horizon analytics',
  'greenpath retail',
  'medconnect',
  'nordic learning',
  'artisan foods',
  'david chen',
  'sarah mitchell',
  'wpproservices delivered beyond',
];

export function isLegacyTestimonialContent(name: string, company: string, quote: string) {
  const hay = `${name} ${company} ${quote}`.toLowerCase();
  return LEGACY_TESTIMONIAL_MARKERS.some((m) => hay.includes(m));
}
