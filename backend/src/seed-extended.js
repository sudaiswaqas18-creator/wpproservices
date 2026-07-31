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

  await connection.query(`INSERT INTO products (title, slug, subtitle, description, full_content, features, price, rating, rating_count, image_url, buy_url, sort_order) VALUES ?`, [[
    ['QuoteLane Pro', 'quote-flow-pro', 'Product Enquiry Forms', 'Collect WooCommerce quote requests from product pages with email and WhatsApp handoffs.', 'QuoteLane Pro adds product enquiry forms, WhatsApp quick replies, and admin notifications so B2B and made-to-order stores can qualify buyers without exposing every price publicly.', JSON.stringify(['Product enquiry forms','WhatsApp quick replies','Admin email alerts','CSV lead export']), '$79', '4.9/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', '#', 1],
    ['TierPrice Matrix', 'smart-pricing', 'Role & User Pricing', 'Show the right WooCommerce price by role, user, or bulk tier without messy coupon stacks.', 'TierPrice Matrix handles role-based and user-specific pricing, bulk tiers, guest price hiding, and CSV price list imports for wholesale and membership catalogs.', JSON.stringify(['Role and user pricing','Tiered bulk discounts','Hide prices from guests','CSV price import']), '$99', '4.9/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', '#', 2],
    ['BundleForge', 'bundlecraft', 'Mix-and-Match Bundles', 'Let shoppers build product boxes with fixed or dynamic WooCommerce pricing.', 'BundleForge powers mix-and-match boxes, fixed or percentage discounts, prebuilt kits, and inventory-aware bundle items for gift and subscription-style catalogs.', JSON.stringify(['Mix-and-match builder','Fixed or dynamic pricing','Prebuilt kits','Inventory-aware items']), '$89', '5.0/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800', '#', 3],
    ['UrgencyKit Pack', 'sales-boost-pack', 'Conversion Helpers', 'Countdown, scarcity, and shipping-progress tools for campaign windows on WooCommerce.', 'UrgencyKit Pack bundles countdown timers, discount prompts, free-shipping bars, scarcity messages, and exit-intent offers for flash and seasonal campaigns.', JSON.stringify(['Countdown timers','Discount prompts','Free shipping bar','Scarcity messages']), '$69', '4.9/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', '#', 4],
    ['StockdenPro', 'stock-alert-pro', 'Inventory Threshold Alerts', 'Notify ops when WooCommerce stock dips below thresholds you set per SKU.', 'StockdenPro watches WooCommerce inventory and sends email or Slack alerts when stock crosses your rules. Configure per product or variation and notify shoppers when items return.', JSON.stringify(['Low stock email alerts','Slack notifications','Back-in-stock emails','Daily inventory digests']), '$59', '4.8/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', '#', 5],
    ['Prooflane Reviews', 'review-boost', 'Post-Purchase Reviews', 'Request reviews after delivery and display them with schema-ready markup.', 'Prooflane Reviews schedules post-purchase review asks, supports photo uploads, moderation, and rich-result markup so social proof helps shoppers and search visibility.', JSON.stringify(['Automated review requests','Photo uploads','Schema markup','Review widgets']), '$49', '4.9/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1556745757-8d76bdb6834a?w=800', '#', 6],
    ['Subscrivo', 'subscripto', 'Subscription Billing', 'Flexible WooCommerce subscription intervals with a clear recurring-revenue view.', 'Subscrivo adds subscription billing with trials, pause and skip options, customer self-service, and an MRR-focused dashboard for recurring WooCommerce products.', JSON.stringify(['Flexible intervals','Trials and fees','Self-service portal','MRR dashboard']), '$129', '4.9/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', '#', 7],
    ['LaneCheckout', 'checkout-flow', 'One-Page Checkout', 'Reduce steps between cart and paid order with a focused WooCommerce checkout.', 'LaneCheckout replaces multi-step checkout with a distraction-free page, address helpers, express wallets when available, and optional order bumps designed for mobile conversion.', JSON.stringify(['One-page checkout','Address helpers','Express pay options','Order bumps']), '$89', '5.0/5', 'Stores using plugin', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', '#', 8],
  ]]);

  await connection.query(`INSERT INTO tools (title, slug, description, full_content, icon, is_new, sort_order) VALUES ?`, [[
    ['Bug Fixing Bot', 'bug-fixing-bot', 'Get clear, practical fixes for common website issues in minutes.', 'Stop waiting on callbacks. Our Bug Fixing Bot diagnoses common WordPress issues and provides step-by-step fixes instantly.', 'bug', 1, 1],
    ['Design Bot', 'design-bot', 'Visualise layouts and page designs before anything is built.', 'Explore page layouts, wireframes, and design concepts with AI-powered design suggestions.', 'palette', 0, 2],
    ['WordPress Consultation Bot', 'consultation-bot', 'Expert second opinion on demand — ask questions, explore options.', 'Get practical WordPress advice without booking calls or waiting days.', 'message-circle', 0, 3],
    ['Website Speed Analyzer', 'speed-analyzer', 'Know what is slowing your site down without guessing.', 'Analyze Core Web Vitals, theme performance, and get actionable speed recommendations.', 'zap', 0, 4],
    ['Conversion Rate Audit Tool', 'conversion-audit', 'Understand why visitors are not converting.', 'Get straightforward insights on what is hurting engagement and where to improve.', 'trending-up', 0, 5],
    ['Security Vulnerability Scanner', 'security-scanner', 'Spot weak points before they become real problems.', 'Regular security checks to keep your WordPress site safe from common vulnerabilities.', 'shield', 0, 6],
  ]]);

  await connection.query(`INSERT INTO guidebooks (title, slug, description, content, download_url, image_url, sort_order) VALUES ?`, [[
    ['WooCommerce Migration Checklist', 'woocommerce-migration-checklist', 'Step-by-step guide for migrating to WooCommerce without losing data.', 'Complete checklist covering products, orders, customers, payment gateways, and SEO redirects.', '#', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600', 1],
    ['LearnDash LMS DIY Setup', 'learndash-diy-setup', 'Set up your LearnDash LMS from scratch with this comprehensive guide.', 'Covers course creation, payment integration, certificates, and student management.', '#', 'https://images.unsplash.com/photo-1501504905252-473a47ee5617?w=600', 2],
    ['44 LearnDash Tips & Tricks', 'learndash-tips-tricks', 'Expert tips to get the most out of your LearnDash platform.', 'From drip content to gamification — 44 actionable tips for LMS success.', '#', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', 3],
    ['Top WooCommerce Plugin Guide', 'woocommerce-plugin-guide', 'The essential plugins every WooCommerce store needs.', 'Curated list of must-have plugins for performance, SEO, security, and conversions.', '#', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600', 4],
    ['WordPress Plugin Developer Guide', 'plugin-developer-guide', 'Learn to build custom WordPress plugins the right way.', 'Coding standards, hooks, security best practices, and deployment workflow.', '#', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', 5],
  ]]);

  await connection.query(`INSERT INTO awards (title, organization, year, badge_label, sort_order) VALUES ?`, [[
    ['5-Star Client Feedback', 'Reviews from delivered WordPress projects', 'Ongoing', '5★', 1],
    ['WordPress Specialists', 'Themes, plugins & WooCommerce focus', 'Daily', 'WP', 2],
    ['Performance-First Builds', 'Core Web Vitals checks before launch', 'Every launch', 'CWV', 3],
    ['Trusted Delivery Partner', 'Retainers, staging QA & clear handoffs', 'Long-term', 'Care', 4],
    ['Secure Launch Standard', 'Hardening, backups & update discipline', 'Standard', 'Secure', 5],
  ]]);

  await connection.query(`INSERT INTO site_stats (stat_key, stat_value, stat_label, sort_order) VALUES ?`, [[
    ['projects', 'Edit me', 'WordPress projects delivered', 1],
    ['experience', 'Edit me', 'Years in WordPress delivery', 2],
    ['clients', 'Growing', 'Businesses we support', 3],
    ['countries', 'Edit me', 'Countries served', 4],
  ]]);
}