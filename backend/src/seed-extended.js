// Additional seed data for WisdmLabs-style structure
// Called from seed.js after schema

export async function seedExtended(connection) {
  const alters = [
    "ALTER TABLE services ADD COLUMN category_group VARCHAR(20) DEFAULT 'build'",
    "ALTER TABLE services ADD COLUMN category_section VARCHAR(30) DEFAULT 'setup'",
    "ALTER TABLE services ADD COLUMN is_new TINYINT(1) DEFAULT 0",
    "ALTER TABLE case_studies ADD COLUMN is_featured TINYINT(1) DEFAULT 0",
    "ALTER TABLE case_studies ADD COLUMN tech_stack VARCHAR(200)",
    "ALTER TABLE case_studies ADD COLUMN result_summary VARCHAR(300)",
    "ALTER TABLE products ADD COLUMN category VARCHAR(40) DEFAULT 'conversion'",
    "ALTER TABLE awards MODIFY COLUMN year VARCHAR(40)",
  ];
  for (const sql of alters) {
    try { await connection.query(sql); } catch (e) {
      if (!String(e.message).includes('Duplicate column')) throw e;
    }
  }

  for (const t of ['products', 'tools', 'guidebooks', 'awards', 'site_stats']) {
    await connection.query(`TRUNCATE TABLE ${t}`);
  }

  const mkService = (title, slug, subtitle, desc, group, section, isNew = 0, order = 0) => [
    title, slug, subtitle, desc, title, subtitle, desc,
    JSON.stringify(['Expert delivery', 'Dedicated team', 'Post-launch support']),
    'code', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    group, section, isNew, order,
  ];

  const allServices = [
    mkService('WordPress Website Development', 'wordpress-website-development', 'Custom sites on WordPress', 'Custom WordPress websites with themes, Gutenberg patterns, and conversion-ready templates built for your content model.', 'build', 'setup', 0, 1),
    mkService('WordPress Setup & Configuration', 'wordpress-setup', 'Clean installs that editors can run', 'Professional WordPress installation, hosting-ready configuration, essential plugins, and a launch checklist your team can own.', 'build', 'setup', 0, 2),
    mkService('WooCommerce Store Setup', 'woocommerce-setup', 'Catalog, payments, and shipping', 'Complete WooCommerce setup covering products, tax, shipping zones, payment gateways, and storefront templates ready to sell.', 'build', 'setup', 0, 3),
    mkService('LearnDash LMS Setup', 'learndash-setup', 'Courses live without chaos', 'LearnDash configuration for courses, drip content, payments, certificates, and student dashboards that instructors can manage.', 'build', 'setup', 0, 4),
    mkService('WordPress Theme Customization', 'wordpress-customization', 'Extend what you already run', 'Theme and plugin customization for unique WordPress workflows — child themes, blocks, CPTs, and admin UX improvements.', 'build', 'customize', 0, 5),
    mkService('WooCommerce Customization', 'woocommerce-customization', 'Checkout and catalog your way', 'Custom WooCommerce features: checkout fields, shipping logic, pricing rules, and integrations that stock plugins cannot cover cleanly.', 'build', 'customize', 0, 6),
    mkService('LearnDash Customization', 'learndash-customization', 'LMS rules that match your program', 'Custom LearnDash modules, access rules, reporting, and learner journeys tailored to how your education business actually runs.', 'build', 'customize', 0, 7),
    mkService('WordPress Migration', 'wordpress-migration', 'Move without losing SEO equity', 'Migrations to WordPress with URL maps, 301 redirects, staging QA, and Search Console follow-up so rankings stay intact.', 'build', 'migrate', 1, 8),
    mkService('Migrate to WooCommerce', 'migrate-woocommerce', 'Store data moved carefully', 'Move catalogs, customers, and orders to WooCommerce with mapped products, gateway testing, and checkout verification on staging.', 'build', 'migrate', 0, 9),
    mkService('Migrate to LearnDash', 'migrate-learndash', 'Courses and learners transferred', 'Migrate course content and learner records into LearnDash with access checks, progress continuity, and instructor training.', 'build', 'migrate', 0, 10),
    mkService('WordPress Maintenance & Support', 'wordpress-maintenance', 'Updates without surprise breakage', 'Scheduled WordPress core, theme, and plugin updates, backups, uptime checks, and small fixes on a predictable care plan.', 'manage', 'maintain', 0, 11),
    mkService('Website Management Retainer', 'website-management', 'One team for ongoing WordPress work', 'Dedicated management for content updates, plugin hygiene, light feature work, and priority response when something breaks.', 'manage', 'retainers', 0, 12),
    mkService('Hire WordPress Developers', 'hire-wordpress-developers', 'Capacity inside your backlog', 'Dedicated WordPress developers for theme work, Gutenberg builds, and feature tickets — embedded with your product cadence.', 'manage', 'retainers', 0, 13),
    mkService('Hire WooCommerce Developers', 'hire-woocommerce-developers', 'Store specialists on retainer', 'WooCommerce developers for catalog logic, checkout UX, subscriptions, and performance work tied to your release calendar.', 'manage', 'retainers', 0, 14),
    mkService('Hire LearnDash Developers', 'hire-learndash-developers', 'LMS engineering on demand', 'LearnDash specialists for course architecture, reporting, and integrations when your education platform needs steady iteration.', 'manage', 'retainers', 0, 15),
    mkService('WordPress Redesign', 'wordpress-redesign', 'Modern UX on a maintainable theme', 'Full WordPress redesign focused on clearer information architecture, editor-friendly templates, and measurable conversion paths.', 'enhance', 'redesign', 1, 16),
    mkService('Landing Page Redesign', 'landing-page-redesign', 'One page, sharper conversion', 'High-intent WordPress landing page redesign with focused messaging, form or checkout paths, and Core Web Vitals attention.', 'enhance', 'redesign', 0, 17),
    mkService('WordPress Speed Optimization', 'wordpress-speed-optimization', 'Core Web Vitals that hold up', 'WordPress performance work: caching, image strategy, script control, and template fixes aimed at LCP, CLS, and INP.', 'enhance', 'speed', 0, 18),
    mkService('WooCommerce Speed Optimization', 'woocommerce-speed-optimization', 'Faster product and checkout pages', 'Store-focused performance tuning for product templates, cart, and checkout under real catalog and traffic conditions.', 'enhance', 'speed', 0, 19),
    mkService('WordPress API & Integrations', 'api-integrations', 'Connect CRM, ERP, and tools', 'Custom REST API work and third-party integrations so WordPress talks cleanly to CRM, ERP, email, and internal systems.', 'enhance', 'integrate', 0, 20),
    mkService('WordPress Workflow Automation', 'wordpress-ai-automation', 'Less manual busywork in wp-admin', 'Automation for lead routing, content assists, inventory alerts, and support handoffs wired into your WordPress stack.', 'enhance', 'automate', 1, 21),
    mkService('WordPress SEO Services', 'wordpress-seo-services', 'Technical SEO for WordPress', 'Technical SEO for WordPress: crawl health, schema, sitemaps, Core Web Vitals, and content structure editors can keep improving.', 'enhance', 'seo', 0, 22),
    mkService('Custom Plugin Development', 'plugin-development', 'Features you cannot buy off the shelf', 'Bespoke WordPress plugins with secure coding practices, admin UX, and update-safe architecture your team can own long term.', 'build', 'customize', 0, 23),
    mkService('WooCommerce Development', 'woocommerce-development', 'Stores built from real operations', 'Full WooCommerce development: catalog architecture, checkout, shipping, payments, and maintainable customizations from day one.', 'build', 'setup', 0, 24),
    mkService('LearnDash Development', 'learndash-development', 'Education platforms on WordPress', 'Complete LearnDash platform development including courses, access control, payments, and reporting tailored to your program.', 'build', 'setup', 0, 25),
  ];

  await connection.query('TRUNCATE TABLE services');
  await connection.query(
    `INSERT INTO services (title, slug, subtitle, description, hero_title, hero_description, full_content, features, icon, image_url, category_group, category_section, is_new, sort_order) VALUES ?`,
    [allServices]
  );

  await connection.query(`UPDATE case_studies SET is_featured=1, tech_stack='WordPress, LearnDash', result_summary='Lesson loads: Faster | Logged-in lag: Removed' WHERE slug='eduvault-lms'`);
  await connection.query(`UPDATE case_studies SET is_featured=1, tech_stack='WordPress, WooCommerce', result_summary='Admin edits: Unlocked | Publishing: Faster' WHERE slug='freshharvest-shipping'`);
  await connection.query(`UPDATE case_studies SET is_featured=1, tech_stack='WordPress, SEO', result_summary='4x User Engagement | +65% Visibility' WHERE slug='learnpoint-wallet'`);

  const img = (name) => `/section-images/${name}`;
  const mkPlugin = (title, slug, subtitle, desc, full, features, category, price, order, image) => [
    title, slug, subtitle, desc, full, JSON.stringify(features), category, price, '', 'WooCommerce extension', image, '#', order,
  ];

  await connection.query(`INSERT INTO products (title, slug, subtitle, description, full_content, features, category, price, rating, rating_count, image_url, buy_url, sort_order) VALUES ?`, [[
    mkPlugin('QuoteLane Pro', 'quote-flow-pro', 'Product Enquiry Forms', 'Collect WooCommerce quote requests from product pages with email and WhatsApp handoffs.', 'QuoteLane Pro adds product enquiry forms, WhatsApp quick replies, and admin notifications so B2B and made-to-order stores can qualify buyers without exposing every price publicly.', ['Product enquiry forms','WhatsApp quick replies','Admin email alerts','CSV lead export'], 'sales-b2b', '$79', 1, img('plugin-quotes.jpg')),
    mkPlugin('TierPrice Matrix', 'smart-pricing', 'Role & User Pricing', 'Show the right WooCommerce price by role, user, or bulk tier without messy coupon stacks.', 'TierPrice Matrix handles role-based and user-specific pricing, bulk tiers, guest price hiding, and CSV price list imports for wholesale and membership catalogs.', ['Role and user pricing','Tiered bulk discounts','Hide prices from guests','CSV price import'], 'sales-b2b', '$99', 2, img('plugin-pricing.jpg')),
    mkPlugin('CatalogCloak', 'catalog-cloak', 'Wholesale Catalog Gate', 'Hide prices and selected catalog areas from guests until a wholesale or member role is logged in.', 'CatalogCloak keeps sensitive B2B pricing and SKUs behind login while still letting shoppers browse approved public collections.', ['Role-based price hiding','Catalog section gates','Guest message templates','Works with TierPrice Matrix'], 'sales-b2b', '$69', 3, img('plugin-catalog-cloak.jpg')),
    mkPlugin('BundleForge', 'bundlecraft', 'Mix-and-Match Bundles', 'Let shoppers build product boxes with fixed or dynamic WooCommerce pricing.', 'BundleForge powers mix-and-match boxes, fixed or percentage discounts, prebuilt kits, and inventory-aware bundle items for gift and subscription-style catalogs.', ['Mix-and-match builder','Fixed or dynamic pricing','Prebuilt kits','Inventory-aware items'], 'catalog', '$89', 4, img('plugin-bundles.jpg')),
    mkPlugin('RelateLane', 'relate-lane', 'Smarter Related Products', 'Recommend related WooCommerce products from rules you control — not random you-may-also-like noise.', 'RelateLane lets merchandisers define related and upsell sets by category, tag, or manual lists so product pages stay commercially intentional.', ['Rule-based related products','Manual merchandising lists','Category and tag matching','Template-ready widgets'], 'catalog', '$59', 5, img('plugin-relate-lane.jpg')),
    mkPlugin('KitLane', 'kit-lane', 'Inventory-Honest Kits', 'Sell fixed kits that deduct child SKU stock correctly when the parent kit sells.', 'KitLane keeps kit parents and component inventory aligned so you do not oversell a bundle when one piece is out of stock.', ['Parent kit products','Component stock deduction','Oversell protection','Simple kit builder UI'], 'catalog', '$79', 6, img('plugin-kit-lane.jpg')),
    mkPlugin('UrgencyKit Pack', 'sales-boost-pack', 'Conversion Helpers', 'Countdown, scarcity, and shipping-progress tools for campaign windows on WooCommerce.', 'UrgencyKit Pack bundles countdown timers, discount prompts, free-shipping bars, scarcity messages, and exit-intent offers for flash and seasonal campaigns.', ['Countdown timers','Discount prompts','Free shipping bar','Scarcity messages'], 'conversion', '$69', 7, img('plugin-urgency.jpg')),
    mkPlugin('StickyLane ATC', 'sticky-lane', 'Sticky Add to Cart', 'Keep add-to-cart visible on long product pages without burying the primary action.', 'StickyLane ATC adds a compact sticky bar with price, variation summary, and add-to-cart so mobile shoppers do not lose the purchase action while scrolling.', ['Sticky ATC bar','Variation summary','Mobile-first layout','Theme-friendly CSS'], 'conversion', '$49', 8, img('plugin-sticky-lane.jpg')),
    mkPlugin('BannerForge', 'banner-forge', 'Campaign Banner Slots', 'Schedule homepage and category banners with start/end times editors can manage.', 'BannerForge gives marketing teams dated banner slots for campaigns without handing them a page-builder free-for-all.', ['Scheduled banner slots','Category and home placements','Editor-friendly controls','Desktop and mobile images'], 'conversion', '$55', 9, img('plugin-banner-forge.jpg')),
    mkPlugin('StockdenPro', 'stock-alert-pro', 'Inventory Threshold Alerts', 'Notify ops when WooCommerce stock dips below thresholds you set per SKU.', 'StockdenPro watches WooCommerce inventory and sends email or Slack alerts when stock crosses your rules.', ['Low stock email alerts','Slack notifications','Back-in-stock emails','Daily inventory digests'], 'ops-inventory', '$59', 10, img('plugin-stock.jpg')),
    mkPlugin('StockMap', 'stock-map', 'Multi-Location Stock View', 'See WooCommerce stock by location labels so ops know where inventory actually sits.', 'StockMap adds location-aware stock fields and admin views for teams that store inventory across warehouses or retail rooms.', ['Location stock fields','Admin location views','Low-stock by location','CSV friendly exports'], 'ops-inventory', '$89', 11, img('plugin-stock-map.jpg')),
    mkPlugin('RestockPulse', 'restock-pulse', 'Restock Planning Digests', 'Weekly restock digests that highlight SKUs approaching zero before campaigns.', 'RestockPulse turns inventory thresholds into planning digests so purchasing does not rely on last-minute panic buys.', ['Weekly restock digests','Campaign prep lists','Threshold grouping','Email to ops roles'], 'ops-inventory', '$65', 12, img('plugin-restock-pulse.jpg')),
    mkPlugin('Prooflane Reviews', 'review-boost', 'Post-Purchase Reviews', 'Request reviews after delivery and display them with schema-ready markup.', 'Prooflane Reviews schedules post-purchase review asks, supports photo uploads, moderation, and rich-result markup.', ['Automated review requests','Photo uploads','Schema markup','Review widgets'], 'trust-checkout', '$49', 13, img('plugin-reviews.jpg')),
    mkPlugin('LaneCheckout', 'checkout-flow', 'One-Page Checkout', 'Reduce steps between cart and paid order with a focused WooCommerce checkout.', 'LaneCheckout replaces multi-step checkout with a distraction-free page, address helpers, and optional order bumps.', ['One-page checkout','Address helpers','Express pay options','Order bumps'], 'trust-checkout', '$89', 14, img('plugin-checkout.jpg')),
    mkPlugin('SealStrip', 'seal-strip', 'Trust Seal Strip', 'Show guarantee, shipping, and payment trust cues near add-to-cart and checkout.', 'SealStrip places editor-controlled trust seals on product and cart templates.', ['Product and cart seal strips','Custom seal icons and copy','Placement controls','No third-party brand logos required'], 'trust-checkout', '$39', 15, img('plugin-seal-strip.jpg')),
    mkPlugin('Subscrivo', 'subscripto', 'Subscription Billing', 'Flexible WooCommerce subscription intervals with a clear recurring-revenue view.', 'Subscrivo adds subscription billing with trials, pause and skip options, customer self-service, and an MRR-focused dashboard.', ['Flexible intervals','Trials and fees','Self-service portal','MRR dashboard'], 'subscriptions', '$129', 16, img('plugin-subscriptions.jpg')),
    mkPlugin('CycleFlex', 'cycle-flex', 'Pause & Skip Controls', 'Give subscribers clear pause, skip, and resume actions without support tickets.', 'CycleFlex focuses on self-service subscription lifecycle controls so customers can adjust deliveries without calling your team.', ['Pause and resume','Skip next delivery','Customer portal actions','Status emails'], 'subscriptions', '$79', 17, img('plugin-cycle-flex.jpg')),
    mkPlugin('TierAccess', 'tier-access', 'Membership Tier Access', 'Gate products and content by membership tier linked to WooCommerce purchases.', 'TierAccess maps membership tiers to catalog and content access so digital products and member pricing stay consistent after checkout.', ['Membership tiers','Product and content gates','Purchase-linked access','Admin tier overview'], 'subscriptions', '$99', 18, img('plugin-tier-access.jpg')),
  ]]);

  await connection.query(`INSERT INTO tools (title, slug, description, full_content, icon, is_new, sort_order) VALUES ?`, [[
    ['Bug Fixing Bot', 'bug-fixing-bot', 'Isolate common WordPress breakage — white screens, plugin clashes, and checkout errors — with a clear first-pass checklist.', 'Use this guided path before you open a ticket. It walks through plugin isolation, theme switch tests, and error-log clues so you know what broke and what to hand an engineer.', 'bug', 1, 1],
    ['Design Bot', 'design-bot', 'Explore WordPress page layouts and section ideas before theme build so stakeholders align on structure early.', 'Sketch homepage and landing patterns for WordPress marketing sites — hero, proof, services, and CTA — without committing to a full redesign yet.', 'palette', 0, 2],
    ['WordPress Consultation Bot', 'consultation-bot', 'Get a second opinion on theme debt, WooCommerce limits, and retainer vs project trade-offs.', 'Ask practical WordPress delivery questions: migration risk, plugin stacks, staging needs, and when a custom plugin beats another SaaS add-on.', 'message-circle', 0, 3],
    ['Website Speed Analyzer', 'speed-analyzer', 'Spot WordPress and WooCommerce bottlenecks across LCP, CLS, and heavy templates without guessing.', 'Review hero media, fonts, third-party scripts, and product query weight. Pair findings with field data, not only a single Lighthouse screenshot.', 'zap', 0, 4],
    ['Conversion Rate Audit Tool', 'conversion-audit', 'Find friction on WordPress landing pages and WooCommerce checkout paths that quietly kill enquiries and orders.', 'Check form length, mobile CTA placement, shipping surprises, and trust cues near buy buttons — then prioritize fixes that match your traffic.', 'trending-up', 0, 5],
    ['Security Vulnerability Scanner', 'security-scanner', 'Surface common WordPress hardening gaps before they become downtime or malware cleanup work.', 'Walk login protection, update hygiene, file permissions, backups, and obvious misconfigurations that agencies fix before launch.', 'shield', 0, 6],
  ]]);

  await connection.query(`INSERT INTO guidebooks (title, slug, description, content, download_url, image_url, sort_order) VALUES ?`, [[
    ['WooCommerce Migration Checklist', 'woocommerce-migration-checklist', 'Move products, customers, and orders to WooCommerce without losing URLs or checkout confidence.', 'Covers catalog mapping, gateway tests, redirect plans, staging QA, and post-cutover Search Console checks for store moves.', '#', '/section-images/guidebook-woocommerce-speed-playbook.jpg', 1],
    ['LearnDash LMS DIY Setup', 'learndash-diy-setup', 'Stand up LearnDash courses, drip rules, and learner access with a launch-ready checklist.', 'Course structure, payments, certificates, instructor roles, and mobile lesson checks before you invite the first cohort.', '#', '/section-images/guidebook-pre-launch-checklist.jpg', 2],
    ['44 LearnDash Tips & Tricks', 'learndash-tips-tricks', 'Operator-level LearnDash habits for drip content, progress clarity, and fewer support tickets.', 'From lesson templates to completion rules — practical tips collected from LMS delivery work, not generic LMS marketing copy.', '#', '/section-images/guidebook-pre-launch-checklist.jpg', 3],
    ['Top WooCommerce Plugin Guide', 'woocommerce-plugin-guide', 'Choose WooCommerce plugins by job-to-be-done — pricing, inventory, checkout, and care — not by popularity lists.', 'A curated shortlist for performance, SEO hygiene, security, and conversion — with notes on when custom work beats another plugin.', '#', '/section-images/guidebook-woocommerce-speed-playbook.jpg', 4],
    ['WordPress Plugin Developer Guide', 'plugin-developer-guide', 'Build maintainable WordPress plugins with hooks, capability checks, and a release workflow editors can trust.', 'Coding standards, security basics, HPOS-aware WooCommerce notes, and deployment steps for agency plugin work.', '#', '/section-images/guidebook-pre-launch-checklist.jpg', 5],
  ]]);

  await connection.query(`INSERT INTO awards (title, organization, year, badge_label, sort_order) VALUES ?`, [[
    ['Written scopes before build', 'Clear inclusions, exclusions, and success criteria for WordPress work', 'Every project', 'Scope', 1],
    ['WordPress specialists', 'Themes, plugins, WooCommerce, and LearnDash — not generic web packages', 'Daily focus', 'WP', 2],
    ['Performance-minded launches', 'Core Web Vitals reviewed on real templates before go-live', 'Pre-launch', 'CWV', 3],
    ['Staging-first changes', 'Meaningful updates reviewed on staging when hosting allows', 'Standard', 'QA', 4],
    ['Secure launch habits', 'Hardening, backups, and update discipline as part of delivery', 'Standard', 'Secure', 5],
  ]]);

  await connection.query(`INSERT INTO site_stats (stat_key, stat_value, stat_label, sort_order) VALUES ?`, [[
    ['wordpress', 'WordPress', 'Custom themes & rebuilds', 1],
    ['woocommerce', 'WooCommerce', 'Stores built for checkout', 2],
    ['plugins', 'Plugins', 'Purpose-built store extensions', 3],
    ['performance', 'Performance', 'Core Web Vitals before launch', 4],
    ['migrations', 'Migrations', 'Redirect maps & staging QA', 5],
    ['learndash', 'LearnDash', 'LMS access rules that hold', 6],
    ['care', 'Care plans', 'Updates, backups & retainers', 7],
    ['handoff', 'Handoff', 'Docs your editors can use', 8],
  ]]);
}