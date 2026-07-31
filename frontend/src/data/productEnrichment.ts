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
  tagline: 'Built for operators who need cleaner store workflows',
  highlights: [
    { label: 'License', value: 'Per purchase terms' },
    { label: 'Support', value: 'As listed at checkout' },
    { label: 'Stack', value: 'WooCommerce 8+' },
  ],
  features: [
    'Admin controls your team can understand',
    'Built for WooCommerce storefront templates',
    'Documented setup and common edge cases',
    'Designed to avoid brittle theme lock-in',
  ],
  useCases: ['Specialty retailers', 'Wholesale catalogs', 'Subscription operators'],
  compatibility: 'WooCommerce 8+ · WordPress 6+',
};

const enrichments: Record<string, Partial<ProductEnrichment>> = {
  'quote-flow-pro': {
    categoryLabel: 'Sales & Enquiries',
    tagline: 'Turn product views into qualified leads',
    highlights: [
      { label: 'Enquiries', value: 'Qualified leads' },
      { label: 'Setup', value: 'Minutes' },
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
      { label: 'Catalog fit', value: 'Kits & boxes' },
    ],
    features: [
      'Mix-and-match product boxes',
      'Fixed or percentage bundle discounts',
      'Pre-built kits for quick purchase',
      'Inventory sync across bundle items',
      'Clear bundle builder UI',
    ],
    useCases: ['Gift boxes', 'Subscription kits', 'Build-your-own sets'],
    compatibility: 'WooCommerce 8+ · Variable products',
  },
  'sales-boost-pack': {
    categoryLabel: 'Conversion Tools',
    tagline: 'Create urgency for campaign windows',
    highlights: [
      { label: 'Tools', value: '5-in-1 pack' },
      { label: 'Campaigns', value: 'Flash & seasonal' },
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
      'Multi-warehouse friendly setup',
    ],
    useCases: ['High-volume stores', 'Multi-SKU catalogs', 'Dropshipping ops'],
    compatibility: 'WooCommerce 8+ · HPOS compatible',
  },
  'review-boost': {
    categoryLabel: 'Social Proof',
    tagline: 'Collect product feedback buyers trust',
    highlights: [
      { label: 'Reviews', value: 'Auto-collect' },
      { label: 'Display', value: 'Widgets' },
      { label: 'Markup', value: 'Schema ready' },
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
      { label: 'Portal', value: 'Self-service' },
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
      { label: 'Friction', value: 'Lower on mobile' },
      { label: 'Fields', value: 'Smart helpers' },
    ],
    features: [
      'Distraction-free one-page checkout',
      'Address auto-complete & validation',
      'Order bump upsells at checkout',
      'Express pay when gateways allow',
      'Mobile-optimized layout',
    ],
    useCases: ['DTC brands', 'High-traffic stores', 'Mobile-first shops'],
    compatibility: 'WooCommerce 8+ · Stripe · Block checkout',
  },
  'catalog-cloak': {
    categoryLabel: 'Sales & B2B',
    tagline: 'Keep wholesale prices behind login without hiding the whole store',
    highlights: [
      { label: 'Visibility', value: 'Role-gated' },
      { label: 'Catalog', value: 'Section rules' },
      { label: 'Guests', value: 'Clear CTA copy' },
    ],
    features: [
      'Hide prices until approved roles log in',
      'Gate selected categories or tags',
      'Guest-facing request-access messages',
      'Pairs cleanly with TierPrice Matrix',
      'Works on classic and block product templates',
    ],
    useCases: ['Wholesale catalogs', 'Dealer portals', 'Member-only SKUs'],
    compatibility: 'WooCommerce 8+ · Role-based catalogs',
  },
  'relate-lane': {
    categoryLabel: 'Catalog',
    tagline: 'Related products driven by merchandising rules, not randomness',
    highlights: [
      { label: 'Rules', value: 'Category & tag' },
      { label: 'Lists', value: 'Manual overrides' },
      { label: 'Widgets', value: 'Template ready' },
    ],
    features: [
      'Rule-based related and upsell sets',
      'Manual merchandising lists per product',
      'Category and tag matching',
      'Theme-friendly related product widgets',
      'Editor-visible rule previews',
    ],
    useCases: ['Fashion catalogs', 'Accessory attach rates', 'Gift merchandising'],
    compatibility: 'WooCommerce 8+ · Variable products',
  },
  'kit-lane': {
    categoryLabel: 'Catalog',
    tagline: 'Sell kits that deduct component stock honestly',
    highlights: [
      { label: 'Kits', value: 'Parent + children' },
      { label: 'Stock', value: 'Component-aware' },
      { label: 'Risk', value: 'Oversell protection' },
    ],
    features: [
      'Parent kit products with child SKUs',
      'Automatic component stock deduction',
      'Block sales when a component is out',
      'Simple kit builder in admin',
      'Clear kit contents on the product page',
    ],
    useCases: ['Starter kits', 'Hardware bundles', 'Gift sets'],
    compatibility: 'WooCommerce 8+ · HPOS compatible',
  },
  'sticky-lane': {
    categoryLabel: 'Conversion',
    tagline: 'Keep add-to-cart visible while shoppers scroll long PDPs',
    highlights: [
      { label: 'Bar', value: 'Sticky ATC' },
      { label: 'Mobile', value: 'First-class' },
      { label: 'Theme', value: 'CSS-friendly' },
    ],
    features: [
      'Sticky add-to-cart bar on product pages',
      'Variation summary beside the button',
      'Mobile-first placement options',
      'Lightweight theme-friendly CSS',
      'Optional price and stock cues',
    ],
    useCases: ['Long product pages', 'Mobile-heavy traffic', 'Fashion PDPs'],
    compatibility: 'WooCommerce 8+ · Most themes',
  },
  'banner-forge': {
    categoryLabel: 'Conversion',
    tagline: 'Schedule campaign banners without giving editors a full page rebuild',
    highlights: [
      { label: 'Slots', value: 'Home & category' },
      { label: 'Schedule', value: 'Start / end' },
      { label: 'Assets', value: 'Desktop + mobile' },
    ],
    features: [
      'Dated banner slots for campaigns',
      'Home and category placements',
      'Separate desktop and mobile images',
      'Editor-friendly controls',
      'Automatic hide after end time',
    ],
    useCases: ['Seasonal sales', 'Launch weeks', 'Category promos'],
    compatibility: 'WooCommerce 8+ · Classic & block themes',
  },
  'stock-map': {
    categoryLabel: 'Ops & Inventory',
    tagline: 'See where WooCommerce stock actually sits across locations',
    highlights: [
      { label: 'Locations', value: 'Multi-label' },
      { label: 'Views', value: 'Admin-first' },
      { label: 'Exports', value: 'CSV friendly' },
    ],
    features: [
      'Location stock fields per SKU',
      'Admin views by warehouse or room',
      'Low-stock filters by location',
      'CSV-friendly exports for ops',
      'Works beside StockdenPro alerts',
    ],
    useCases: ['Multi-warehouse ops', 'Retail + online stock', 'Growing SKU counts'],
    compatibility: 'WooCommerce 8+ · HPOS compatible',
  },
  'restock-pulse': {
    categoryLabel: 'Ops & Inventory',
    tagline: 'Weekly restock digests before campaigns force panic buys',
    highlights: [
      { label: 'Digest', value: 'Weekly' },
      { label: 'Lists', value: 'Campaign prep' },
      { label: 'Audience', value: 'Ops roles' },
    ],
    features: [
      'Weekly restock planning digests',
      'Campaign prep SKU lists',
      'Threshold grouping by urgency',
      'Email to purchasing roles',
      'Pairs with low-stock alert rules',
    ],
    useCases: ['Seasonal merchants', 'Purchasing teams', 'Multi-SKU catalogs'],
    compatibility: 'WooCommerce 8+ · Email-capable hosts',
  },
  'seal-strip': {
    categoryLabel: 'Trust & Checkout',
    tagline: 'Place guarantee and shipping trust cues where decisions happen',
    highlights: [
      { label: 'Placement', value: 'PDP & cart' },
      { label: 'Copy', value: 'Editor-owned' },
      { label: 'Icons', value: 'Custom seals' },
    ],
    features: [
      'Trust seal strips on product and cart',
      'Custom icons and guarantee copy',
      'Placement controls per template',
      'No third-party brand logos required',
      'Lightweight markup for themes',
    ],
    useCases: ['New brands', 'High-ticket products', 'Checkout reassurance'],
    compatibility: 'WooCommerce 8+ · Most themes',
  },
  'cycle-flex': {
    categoryLabel: 'Subscriptions',
    tagline: 'Pause, skip, and resume without opening a support ticket',
    highlights: [
      { label: 'Actions', value: 'Pause / skip' },
      { label: 'Portal', value: 'Self-service' },
      { label: 'Notices', value: 'Status emails' },
    ],
    features: [
      'Pause and resume subscription cycles',
      'Skip next delivery actions',
      'Customer portal lifecycle controls',
      'Status emails on changes',
      'Designed to sit beside Subscrivo',
    ],
    useCases: ['Subscription boxes', 'Consumables', 'Membership deliveries'],
    compatibility: 'WooCommerce 8+ · Subscription billing',
  },
  'tier-access': {
    categoryLabel: 'Subscriptions',
    tagline: 'Map membership tiers to catalog and content after purchase',
    highlights: [
      { label: 'Tiers', value: 'Purchase-linked' },
      { label: 'Gates', value: 'Products & content' },
      { label: 'Admin', value: 'Tier overview' },
    ],
    features: [
      'Membership tiers tied to WooCommerce purchases',
      'Product and content access gates',
      'Consistent member pricing access',
      'Admin overview of tier members',
      'Works with role-based catalog tools',
    ],
    useCases: ['Digital memberships', 'Course + store hybrids', 'VIP catalogs'],
    compatibility: 'WooCommerce 8+ · Member content sites',
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
    id: 9010,
    title: 'CatalogCloak',
    slug: 'catalog-cloak',
    subtitle: 'Wholesale Catalog Gate',
    description: 'Hide prices and selected catalog areas from guests until a wholesale or member role is logged in.',
    full_content: 'CatalogCloak keeps sensitive B2B pricing and SKUs behind login while still letting shoppers browse approved public collections.',
    category: 'sales-b2b',
    price: '$69',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-catalog-cloak.jpg',
  },
  {
    id: 9011,
    title: 'RelateLane',
    slug: 'relate-lane',
    subtitle: 'Smarter Related Products',
    description: 'Recommend related WooCommerce products from rules you control — not random you-may-also-like noise.',
    full_content: 'RelateLane lets merchandisers define related and upsell sets by category, tag, or manual lists so product pages stay commercially intentional.',
    category: 'catalog',
    price: '$59',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-relate-lane.jpg',
  },
  {
    id: 9012,
    title: 'KitLane',
    slug: 'kit-lane',
    subtitle: 'Inventory-Honest Kits',
    description: 'Sell fixed kits that deduct child SKU stock correctly when the parent kit sells.',
    full_content: 'KitLane keeps kit parents and component inventory aligned so you do not oversell a bundle when one piece is out of stock.',
    category: 'catalog',
    price: '$79',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-kit-lane.jpg',
  },
  {
    id: 9013,
    title: 'StickyLane ATC',
    slug: 'sticky-lane',
    subtitle: 'Sticky Add to Cart',
    description: 'Keep add-to-cart visible on long product pages without burying the primary action.',
    full_content: 'StickyLane ATC adds a compact sticky bar with price, variation summary, and add-to-cart so mobile shoppers do not lose the purchase action while scrolling.',
    category: 'conversion',
    price: '$49',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-sticky-lane.jpg',
  },
  {
    id: 9014,
    title: 'BannerForge',
    slug: 'banner-forge',
    subtitle: 'Campaign Banner Slots',
    description: 'Schedule homepage and category banners with start/end times editors can manage.',
    full_content: 'BannerForge gives marketing teams dated banner slots for campaigns without handing them a page-builder free-for-all.',
    category: 'conversion',
    price: '$55',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-banner-forge.jpg',
  },
  {
    id: 9015,
    title: 'StockMap',
    slug: 'stock-map',
    subtitle: 'Multi-Location Stock View',
    description: 'See WooCommerce stock by location labels so ops know where inventory actually sits.',
    full_content: 'StockMap adds location-aware stock fields and admin views for teams that store inventory across warehouses or retail rooms.',
    category: 'ops-inventory',
    price: '$89',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-stock-map.jpg',
  },
  {
    id: 9016,
    title: 'RestockPulse',
    slug: 'restock-pulse',
    subtitle: 'Restock Planning Digests',
    description: 'Weekly restock digests that highlight SKUs approaching zero before campaigns.',
    full_content: 'RestockPulse turns inventory thresholds into planning digests so purchasing does not rely on last-minute panic buys.',
    category: 'ops-inventory',
    price: '$65',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-restock-pulse.jpg',
  },
  {
    id: 9017,
    title: 'SealStrip',
    slug: 'seal-strip',
    subtitle: 'Trust Seal Strip',
    description: 'Show guarantee, shipping, and payment trust cues near add-to-cart and checkout.',
    full_content: 'SealStrip places editor-controlled trust seals on product and cart templates.',
    category: 'trust-checkout',
    price: '$39',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-seal-strip.jpg',
  },
  {
    id: 9018,
    title: 'CycleFlex',
    slug: 'cycle-flex',
    subtitle: 'Pause & Skip Controls',
    description: 'Give subscribers clear pause, skip, and resume actions without support tickets.',
    full_content: 'CycleFlex focuses on self-service subscription lifecycle controls so customers can adjust deliveries without calling your team.',
    category: 'subscriptions',
    price: '$79',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-cycle-flex.jpg',
  },
  {
    id: 9019,
    title: 'TierAccess',
    slug: 'tier-access',
    subtitle: 'Membership Tier Access',
    description: 'Gate products and content by membership tier linked to WooCommerce purchases.',
    full_content: 'TierAccess maps membership tiers to catalog and content access so digital products and member pricing stay consistent after checkout.',
    category: 'subscriptions',
    price: '$99',
    rating: '',
    rating_count: 'WooCommerce extension',
    image_url: '/section-images/plugin-tier-access.jpg',
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
