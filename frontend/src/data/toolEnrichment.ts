/** Unique long-form tool copy for SEO — merges with API/fallback rows on detail pages */

export interface ToolEnrichment {
  intro: string;
  whoFor: string[];
  outcomes: string[];
  sections: { heading: string; body: string }[];
  checklist: string[];
  faqs: { q: string; a: string }[];
  seoBlurb: string;
}

const ENRICHMENT: Record<string, ToolEnrichment> = {
  'speed-estimator': {
    intro:
      'Use these Core Web Vitals review notes before you buy another “speed plugin.” Field performance on WordPress and WooCommerce templates is usually lost to hero media, product queries, and third-party scripts — not missing cache headers alone. WPServices wrote this path from real staging reviews, not generic PageSpeed blogs.',
    whoFor: [
      'Store operators watching mobile bounce on product and checkout',
      'Marketing sites with heavy heroes and page-builder CSS',
      'Teams comparing hosting upgrades vs theme debt',
    ],
    outcomes: [
      'A ranked list of template-level fixes before plugin stacking',
      'Clear LCP / CLS / INP notes tied to real URLs',
      'A decision: theme work, query work, or hosting next',
    ],
    sections: [
      {
        heading: 'What to inspect first',
        body: 'Start on your highest-traffic templates: home, category, product, and checkout. Record the LCP element, layout shifts near add-to-cart, and INP on filters. Compare staging vs production with the same theme and plugin set so you are not measuring a different stack.',
      },
      {
        heading: 'WordPress-specific traps',
        body: 'Unoptimized hero images, webfonts without font-display, carousel libraries on every page, and WooCommerce widgets that query the full catalog on archive views. Fix the template before stacking more optimization plugins — otherwise every new plugin fights the same debt.',
      },
      {
        heading: 'How to read lab vs field metrics',
        body: 'Lab tools (PageSpeed Insights, Lighthouse) are useful for regressions. Field data (CrUX, RUM) tells you what shoppers felt. Prefer field trends on money pages when deciding whether a change shipped. Document both in your care log so next month’s update window has a baseline.',
      },
      {
        heading: 'When to engage WPServices',
        body: 'If LCP stays poor after image and caching basics, you likely need theme or query work — not another CDN toggle. We review real templates, stage changes, and document what editors must not undo after handoff.',
      },
    ],
    checklist: [
      'Identify LCP element on mobile for top URLs',
      'Defer non-critical scripts; remove unused page-builder assets',
      'Audit product archive SQL and object cache hit rates',
      'Re-measure field CWV after each change window',
      'Write owners for media, plugins, and hosting in the care doc',
    ],
    faqs: [
      {
        q: 'Is this a live speed scanner?',
        a: 'No. These are operator review notes. You run checks in your own tools on staging and production; we do not pretend to crawl your site from this page.',
      },
      {
        q: 'Will following this guarantee a 100 PageSpeed score?',
        a: 'No honest agency should promise that. Scores move with plugins, ads, and third parties. The goal is maintainable gains on revenue templates.',
      },
    ],
    seoBlurb:
      'WordPress Core Web Vitals checklist for WooCommerce and theme templates — staging-first review notes from WPServices.',
  },
  'speed-analyzer': {
    intro:
      'A first-pass WordPress speed analyzer mindset: measure the templates that earn revenue, then isolate theme, plugin, and hosting layers without guessing. Built for operators who need a written path before a rebuild quote.',
    whoFor: [
      'WooCommerce teams with slow archives under real catalog size',
      'Agencies handing off sites that “felt fast” on empty demos',
      'In-house marketers stuck between host upsells and theme debt',
    ],
    outcomes: [
      'Hosting vs theme debt separated in writing',
      'A plugin enablement order that finds expensive extensions',
      'Next-step options that match budget and risk',
    ],
    sections: [
      {
        heading: 'Separate hosting from theme debt',
        body: 'Slow TTFB can be hosting; slow LCP with fast TTFB is often theme media or render-blocking CSS. Document both before changing DNS or buying a new host — many “migrations” fail because the theme still ships megabyte heroes.',
      },
      {
        heading: 'WooCommerce checkpoints',
        body: 'Cart fragments, variation scripts, related-product queries, and payment iframes frequently dominate INP and main-thread time. Test with a realistic catalog size and a guest checkout path, not only an admin-logged session.',
      },
      {
        heading: 'Staging discipline',
        body: 'Clone PHP version, object cache, and the same payment sandbox. Measure once, change one layer, measure again. Parallel changes hide which toggle actually helped.',
      },
      {
        heading: 'What “good enough” looks like',
        body: 'Money pages feel responsive on a mid-range phone on real cellular data. Archives do not wait on related-product queries. Editors can publish without undoing your defer rules. Write that definition into the care log before the next campaign week.',
      },
    ],
    checklist: [
      'Baseline mobile field metrics for money pages',
      'Disable non-essential plugins on a staging clone',
      'Re-test after each enablement to find the expensive one',
      'Capture before/after notes for stakeholders',
    ],
    faqs: [
      {
        q: 'Do you replace my monitoring tools?',
        a: 'No. Use your preferred lab and field tools. This page tells you what to look at and in what order.',
      },
      {
        q: 'Can WPServices run this review for us?',
        a: 'Yes — discovery starts with your top URLs and a staging clone when hosting allows.',
      },
    ],
    seoBlurb: 'Practical WordPress speed analyzer notes for stores and marketing sites — WPServices operator guide.',
  },
  'security-checklist': {
    intro:
      'Hardening WordPress is a habit stack — least-privilege users, update cadence, backups you can restore, and staging for risky changes — not a single security plugin toggle. These notes mirror how WPServices prepares launches and retainers.',
    whoFor: [
      'Teams before a public launch or campaign week',
      'Operators after contractor handoffs with leftover admin users',
      'Care-plan buyers who need an honest baseline',
    ],
    outcomes: [
      'Admin inventory and capability cleanup list',
      'Restore-tested backup confirmation',
      'Update owners and staging URL documented',
    ],
    sections: [
      {
        heading: 'Access & authentication',
        body: 'Unique admin emails, strong passwords or SSO, 2FA where available, and no shared “admin” accounts. Review users after every contractor engagement and remove dormant shop managers who no longer need wp-admin.',
      },
      {
        heading: 'Files, backups, and updates',
        body: 'Confirm offsite backups restore cleanly on a throwaway environment. Stage plugin and core updates. Remove abandoned extensions. Lock down XML-RPC and unused REST routes when your stack allows without breaking required integrations.',
      },
      {
        heading: 'What hardening is not',
        body: 'A shield badge on the homepage does not equal a restore drill. Treat security as operations: who can deploy, who reviews plugins, and how fast you can roll back after a bad update.',
      },
      {
        heading: 'After the checklist',
        body: 'Schedule the first restore drill on a calendar, not a sticky note. Assign update owners. If staging is missing, fix hosting before the next major plugin release — WPServices can help scope that path without a vanity rebuild.',
      },
    ],
    checklist: [
      'Inventory admin users and capabilities',
      'Verify last successful restore test',
      'Document update owners and staging URL',
      'Scan for abandoned plugins with no updates',
      'Confirm HTTPS, salt keys, and file permissions basics',
    ],
    faqs: [
      {
        q: 'Is this a malware scanner?',
        a: 'No. It is a hardening and operations checklist. Active incidents need incident response, not a marketing page.',
      },
      {
        q: 'Do you require a specific security plugin?',
        a: 'We prefer clear habits and least privilege. Plugins can help, but they do not replace backups and staging.',
      },
    ],
    seoBlurb: 'WordPress hardening checklist for agencies and in-house operators — WPServices launch hygiene.',
  },
  'plugin-troubleshooter': {
    intro:
      'When checkout, wp-admin, or a critical template breaks after updates, isolate systematically: staging clone, binary search plugins, then theme conflicts — without editing production blindly. This is the same isolation path WPServices uses on care tickets.',
    whoFor: [
      'Operators after a plugin update window went wrong',
      'Stores seeing white screens or payment errors',
      'Teams tired of “disable everything” advice without a log',
    ],
    outcomes: [
      'A named failing plugin or theme override',
      'Timestamped error evidence',
      'A handoff note that prevents the next repeat',
    ],
    sections: [
      {
        heading: 'Isolation path',
        body: 'Reproduce on staging. Disable half the plugins, retest, and narrow. Swap to a default theme only after plugin binary search fails. Capture PHP and browser console errors with timestamps so support vendors cannot dismiss “intermittent” reports.',
      },
      {
        heading: 'Prevent repeats',
        body: 'Keep a change log, avoid overlapping plugins for the same job, and prefer custom code for unique WooCommerce rules instead of stacking three partial solutions that fight each other on update day.',
      },
      {
        heading: 'Theme template debt',
        body: 'Outdated WooCommerce template overrides in a child theme often break after WooCommerce releases. Diff template versions before blaming payment gateways.',
      },
      {
        heading: 'Handoff that prevents the next ticket',
        body: 'Name the failing plugin or override, the update that triggered it, and the test path you re-ran as a guest. Paste that into the care log before you close the ticket — the next update window will thank you.',
      },
    ],
    checklist: [
      'Reproduce on staging with the same PHP version',
      'Binary-search plugins; note the first failing set',
      'Check theme overrides for outdated WooCommerce templates',
      'Write the root cause into your handoff doc',
    ],
    faqs: [
      {
        q: 'Should I debug on production?',
        a: 'Only if you have no staging and accept outage risk. Prefer a clone. If production is required, schedule a quiet window and a rollback plan.',
      },
      {
        q: 'What if two plugins both seem guilty?',
        a: 'Keep the smallest failing set enabled and document both. Often one is the trigger and the other amplifies it — WPServices can scope a proper coexistence fix when you cannot drop either.',
      },
    ],
    seoBlurb: 'Plugin conflict checklist for WordPress and WooCommerce breakages — staging-first isolation notes.',
  },
  'bug-fixing-bot': {
    intro:
      'Treat recurring WordPress breakages as a checklist problem: reproduce on staging, isolate plugins, then document the root cause so the same outage does not return after the next update. Despite the name, this is not an AI chatbot — it is an operator first-pass guide from WPServices delivery work.',
    whoFor: [
      'Site owners facing white screens of death',
      'Checkout failures after weekend updates',
      'Agencies needing a client-safe isolation script',
    ],
    outcomes: [
      'Matched staging clone before any production hotfix',
      'Binary-search result with a named suspect',
      'Care-log entry that survives the next release',
    ],
    sections: [
      {
        heading: 'Reproduce before you patch',
        body: 'Capture PHP version, active theme, and the exact admin or checkout path that fails. Blind hotfixes on production create secondary incidents and erase evidence you need for plugin vendors.',
      },
      {
        heading: 'Binary-search plugins',
        body: 'Disable half, retest, and narrow. Theme swaps come after plugin isolation fails. Write the finding into your care log with the update that triggered the break.',
      },
      {
        heading: 'Checkout and form special cases',
        body: 'Payment gateway sandboxes, caching of cart fragments, and form spam plugins often look like “random” bugs. Retest as a guest on mobile after each isolation step.',
      },
      {
        heading: 'When to escalate',
        body: 'If isolation points to custom code or a must-keep plugin conflict, stop looping plugins and scope a proper fix. WPServices can take that written brief and ship a maintainable patch on staging.',
      },
    ],
    checklist: [
      'Staging clone matches PHP and plugin set',
      'Error log timestamp captured',
      'Root cause noted for the next update window',
      'Guest mobile path retested after the fix',
    ],
    faqs: [
      {
        q: 'Is this an automated bot that fixes my site?',
        a: 'No. The name is marketing shorthand for a structured checklist. You (or we) still run the steps on your stack.',
      },
      {
        q: 'Can you fix the bug for us?',
        a: 'Yes. Bring the checklist notes to a discovery call and we scope a staging-first fix.',
      },
    ],
    seoBlurb:
      'WordPress bug isolation checklist for plugin conflicts and checkout failures — WPServices staging-first guide.',
  },
  'design-bot': {
    intro:
      'Before pixels, decide which templates must convert. WPServices uses this notes path so redesigns stay tied to forms, checkout, and editor workflows — not decorative mockups alone. Original planning copy for teams who rebuild WordPress without losing maintainability.',
    whoFor: [
      'Brands planning a redesign with an existing catalog or LMS',
      'Stakeholders arguing over aesthetics without conversion goals',
      'Editors who need weekly-update regions defined early',
    ],
    outcomes: [
      'Template inventory with conversion jobs',
      'Editor-editable regions marked before design lock',
      'Mobile pass list for high-intent pages',
    ],
    sections: [
      {
        heading: 'Template inventory',
        body: 'List home, service, product, and thank-you templates. Mark which fields editors must change weekly. Design systems fail when those fields are locked in the theme or buried in a page builder nobody owns.',
      },
      {
        heading: 'Conversion before decoration',
        body: 'Write the primary action per template (enquire, add to cart, enroll). Visual polish comes after the action path is honest on mobile. Hero animation and brand polish cannot rescue a buried form.',
      },
      {
        heading: 'Handoff to build',
        body: 'When design exits, builders need spacing tokens, component states, and empty/error states for forms — not only desktop screenshots. That is how WPServices keeps redesigns maintainable after launch.',
      },
      {
        heading: 'Brand without theme debt',
        body: 'Keep typography and color tokens in one place. Avoid one-off page-builder sections that nobody can update. Document which templates are “locked brand” vs weekly marketing freestyle so the next campaign does not fork the theme.',
      },
    ],
    checklist: [
      'Conversion goals written before wireframes',
      'Editor-editable regions marked',
      'Mobile pass on high-intent templates',
      'Form and checkout empty states designed',
    ],
    faqs: [
      {
        q: 'Do you design in Figma?',
        a: 'We can work from approved designs or help shape structure first. Either way, WordPress constraints are flagged early.',
      },
      {
        q: 'Can editors keep updating after launch?',
        a: 'That is the point of marking editable regions early. If everything is locked in the theme, you will pay for every copy change — we flag that risk before build.',
      },
    ],
    seoBlurb: 'WordPress redesign planning notes for conversion-focused templates — WPServices structure-first guide.',
  },
  'wordpress-consultation-bot': {
    intro:
      'A useful WordPress consultation answers hosting, theme debt, plugin overlap, and success criteria — then produces a written next step, not a vague promise. Use this checklist to prepare for a WPServices discovery call or to brief another specialist honestly.',
    whoFor: [
      'Operators choosing retainer vs project',
      'Teams inheriting a messy wp-admin from a prior vendor',
      'Founders comparing rebuild vs stabilize options',
    ],
    outcomes: [
      'Top risks ranked with evidence',
      'Scoped options with rough timing',
      'Clear ownership for content after launch',
    ],
    sections: [
      {
        heading: 'What we inspect on discovery',
        body: 'Update cadence, abandoned plugins, staging availability, checkout or form health, and who owns content after launch. We also ask what “done” means in business terms — not just design preferences.',
      },
      {
        heading: 'Retainer vs project',
        body: 'Projects suit bounded launches and migrations. Retainers suit update cadence, small fixes, and ongoing CWV watch. Mixing both without a written boundary creates surprise invoices — we keep the split explicit.',
      },
      {
        heading: 'Bring these artifacts',
        body: 'Hosting panel access or a staging URL, a list of must-keep plugins, analytics on money pages, and any failed update notes. Better inputs produce a sharper written scope.',
      },
      {
        heading: 'What a good written next step includes',
        body: 'Named risks, two or three options with rough effort, and what you will own vs what WPServices owns. If the only output is “we should rebuild,” push for evidence — staging gaps, plugin debt, or conversion goals usually decide the path.',
      },
    ],
    checklist: [
      'Hosting and PHP version noted',
      'Top three risks ranked',
      'Scoped options with rough timing',
      'Success criteria written in one paragraph',
    ],
    faqs: [
      {
        q: 'Is the consultation free?',
        a: 'Discovery calls are complementary for qualified projects. Complex audits may be scoped separately — we say so up front.',
      },
      {
        q: 'Will you tell us to rebuild everything?',
        a: 'Only when evidence says stabilize is more expensive than rebuild. Most engagements start with staging, plugin debt, and conversion goals — not a blank theme.',
      },
    ],
    seoBlurb:
      'WordPress consultation checklist for theme debt, staging, and scoped next steps — prepare for WPServices discovery.',
  },
  'conversion-rate-audit-tool': {
    intro:
      'Conversion audits on WordPress should start with form and checkout friction on mobile — not homepage aesthetics. This notes path keeps the review commercial and original to how WPServices walks real WooCommerce and lead-gen templates.',
    whoFor: [
      'Stores with traffic but soft conversion',
      'Lead-gen sites with long forms and spam noise',
      'Teams comparing CRO plugins vs template clarity',
    ],
    outcomes: [
      'Friction map for guest and logged-in paths',
      'Fixes ranked by revenue impact',
      'Spam and deliverability checks noted',
    ],
    sections: [
      {
        heading: 'Friction map',
        body: 'Walk guest and logged-in paths. Note required fields, shipping surprises, and trust cues near pay. Compare analytics drop-offs to what you felt in the walkthrough — numbers without a path walk miss UX debt.',
      },
      {
        heading: 'WordPress and WooCommerce specifics',
        body: 'Theme checkout overrides, coupon UX, and slow variation picks often look like “marketing problems.” Fix template clarity before buying another urgency popup that adds INP cost.',
      },
      {
        heading: 'After the audit',
        body: 'Ship the highest-impact template changes on staging, measure one release at a time, and keep editors from undoing form labels. WPServices can implement the ranked list as a scoped sprint.',
      },
      {
        heading: 'Trust and proof near pay',
        body: 'Shipping promises, return policy, and payment badges only help when they sit next to the action — not buried in the footer. On WordPress builders, those blocks often get deleted in the next “quick edit.” Pin them in a reusable pattern.',
      },
    ],
    checklist: [
      'Mobile checkout completed end-to-end',
      'Form spam and deliverability checked',
      'Priority fixes ranked by revenue impact',
      'Trust cues reviewed near pay and submit',
    ],
    faqs: [
      {
        q: 'Do you guarantee a conversion lift percentage?',
        a: 'No. We rank friction and ship maintainable fixes. Percent promises without your baseline are marketing fiction.',
      },
      {
        q: 'Is this only for WooCommerce?',
        a: 'No. Lead-gen forms, booking flows, and LMS enroll paths use the same friction map — WordPress template debt shows up the same way.',
      },
    ],
    seoBlurb:
      'WordPress and WooCommerce conversion audit notes focused on forms and checkout — WPServices commercial checklist.',
  },
};

const ALIASES: Record<string, string> = {
  'speed-estimator': 'speed-estimator',
  'website-speed-analyzer': 'speed-analyzer',
  'speed-analyzer': 'speed-analyzer',
  'security-vulnerability-scanner': 'security-checklist',
  'security-checklist': 'security-checklist',
  'plugin-conflict-checklist': 'plugin-troubleshooter',
  'plugin-troubleshooter': 'plugin-troubleshooter',
  'bug-fixing-bot': 'bug-fixing-bot',
  'design-bot': 'design-bot',
  'wordpress-consultation-bot': 'wordpress-consultation-bot',
  'conversion-rate-audit-tool': 'conversion-rate-audit-tool',
};

export function getToolEnrichment(slug: string | undefined | null): ToolEnrichment | null {
  if (!slug) return null;
  const key = ALIASES[slug] || slug;
  return ENRICHMENT[key] || ENRICHMENT[slug] || null;
}
