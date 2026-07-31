import fs from 'fs';

const path = 'c:/Users/User/Downloads/wpproservices/frontend/src/data/serviceEnrichment.ts';

function e(o) { return o; }
function h(a, b, c) {
  return [
    { label: a[0], value: a[1] },
    { label: b[0], value: b[1] },
    { label: c[0], value: c[1] },
  ];
}
function b3(t1, d1, t2, d2, t3, d3) {
  return [
    { title: t1, description: d1 },
    { title: t2, description: d2 },
    { title: t3, description: d3 },
  ];
}
function p4(a, b, c, d) {
  return [
    { step: 1, title: a[0], description: a[1] },
    { step: 2, title: b[0], description: b[1] },
    { step: 3, title: c[0], description: c[1] },
    { step: 4, title: d[0], description: d[1] },
  ];
}
function fq(pairs) {
  return pairs.map(([question, answer]) => ({ question, answer }));
}

const enrichments = {
  'wordpress-website-development': e({
    categoryLabel: 'Custom Build',
    highlights: h(['Timeline', '4–8 weeks'], ['Stack', 'Theme + Gutenberg'], ['Warranty', '30 days post-launch']),
    features: [
      'Custom theme or carefully customized premium theme',
      'Responsive layouts tested across major breakpoints',
      'SEO-friendly markup and basic schema where needed',
      'Contact forms wired to your inbox or CRM',
      'Staging site for review before go-live',
      'Editor training notes and handoff checklist',
    ],
    benefits: b3(
      'Built for editors',
      'Editors can update pages without fighting the layout.',
      'Clean foundation',
      'Architecture that accepts future plugins and CPTs without chaos.',
      'Launch-ready QA',
      'Forms, redirects, and mobile views checked before DNS cutover.',
    ),
    process: p4(
      ['Discovery', 'Goals, sitemap, and content inventory'],
      ['Design system', 'Wireframes and visual direction for key templates'],
      ['Build on staging', 'Theme development with iterative previews'],
      ['Launch', 'DNS cutover, monitoring, and first-week fixes'],
    ),
    deliverables: ['Theme source files', 'Staging credentials', 'Handoff guide', 'Launch checklist'],
    faqs: fq([
      ['Do you build with Gutenberg or a page builder?', 'We prefer Gutenberg block themes when possible, and use Elementor when your editors already rely on it.'],
      ['Can you work from our Figma files?', 'Yes. We implement approved designs and flag anything that conflicts with WordPress constraints.'],
      ['Will we own the code?', 'Yes. Theme and custom code are yours after final payment.'],
      ['How many revision rounds are included?', 'Scoped packages include structured revision rounds; extras are quoted clearly.'],
    ]),
    intro:
      'Custom WordPress websites for brands that need more than a starter theme — structured templates, clear editor workflows, and performance-minded markup from day one.',
  }),
  'wordpress-setup': e({
    categoryLabel: 'Launch Setup',
    highlights: h(['Timeline', '3–10 days'], ['Environments', 'Local + staging'], ['Includes', 'Hardening basics']),
    features: [
      'Fresh WordPress install on your hosting',
      'Recommended plugins only — no bloat stack',
      'Permalink, timezone, and user role setup',
      'SSL, backups, and basic hardening',
      'SMTP or transactional email configuration',
      'Admin walkthrough for day-to-day tasks',
    ],
    benefits: b3(
      'Ship sooner',
      'Skip the trial-and-error of a first-time install.',
      'Safer defaults',
      'Login and update habits set before you publish.',
      'Clear ownership',
      'You know which plugins stay and why.',
    ),
    process: p4(
      ['Hosting review', 'Confirm PHP, SSL, and DNS readiness'],
      ['Install & configure', 'Core settings and essential plugins'],
      ['Baseline security', 'Roles, updates, and backup schedule'],
      ['Handoff', 'Credentials map and short training'],
    ),
    deliverables: ['Configured WordPress install', 'Plugin shortlist', 'Access document', 'Backup schedule notes'],
    faqs: fq([
      ['Can you set up WordPress on my existing host?', 'Yes, as long as the plan meets current PHP and SSL requirements.'],
      ['Do you migrate content during setup?', 'Basic setup focuses on a clean install; content migration is a separate service.'],
      ['Will you manage updates afterward?', 'Optional — maintenance retainers cover ongoing updates.'],
    ]),
    intro:
      'Professional WordPress installation and configuration so your first publish happens on a stable, hardened baseline — not a rushed default install.',
  }),
  'woocommerce-setup': e({
    categoryLabel: 'Store Setup',
    highlights: h(['Go-live', '1–3 weeks'], ['Payments', 'Stripe / PayPal+'], ['Catalog', 'Import support']),
    features: [
      'WooCommerce install and store settings',
      'Payment gateways configured and test orders verified',
      'Shipping zones, tax rules, and email templates',
      'Product import guidance or assisted import',
      'Checkout and cart review on mobile',
      'Admin notes for fulfillment basics',
    ],
    benefits: b3(
      'Ready to take orders',
      'Test purchases completed before launch.',
      'Ops-friendly setup',
      'Taxes and shipping match how you actually fulfill.',
      'Fewer surprises',
      'Common checkout blockers caught early.',
    ),
    process: p4(
      ['Store brief', 'Catalog types, currencies, and gateways'],
      ['Configure WooCommerce', 'Payments, shipping, taxes, emails'],
      ['Catalog & QA', 'Sample products and checkout tests'],
      ['Launch support', 'Go-live checklist and first-week monitoring'],
    ),
    deliverables: ['Configured store', 'Payment test log', 'Shipping/tax map', 'Admin quick-start'],
    faqs: fq([
      ['Can you import my product CSV?', 'Yes — we validate mapping and sample rows before a full import.'],
      ['Do you set up subscriptions?', 'Basic setup covers standard products; subscriptions are scoped separately.'],
      ['Will my theme work with WooCommerce?', 'We check compatibility and patch gaps before launch.'],
    ]),
    intro:
      'WooCommerce store setup that covers payments, shipping, taxes, and checkout QA — so opening day is about selling, not debugging settings.',
  }),
  'learndash-setup': e({
    categoryLabel: 'LMS Setup',
    highlights: h(['Timeline', '1–3 weeks'], ['Focus', 'Courses + access'], ['Includes', 'Payment options']),
    features: [
      'LearnDash install and course structure setup',
      'Lessons, topics, and quizzes wired correctly',
      'User registration and course access rules',
      'Optional WooCommerce course selling',
      'Student-facing navigation polish',
      'Instructor orientation notes',
    ],
    benefits: b3(
      'Courses that open cleanly',
      'Learners reach content without broken menus.',
      'Access that matches your model',
      'Cohorts, drip, or open enrollment — configured intentionally.',
      'Admin clarity',
      'Instructors know where to update content.',
    ),
    process: p4(
      ['Learning model', 'Map courses, drip, and certificates'],
      ['Build structure', 'Courses, lessons, quizzes'],
      ['Access & payments', 'Enrollment rules and gateways'],
      ['QA & handoff', 'Student walkthrough and admin notes'],
    ),
    deliverables: ['Configured LMS', 'Course skeleton', 'Access rules doc', 'Instructor guide'],
    faqs: fq([
      ['Do you create course content?', 'We structure and configure the LMS; writing curriculum is usually client-owned unless scoped.'],
      ['Can students buy courses online?', 'Yes via WooCommerce integration when included in scope.'],
      ['Is mobile learning supported?', 'We test learner flows on phones and tablets.'],
    ]),
    intro:
      'LearnDash configuration for training teams that need courses, quizzes, and access rules working together — without a maze of half-set plugins.',
  }),
  'wordpress-customization': e({
    categoryLabel: 'Theme & Feature Customization',
    highlights: h(['Scope', 'Feature-based'], ['Approach', 'Child theme / blocks'], ['QA', 'Staging first']),
    features: [
      'Child theme or block pattern customization',
      'Custom fields and template parts',
      'Plugin tweaks without unsafe core edits',
      'Editor experience improvements',
      'Regression testing on staging',
      'Update-safe implementation notes',
    ],
    benefits: b3(
      'Keep what works',
      'Extend your current site instead of a full rebuild.',
      'Safe changes',
      'Custom code isolated from theme updates where possible.',
      'Editor-friendly results',
      'New fields and layouts that staff can use.',
    ),
    process: p4(
      ['Audit', 'Identify what to keep vs rewrite'],
      ['Plan changes', 'Templates, fields, and plugins'],
      ['Implement on staging', 'Build and review'],
      ['Deploy', 'Careful push with rollback notes'],
    ),
    deliverables: ['Custom code package', 'Staging preview', 'Change log', 'Update-safe notes'],
    faqs: fq([
      ['Will customization break on theme updates?', 'We use child themes or custom plugins to reduce update risk.'],
      ['Can you customize a page-builder site?', 'Yes, with care around template inheritance and global styles.'],
      ['How is pricing set?', 'By feature complexity after a short technical review.'],
    ]),
    intro:
      'WordPress customization for sites that are close but not quite right — templates, fields, and plugin behavior shaped to your workflows.',
  }),
  'woocommerce-customization': e({
    categoryLabel: 'Store Customization',
    highlights: h(['Focus', 'Checkout & catalog'], ['Testing', 'Order flows'], ['Docs', 'Admin notes']),
    features: [
      'Custom product types or fields',
      'Checkout field and validation changes',
      'Shipping or fee logic',
      'Account area improvements',
      'Order email and status tweaks',
      'Staging order regression tests',
    ],
    benefits: b3(
      'Match how you sell',
      'Rules reflect wholesale, B2B, or bundles.',
      'Fewer workarounds',
      'Replace fragile plugin stacks with targeted code.',
      'Tested purchases',
      'Staging orders cover edge cases.',
    ),
    process: p4(
      ['Map store rules', 'Pricing, shipping, and roles'],
      ['Design the change', 'UX and data model'],
      ['Build & test', 'Orders, refunds, emails'],
      ['Release', 'Deploy with monitoring'],
    ),
    deliverables: ['Custom plugin or theme mods', 'Test order report', 'Admin guide'],
    faqs: fq([
      ['Can you change the checkout layout?', 'Yes — within theme/WooCommerce constraints and accessibility basics.'],
      ['Do you support HPOS?', 'We build with modern WooCommerce compatibility in mind.'],
      ['Will existing extensions conflict?', 'We audit active plugins before changing checkout or cart behavior.'],
    ]),
    intro:
      'WooCommerce customization for stores whose catalog, roles, or checkout no longer fit stock settings — precise changes, tested order paths.',
  }),
  'learndash-customization': e({
    categoryLabel: 'LMS Customization',
    highlights: h(['Focus', 'Access & reporting'], ['Stack', 'LearnDash + custom'], ['Support', 'Staging QA']),
    features: [
      'Custom course templates',
      'Advanced access and drip rules',
      'Reporting dashboards for instructors',
      'Integrations with CRM or SSO',
      'Certificate and progress UI tweaks',
      'Regression tests after LearnDash updates',
    ],
    benefits: b3(
      'Learner experience first',
      'Navigation and progress stay understandable.',
      'Admin efficiency',
      'Staff spend less time hunting settings.',
      'Integrations that stick',
      'Enrollment syncs without manual CSV rituals.',
    ),
    process: p4(
      ['Requirements workshop', 'Map learner journeys'],
      ['Prototype key screens', 'Templates and reports'],
      ['Build on staging', 'Access rules and integrations'],
      ['Train & launch', 'Instructor walkthrough'],
    ),
    deliverables: ['Custom modules', 'Staging LMS', 'Instructor notes'],
    faqs: fq([
      ['Can you add SSO?', 'Often yes — scope depends on your identity provider.'],
      ['Will custom code survive LearnDash updates?', 'We isolate customizations and test after major updates.'],
      ['Do you redesign the course player?', 'Yes when the theme and LearnDash hooks allow a clean approach.'],
    ]),
    intro:
      'LearnDash customization when default course layouts and access rules cannot cover how your academy actually teaches.',
  }),
  'wordpress-migration': e({
    categoryLabel: 'Platform Migration',
    highlights: h(['Downtime', 'Near-zero target'], ['SEO', '301 map'], ['QA', 'Staging cutover']),
    features: [
      'Content and media migration',
      'URL mapping with 301 redirects',
      'Form and plugin compatibility checks',
      'Staging rehearsal before DNS change',
      'Post-migration Search Console checklist',
      'Rollback plan documentation',
    ],
    benefits: b3(
      'Protect rankings',
      'Redirects planned before cutover.',
      'Rehearse first',
      'Issues surface on staging, not launch day.',
      'Rollback plan',
      'Clear path if something critical fails.',
    ),
    process: p4(
      ['Inventory', 'Pages, media, forms, integrations'],
      ['Migrate to staging', 'Import and rebuild templates'],
      ['Redirects & QA', 'Crawl and form tests'],
      ['Cutover', 'DNS switch and monitoring'],
    ),
    deliverables: ['Redirect map', 'Staging site', 'Cutover runbook', 'Post-launch checklist'],
    faqs: fq([
      ['Can you migrate from Webflow or Squarespace?', 'Yes — content and structure are rebuilt in WordPress with redirects.'],
      ['Will SEO rankings drop?', 'We cannot guarantee rankings, but redirects and crawl checks reduce avoidable loss.'],
      ['How long is downtime?', 'Most cutovers are minutes if DNS and hosting are prepared.'],
      ['Do you move blog comments?', 'When the source export supports it; we confirm during inventory.'],
    ]),
    intro:
      'Migrations to WordPress with a redirect plan, staging rehearsal, and post-cutover checks — so SEO and forms survive the move.',
  }),
  'migrate-woocommerce': e({
    categoryLabel: 'Store Migration',
    highlights: h(['Focus', 'Orders & SKUs'], ['Risk', 'Staging first'], ['SEO', 'Product URLs']),
    features: [
      'Product and variation import',
      'Customer and order history where feasible',
      'Payment and shipping reconfiguration',
      'Redirects for product and category URLs',
      'Checkout QA after move',
      'Staff training on the new admin',
    ],
    benefits: b3(
      'Catalog integrity',
      'SKUs and attributes land correctly.',
      'Checkout confidence',
      'Test orders on staging before switch.',
      'URL continuity',
      'Shop pages keep redirect coverage.',
    ),
    process: p4(
      ['Export audit', 'Catalog and order scope'],
      ['Staging store', 'Import and rebuild'],
      ['Gateway & shipping QA', 'Live-mode readiness'],
      ['Cutover', 'Go-live and monitor'],
    ),
    deliverables: ['Imported catalog', 'Redirect list', 'Test order log'],
    faqs: fq([
      ['Can historical orders move?', 'Often yes depending on the source platform; we confirm during discovery.'],
      ['What about subscriptions?', 'Subscription data needs extra mapping — scoped separately when present.'],
      ['Will payment tokens transfer?', 'Usually not; customers may re-save cards depending on the gateway.'],
    ]),
    intro:
      'Move an existing store to WooCommerce with catalog, customers, and checkout paths verified on staging before customers notice.',
  }),
  'migrate-learndash': e({
    categoryLabel: 'LMS Migration',
    highlights: h(['Focus', 'Courses & users'], ['Access', 'Preserved rules'], ['QA', 'Learner login']),
    features: [
      'Course content migration',
      'User accounts and enrollments',
      'Progress and quiz data where supported',
      'Access rules rebuilt in LearnDash',
      'Learner smoke tests',
      'Instructor orientation after cutover',
    ],
    benefits: b3(
      'Students keep access',
      'Enrollments remapped carefully.',
      'Content continuity',
      'Lessons and media arrive intact.',
      'Fewer support tickets',
      'Login and course entry tested.',
    ),
    process: p4(
      ['Source audit', 'Courses, users, progress'],
      ['Rebuild in LearnDash', 'Structure and media'],
      ['Access mapping', 'Enrollments and groups'],
      ['Launch', 'Learner QA and support window'],
    ),
    deliverables: ['Migrated courses', 'User map', 'Learner test notes'],
    faqs: fq([
      ['Will quiz scores transfer?', 'Depends on the source LMS; we set expectations after audit.'],
      ['Can we migrate mid-cohort?', 'Possible with a freeze window — planned during discovery.'],
      ['Do videos need re-hosting?', 'Often yes; we integrate your preferred video host.'],
    ]),
    intro:
      'Bring courses and learners into LearnDash with enrollment mapping and learner QA — not a blind content dump.',
  }),
  'wordpress-maintenance': e({
    categoryLabel: 'Care Plan',
    highlights: h(['Backups', 'Scheduled'], ['Updates', 'Staging-tested'], ['Reports', 'Monthly']),
    features: [
      'Core, theme, and plugin updates on staging first',
      'Scheduled backups with restore verification',
      'Uptime and security monitoring',
      'Malware scanning and hardening reviews',
      'Priority ticket window for break/fix issues',
      'Monthly health notes',
    ],
    benefits: b3(
      'Fewer emergency weekends',
      'Updates happen on a calendar.',
      'Safer changes',
      'Staging catches fatal errors early.',
      'Visible accountability',
      'Monthly notes show what changed.',
    ),
    process: p4(
      ['Onboarding', 'Access, inventory, baseline'],
      ['Cadence setup', 'Backup and update schedule'],
      ['Ongoing care', 'Updates, scans, small fixes'],
      ['Monthly review', 'Health summary and recommendations'],
    ),
    deliverables: ['Monthly report', 'Backup confirmation', 'Change log'],
    faqs: fq([
      ['Do you work on staging?', 'Yes — production updates follow a staging pass when hosting allows.'],
      ['What is response time?', 'Priority windows are defined in your care plan agreement.'],
      ['Are content edits included?', 'Light edits may be included; larger builds are quoted separately.'],
      ['Do you harden security?', 'Yes — baseline hardening and monitoring are part of care plans.'],
    ]),
    intro:
      'WordPress maintenance that treats updates, backups, and monitoring as a system — so your site does not quietly rot between launches.',
  }),
  'website-management': e({
    categoryLabel: 'Managed WordPress',
    highlights: h(['Team', 'Named contacts'], ['Scope', 'Ops + improvements'], ['Cadence', 'Weekly sync option']),
    features: [
      'Roadmap of small improvements',
      'Content publishing support within hours budget',
      'Performance and plugin hygiene',
      'Vendor coordination (hosting, DNS, email)',
      'Reporting for stakeholders',
      'Shared backlog visibility',
    ],
    benefits: b3(
      'One accountable team',
      'Less juggling freelancers for routine work.',
      'Progress you can see',
      'Backlog moves every cycle.',
      'Business-aware priorities',
      'We sequence work by impact.',
    ),
    process: p4(
      ['Align goals', 'KPIs and constraints'],
      ['Backlog & sprint', 'Prioritized tasks'],
      ['Execute', 'Build, publish, monitor'],
      ['Report', 'Outcomes and next options'],
    ),
    deliverables: ['Shared backlog', 'Weekly notes', 'Access map'],
    faqs: fq([
      ['Is this the same as maintenance?', 'Management includes care plus planned improvements and publishing help.'],
      ['Can you work with our marketing team?', 'Yes — we plug into existing workflows and tools.'],
      ['How are hours tracked?', 'Against an agreed monthly budget with transparent reporting.'],
    ]),
    intro:
      'End-to-end WordPress site management for teams that need a partner handling ops, publishing support, and steady improvements.',
  }),
  'hire-wordpress-developers': e({
    categoryLabel: 'WordPress Retainer',
    highlights: h(['Capacity', 'Hours / month'], ['Skills', 'Theme + plugin'], ['Overlap', 'Your timezone window']),
    features: [
      'Dedicated WordPress developer capacity',
      'Feature work on themes and plugins',
      'Code review habits and staging discipline',
      'Flexible backlog within retainer hours',
      'Knowledge sharing with your internal team',
      'Written notes on completed tickets',
    ],
    benefits: b3(
      'Elastic capacity',
      'Scale hours up or down by agreement.',
      'WordPress specialists',
      'Not generalists learning on your repo.',
      'Continuity',
      'Same people learn your codebase.',
    ),
    process: p4(
      ['Scope retainer', 'Hours, SLAs, tools'],
      ['Kickoff', 'Repo, staging, conventions'],
      ['Delivery cycles', 'Tickets and demos'],
      ['Retro', 'Improve process each month'],
    ),
    deliverables: ['Retainer agreement', 'Access checklist', 'Sprint board'],
    faqs: fq([
      ['Can we pause the retainer?', 'Pause terms are written into the agreement.'],
      ['Do you work in our Git repo?', 'Yes — we follow your branching rules.'],
      ['Is a project manager included?', 'Coordination is included; dedicated PM hours can be added.'],
    ]),
    intro:
      'Hire WordPress developers on a retainer when you need ongoing theme and plugin capacity without a full-time hire.',
  }),
  'hire-woocommerce-developers': e({
    categoryLabel: 'WooCommerce Retainer',
    highlights: h(['Focus', 'Store growth'], ['QA', 'Order flows'], ['Cadence', 'Sprint-based']),
    features: [
      'WooCommerce feature development',
      'Checkout and catalog improvements',
      'Extension evaluation and cleanup',
      'Performance passes for shop pages',
      'Coordination with your ops team',
      'Staging purchase tests before release',
    ],
    benefits: b3(
      'Store-specific expertise',
      'Developers who know WooCommerce edge cases.',
      'Safer releases',
      'Order paths tested before deploy.',
      'Less plugin sprawl',
      'We prefer targeted fixes over stacking extensions.',
    ),
    process: p4(
      ['Store audit', 'Plugins, theme, bottlenecks'],
      ['Prioritize backlog', 'Revenue and ops impact'],
      ['Build & QA', 'Staging orders'],
      ['Release', 'Monitor metrics'],
    ),
    deliverables: ['Store health notes', 'Retainer board', 'Release checklist'],
    faqs: fq([
      ['Can you work with a headless storefront?', 'Possible when APIs and scope are clear.'],
      ['Do you support multi-vendor?', 'Case-by-case — complexity varies widely.'],
      ['Will you remove unused plugins?', 'Yes when cleanup is approved and tested.'],
    ]),
    intro:
      'WooCommerce developers on retainer for catalog rules, checkout work, and ongoing store improvements.',
  }),
  'hire-learndash-developers': e({
    categoryLabel: 'LearnDash Retainer',
    highlights: h(['Focus', 'LMS features'], ['Learners', 'QA accounts'], ['Docs', 'Instructor-facing']),
    features: [
      'LearnDash feature development',
      'Access and reporting customizations',
      'Integration work (CRM, SSO, payments)',
      'Instructor UX improvements',
      'Regression testing after updates',
      'Shared ticket board',
    ],
    benefits: b3(
      'LMS fluency',
      'Faster delivery than teaching a generalist LearnDash.',
      'Learner-safe releases',
      'Enrollment paths verified.',
      'Instructor empathy',
      'Admin UI stays usable.',
    ),
    process: p4(
      ['Academy briefing', 'Courses and personas'],
      ['Backlog', 'Prioritize LMS tickets'],
      ['Build on staging', 'Features and QA'],
      ['Release & train', 'Instructor updates'],
    ),
    deliverables: ['LMS backlog', 'Staging academy', 'Instructor notes'],
    faqs: fq([
      ['Can you customize certificates?', 'Yes — design and data fields are common requests.'],
      ['Do you support group leaders?', 'We can configure and extend group features as needed.'],
      ['How fast can urgent bugs be fixed?', 'Urgent windows are defined in the retainer SLA.'],
    ]),
    intro:
      'LearnDash developer retainers for academies iterating on courses, access, and reporting without restarting vendor search each quarter.',
  }),
  'wordpress-redesign': e({
    categoryLabel: 'Full Redesign',
    highlights: h(['Timeline', '3–6 weeks'], ['Includes', 'IA + UI'], ['SEO', 'URL plan']),
    features: [
      'UX review of current site',
      'Information architecture refresh',
      'New visual system for key templates',
      'Content migration plan',
      'Conversion-minded CTAs and forms',
      'Redirect strategy when URLs change',
    ],
    benefits: b3(
      'Modern without chaos',
      'Refresh look while protecting what ranks.',
      'Clearer journeys',
      'Nav and page hierarchy make sense.',
      'Editor continuity',
      'Templates stay maintainable.',
    ),
    process: p4(
      ['Audit', 'Analytics, heatmaps, pain points'],
      ['IA & design', 'Sitemap and key screens'],
      ['Build', 'Theme templates on staging'],
      ['Launch', 'Redirects and measurement'],
    ),
    deliverables: ['Design files', 'New theme', 'Redirect notes', 'Launch checklist'],
    faqs: fq([
      ['Do we keep our URLs?', 'Whenever possible; otherwise we map redirects.'],
      ['Can redesign be phased?', 'Yes — priority templates first is common.'],
      ['Will content be rewritten?', 'Structure is included; full copywriting can be added to scope.'],
    ]),
    intro:
      'WordPress redesign for sites that look dated or confuse visitors — new structure and visuals without throwing away SEO equity.',
  }),
  'landing-page-redesign': e({
    categoryLabel: 'Landing Focus',
    highlights: h(['Timeline', '1–3 weeks'], ['Goal', 'Conversion'], ['Tests', 'Mobile-first']),
    features: [
      'Single-page or short-funnel redesign',
      'Message hierarchy and proof placement',
      'Form or checkout CTA optimization',
      'Speed pass for the landing URL',
      'Simple A/B-ready structure',
      'Analytics event wiring',
    ],
    benefits: b3(
      'One job per page',
      'No competing nav noise.',
      'Faster experiments',
      'Clean structure for future tests.',
      'Mobile clarity',
      'Thumb-friendly CTAs.',
    ),
    process: p4(
      ['Offer brief', 'Audience and conversion goal'],
      ['Wire & design', 'Above-the-fold focus'],
      ['Build', 'Landing template'],
      ['Measure', 'Analytics events'],
    ),
    deliverables: ['Landing template', 'Event map', 'QA checklist'],
    faqs: fq([
      ['Can this plug into our CRM?', 'Yes — forms can post to your CRM or email tool.'],
      ['Do you write copy?', 'We can refine structure; full copywriting may be scoped.'],
      ['Will it work with Elementor?', 'Yes if that is your preferred builder.'],
    ]),
    intro:
      'Landing page redesign for campaigns that need a sharper offer story, clearer CTA, and a fast-loading WordPress page.',
  }),
  'wordpress-speed-optimization': e({
    categoryLabel: 'Performance',
    highlights: h(['Baseline', 'Before/after'], ['Focus', 'CWV'], ['Hosting', 'Advice included']),
    features: [
      'Full performance audit',
      'Image and media strategy',
      'Caching and CDN guidance',
      'Database and query cleanup',
      'Critical CSS / deferral where safe',
      'Re-test documentation',
    ],
    benefits: b3(
      'Measured gains',
      'We show before/after numbers.',
      'Sustainable fixes',
      'Not just a one-time cache plugin toggle.',
      'SEO-friendly speed',
      'Technical improvements that support Core Web Vitals.',
    ),
    process: p4(
      ['Measure', 'Lab and field data'],
      ['Prioritize', 'Highest impact fixes'],
      ['Implement', 'Staging then production'],
      ['Verify', 'Re-test and document'],
    ),
    deliverables: ['Audit report', 'Change log', 'Monitoring tips'],
    faqs: fq([
      ['Will my site score 100?', 'We aim for meaningful CWV improvements; perfect scores are not always realistic.'],
      ['Do you change hosting?', 'We advise; migration is separate if needed.'],
      ['How long do results last?', 'Until new plugins or media undo them — we document how to keep gains.'],
    ]),
    intro:
      'WordPress speed optimization aimed at real Core Web Vitals gains — caching, media, and query work with before/after evidence.',
  }),
  'woocommerce-speed-optimization': e({
    categoryLabel: 'Store Performance',
    highlights: h(['Focus', 'Shop & checkout'], ['Mobile', 'Priority'], ['Cart', 'Fragment care']),
    features: [
      'Shop and product template profiling',
      'Cart/checkout script audits',
      'Object caching recommendations',
      'Image strategy for catalogs',
      'Third-party script discipline',
      'Purchase-path retests',
    ],
    benefits: b3(
      'Faster product pages',
      'Shoppers stay engaged.',
      'Checkout that feels light',
      'Fewer abandoned waits.',
      'Ops visibility',
      'Know which plugins cost time.',
    ),
    process: p4(
      ['Profile store', 'Identify bottlenecks'],
      ['Fix high-impact issues', 'Templates and scripts'],
      ['Retest purchase path', 'Mobile + desktop'],
      ['Document', 'Keep wins after new plugins'],
    ),
    deliverables: ['Store speed report', 'Optimization change log'],
    faqs: fq([
      ['Will optimization break discounts plugins?', 'We test key flows after each change.'],
      ['Is a CDN required?', 'Often helpful; we recommend based on audience geography.'],
      ['Can you optimize variable products?', 'Yes — catalog templates are a common bottleneck.'],
    ]),
    intro:
      'WooCommerce performance work focused on product, cart, and checkout paths — where slow templates quietly tax revenue.',
  }),
  'api-integrations': e({
    categoryLabel: 'API & Integrations',
    highlights: h(['Pattern', 'REST / webhooks'], ['Auth', 'Secure'], ['Docs', 'Endpoint notes']),
    features: [
      'Custom REST endpoints when needed',
      'CRM, ERP, or ESP connections',
      'Webhook handlers with logging',
      'Error handling and retries',
      'Admin UI for sync status when useful',
      'Sandbox test evidence',
    ],
    benefits: b3(
      'Systems stay in sync',
      'Fewer manual CSV uploads.',
      'Debuggable flows',
      'Logs when something fails.',
      'WordPress-native fit',
      'Integrations respect roles and hooks.',
    ),
    process: p4(
      ['Map data', 'Objects and frequency'],
      ['Design API contract', 'Auth and payloads'],
      ['Build & sandbox test', 'Edge cases'],
      ['Go live', 'Monitor and alert'],
    ),
    deliverables: ['Integration code', 'Sandbox results', 'Ops runbook'],
    faqs: fq([
      ['Can you connect Salesforce / HubSpot?', 'Yes for common CRM patterns — exact objects confirmed in discovery.'],
      ['Do you build headless WordPress APIs?', 'We can expose curated REST endpoints for front ends.'],
      ['How are secrets stored?', 'Environment-based credentials — never hardcoded in the theme.'],
    ]),
    intro:
      'WordPress API development and third-party integrations that move leads, orders, and content between systems without brittle zap stacks.',
  }),
  'wordpress-ai-automation': e({
    categoryLabel: 'Automation',
    highlights: h(['Focus', 'Workflows'], ['Human', 'In the loop'], ['ROI', 'Hours saved']),
    features: [
      'Form-to-CRM automations',
      'Content assist workflows with review steps',
      'Support triage helpers',
      'Inventory or lead alerts',
      'Documentation of each automation',
      'Failure notifications for ops',
    ],
    benefits: b3(
      'Save staff hours',
      'Repetitive routing happens automatically.',
      'Keep humans accountable',
      'AI drafts; your team approves.',
      'WordPress-centered',
      'Automations trigger from real site events.',
    ),
    process: p4(
      ['Find bottlenecks', 'Where time is wasted'],
      ['Design workflow', 'Triggers and approvals'],
      ['Implement', 'Tools + WordPress hooks'],
      ['Measure', 'Hours saved and error rates'],
    ),
    deliverables: ['Automation map', 'Credentials vault notes', 'Ops guide'],
    faqs: fq([
      ['Will AI publish without approval?', 'We default to human review unless you explicitly opt into auto-publish.'],
      ['What tools do you use?', 'Depends on stack — Zapier, Make, custom code, or LLM APIs.'],
      ['Is training data private?', 'We follow your data policies and avoid sending sensitive content to public models unless approved.'],
    ]),
    intro:
      'WordPress workflow automation that connects forms, CRM, and store events — with human review where quality matters.',
  }),
  'wordpress-seo-services': e({
    categoryLabel: 'Technical SEO',
    highlights: h(['Focus', 'On-site'], ['Deliverable', 'Action plan'], ['Dev', 'Implemented fixes']),
    features: [
      'Technical SEO crawl and prioritization',
      'On-page template improvements',
      'Internal linking guidance',
      'Schema where appropriate',
      'Coordination with content teams',
      'Re-crawl validation notes',
    ],
    benefits: b3(
      'Fix what blocks crawling',
      'Indexation issues get attention.',
      'Templates that scale',
      'SEO wins apply sitewide.',
      'Practical roadmap',
      'Not an 80-page PDF of fluff.',
    ),
    process: p4(
      ['Audit', 'Crawl + Search Console'],
      ['Prioritize', 'Impact vs effort'],
      ['Implement', 'Theme/template fixes'],
      ['Validate', 'Re-crawl and monitor'],
    ),
    deliverables: ['SEO findings', 'Implemented changes list', 'Next-content suggestions'],
    faqs: fq([
      ['Do you write blog posts?', 'Technical SEO is our core; content retainers can be added.'],
      ['Can you guarantee rankings?', 'No ethical agency can — we improve technical foundations and clarity.'],
      ['Do you work with Yoast or Rank Math?', 'Yes — we configure and complement them with template-level fixes.'],
    ]),
    intro:
      'WordPress SEO services focused on technical health, template markup, and crawl clarity — so content work is not wasted on broken foundations.',
  }),
  'plugin-development': e({
    categoryLabel: 'Custom Plugins',
    highlights: h(['Standards', 'WP coding'], ['Tests', 'Staging + cases'], ['Ownership', 'Your IP']),
    features: [
      'Custom plugin architecture',
      'Admin settings screens',
      'REST endpoints and hooks',
      'Capability checks and sanitization',
      'Documentation for future developers',
      'Support window after delivery',
    ],
    benefits: b3(
      'Exact behavior',
      'No fighting a bloated marketplace plugin.',
      'Maintainable code',
      'Documented for handoff.',
      'Security-minded',
      'Capabilities and nonces done properly.',
    ),
    process: p4(
      ['Spec', 'User stories and edge cases'],
      ['Architecture', 'Data model and hooks'],
      ['Build & test', 'Unit/manual cases'],
      ['Ship', 'Install guide and support window'],
    ),
    deliverables: ['Plugin zip / repo', 'Admin docs', 'Test notes'],
    faqs: fq([
      ['Will you submit to wordpress.org?', 'Optional — we can prepare for review if requested.'],
      ['Can plugins be multisite-aware?', 'Yes when network needs are defined upfront.'],
      ['Who owns the IP?', 'You do after final payment unless otherwise agreed.'],
    ]),
    intro:
      'Custom WordPress plugin development when off-the-shelf extensions cannot match your pricing rules, workflows, or integrations.',
  }),
  'woocommerce-development': e({
    categoryLabel: 'Full Store Build',
    highlights: h(['Timeline', '6–12 weeks'], ['Includes', 'Theme + store'], ['QA', 'Full purchase path']),
    features: [
      'Custom or tailored WooCommerce theme',
      'Catalog architecture',
      'Checkout and account areas',
      'Payments, shipping, tax setup',
      'Performance and security baseline',
      'Launch support window',
    ],
    benefits: b3(
      'Store built as a product',
      'Not a theme demo with products bolted on.',
      'Ops-ready',
      'Emails, statuses, and roles make sense.',
      'Room to grow',
      'Extensions added deliberately.',
    ),
    process: p4(
      ['Commerce discovery', 'Catalog and fulfillment'],
      ['UX & build', 'Templates and store config'],
      ['Integrations', 'Payments and tools'],
      ['Launch', 'Go-live checklist and support'],
    ),
    deliverables: ['Store theme', 'Configured WooCommerce', 'Launch pack'],
    faqs: fq([
      ['Do you support B2B stores?', 'Yes — role pricing and quotes are common scopes.'],
      ['Headless WooCommerce?', 'Possible with clear API and front-end ownership.'],
      ['Can you migrate an existing catalog in?', 'Yes as part of a combined build + migration scope.'],
    ]),
    intro:
      'Full WooCommerce development for merchants who need a storefront and operations layer designed together — not a generic theme with a cart plugin.',
  }),
  'learndash-development': e({
    categoryLabel: 'Full LMS Build',
    highlights: h(['Timeline', '6–12 weeks'], ['Stack', 'LearnDash'], ['Includes', 'Theme + courses shell']),
    features: [
      'Custom LMS theme experience',
      'Course architecture and navigation',
      'Enrollment and payment options',
      'Instructor and student dashboards',
      'Reporting basics and progress views',
      'Launch QA with learner test accounts',
    ],
    benefits: b3(
      'Cohesive learner UI',
      'Courses feel intentional.',
      'Admin that scales',
      'Instructors manage without chaos.',
      'Integrated selling',
      'Paid courses when needed.',
    ),
    process: p4(
      ['Academy discovery', 'Programs and personas'],
      ['Design LMS UX', 'Learner and instructor views'],
      ['Build LearnDash', 'Courses and access'],
      ['Launch', 'Cohort-ready QA'],
    ),
    deliverables: ['LMS theme', 'Course framework', 'Instructor handbook'],
    faqs: fq([
      ['Can we sell memberships plus courses?', 'Yes with the right membership stack scoped in.'],
      ['Do you create video hosting?', 'We integrate your host (Vimeo, Bunny, etc.).'],
      ['Is SCORM required?', 'Possible with compatible add-ons — confirmed during discovery.'],
    ]),
    intro:
      'Complete LearnDash platform development for academies that need branding, course structure, and enrollment working as one system.',
  }),
};

