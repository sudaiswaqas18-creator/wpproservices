export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogEnrichment {
  category: string;
  readTime: string;
  intro: string;
  sections: BlogSection[];
  keyTakeaways: string[];
  conclusion: string;
}

const defaultEnrichment: BlogEnrichment = {
  category: 'WordPress Insights',
  readTime: '6 min read',
  intro: '',
  sections: [],
  keyTakeaways: [
    'Plan before you build or migrate',
    'Measure performance and conversions early',
    'Document decisions for your team',
  ],
  conclusion: 'Need help implementing this on your WordPress site? Our team can audit, plan, and execute with you.',
};

const enrichments: Record<string, BlogEnrichment> = {
  'migrate-wordpress-seo': {
    category: 'Migration & SEO',
    readTime: '8 min read',
    intro: 'Most WordPress migrations look successful on launch day — then organic traffic dips three weeks later. Here is the playbook we use to move sites without breaking rankings.',
    sections: [
      {
        heading: 'Why migrations fail silently',
        paragraphs: [
          'Teams focus on visual parity and forget URL structures, redirect maps, and indexation signals. Google sees a new site with broken internal links and duplicate paths — rankings drop before anyone notices in analytics.',
        ],
        bullets: [
          'Missing 301 redirects for changed URLs',
          'Sitemap not resubmitted after go-live',
          'Staging accidentally left indexable',
          'Form and checkout flows broken post-migration',
        ],
      },
      {
        heading: 'The pre-migration audit',
        paragraphs: [
          'Export your current sitemap, top 50 landing pages by traffic, and all indexed URLs from Search Console. Map every URL to its new destination before writing a single line of code.',
        ],
      },
      {
        heading: 'Launch week checklist',
        paragraphs: [
          'Switch DNS only after redirects are live and tested in staging. Monitor crawl errors daily for 30 days. Re-run Core Web Vitals on key templates and fix regressions immediately.',
        ],
      },
    ],
    keyTakeaways: [
      'Build a complete URL redirect map before migration',
      'Test forms, checkout, and login flows in staging',
      'Resubmit sitemap and monitor Search Console for 30 days',
      'Never launch without a rollback plan',
    ],
    conclusion: 'A clean migration protects years of SEO equity. We handle URL mapping, redirects, QA, and post-launch monitoring so your traffic stays stable.',
  },
  'website-redesign-checklist': {
    category: 'Design & Strategy',
    readTime: '7 min read',
    intro: 'Your website could be your biggest liability when scaling — or your strongest conversion asset. Use this checklist before you commit budget to a redesign.',
    sections: [
      {
        heading: 'Audit what actually converts',
        paragraphs: [
          'Pull analytics on your top landing pages, form submissions, and checkout drop-offs. Redesigns that ignore conversion data often look better but perform worse.',
        ],
        bullets: [
          'Top 10 pages by traffic and conversion rate',
          'Mobile vs desktop completion rates',
          'Core Web Vitals on high-intent templates',
          'Heatmaps or session recordings if available',
        ],
      },
      {
        heading: 'Define success before wireframes',
        paragraphs: [
          'Agree on measurable goals: lead volume, demo requests, average order value, or support ticket reduction. Involve sales and support in wireframe reviews — they know where prospects get stuck.',
        ],
      },
      {
        heading: 'Plan content migration early',
        paragraphs: [
          'Content always takes longer than expected. Assign owners for each page, set copy deadlines before development sprints, and budget for SEO re-optimization of priority URLs.',
        ],
      },
    ],
    keyTakeaways: [
      'Start with conversion data, not mood boards',
      'Set measurable goals before design begins',
      'Include sales and support in UX reviews',
      'Treat content migration as a parallel workstream',
    ],
    conclusion: 'Redesigns succeed when strategy leads visual design. We run discovery, wireframes, and conversion-focused builds so your new site earns its investment.',
  },
  'woocommerce-customization-scale': {
    category: 'WooCommerce',
    readTime: '9 min read',
    intro: 'Stock WooCommerce works until it does not — usually around $1M ARR when shipping rules, subscriptions, and checkout logic outgrow plugin stacks.',
    sections: [
      {
        heading: 'Where off-the-shelf breaks',
        paragraphs: [
          'Plugin conflicts slow checkout. Generic cart rules cannot express your shipping or billing logic. Database queries balloon under traffic spikes during campaigns.',
        ],
        bullets: [
          'Complex shipping zones and free-shipping thresholds',
          'Subscription proration and failed payment retries',
          'B2B pricing tiers and quote workflows',
          'Custom checkout fields tied to CRM or ERP',
        ],
      },
      {
        heading: 'Five customizations to prioritize',
        paragraphs: [
          'Start with cart and checkout — that is where revenue leaks. Then optimize product query performance, add CDN-backed assets, and consolidate plugins into focused custom code where it matters.',
        ],
      },
    ],
    keyTakeaways: [
      'Checkout and shipping logic are first custom priorities',
      'Reduce plugin overlap to improve speed and stability',
      'Load-test before major sales events',
      'Invest in observability for payment failures',
    ],
    conclusion: 'Scaling WooCommerce requires architecture, not more plugins. We build custom cart rules, subscriptions, and performance layers for growing stores.',
  },
  'core-web-vitals-wordpress': {
    category: 'Performance',
    readTime: '6 min read',
    intro: 'Core Web Vitals are ranking signals and conversion signals. Here is how to fix LCP, CLS, and INP on real WordPress business sites — not lab scores alone.',
    sections: [
      {
        heading: 'Largest Contentful Paint (LCP)',
        paragraphs: [
          'Optimize hero images, preload critical fonts, and use a quality host with edge caching. Remove render-blocking scripts above the fold on landing templates.',
        ],
      },
      {
        heading: 'Cumulative Layout Shift (CLS)',
        paragraphs: [
          'Reserve space for ads, embeds, and dynamic content. Set explicit width and height on images and avoid injecting banners after paint.',
        ],
      },
      {
        heading: 'Interaction to Next Paint (INP)',
        paragraphs: [
          'Defer non-critical JavaScript, audit third-party tags, and simplify DOM on interactive pages. Test on mid-tier mobile devices, not just desktop Chrome.',
        ],
      },
    ],
    keyTakeaways: [
      'Fix LCP on homepage and top landing templates first',
      'Always set image dimensions to prevent layout shift',
      'Measure field data in Search Console, not just Lighthouse',
      'Reduce third-party scripts on conversion pages',
    ],
    conclusion: 'Speed is a feature. We audit, optimize, and monitor Core Web Vitals so your WordPress site stays fast under real traffic.',
  },
  'hire-wordpress-agency': {
    category: 'Agency Selection',
    readTime: '5 min read',
    intro: 'In-house teams, freelancers, and agencies each fit different stages. This framework helps founders choose the right WordPress partner without costly mis-hires.',
    sections: [
      {
        heading: 'When to stay in-house',
        paragraphs: [
          'You have steady workload, internal design capacity, and long-term product ownership. Great for SaaS-style products with continuous iteration.',
        ],
      },
      {
        heading: 'When to hire an agency',
        paragraphs: [
          'Launches, redesigns, migrations, and specialized builds (WooCommerce, LearnDash, custom plugins) benefit from a team that has done it dozens of times.',
        ],
        bullets: [
          'Fixed-scope launch with a hard deadline',
          'Migration or replatform with SEO risk',
          'Need design + dev + QA under one contract',
          'No bandwidth to manage multiple freelancers',
        ],
      },
      {
        heading: 'Red flags in agency interviews',
        paragraphs: [
          'Vague timelines, no discovery phase, unwillingness to share code samples, or no post-launch support plan. Ask for case studies in your industry and speak to a reference client.',
        ],
      },
    ],
    keyTakeaways: [
      'Match partner type to project risk and timeline',
      'Demand discovery, written scope, and support terms',
      'Check industry-relevant case studies and references',
      'Clarify who owns code and hosting after launch',
    ],
    conclusion: 'The right partner feels like an extension of your team. We offer discovery calls with clear scope, timelines, and no generic pitch decks.',
  },
};

export function getBlogEnrichment(slug: string, excerpt?: string): BlogEnrichment {
  const base = enrichments[slug] ?? defaultEnrichment;
  if (!enrichments[slug] && excerpt) {
    return {
      ...base,
      intro: excerpt,
      sections: [
        {
          heading: 'Overview',
          paragraphs: [excerpt],
        },
      ],
    };
  }
  return base;
}
