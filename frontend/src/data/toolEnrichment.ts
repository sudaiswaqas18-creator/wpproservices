/** Unique long-form tool copy for SEO — merges with API/fallback rows on detail pages */

export interface ToolEnrichment {
  intro: string;
  sections: { heading: string; body: string }[];
  checklist: string[];
  seoBlurb: string;
}

const ENRICHMENT: Record<string, ToolEnrichment> = {
  'speed-estimator': {
    intro:
      'Use these Core Web Vitals review notes before you buy another “speed plugin.” Field performance on WordPress and WooCommerce templates is usually lost to hero media, product queries, and third-party scripts — not missing cache headers alone.',
    sections: [
      {
        heading: 'What to inspect first',
        body: 'Start on your highest-traffic templates: home, category, product, and checkout. Record LCP element, layout shifts near add-to-cart, and INP on filters. Compare staging vs production with the same theme and plugin set.',
      },
      {
        heading: 'WordPress-specific traps',
        body: 'Unoptimized hero images, webfonts without font-display, carousel libraries on every page, and WooCommerce widgets that query the full catalog on archive views. Fix the template before stacking more optimization plugins.',
      },
      {
        heading: 'When to engage WPServices',
        body: 'If LCP stays poor after image and caching basics, you likely need theme or query work — not another CDN toggle. We review real templates, stage changes, and document what editors must not undo.',
      },
    ],
    checklist: [
      'Identify LCP element on mobile for top URLs',
      'Defer non-critical scripts; remove unused page-builder assets',
      'Audit product archive SQL and object cache hit rates',
      'Re-measure field CWV after each change window',
    ],
    seoBlurb: 'WordPress Core Web Vitals checklist for WooCommerce and theme templates.',
  },
  'speed-analyzer': {
    intro:
      'A first-pass WordPress speed analyzer mindset: measure the templates that earn revenue, then isolate theme, plugin, and hosting layers without guessing.',
    sections: [
      {
        heading: 'Separate hosting from theme debt',
        body: 'Slow TTFB can be hosting; slow LCP with fast TTFB is often theme media or render-blocking CSS. Document both before changing DNS or buying a new host.',
      },
      {
        heading: 'WooCommerce checkpoints',
        body: 'Cart fragments, variation scripts, related-product queries, and payment iframes frequently dominate INP and main-thread time. Test with a realistic catalog size.',
      },
    ],
    checklist: [
      'Baseline mobile field metrics for money pages',
      'Disable non-essential plugins on a staging clone',
      'Re-test after each enablement to find the expensive one',
    ],
    seoBlurb: 'Practical WordPress speed analyzer notes for stores and marketing sites.',
  },
  'security-checklist': {
    intro:
      'Hardening WordPress is a habit stack — least-privilege users, update cadence, backups you can restore, and staging for risky changes — not a single security plugin toggle.',
    sections: [
      {
        heading: 'Access & authentication',
        body: 'Unique admin emails, strong passwords or SSO, 2FA where available, and no shared “admin” accounts. Review users after every contractor engagement.',
      },
      {
        heading: 'Files, backups, and updates',
        body: 'Confirm offsite backups restore cleanly. Stage plugin and core updates. Remove abandoned extensions. Lock down XML-RPC and unused REST routes when your stack allows.',
      },
    ],
    checklist: [
      'Inventory admin users and capabilities',
      'Verify last successful restore test',
      'Document update owners and staging URL',
      'Scan for abandoned plugins with no updates',
    ],
    seoBlurb: 'WordPress hardening checklist for agencies and in-house operators.',
  },
  'plugin-troubleshooter': {
    intro:
      'When checkout, wp-admin, or a critical template breaks after updates, isolate systematically: staging clone, binary search plugins, then theme conflicts — without editing production blindly.',
    sections: [
      {
        heading: 'Isolation path',
        body: 'Reproduce on staging. Disable half the plugins, retest, and narrow. Swap to a default theme only after plugin binary search fails. Capture PHP and browser console errors with timestamps.',
      },
      {
        heading: 'Prevent repeats',
        body: 'Keep a change log, avoid overlapping plugins for the same job, and prefer custom code for unique WooCommerce rules instead of stacking three partial solutions.',
      },
    ],
    checklist: [
      'Reproduce on staging with the same PHP version',
      'Binary-search plugins; note the first failing set',
      'Check theme overrides for outdated WooCommerce templates',
      'Write the root cause into your handoff doc',
    ],
    seoBlurb: 'Plugin conflict checklist for WordPress and WooCommerce breakages.',
  },
  'bug-fixing-bot': {
    intro:
      'Treat recurring WordPress breakages as a checklist problem: reproduce on staging, isolate plugins, then document the root cause so the same outage does not return after the next update.',
    sections: [
      {
        heading: 'Reproduce before you patch',
        body: 'Capture PHP version, active theme, and the exact admin or checkout path that fails. Blind hotfixes on production create secondary incidents.',
      },
      {
        heading: 'Binary-search plugins',
        body: 'Disable half, retest, and narrow. Theme swaps come after plugin isolation fails. Write the finding into your care log.',
      },
    ],
    checklist: [
      'Staging clone matches PHP and plugin set',
      'Error log timestamp captured',
      'Root cause noted for the next update window',
    ],
    seoBlurb: 'WordPress bug isolation checklist for plugin conflicts and checkout failures.',
  },
  'design-bot': {
    intro:
      'Before pixels, decide which templates must convert. WPServices uses this notes path so redesigns stay tied to forms, checkout, and editor workflows — not decorative mockups alone.',
    sections: [
      {
        heading: 'Template inventory',
        body: 'List home, service, product, and thank-you templates. Mark which fields editors must change weekly. Design systems fail when those fields are locked in the theme.',
      },
    ],
    checklist: [
      'Conversion goals written before wireframes',
      'Editor-editable regions marked',
      'Mobile pass on high-intent templates',
    ],
    seoBlurb: 'WordPress redesign planning notes for conversion-focused templates.',
  },
  'wordpress-consultation-bot': {
    intro:
      'A useful WordPress consultation answers hosting, theme debt, plugin overlap, and success criteria — then produces a written next step, not a vague promise.',
    sections: [
      {
        heading: 'What we inspect on discovery',
        body: 'Update cadence, abandoned plugins, staging availability, checkout or form health, and who owns content after launch.',
      },
    ],
    checklist: [
      'Hosting and PHP version noted',
      'Top three risks ranked',
      'Scoped options with rough timing',
    ],
    seoBlurb: 'WordPress consultation checklist for theme debt, staging, and scoped next steps.',
  },
  'conversion-rate-audit-tool': {
    intro:
      'Conversion audits on WordPress should start with form and checkout friction on mobile — not homepage aesthetics. This notes path keeps the review commercial.',
    sections: [
      {
        heading: 'Friction map',
        body: 'Walk guest and logged-in paths. Note required fields, shipping surprises, and trust cues near pay. Compare analytics drop-offs to what you felt in the walkthrough.',
      },
    ],
    checklist: [
      'Mobile checkout completed end-to-end',
      'Form spam and deliverability checked',
      'Priority fixes ranked by revenue impact',
    ],
    seoBlurb: 'WordPress and WooCommerce conversion audit notes focused on forms and checkout.',
  },
};

const ALIASES: Record<string, string> = {
  'speed-estimator': 'speed-estimator',
  'website-speed-analyzer': 'speed-analyzer',
  'security-vulnerability-scanner': 'security-checklist',
  'plugin-conflict-checklist': 'plugin-troubleshooter',
  'bug-fixing-bot': 'bug-fixing-bot',
  'design-bot': 'design-bot',
};

export function getToolEnrichment(slug: string | undefined | null): ToolEnrichment | null {
  if (!slug) return null;
  const key = ALIASES[slug] || slug;
  return ENRICHMENT[key] || ENRICHMENT[slug] || null;
}