const header = `export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceEnrichment {
  categoryLabel: string;
  highlights: { label: string; value: string }[];
  features: string[];
  benefits: ServiceBenefit[];
  process: ServiceProcessStep[];
  deliverables: string[];
  faqs: ServiceFaq[];
  intro: string;
}

const defaultEnrichment: ServiceEnrichment = {
  categoryLabel: 'WordPress Service',
  highlights: [
    { label: 'Delivery', value: 'Scoped timeline' },
    { label: 'Support', value: 'Post-launch window' },
    { label: 'Team', value: 'WordPress specialists' },
  ],
  features: [
    'Scoped discovery and written plan',
    'Staging environment for review',
    'Quality checks before launch',
    'Handoff documentation',
    'Post-launch support window',
  ],
  benefits: [
    { title: 'WordPress-focused delivery', description: 'Specialists who work in themes, plugins, and WooCommerce daily.' },
    { title: 'Clear communication', description: 'You always know what is in scope and what happens next.' },
    { title: 'Maintainable outcomes', description: 'Code and content structure your team can keep running.' },
  ],
  process: [
    { step: 1, title: 'Discover', description: 'Goals, constraints, and success criteria.' },
    { step: 2, title: 'Plan', description: 'Scope, timeline, and technical approach.' },
    { step: 3, title: 'Build', description: 'Implement on staging with previews.' },
    { step: 4, title: 'Launch', description: 'Deploy, verify, and support.' },
  ],
  deliverables: ['Project summary', 'Staging access', 'Documentation', 'Launch checklist'],
  faqs: [
    { question: 'How do projects start?', answer: 'With a short discovery call and a written scope before build work begins.' },
    { question: 'Do you work on staging?', answer: 'Yes whenever hosting allows — production changes follow a review pass.' },
  ],
  intro: 'WordPress service engagement tailored to your goals, with staging review and a clear handoff.',
};

`;

const footer = `
const enrichments: Record<string, Partial<ServiceEnrichment>> = ${JSON.stringify(enrichments, null, 2)};

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
    faqs: partial.faqs ?? defaultEnrichment.faqs,
    intro: partial.intro ?? defaultEnrichment.intro,
  };
}

export function getServiceSeoDescription(slug: string): string {
  const intro = getServiceEnrichment(slug).intro;
  return intro.length <= 155 ? intro : \`\${intro.slice(0, 152)}...\`;
}
`;

fs.writeFileSync(path, header + footer);
console.log('OK', Object.keys(enrichments).length);
