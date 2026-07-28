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
    mkService('Custom Websites', 'wordpress-website-development', 'Tailored web experiences', 'Custom WordPress websites built for performance and conversions.', 'build', 'setup', 0, 1),
    mkService('WordPress Setup', 'wordpress-setup', 'Launch fast', 'Professional WordPress installation, configuration, and launch.', 'build', 'setup', 0, 2),
    mkService('WooCommerce Setup', 'woocommerce-setup', 'Store ready to sell', 'Complete WooCommerce store setup with payments and products.', 'build', 'setup', 0, 3),
    mkService('LearnDash Setup', 'learndash-setup', 'LMS in days', 'LearnDash LMS configuration with courses and payments.', 'build', 'setup', 0, 4),
    mkService('WordPress Customization', 'wordpress-customization', 'Extend your site', 'Theme and plugin customization for unique business needs.', 'build', 'customize', 0, 5),
    mkService('WooCommerce Customization', 'woocommerce-customization', 'Store your way', 'Custom WooCommerce features, checkout flows, and integrations.', 'build', 'customize', 0, 6),
    mkService('LearnDash Customization', 'learndash-customization', 'LMS tailored', 'Custom LearnDash modules, access rules, and reporting.', 'build', 'customize', 0, 7),
    mkService('Migrate to WordPress', 'wordpress-migration', 'Zero-downtime move', 'Seamless migration to WordPress with SEO preserved.', 'build', 'migrate', 1, 8),
    mkService('Migrate to WooCommerce', 'migrate-woocommerce', 'E-commerce migration', 'Move your store to WooCommerce safely.', 'build', 'migrate', 0, 9),
    mkService('Migrate to LearnDash', 'migrate-learndash', 'LMS migration', 'Migrate courses and learners to LearnDash.', 'build', 'migrate', 0, 10),
    mkService('WordPress Maintenance', 'wordpress-maintenance', 'Hassle-free ops', 'Updates, backups, security, and monitoring.', 'manage', 'maintain', 0, 11),
    mkService('Website Management', 'website-management', 'Full-site management', 'Dedicated team managing your WordPress site end-to-end.', 'manage', 'retainers', 0, 12),
    mkService('Hire WordPress Developers', 'hire-wordpress-developers', 'Expert devs on demand', 'Dedicated WordPress developers for your projects.', 'manage', 'retainers', 0, 13),
    mkService('Hire WooCommerce Developers', 'hire-woocommerce-developers', 'E-commerce experts', 'WooCommerce specialists for store growth.', 'manage', 'retainers', 0, 14),
    mkService('Hire LearnDash Developers', 'hire-learndash-developers', 'LMS experts', 'LearnDash developers for education platforms.', 'manage', 'retainers', 0, 15),
    mkService('WordPress Re-design', 'wordpress-redesign', 'Modern refresh', 'Complete redesign for better UX and conversions.', 'enhance', 'redesign', 1, 16),
    mkService('Landing Page Redesign', 'landing-page-redesign', 'Convert more', 'High-converting single landing page redesign.', 'enhance', 'redesign', 0, 17),
    mkService('WordPress Speed Optimization', 'wordpress-speed-optimization', 'Faster loads', 'Core Web Vitals and page speed optimization.', 'enhance', 'speed', 0, 18),
    mkService('WooCommerce Speed Optimization', 'woocommerce-speed-optimization', 'Faster checkout', 'Store speed optimization for mobile commerce.', 'enhance', 'speed', 0, 19),
    mkService('WordPress API Development', 'api-integrations', 'Connect everything', 'Custom REST API and third-party integrations.', 'enhance', 'integrate', 0, 20),
    mkService('WordPress AI Automation', 'wordpress-ai-automation', 'Work smarter', 'AI-powered workflows for content, SEO, and support.', 'enhance', 'automate', 1, 21),
    mkService('WordPress SEO Services', 'wordpress-seo-services', 'Rank higher', 'Technical SEO, content strategy, and rankings.', 'enhance', 'seo', 0, 22),
    mkService('Plugin Development', 'plugin-development', 'Custom plugins', 'Bespoke WordPress plugin development.', 'build', 'customize', 0, 23),
    mkService('WooCommerce Development', 'woocommerce-development', 'Full store builds', 'Custom WooCommerce development from scratch.', 'build', 'setup', 0, 24),
    mkService('LearnDash Development', 'learndash-development', 'Full LMS builds', 'Complete LearnDash platform development.', 'build', 'setup', 0, 25),
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
    ['QuoteFlow Pro', 'quote-flow-pro', 'Product Enquiry Pro', 'Let customers request quotes directly from product pages.', 'QuoteFlow Pro enables product enquiry forms, WhatsApp quick replies, and custom quote workflows for WooCommerce stores.', JSON.stringify(['Product enquiries & quotes','WhatsApp & quick replies','Custom enquiry forms']), '$79', '4.9/5', '5,000+ stores', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', '#', 1],
    ['SmartPricing', 'smart-pricing', 'Customer Specific Pricing', 'Show different prices to different customers automatically.', 'Role-based and user-specific pricing for B2B WooCommerce stores with bulk discounts.', JSON.stringify(['User & role-based pricing','Bulk and tiered discounts','B2B-ready pricing rules']), '$99', '4.9/5', '3,000+ stores', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', '#', 2],
    ['BundleCraft', 'bundlecraft', 'Custom Product Boxes', 'Create flexible product bundles customers can customize.', 'Mix-and-match product bundles with fixed or dynamic pricing for WooCommerce.', JSON.stringify(['Mix-and-match bundles','Fixed or dynamic pricing','Ready-made product kits']), '$89', '5.0/5', '2,000+ stores', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800', '#', 3],
    ['SalesBoost Pack', 'sales-boost-pack', 'Sales Booster Pack', 'Boost conversions with urgency and promotional tools.', 'Countdown timers, smart discounts, and promotional messages for WooCommerce.', JSON.stringify(['Countdown timers','Smart discounts','Promotional messages']), '$69', '4.9/5', '3,000+ stores', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', '#', 4],
    ['StockAlert Pro', 'stock-alert-pro', 'Low Stock Notifications', 'Real-time low stock alerts via email and Slack.', 'StockAlert Pro monitors inventory and sends instant alerts when stock drops below custom thresholds, with back-in-stock customer notifications.', JSON.stringify(['Low stock email alerts','Slack notifications','Back-in-stock emails','Daily inventory reports']), '$59', '4.8/5', '1,200+ stores', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800', '#', 5],
    ['ReviewBoost', 'review-boost', 'Review Collection & Display', 'Automated review requests with rich snippets.', 'ReviewBoost automates post-purchase review collection with photo uploads and Google rich snippet markup for better SEO and conversions.', JSON.stringify(['Auto review requests','Photo & video reviews','Google rich snippets','Review widgets']), '$49', '4.9/5', '2,500+ stores', 'https://images.unsplash.com/photo-1556745757-8d76bdb6834a?w=800', '#', 6],
    ['Subscripto', 'subscripto', 'Subscription Management', 'Flexible subscriptions with MRR analytics.', 'Complete subscription engine for WooCommerce with trials, self-service portal, and recurring revenue dashboard.', JSON.stringify(['Flexible billing intervals','Free trial support','Customer self-service','MRR analytics dashboard']), '$129', '4.9/5', '800+ stores', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', '#', 7],
    ['CheckoutFlow', 'checkout-flow', 'One-Page Checkout', 'Distraction-free checkout that converts.', 'Replace multi-step checkout with a fast one-page experience including express pay and order bump upsells.', JSON.stringify(['One-page checkout','Express payment buttons','Order bump upsells','Mobile-optimized']), '$89', '5.0/5', '1,800+ stores', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', '#', 8],
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
    ['Best UI Design', 'CSS Design Awards', '2026', 'WINNER', 1],
    ['Best UX Design', 'CSS Design Awards', '2026', 'WINNER', 2],
    ['Best Innovation', 'CSS Design Awards', '2026', 'WINNER', 3],
    ['Top WordPress Agency', 'Clutch', '2026', '4.7/5', 4],
    ['Top Design Agency', 'DesignRush', '2026', '4.8/5', 5],
  ]]);

  await connection.query(`INSERT INTO site_stats (stat_key, stat_value, stat_label, sort_order) VALUES ?`, [[
    ['projects', '1,500+', 'Projects Delivered', 1],
    ['experience', '10+', 'Years Experience', 2],
    ['clients', '800+', 'Happy Clients', 3],
    ['countries', '25+', 'Countries Served', 4],
  ]]);
}
