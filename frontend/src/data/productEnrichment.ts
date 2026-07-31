export interface ProductEnrichment {
  categoryLabel: string;
  tagline: string;
  highlights: { label: string; value: string }[];
  features: string[];
  useCases: string[];
  compatibility: string;
}

const defaultEnrichment: ProductEnrichment = {
  categoryLabel: 'WooCommerce Plugin',
  tagline: 'Built for growing online stores',
  highlights: [
    { label: 'Updates', value: 'Lifetime' },
    { label: 'Support', value: '1 year' },
    { label: 'Sites', value: 'Unlimited' },
  ],
  features: [
    'Easy setup — no coding required',
    'Works with any WooCommerce theme',
    'Regular updates & security patches',
    'Detailed documentation included',
  ],
  useCases: ['Small businesses', 'Growing stores', 'Agencies'],
  compatibility: 'WooCommerce 8+ · WordPress 6+',
};

const enrichments: Record<string, Partial<ProductEnrichment>> = {
  'quote-flow-pro': {
    categoryLabel: 'Sales & Enquiries',
    tagline: 'Turn product views into qualified leads',
    highlights: [
      { label: 'Enquiries', value: '+40% avg lift' },
      { label: 'Setup', value: '5 minutes' },
      { label: 'Integrations', value: 'WhatsApp, Email' },
    ],
    features: [
      'Product enquiry forms on any page',
      'WhatsApp quick-reply button',
      'Custom quote request workflows',
      'Auto email notifications to admin',
      'Export leads to CSV',
    ],
    useCases: ['B2B wholesalers', 'Custom pricing stores', 'Made-to-order products'],
    compatibility: 'WooCommerce 8+ · Elementor · WPBakery',
  },
  'smart-pricing': {
    categoryLabel: 'B2B Pricing',
    tagline: 'Show the right price to the right customer',
    highlights: [
      { label: 'Rules', value: 'Unlimited' },
      { label: 'Roles', value: 'User & role based' },
      { label: 'Discounts', value: 'Tiered & bulk' },
    ],
    features: [
      'User-specific & role-based pricing',
      'Bulk and tiered discount tables',
      'Hide prices from guest visitors',
      'Minimum order quantity rules',
      'CSV import for price lists',
    ],
    useCases: ['B2B distributors', 'Wholesale stores', 'Member-only pricing'],
    compatibility: 'WooCommerce 8+ · Subscriptions compatible',
  },
  'bundlecraft': {
    categoryLabel: 'Product Bundles',
    tagline: 'Let customers build their perfect bundle',
    highlights: [
      { label: 'Bundles', value: 'Mix & match' },
      { label: 'Pricing', value: 'Fixed or dynamic' },
      { label: 'AOV Boost', value: '+25% avg' },
    ],
    features: [
      'Mix-and-match product boxes',
      'Fixed or percentage bundle discounts',
      'Pre-built kits for quick purchase',
      'Inventory sync across bundle items',
      'Beautiful bundle builder UI',
    ],
    useCases: ['Gift boxes', 'Subscription kits', 'Build-your-own sets'],
    compatibility: 'WooCommerce 8+ · Variable products',
  },
  'sales-boost-pack': {
    categoryLabel: 'Conversion Tools',
    tagline: 'Create urgency and drive more sales',
    highlights: [
      { label: 'Tools', value: '5-in-1 pack' },
      { label: 'Conversion', value: '+18% avg' },
      { label: 'Setup', value: 'Plug & play' },
    ],
    features: [
      'Countdown timers on products & cart',
      'Smart discount popups',
      'Free shipping progress bar',
      'Stock scarcity messages',
      'Exit-intent offer triggers',
    ],
    useCases: ['Flash sales', 'Seasonal campaigns', 'Cart recovery'],
    compatibility: 'WooCommerce 8+ · All major themes',
  },
  'stock-alert-pro': {
    categoryLabel: 'Inventory',
    tagline: 'Catch low stock before it becomes a stockout',
    highlights: [
      { label: 'Alerts', value: 'Real-time' },
      { label: 'Channels', value: 'Email & Slack' },
      { label: 'Thresholds', value: 'Per product' },
    ],
    features: [
      'Low stock email & Slack alerts',
      'Custom threshold per product/variation',
      'Daily inventory summary reports',
      'Back-in-stock customer notifications',
      'Multi-warehouse support',
    ],
    useCases: ['High-volume stores', 'Multi-SKU catalogs', 'Dropshipping ops'],
    compatibility: 'WooCommerce 8+ · HPOS compatible',
  },
  'review-boost': {
    categoryLabel: 'Social Proof',
    tagline: 'Collect product feedback buyers trust',
    highlights: [
      { label: 'Reviews', value: 'Auto-collect' },
      { label: 'Display', value: 'Rich snippets' },
      { label: 'Trust', value: 'Schema ready' },
    ],
    features: [
      'Automated post-purchase review requests',
      'Photo & video review uploads',
      'Google rich snippet markup',
      'Review carousel & grid widgets',
      'Moderation dashboard',
    ],
    useCases: ['Fashion & apparel', 'Electronics', 'Health & beauty'],
    compatibility: 'WooCommerce 8+ · Schema.org ready',
  },
  'subscripto': {
    categoryLabel: 'Subscriptions',
    tagline: 'Recurring WooCommerce billing without clutter',
    highlights: [
      { label: 'Billing', value: 'Weekly to yearly' },
      { label: 'MRR', value: 'Dashboard included' },
      { label: 'Gateways', value: 'Stripe & PayPal' },
    ],
    features: [
      'Flexible subscription intervals',
      'Free trial & signup fee options',
      'Customer self-service portal',
      'Pause, skip & upgrade flows',
      'MRR & churn analytics dashboard',
    ],
    useCases: ['Coffee & food boxes', 'SaaS add-ons', 'Membership products'],
    compatibility: 'WooCommerce 8+ · Stripe · PayPal',
  },
  'checkout-flow': {
    categoryLabel: 'Checkout',
    tagline: 'Fewer steps between cart and paid order',
    highlights: [
      { label: 'Steps', value: '1-page checkout' },
      { label: 'Abandonment', value: 'Lower friction' },
      { label: 'Fields', value: 'Smart auto-fill' },
    ],
    features: [
      'Distraction-free one-page checkout',
      'Address auto-complete & validation',
      'Order bump upsells at checkout',
      'Express pay (Apple Pay, Google Pay)',
      'Mobile-optimized layout',
    ],
    useCases: ['DTC brands', 'High-traffic stores', 'Mobile-first shops'],
    compatibility: 'WooCommerce 8+ · Stripe · Block checkout',
  },
};

