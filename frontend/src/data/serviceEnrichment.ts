export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceEnrichment {
  categoryLabel: string;
  highlights: { label: string; value: string }[];
  features: string[];
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
  deliverables: string[];
}

const defaultEnrichment: ServiceEnrichment = {
  categoryLabel: 'WordPress Service',
  highlights: [
    { label: 'Avg. Delivery', value: '2–4 weeks' },
    { label: 'Support', value: '30-day warranty' },
    { label: 'Team', value: 'Dedicated experts' },
  ],
  features: [
    'Expert delivery with quality assurance',
    'Dedicated project manager & dev team',
    'Post-launch support & documentation',
    'Performance & security best practices',
    'Regular progress updates & demos',
  ],
  benefits: [
    { title: 'Faster Time to Market', description: 'Structured workflows and proven processes get your project live sooner.' },
    { title: 'Enterprise-Grade Quality', description: 'Clean code, tested deployments, and scalable architecture built to last.' },
    { title: 'Ongoing Partnership', description: 'We stay with you after launch for updates, optimization, and growth.' },
  ],
  process: [
    { step: 1, title: 'Discovery', description: 'We learn your goals, audience, and technical requirements.' },
    { step: 2, title: 'Strategy & Plan', description: 'Scope, timeline, and architecture are defined and approved.' },
    { step: 3, title: 'Build & Iterate', description: 'Development with regular check-ins and staging previews.' },
    { step: 4, title: 'Launch & Support', description: 'Go live with monitoring, handoff docs, and post-launch care.' },
  ],
  deliverables: ['Source code & assets', 'Staging environment', 'Documentation', 'Launch checklist'],
};

