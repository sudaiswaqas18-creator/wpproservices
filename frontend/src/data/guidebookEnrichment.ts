/** Unique guidebook long-form — WPServices operator notes (not scraped third-party guides) */

export interface GuidebookEnrichment {
  intro: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  checklist: string[];
  seoBlurb: string;
}

const ENRICHMENT: Record<string, GuidebookEnrichment> = {
  'woocommerce-migration-checklist': {
    intro:
      'Moving a live store is a content and commerce operation — not a file copy. This WPServices checklist keeps products, customers, orders, and rankings intact through staging and cutover.',
    sections: [
      {
        heading: 'Inventory before you move',
        body: 'Export product counts, variation matrices, coupon rules, and gateway settings. Photograph checkout on mobile. Capture top landing URLs from Search Console so redirects are planned, not improvised.',
        bullets: [
          'Catalog SKU and stock snapshot',
          'Active payment and shipping methods',
          'Top 50 URLs by traffic and revenue',
        ],
      },
      {
        heading: 'Staging rehearsal',
        body: 'Run a full order on staging with test gateways. Confirm emails, tax, and shipping. Only then schedule DNS with a rollback owner named in writing.',
      },
      {
        heading: 'Post-cutover week',
        body: 'Watch failed payments, crawl errors, and cart abandonment. Keep the old host read-only for at least one billing cycle if contracts allow.',
      },
    ],
    checklist: [
      'Redirect map reviewed and tested',
      'Gateway live keys confirmed after DNS',
      'Sitemap resubmitted in Search Console',
      'Editor handoff for products and coupons',
    ],
    seoBlurb: 'WooCommerce migration checklist for catalogs, checkout, redirects, and staging QA.',
  },
  'learndash-diy-setup': {
    intro:
      'LearnDash succeeds when course structure, access rules, and instructor roles match how training actually runs. Use this setup path before opening enrollment.',
    sections: [
      {
        heading: 'Model the cohort first',
        body: 'Decide drip vs open access, certificate rules, and who can reset progress. Document role gates so support is not inventing exceptions later.',
      },
      {
        heading: 'Payments and seats',
        body: 'If you sell seats to teams, test wallet or bulk assignment on staging. Guest checkout paths often break membership plugins when left untested.',
      },
    ],
    checklist: [
      'Course outline approved by instructors',
      'Sample cohort completes a full path',
      'Email notifications verified',
      'Admin guide for adding a new cohort',
    ],
    seoBlurb: 'LearnDash DIY setup checklist for courses, drip, access, and launch hygiene.',
  },
  'learndash-tips-tricks': {
    intro:
      'These LearnDash operator habits come from WPServices delivery work — fewer support tickets, clearer progress, and access rules staff can explain.',
    sections: [
      {
        heading: 'Progress clarity beats more modules',
        body: 'Learners abandon when they cannot see what is next. Surface progress and unlock rules on the course home, not buried in widgets.',
      },
      {
        heading: 'Limit overlapping extensions',
        body: 'Two plugins fighting over the same enrollment hook will fail under the first campaign. Prefer one clear path for access and one for certificates.',
      },
    ],
    checklist: [
      'Audit active LearnDash add-ons quarterly',
      'Document reset-progress policy',
      'Test mobile lesson completion',
    ],
    seoBlurb: 'LearnDash tips for drip content, progress clarity, and fewer support tickets.',
  },
  'woocommerce-plugin-guide': {
    intro:
      'Choose WooCommerce extensions by the job they must finish — pricing, inventory, checkout, or care — not by feature lists. Custom code often beats a third overlapping plugin.',
    sections: [
      {
        heading: 'Job-to-be-done filter',
        body: 'Write the operational rule in one sentence. If three plugins claim to solve it partially, you will own the conflict. Scope a focused custom path instead.',
      },
      {
        heading: 'When to stay stock',
        body: 'Simple catalogs with standard shipping can stay lean. Complexity belongs in cart rules and inventory honesty — not urgency widgets.',
      },
    ],
    checklist: [
      'List plugins by job, not brand name',
      'Remove abandoned extensions',
      'Stage updates before campaign weeks',
    ],
    seoBlurb: 'WooCommerce plugin selection guide by job-to-be-done for stores and operators.',
  },
  'plugin-developer-guide': {
    intro:
      'Agency plugin work should survive WordPress updates: capability checks, prefixed hooks, clear admin UX, and a release checklist your future self can run.',
    sections: [
      {
        heading: 'Security and capabilities',
        body: 'Never trust form input. Check capabilities on every admin action. Escape output. Log failures without leaking secrets.',
      },
      {
        heading: 'Release hygiene',
        body: 'Semantic versions, staging smoke tests, and a rollback note. Document settings screens for the editor who inherits the plugin.',
      },
    ],
    checklist: [
      'Capability checks on admin routes',
      'Staging smoke test checklist',
      'Handoff note for settings and cron',
    ],
    seoBlurb: 'WordPress plugin developer guide for maintainable agency releases.',
  },
  'pre-launch-checklist': {
    intro:
      'Launch week is when missing redirects and untested forms show up. This pre-launch checklist is what WPServices runs before DNS moves.',
    sections: [
      {
        heading: 'Content and SEO',
        body: 'Titles, canonicals, sitemap, robots, and noindex flags on staging. Confirm analytics and Search Console properties.',
      },
      {
        heading: 'Commerce and forms',
        body: 'Submit every critical form. Place a test order. Confirm emails land and spam folders are checked.',
      },
    ],
    checklist: [
      'Mobile pass on home, product, checkout',
      'Backup + restore verified',
      'Rollback owner named',
    ],
    seoBlurb: 'WordPress pre-launch checklist for SEO, forms, checkout, and cutover.',
  },
  'woocommerce-speed-playbook': {
    intro:
      'Store speed is mostly template and query work. This playbook prioritizes money pages before stacking optimization plugins.',
    sections: [
      {
        heading: 'Measure the right templates',
        body: 'Home, category, product, cart, and checkout on mobile. Note LCP element and main-thread long tasks from third-party scripts.',
      },
      {
        heading: 'Fix order',
        body: 'Images and fonts first, then product queries and related widgets, then script deferral. Re-measure after each change window.',
      },
    ],
    checklist: [
      'Baseline field metrics on money pages',
      'Remove unused page-builder assets',
      'Document what editors must not re-enable',
    ],
    seoBlurb: 'WooCommerce speed playbook for Core Web Vitals on real store templates.',
  },
};

export function getGuidebookEnrichment(slug: string | null | undefined): GuidebookEnrichment | null {
  if (!slug) return null;
  return ENRICHMENT[slug] || null;
}