export function getProductEnrichment(slug: string, apiFeatures?: string[]): ProductEnrichment {
  const partial = enrichments[slug] ?? {};
  const genericFeatures = ['Easy setup', 'Works with any theme', 'Regular updates'];
  const isGeneric = !apiFeatures?.length || apiFeatures.every((f) => genericFeatures.some((g) => f.includes(g)));

  return {
    ...defaultEnrichment,
    ...partial,
    features: isGeneric ? (partial.features ?? defaultEnrichment.features) : apiFeatures!,
    highlights: partial.highlights ?? defaultEnrichment.highlights,
    useCases: partial.useCases ?? defaultEnrichment.useCases,
    categoryLabel: partial.categoryLabel ?? defaultEnrichment.categoryLabel,
    tagline: partial.tagline ?? defaultEnrichment.tagline,
    compatibility: partial.compatibility ?? defaultEnrichment.compatibility,
  };
}

/** Static products shown when API is unavailable or for new catalog items before DB seed */
export const supplementalProducts = [
  {
    id: 9001,
    title: 'StockdenPro',
    slug: 'stock-alert-pro',
    subtitle: 'Inventory Threshold Alerts',
    description: 'Notify your ops team when WooCommerce stock dips below thresholds you set per SKU.',
    full_content: 'StockdenPro watches WooCommerce inventory and sends email or Slack alerts when stock crosses your rules. Configure per product or variation, send daily digests, and notify shoppers when items are back in stock.',
    price: '$59',
    rating: '4.8/5',
    rating_count: '1,200+ stores',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
  },
  {
    id: 9002,
    title: 'Prooflane Reviews',
    slug: 'review-boost',
    subtitle: 'Post-Purchase Review Collection',
    description: 'Request reviews automatically after delivery and display them with schema markup.',
    full_content: 'Prooflane Reviews schedules post-purchase review asks, supports photo uploads, and outputs rich-result markup so social proof helps both shoppers and search visibility.',
    price: '$49',
    rating: '4.9/5',
    rating_count: '2,500+ stores',
    image_url: 'https://images.unsplash.com/photo-1556745757-8d76bdb6834a?w=800',
  },
  {
    id: 9003,
    title: 'Subscrivo',
    slug: 'subscripto',
    subtitle: 'Subscription Billing for WooCommerce',
    description: 'Flexible intervals, self-service portal, and a clear view of recurring revenue.',
    full_content: 'Subscrivo adds subscription billing to WooCommerce with trials, pause and skip options, customer self-service, and an MRR dashboard for recurring revenue tracking.',
    price: '$129',
    rating: '4.9/5',
    rating_count: '800+ stores',
    image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  },
  {
    id: 9004,
    title: 'LaneCheckout',
    slug: 'checkout-flow',
    subtitle: 'Streamlined One-Page Checkout',
    description: 'Reduce steps at checkout with express pay options and optional order bumps.',
    full_content: 'LaneCheckout replaces multi-step checkout with a focused one-page flow, address helpers, express wallets, and optional bumps designed to protect conversion on mobile.',
    price: '$89',
    rating: '5.0/5',
    rating_count: '1,800+ stores',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
  },
] as const;

export function getSupplementalProduct(slug: string) {
  return supplementalProducts.find((p) => p.slug === slug) ?? null;
}

export function mergeProducts<T extends { slug: string }>(apiProducts: T[]): T[] {
  const slugs = new Set(apiProducts.map((p) => p.slug));
  const extras = supplementalProducts.filter((p) => !slugs.has(p.slug));
  return [...apiProducts, ...(extras as unknown as T[])];
}