const enrichments: Record<string, Partial<ServiceEnrichment>> = {
  'wordpress-maintenance': {
    categoryLabel: 'Managed Service',
    highlights: [
      { label: 'Uptime', value: '99.9% monitored' },
      { label: 'Response', value: '< 4 hrs SLA' },
      { label: 'Backups', value: 'Daily + offsite' },
    ],
    features: [
      'Core, theme & plugin updates (tested on staging first)',
      'Daily automated backups with offsite storage',
      '24/7 uptime monitoring & security scanning',
      'Malware removal & firewall hardening',
      'Monthly performance & health reports',
      'Priority support for urgent issues',
    ],
    benefits: [
      { title: 'Peace of Mind', description: 'Your site stays secure, updated, and running — without you lifting a finger.' },
      { title: 'Prevent Downtime', description: 'Proactive monitoring catches issues before they affect your visitors.' },
      { title: 'Focus on Business', description: 'Spend time growing revenue, not wrestling with WordPress updates.' },
    ],
    deliverables: ['Monthly health report', 'Backup logs', 'Security audit summary', 'Update changelog'],
  },
  'wordpress-website-development': {
    categoryLabel: 'Build & Launch',
    highlights: [
      { label: 'Timeline', value: '4–8 weeks' },
      { label: 'Pages', value: 'Up to 15+' },
      { label: 'Revisions', value: 'Unlimited rounds' },
    ],
    features: [
      'Custom WordPress theme or premium theme customization',
      'Mobile-first responsive design',
      'SEO-ready structure & schema markup',
      'Contact forms & CRM integrations',
      'Speed optimization & Core Web Vitals',
      'Admin training & handoff documentation',
    ],
    benefits: [
      { title: 'Conversion-Focused', description: 'Every layout decision is made to turn visitors into leads and customers.' },
      { title: 'Scalable Foundation', description: 'Built to grow with your business — add pages, features, and integrations easily.' },
      { title: 'Brand Consistency', description: 'Pixel-perfect design that reflects your brand across every device.' },
    ],
  },
  'wordpress-speed-optimization': {
    categoryLabel: 'Performance',
    highlights: [
      { label: 'Speed Gain', value: 'Up to 3× faster' },
      { label: 'Core Web Vitals', value: 'Pass all metrics' },
      { label: 'Audit', value: 'Full report included' },
    ],
    features: [
      'Full performance audit with before/after benchmarks',
      'Image compression & next-gen format delivery',
      'Caching layer (page, object, CDN setup)',
      'Database cleanup & query optimization',
      'Lazy loading & critical CSS inlining',
      'Ongoing monitoring recommendations',
    ],
    benefits: [
      { title: 'Better SEO Rankings', description: 'Google rewards fast sites — speed directly impacts your search visibility.' },
      { title: 'Higher Conversions', description: 'Every second of load time costs conversions. Faster sites sell more.' },
      { title: 'Lower Bounce Rate', description: 'Visitors stay when pages load instantly on mobile and desktop.' },
    ],
  },
  'woocommerce-setup': {
    categoryLabel: 'E-Commerce',
    highlights: [
      { label: 'Go-Live', value: '1–2 weeks' },
      { label: 'Payments', value: 'Stripe, PayPal+' },
      { label: 'Products', value: 'Unlimited' },
    ],
    features: [
      'Complete WooCommerce installation & configuration',
      'Payment gateway setup (Stripe, PayPal, etc.)',
      'Shipping zones, tax rules & product imports',
      'Checkout optimization & cart abandonment setup',
      'Email notifications & order workflow',
      'Mobile-optimized storefront',
    ],
    benefits: [
      { title: 'Sell From Day One', description: 'Launch a fully functional store ready to accept orders immediately.' },
      { title: 'Secure Checkout', description: 'PCI-compliant payment flows your customers can trust.' },
      { title: 'Growth-Ready', description: 'Architecture supports subscriptions, B2B pricing, and marketplace features.' },
    ],
  },
  'wordpress-migration': {
    categoryLabel: 'Migration',
    highlights: [
      { label: 'Downtime', value: 'Near zero' },
      { label: 'SEO', value: '301 redirects' },
      { label: 'Data', value: '100% integrity' },
    ],
    features: [
      'Full content, media & user migration',
      'SEO URL mapping with 301 redirects',
      'Staging environment for pre-launch testing',
      'Form & plugin compatibility checks',
      'DNS cutover with rollback plan',
      'Post-migration performance audit',
    ],
    benefits: [
      { title: 'Zero Data Loss', description: 'Every page, image, and user account is migrated with full integrity.' },
      { title: 'SEO Preserved', description: 'Rankings and traffic are protected with proper redirect mapping.' },
      { title: 'Risk-Free Cutover', description: 'Staging tests and rollback plans ensure a smooth launch day.' },
    ],
  },
  'wordpress-redesign': {
    categoryLabel: 'Redesign',
    highlights: [
      { label: 'UX Audit', value: 'Included' },
      { label: 'Conversion', value: '+30% avg lift' },
      { label: 'Timeline', value: '3–6 weeks' },
    ],
    features: [
      'UX audit & competitor analysis',
      'Modern UI/UX redesign with Figma prototypes',
      'Improved information architecture & navigation',
      'Conversion rate optimization (CRO) elements',
      'A/B test-ready component library',
      'Content migration & SEO preservation',
    ],
    benefits: [
      { title: 'Modern First Impression', description: 'A fresh design signals trust and professionalism to every visitor.' },
      { title: 'Better User Flows', description: 'Intuitive navigation guides users to the actions that matter most.' },
      { title: 'Measurable Results', description: 'Track conversion improvements with clear before/after metrics.' },
    ],
  },
  'wordpress-ai-automation': {
    categoryLabel: 'AI & Automation',
    highlights: [
      { label: 'Time Saved', value: 'Up to 60%' },
      { label: 'Integrations', value: 'OpenAI, Zapier' },
      { label: 'ROI', value: 'Within 90 days' },
    ],
    features: [
      'AI content generation & editing workflows',
      'Automated SEO meta & schema generation',
      'Chatbot & customer support automation',
      'Lead scoring & CRM sync automations',
      'Custom GPT integrations for your brand voice',
      'Analytics dashboards for automation ROI',
    ],
    benefits: [
      { title: 'Work Smarter', description: 'Automate repetitive tasks so your team focuses on high-value work.' },
      { title: 'Consistent Output', description: 'AI-assisted workflows maintain quality at scale.' },
      { title: 'Competitive Edge', description: 'Stay ahead with cutting-edge automation your competitors lack.' },
    ],
  },
  'plugin-development': {
    categoryLabel: 'Custom Development',
    highlights: [
      { label: 'Code Quality', value: 'WP standards' },
      { label: 'Testing', value: 'Unit + E2E' },
      { label: 'Support', value: '6-month warranty' },
    ],
    features: [
      'Custom plugin architecture & development',
      'WordPress coding standards compliance',
      'REST API endpoints & webhook integrations',
      'Admin settings panels & user role controls',
      'Unit testing & security hardening',
      'WordPress.org submission support (optional)',
    ],
    benefits: [
      { title: 'Exact Fit', description: 'No more workarounds — get functionality built precisely for your needs.' },
      { title: 'Maintainable Code', description: 'Clean, documented code your team can extend and maintain.' },
      { title: 'No Plugin Bloat', description: 'Lightweight solutions without unnecessary third-party dependencies.' },
    ],
  },
};

export function getServiceEnrichment(slug: string, apiFeatures?: string[]): ServiceEnrichment {
  const partial = enrichments[slug] ?? {};
  const genericFeatures = ['Expert delivery', 'Dedicated team', 'Post-launch support'];
  const isGeneric = !apiFeatures?.length || apiFeatures.every((f) => genericFeatures.includes(f));

  return {
    ...defaultEnrichment,
    ...partial,
    features: isGeneric ? (partial.features ?? defaultEnrichment.features) : apiFeatures!,
    benefits: partial.benefits ?? defaultEnrichment.benefits,
    process: partial.process ?? defaultEnrichment.process,
    deliverables: partial.deliverables ?? defaultEnrichment.deliverables,
    highlights: partial.highlights ?? defaultEnrichment.highlights,
    categoryLabel: partial.categoryLabel ?? defaultEnrichment.categoryLabel,
  };
}
