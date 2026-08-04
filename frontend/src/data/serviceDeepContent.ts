/**
 * Extra unique detail blocks per service page — complements existing enrichment,
 * written to match each slug’s theme (not generic filler).
 */

export interface ServiceDeepSection {
  heading: string;
  body: string;
}

export interface ServiceDeepContent {
  idealFor: string[];
  outcomes: string[];
  deepDive: ServiceDeepSection[];
  whatWeClarify: string[];
}

const DEEP: Record<string, ServiceDeepContent> = {
  'wordpress-website-development': {
    idealFor: [
      'Brands replacing a fragile page-builder stack',
      'Teams that need editors to update pages safely',
      'Launches that require staging QA before DNS',
    ],
    outcomes: [
      'Theme patterns editors can reuse without breaking layouts',
      'SEO-ready markup on key templates',
      'Written handoff so ownership is clear after launch',
    ],
    deepDive: [
      {
        heading: 'What we design for first',
        body: 'We start with your sitemap, content owners, and the templates that must convert — home, services, contact — before visual polish. That keeps the build tied to how your team actually publishes.',
      },
      {
        heading: 'How Gutenberg stays maintainable',
        body: 'Block patterns and constrained layouts beat one-off builder pages. Editors get regions they can change weekly; developers keep the design system intact across updates.',
      },
    ],
    whatWeClarify: [
      'Who owns content after launch',
      'Hosting and staging access',
      'Revision rounds included in scope',
    ],
  },
  'wordpress-setup': {
    idealFor: [
      'New WordPress installs that need a clean foundation',
      'Teams migrating off unmanaged DIY setups',
      'Projects that need roles, backups, and basics done right',
    ],
    outcomes: [
      'Hardened baseline (users, permalinks, backups)',
      'Essential plugins only — no bloat stack',
      'Checklist your admin can follow for updates',
    ],
    deepDive: [
      {
        heading: 'Foundation before features',
        body: 'Setup is where abandoned plugins and weak admin habits start. We configure roles, SSL, backups, and a lean plugin set so later theme work is not fighting junk from day one.',
      },
      {
        heading: 'What “done” means for setup',
        body: 'You leave with staging or production access, a short admin guide, and a named owner for updates — not a silent install nobody documents.',
      },
    ],
    whatWeClarify: ['Hosting provider and PHP version', 'Who receives admin email', 'Backup destination'],
  },
  'woocommerce-setup': {
    idealFor: [
      'Stores launching with a clear catalog and payment path',
      'Teams that need tax, shipping, and emails verified on staging',
      'Operators who want a lean WooCommerce start — not twenty trial plugins',
    ],
    outcomes: [
      'Checkout path tested with test gateways',
      'Shipping and tax rules documented',
      'Product template ready for real catalog data',
    ],
    deepDive: [
      {
        heading: 'Commerce basics that protect revenue',
        body: 'We wire products, payments, shipping, and transactional email on staging before go-live. Surprises at first real order are expensive — rehearsal is cheaper.',
      },
      {
        heading: 'Catalog honesty',
        body: 'Stock, variations, and attributes are set so merchandisers can expand without inventing workarounds. We avoid stacking overlapping “store enhancer” plugins at launch.',
      },
    ],
    whatWeClarify: ['Payment gateways', 'Shipping zones', 'Catalog size and variation depth'],
  },
  'learndash-setup': {
    idealFor: [
      'Training teams standing up their first LearnDash site',
      'Cohorts that need drip and access rules defined early',
      'Instructors who need admin paths that are not developer-only',
    ],
    outcomes: [
      'Course structure and sample path on staging',
      'Role gates staff can explain',
      'Payment or enrollment path verified',
    ],
    deepDive: [
      {
        heading: 'Model the cohort before modules',
        body: 'Access rules fail when they are invented after content is uploaded. We map drip, certificates, and who can reset progress before the first lesson ships.',
      },
      {
        heading: 'Instructor-ready admin',
        body: 'Enrollment and progress tools are documented so support is not opening tickets for every new cohort.',
      },
    ],
    whatWeClarify: ['Open vs cohort access', 'Payment vs invite-only', 'Certificate requirements'],
  },
  'wordpress-customization': {
    idealFor: [
      'Sites that work but fight editors on every change',
      'Themes that need templates, CPTs, or layout fixes',
      'Teams avoiding a full redesign but needing maintainable tweaks',
    ],
    outcomes: [
      'Targeted template and pattern updates',
      'Fewer “call a developer” moments for routine edits',
      'Change notes so future updates do not undo work',
    ],
    deepDive: [
      {
        heading: 'Surgical, not rewrite-everything',
        body: 'Customization scopes list exact templates and behaviors. We prefer child themes or focused plugins so core updates stay safer.',
      },
      {
        heading: 'Editor friction is a bug',
        body: 'If a weekly content change requires a developer, the theme is unfinished. We fix the pattern, not just the one page.',
      },
    ],
    whatWeClarify: ['Theme parent and child setup', 'Priority templates', 'What must stay editor-safe'],
  },
  'woocommerce-customization': {
    idealFor: [
      'Stores whose cart, shipping, or pricing outgrew stock settings',
      'Catalogs with attribute or B2B rules plugins cannot express cleanly',
      'Checkout paths that need CRM or ops fields',
    ],
    outcomes: [
      'Cart and checkout logic matched to operations',
      'Less plugin overlap on the same job',
      'Staging tests for guest and logged-in buyers',
    ],
    deepDive: [
      {
        heading: 'Revenue paths first',
        body: 'We prioritize cart, shipping, taxes, and checkout before cosmetic store widgets. That is where WooCommerce custom work pays back.',
      },
      {
        heading: 'When custom beats another plugin',
        body: 'If three extensions partially solve one rule, we scope a focused custom path and document it for your team.',
      },
    ],
    whatWeClarify: ['Shipping and pricing rules in plain language', 'Active overlapping plugins', 'Peak traffic events'],
  },
  'learndash-customization': {
    idealFor: [
      'LMS sites with access or progress edge cases',
      'Teams needing dashboards or enrollment flows beyond defaults',
      'Support queues bloated by unclear learner states',
    ],
    outcomes: [
      'Clearer progress and unlock behavior',
      'Admin tools matched to cohort ops',
      'Fewer one-off exceptions in support',
    ],
    deepDive: [
      {
        heading: 'Access rules you can teach',
        body: 'Custom LearnDash work starts with a written access matrix. If staff cannot explain a gate, learners will hit it as a bug.',
      },
      {
        heading: 'Keep extensions lean',
        body: 'We audit add-ons that fight over the same enrollment hooks before adding more behavior.',
      },
    ],
    whatWeClarify: ['Role matrix', 'Drip vs open paths', 'Support reset policy'],
  },
  'wordpress-migration': {
    idealFor: [
      'Sites moving hosts, themes, or platforms with SEO equity to protect',
      'Teams that need redirect maps — not hope',
      'Cutover windows that require staging rehearsal',
    ],
    outcomes: [
      'URL inventory and redirect plan',
      'Forms and critical flows tested pre-DNS',
      'Post-launch Search Console monitoring plan',
    ],
    deepDive: [
      {
        heading: 'Migrations fail quietly',
        body: 'Visual parity is not enough. Rankings drop when redirects, sitemaps, and noindex flags are wrong. We treat migration as an SEO and QA operation.',
      },
      {
        heading: 'Rollback is part of the plan',
        body: 'DNS moves with a named rollback owner and a verified backup — not a Friday-night improvisation.',
      },
    ],
    whatWeClarify: ['Source and target hosts', 'URL change expectations', 'Acceptable downtime window'],
  },
  'migrate-woocommerce': {
    idealFor: [
      'Stores moving catalogs, customers, and orders to WooCommerce',
      'Teams that cannot lose checkout confidence at cutover',
      'Merchants with gateway and shipping complexity',
    ],
    outcomes: [
      'Catalog and order sample validation on staging',
      'Gateway and email rehearsal',
      'Redirects for product and category URLs',
    ],
    deepDive: [
      {
        heading: 'Commerce data is the product',
        body: 'We reconcile SKUs, variations, and stock before design debates. A pretty theme on bad catalog data is still a failed migration.',
      },
      {
        heading: 'First real order on staging',
        body: 'Test payments, tax, shipping, and emails end-to-end before DNS. Production should not be the first successful checkout.',
      },
    ],
    whatWeClarify: ['Catalog size', 'Gateways', 'Historical order import needs'],
  },
  'migrate-learndash': {
    idealFor: [
      'Training teams moving courses into LearnDash',
      'Memberships that need access continuity',
      'Content libraries that must keep progress where possible',
    ],
    outcomes: [
      'Course structure mapped before import',
      'Access rules verified with a sample cohort',
      'Enrollment path documented for staff',
    ],
    deepDive: [
      {
        heading: 'Progress and access continuity',
        body: 'Learners notice broken unlocks immediately. We map course hierarchy and roles before bulk import so support is not resetting everyone after launch.',
      },
      {
        heading: 'Media and lessons',
        body: 'Video hosts and lesson files are inventoried early — missing media is the most common “migration looks done” failure.',
      },
    ],
    whatWeClarify: ['Source LMS', 'Progress import expectations', 'Payment continuity'],
  },
  'wordpress-maintenance': {
    idealFor: [
      'Sites that need predictable updates without breaking checkout or forms',
      'Teams without in-house WordPress capacity',
      'Operators who want backups and staging discipline',
    ],
    outcomes: [
      'Scheduled updates with staging when available',
      'Backup verification habits',
      'Short monthly notes on what changed',
    ],
    deepDive: [
      {
        heading: 'Care is not “update everything live”',
        body: 'We stage meaningful updates, watch critical paths, and keep a change log. Hope is not a maintenance strategy.',
      },
      {
        heading: 'Security as cadence',
        body: 'User audits, abandoned plugin removal, and restore tests are part of retainers — not one-time panic installs.',
      },
    ],
    whatWeClarify: ['Update window', 'Staging availability', 'Who approves production changes'],
  },
  'website-management': {
    idealFor: [
      'Marketing sites that need ongoing content and small feature help',
      'Teams that want one studio for edits, care, and light builds',
      'Brands between major projects that still need responsiveness',
    ],
    outcomes: [
      'Prioritized backlog for content and fixes',
      'Faster turnaround on scoped small tasks',
      'Continuity with the same WordPress specialists',
    ],
    deepDive: [
      {
        heading: 'Management vs project work',
        body: 'Retainers cover cadence and small changes. Larger features still get a mini-scope so budgets stay honest.',
      },
      {
        heading: 'Shared backlog',
        body: 'You always know what is queued, what is blocked, and what needs a separate quote.',
      },
    ],
    whatWeClarify: ['Hours or task cadence', 'SLA expectations', 'Out-of-scope examples'],
  },
  'hire-wordpress-developers': {
    idealFor: [
      'Teams that need WordPress capacity without a full-time hire yet',
      'Products with a backlog of theme and plugin tickets',
      'Founders who want specialists, not generalist freelancers',
    ],
    outcomes: [
      'Dedicated WordPress capacity on a clear cadence',
      'Tickets broken into shippable scopes',
      'Code ownership that stays with you',
    ],
    deepDive: [
      {
        heading: 'Embedded, not anonymous',
        body: 'You work with WordPress specialists who already ship themes, WooCommerce, and care patterns — not a rotating open marketplace.',
      },
      {
        heading: 'How work is pulled',
        body: 'We agree on communication channels, definition of done, and staging habits before the first sprint of tickets.',
      },
    ],
    whatWeClarify: ['Hours per month', 'Timezone overlap', 'Repo and hosting access'],
  },
  'hire-woocommerce-developers': {
    idealFor: [
      'Stores with ongoing checkout, catalog, or shipping work',
      'Teams mid-campaign that need reliable WooCommerce help',
      'Ops that cannot wait for a generalist to learn cart hooks',
    ],
    outcomes: [
      'Faster iteration on cart and catalog tickets',
      'Fewer conflicting plugin experiments',
      'Staging discipline around payment paths',
    ],
    deepDive: [
      {
        heading: 'Commerce specialists',
        body: 'WooCommerce retainers focus on revenue paths — cart, shipping, taxes, subscriptions — with staging checks before peak traffic.',
      },
      {
        heading: 'Campaign safety',
        body: 'We avoid live experiments on checkout during sales windows unless you explicitly accept the risk in writing.',
      },
    ],
    whatWeClarify: ['Store complexity', 'Peak events', 'Preferred communication'],
  },
  'hire-learndash-developers': {
    idealFor: [
      'Academies with continuous course and access changes',
      'Membership teams needing LMS-aware developers',
      'Support teams drowning in enrollment exceptions',
    ],
    outcomes: [
      'Steady LearnDash capacity',
      'Clearer access and progress behavior over time',
      'Documented changes for instructors',
    ],
    deepDive: [
      {
        heading: 'LMS-aware capacity',
        body: 'LearnDash work needs people who understand drip, groups, and enrollment — not generic PHP freelancers guessing hooks.',
      },
      {
        heading: 'Instructor continuity',
        body: 'Every meaningful change includes a short note for the people who run cohorts day to day.',
      },
    ],
    whatWeClarify: ['Active add-ons', 'Cohort calendar', 'Support escalation path'],
  },
  'wordpress-redesign': {
    idealFor: [
      'Sites whose theme debt blocks conversion or editing',
      'Brands ready to rebuild templates with measurable goals',
      'Teams combining UX refresh with maintainable WordPress structure',
    ],
    outcomes: [
      'Goals tied to leads or revenue — not mood boards alone',
      'New templates with editor-safe patterns',
      'Content migration treated as its own workstream',
    ],
    deepDive: [
      {
        heading: 'Strategy before pixels',
        body: 'We audit top landing pages and conversion paths first. Redesigns that ignore data often look better and convert worse.',
      },
      {
        heading: 'Content is on the critical path',
        body: 'Copy and media owners are named early. Late content is the most common redesign delay — we plan for it explicitly.',
      },
    ],
    whatWeClarify: ['Success metrics', 'Brand assets', 'What must not change for SEO'],
  },
  'landing-page-redesign': {
    idealFor: [
      'Campaign or service pages that under-convert',
      'Paid traffic landing on weak templates',
      'Teams that need fast, scoped landing refreshes',
    ],
    outcomes: [
      'Clearer offer hierarchy and form path',
      'Mobile-first layout with measured goals',
      'Tracking verified before spend scales',
    ],
    deepDive: [
      {
        heading: 'One job per landing page',
        body: 'We strip competing CTAs and align headline, proof, and form. Landing redesigns fail when they become mini-homepages.',
      },
      {
        heading: 'Measure the funnel',
        body: 'Analytics and conversion events are checked before and after so you can defend the change.',
      },
    ],
    whatWeClarify: ['Traffic source', 'Primary CTA', 'A/B constraints'],
  },
  'wordpress-speed-optimization': {
    idealFor: [
      'Sites with weak field Core Web Vitals on key templates',
      'Teams that already tried caching plugins without lasting gains',
      'Marketing pages where LCP is a hero or script problem',
    ],
    outcomes: [
      'Prioritized fixes on money pages',
      'Less third-party script weight where it hurts',
      'Notes so editors do not undo performance wins',
    ],
    deepDive: [
      {
        heading: 'Templates, not vanity scores',
        body: 'We measure home, landing, and conversion templates on mobile. Lab-only green scores on empty pages do not count as delivery.',
      },
      {
        heading: 'Fix order that sticks',
        body: 'Media and fonts first, then queries and scripts. We document what not to re-enable after the engagement.',
      },
    ],
    whatWeClarify: ['Hosting stack', 'Critical URLs', 'Who owns tag managers'],
  },
  'woocommerce-speed-optimization': {
    idealFor: [
      'Stores slow on category, product, or checkout',
      'Catalogs where related products and widgets dominate load time',
      'Campaign seasons that expose query and script debt',
    ],
    outcomes: [
      'Faster money-path templates',
      'Leaner cart and product scripts where safe',
      'Staging verification before peak traffic',
    ],
    deepDive: [
      {
        heading: 'Commerce templates first',
        body: 'Category, product, cart, and checkout beat homepage vanity. That is where speed becomes revenue.',
      },
      {
        heading: 'Plugin weight audit',
        body: 'We identify overlapping store plugins that tax every page, then recommend keep, replace, or custom.',
      },
    ],
    whatWeClarify: ['Catalog size', 'Critical plugins', 'Campaign calendar'],
  },
  'api-integrations': {
    idealFor: [
      'WordPress sites that must talk to CRM, ERP, or billing tools',
      'Stores syncing inventory or orders outward',
      'Teams tired of brittle Zapier-only stacks for core flows',
    ],
    outcomes: [
      'Documented endpoints and error handling',
      'Staging tests with sample payloads',
      'Clear ownership when an upstream API changes',
    ],
    deepDive: [
      {
        heading: 'Contracts before code',
        body: 'We map fields, auth, and failure modes first. Integrations fail in production when error paths were never designed.',
      },
      {
        heading: 'Idempotency and logging',
        body: 'Retries and logs are part of scope so ops can see why an order or lead did not sync.',
      },
    ],
    whatWeClarify: ['Systems to connect', 'Auth method', 'Who owns the other API'],
  },
  'wordpress-ai-automation': {
    idealFor: [
      'Teams with repetitive editorial or triage workflows',
      'Sites that need guarded AI assist — not unbounded content spam',
      'Operators who want automation with human review gates',
    ],
    outcomes: [
      'Scoped automations with clear inputs/outputs',
      'Human approval steps where brand risk exists',
      'Logs so you can audit what ran',
    ],
    deepDive: [
      {
        heading: 'Automation with guardrails',
        body: 'We do not dump unreviewed AI text onto production. Workflows include review steps, rate limits, and rollback notes.',
      },
      {
        heading: 'WordPress-native where it helps',
        body: 'Hooks, cron, and admin UX stay familiar to your editors — not a separate black-box tool nobody owns.',
      },
    ],
    whatWeClarify: ['Tasks to automate', 'Approval owners', 'Data that must never leave your stack'],
  },
  'wordpress-seo-services': {
    idealFor: [
      'Sites with technical SEO debt on WordPress templates',
      'Migrations or redesigns that need indexation hygiene',
      'Teams that want structure and CWV support — not fake ranking guarantees',
    ],
    outcomes: [
      'Template and metadata hygiene on priority URLs',
      'Sitemap and canonical clarity',
      'Practical next actions for content owners',
    ],
    deepDive: [
      {
        heading: 'Technical SEO you can ship',
        body: 'We focus on crawlability, titles, canonicals, internal links, and template performance — areas WordPress agencies can actually control.',
      },
      {
        heading: 'No invented rankings',
        body: 'We do not sell guaranteed positions. We sell a cleaner technical foundation and a content backlog your team can execute.',
      },
    ],
    whatWeClarify: ['Priority URLs', 'Search Console access', 'Content ownership'],
  },
  'plugin-development': {
    idealFor: [
      'Features that do not exist cleanly in the plugin directory',
      'Stores needing custom pricing, membership, or admin tools',
      'Teams that want owned code instead of three overlapping extensions',
    ],
    outcomes: [
      'Plugin with capability checks and clear admin UX',
      'Staging release checklist',
      'Handoff notes for settings and updates',
    ],
    deepDive: [
      {
        heading: 'Built to survive updates',
        body: 'Prefixed hooks, capability checks, and escape/sanitize habits are non-negotiable. Agency plugins should not become the next security incident.',
      },
      {
        heading: 'Admin UX is part of scope',
        body: 'If editors cannot configure the feature, you will still pay for developer tickets. We design settings screens as deliverables.',
      },
    ],
    whatWeClarify: ['Feature rules in plain language', 'Multisite needs', 'Who maintains after launch'],
  },
  'woocommerce-development': {
    idealFor: [
      'Stores that need custom catalog, checkout, or membership logic',
      'Brands past “install another plugin” as a strategy',
      'Ops that require staging-first commerce changes',
    ],
    outcomes: [
      'Storefront and checkout matched to how you sell',
      'Documented custom rules',
      'QA on guest and customer paths',
    ],
    deepDive: [
      {
        heading: 'Architecture for how you sell',
        body: 'WooCommerce development here means cart rules, catalogs, and admin tools shaped to operations — not theme cosmetics alone.',
      },
      {
        heading: 'Campaign-safe delivery',
        body: 'Meaningful commerce changes rehearse on staging, especially before traffic spikes.',
      },
    ],
    whatWeClarify: ['Catalog model', 'Checkout requirements', 'Integrations'],
  },
  'learndash-development': {
    idealFor: [
      'Academies needing a branded LearnDash platform',
      'Membership + course products under one WordPress roof',
      'Training teams that need enrollment and progress as one system',
    ],
    outcomes: [
      'Cohesive course and membership experience',
      'Access rules aligned to products',
      'Instructor and admin handoff',
    ],
    deepDive: [
      {
        heading: 'Platform, not a pile of courses',
        body: 'We design navigation, enrollment, and progress so learners and staff share one mental model.',
      },
      {
        heading: 'Payments and seats',
        body: 'If you sell seats to teams, those flows are tested on staging with clear refund and assignment notes.',
      },
    ],
    whatWeClarify: ['Course catalog shape', 'Membership tiers', 'Video hosting'],
  },
};

const FALLBACK_DEEP: ServiceDeepContent = {
  idealFor: [
    'Teams that need WordPress work with a written scope',
    'Operators who want staging QA before production changes',
    'Editors who must keep the site maintainable after handoff',
  ],
  outcomes: [
    'Clear inclusions and exclusions',
    'Staging review when hosting allows',
    'Documentation your team can use',
  ],
  deepDive: [
    {
      heading: 'How we keep this service maintainable',
      body: 'Every engagement starts with success criteria and ends with handoff notes. We avoid undocumented production hotfixes as a delivery style.',
    },
  ],
  whatWeClarify: ['Goals and constraints', 'Hosting and staging access', 'Who approves go-live'],
};

export function getServiceDeepContent(slug: string): ServiceDeepContent {
  return DEEP[slug] ?? FALLBACK_DEEP;
}
