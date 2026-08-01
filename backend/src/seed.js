import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { seedExtended } from './seed-extended.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runSeed(options = {}) {
  const { fresh = false } = options;
  const dbName = process.env.DB_NAME || 'wpservices_agency';
  const isManagedDb = Boolean(process.env.MYSQLHOST || process.env.MYSQLDATABASE);

  const connection = await mysql.createConnection({
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT) || 3306,
    multipleStatements: true,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

  let schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  if (isManagedDb) {
    if (fresh) {
      await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
    }
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    schema = schema
      .replace(/CREATE DATABASE IF NOT EXISTS \w+;\s*/i, '')
      .replace(/USE \w+;\s*/i, `USE ${dbName};\n`);
  } else {
    schema = schema.replace(/USE \w+;\s*/i, `USE ${dbName};\n`);
  }
  await connection.query(schema);
  await connection.query(`USE ${dbName}`);
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const t of ['contact_leads','testimonials','case_studies','services','pricing_plans','faqs','blog_posts','industries','portfolio_items','admins','products','tools','guidebooks','awards','site_stats']) {
    await connection.query(`TRUNCATE TABLE ${t}`);
  }
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');

  // Testimonials intentionally empty — add real quotes from Admin later.

  const caseStudies = [
    ['Loyalty Shipping Rules That Cut Cart Friction', 'Anonymized grocery WooCommerce store', 'Returning shoppers paid shipping on every order, which hurt repeat checkouts.', 'Built WooCommerce rules that unlock free shipping for eligible returning customers using order history.', 'A grocery-style WooCommerce store needed loyalty shipping without manual coupons. We shipped rule-based shipping at checkout, verified on staging, then cut over with a redirect and QA checklist.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200', 'Repeat Checkouts', 'Clearer rules', 'Cart Completion', 'Fewer blockers', 'Ops Effort', 'Less manual work', 'grocery-loyalty-shipping', 1],
    ['Member-Only LMS With Controlled Access', 'Anonymized private cohort LMS', 'A closed training community needed gated courses beyond stock LMS plugins.', 'Delivered a LearnDash setup with custom access rules, scheduling helpers, and clearer progress views.', 'A private cohort needed member-only courses without access exceptions piling up in support. We configured LearnDash gates, progress clarity, and admin tools with staging review before launch.', 'https://images.unsplash.com/photo-1501504905252-473a47ee5617?w=1200', 'Course Access', 'Role-gated', 'Admin Hours', 'Fewer exceptions', 'Delivery', 'Staging-first', 'cohort-lms-access', 2],
    ['Cart Recovery Sequences for a Fashion Store', 'Anonymized apparel WooCommerce store', 'Generic abandoned-cart tools recovered too few paid orders.', 'Custom recovery triggers and email sequences wired to WooCommerce order events.', 'An apparel storefront needed recovery messaging tied to real cart state. We wired event-based sequences to WooCommerce order events and clarified checkout copy on the way to paid orders.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200', 'Recovered Carts', 'Event-based', 'Manual Follow-up', 'Reduced', 'Checkout Clarity', 'Improved copy', 'apparel-cart-recovery', 3],
    ['Attribute-Driven Subscription Pricing', 'Anonymized specialty retail store', 'Subscriptions needed prices that change with product attributes.', 'Custom WooCommerce subscription pricing driven by selected attributes and renewal cycles.', 'A specialty retail catalog needed subscription prices that follow selected attributes. We built attribute-aware renewal logic so billing exceptions stop landing in support.', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200', 'Renewals', 'Attribute-aware', 'Pricing Exceptions', 'Fewer tickets', 'Support Load', 'Clearer rules', 'attribute-subscription-pricing', 4],
    ['Wallet Checkout for Course Access', 'Anonymized online course team', 'Learners needed flexible payment via credits and shared team seats.', 'Wallet-style checkout and team license helpers on a WordPress LMS stack.', 'A course team needed bulk purchase and seat assignment without manual ops. We added wallet-style checkout and self-serve seat tools on their WordPress LMS stack.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200', 'Checkout Path', 'Wallet-ready', 'Seat Assignment', 'Self-serve', 'Manual Seats', 'Reduced', 'course-wallet-checkout', 5],
  ];
  await connection.query(`INSERT INTO case_studies (title, client, challenge, solution, full_content, image_url, metric1_label, metric1_value, metric2_label, metric2_value, metric3_label, metric3_value, slug, sort_order) VALUES ?`, [caseStudies]);

  await seedExtended(connection);

  await connection.query(`INSERT INTO pricing_plans (name, tagline, price, original_price, discount_label, is_best_seller, features, sort_order) VALUES ?`, [[
    ['Build & Launch', 'WordPress presence with clear templates and a documented handoff.', 'From $4,200', '', '', 1, JSON.stringify(['Discovery and written scope','Key page templates on WordPress','Responsive theme build','Analytics and basic SEO setup','Launch checklist and support window','Optional: WooCommerce or LMS add-on']), 1],
    ['Redesign & Convert', 'Refresh an existing WordPress site for clearer UX and conversion paths.', 'Custom Quote', '', '', 0, JSON.stringify(['UX and content audit','Wireframes for priority templates','Theme rebuild or child-theme approach','Core Web Vitals attention on key pages','Redirect plan when URLs change','Editor training at handoff']), 2],
  ]]);

  await connection.query(`INSERT INTO faqs (question, answer, page_slug, sort_order) VALUES ?`, [[
    ['Do you build custom WordPress themes and plugins?', 'Yes. We develop custom themes, child themes, and plugins aligned to your content model, WooCommerce needs, and editor workflow — with staging review before launch.', 'home', 1],
    ['What makes WPServices different from a general web shop?', 'We specialize in WordPress: Gutenberg, classic editors, WooCommerce, LearnDash, migrations, Core Web Vitals, and ongoing care — not platform-agnostic brochure sites.', 'home', 2],
    ['How is WordPress project pricing decided?', 'Complexity of theme work, plugins, integrations, content migration, and WooCommerce depth drive cost. After a short discovery call we share a written scope and quote.', 'home', 3],
    ['Can you redesign an existing WordPress site?', 'Yes. We refresh information architecture, templates, and performance while protecting SEO equity with redirect plans when URLs change.', 'home', 4],
    ['How long do typical WordPress builds take?', 'Many brochure or marketing sites land in roughly 4–8 weeks. Stores, LMS platforms, and heavy migrations are scoped individually.', 'home', 5],
    ['How do you approach WordPress security?', 'Hardened configs, least-privilege users, backups, update cadence, and staging checks. Security hardening engagements go deeper for high-risk sites.', 'home', 6],
    ['Do you offer post-launch WordPress support?', 'Every project includes a support window. Ongoing maintenance and retainers cover updates, monitoring, and small feature work.', 'home', 7],
    ['Will the site work well on mobile?', 'Templates are built and tested mobile-first across key WordPress and WooCommerce views before launch.', 'home', 8],
  ]]);

  const blogPosts = [
    ['A Safer WordPress Migration Checklist for SEO', 'migrate-wordpress-seo', 'Redirect maps, staging checks, and Search Console habits that protect rankings after cutover.', 'Migrating WordPress is more than copying files. Export your sitemap, map URLs, stage redirects, test forms and checkout, then monitor crawl errors for weeks after DNS cutover.', 'WPServices Team', '/section-images/blog-migrate-wordpress-seo.jpg', '2025-06-12', 1],
    ['When a WordPress Redesign Is Worth the Investment', 'website-redesign-checklist', 'Signals that theme debt, UX friction, or Core Web Vitals are costing more than a structured rebuild.', 'Audit top landing pages, mobile conversion, and editor pain before you buy a redesign. Set measurable goals and plan content migration as its own workstream.', 'WPServices Team', '/section-images/blog-website-redesign-checklist.jpg', '2025-05-15', 2],
    ['Where Stock WooCommerce Starts to Strain', 'woocommerce-customization-scale', 'Checkout friction, shipping rules, and plugin conflicts that appear as catalogs and traffic grow.', 'At scale, generic plugin stacks collide. Invest in clear cart rules, lean queries, and checkout paths that match how your operations actually ship and bill.', 'WPServices Team', '/section-images/blog-woocommerce-customization-scale.jpg', '2025-04-08', 3],
    ['Core Web Vitals Fixes That Matter on WordPress', 'core-web-vitals-wordpress', 'Practical LCP, CLS, and INP improvements for theme and WooCommerce templates — not lab-only tips.', 'Focus on hero media, font loading, third-party scripts, and product template queries. Measure field data after each change, not only Lighthouse screenshots.', 'WPServices Team', '/section-images/blog-core-web-vitals-wordpress.jpg', '2025-03-20', 4],
    ['Agency vs In-House WordPress Capacity', 'hire-wordpress-agency', 'How to decide between a retainer team and hiring when you need themes, plugins, and care coverage.', 'Ask about staging habits, code ownership, update cadence, and who answers when a plugin update breaks checkout. Vague timelines are a red flag.', 'WPServices Team', '/section-images/blog-hire-wordpress-agency.jpg', '2025-04-22', 5],
  ];
  await connection.query(`INSERT INTO blog_posts (title, slug, excerpt, content, author, image_url, published_at, sort_order) VALUES ?`, [blogPosts]);

  await connection.query(`INSERT INTO industries (title, description, has_case_study, sort_order) VALUES ?`, [[
    ['E-Commerce & Retail', 'WooCommerce catalogs, shipping rules, and checkout paths for retailers that sell online and in-store — with inventory-aware templates.', 1, 1],
    ['Education & E-Learning', 'LearnDash courses, drip schedules, and learner dashboards built for cohorts and self-paced programs without access chaos.', 0, 2],
    ['Healthcare & Wellness', 'WordPress booking flows, accessible layouts, and form handling for clinics and wellness brands that need calm admin UX.', 0, 3],
    ['Corporate & B2B', 'Service sites, lead capture, and member-style portals for teams that sell expertise — with clear scopes and handoffs.', 0, 4],
    ['Hospitality & Travel', 'Booking-friendly WordPress pages and destination storytelling without bloated page-builder stacks.', 0, 5],
    ['Non-Profit & NGO', 'Donation-ready layouts, campaign pages, and editor-friendly storytelling templates staff can update after launch.', 0, 6],
    ['Real Estate', 'Listing-friendly structures, inquiry forms, and gallery-heavy property pages that stay maintainable for agents.', 0, 7],
    ['Startup & Tech', 'Launch sites and product marketing pages on WordPress with room to add docs, blogs, and gated content later.', 0, 8],
  ]]);

  await connection.query(`INSERT INTO portfolio_items (title, category, image_url, sort_order) VALUES ?`, [[
    ['Specialty retail WooCommerce storefront', 'WooCommerce Store', '/section-images/portfolio-coffee.jpg', 1],
    ['Services company WordPress marketing site', 'Corporate Website', '/section-images/portfolio-corporate.jpg', 2],
    ['Course team LearnDash dashboard', 'LMS Dashboard', '/section-images/portfolio-lms.jpg', 3],
    ['B2B member catalog portal', 'B2B Portal', '/section-images/portfolio-b2b.jpg', 4],
  ]]);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@wpproservices.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe!2026';
  const hash = await bcrypt.hash(adminPassword, 10);
  await connection.query(
    `INSERT INTO admins (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
    ['Super Admin', adminEmail, hash, 'admin']
  );
  console.log(`Admin created: ${adminEmail} / ${adminPassword}`);

  console.log('Database seeded successfully!');
  await connection.end();
}

export { runSeed };

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  runSeed().catch((err) => { console.error('Seed failed:', err.message); process.exit(1); });
}
