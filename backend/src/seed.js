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

  await connection.query(`INSERT INTO testimonials (name, company, country, quote, metric_label, sort_order) VALUES ?`, [[
    ['Sarah Mitchell', 'Horizon Analytics | USA', 'USA', 'WPProServices delivered beyond expectations. Their team built a WordPress site that converts visitors into qualified leads consistently.', 'Monthly lead growth', 1],
    ['David Chen', 'SkillBridge Academy | Singapore', 'Singapore', 'Their thorough discovery process impressed us. They built an LMS our students actually enjoy using.', 'Student engagement', 2],
    ['Anna Kowalski', 'GreenPath Retail | Poland', 'Poland', 'We migrated with zero downtime. Speed, SEO, and checkout flow all improved dramatically.', 'Checkout conversion', 3],
    ['James Okafor', 'MedConnect Health | UK', 'UK', 'Professional from day one. The healthcare portal exceeded our accessibility requirements.', 'Patient sign-ups', 4],
    ['Lisa Bergström', 'Nordic Learning Hub | Sweden', 'Sweden', 'Complex LearnDash integration done right. Knowledgeable, responsive, and detail-oriented.', 'Course completion rate', 5],
    ['Marco Rossi', 'Artisan Foods Co. | Italy', 'Italy', 'Our WooCommerce store went from sluggish to blazing fast. Custom plugins exactly what we needed.', 'Repeat purchase rate', 6],
  ]]);

  const caseStudies = [
    ['Smart Shipping Rules Boost Repeat Orders', 'FreshHarvest Market', 'Repeat customers were charged shipping on every order, reducing cart completion.', 'Built a custom WooCommerce plugin that auto-applies free shipping for returning customers.', 'FreshHarvest needed a way to reward loyal buyers without manual coupon codes. We engineered a rule-based shipping engine integrated directly into checkout.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200', 'Returning Orders', '+38%', 'Cart Conversion', '+29%', 'Avg Order Value', '+15%', 'freshharvest-shipping', 1],
    ['Gated LMS for Private Education', 'EduVault Members', 'A closed community needed secure access and custom workflows beyond standard plugins.', 'Developed a LearnDash platform with bespoke access control and scheduling.', 'EduVault required member-only courses, live session booking, and progress dashboards. We delivered a fully gated LMS with admin tools that cut content management time nearly in half.', 'https://images.unsplash.com/photo-1501504905252-473a47ee5617?w=1200', 'Completion Rate', '+32%', 'Admin Time', '-45%', 'Uptime', '99.9%', 'eduvault-lms', 2],
    ['Cart Recovery Increases Revenue', 'StyleBox Boutique', 'Standard abandoned cart tools recovered too few sales.', 'Custom recovery system with smart triggers and personalized email sequences.', 'StyleBox was losing significant revenue to cart abandonment. Our tailored recovery plugin integrated with their email platform and increased recovered sales by 25%.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200', 'Recovery Rate', '+25%', 'Revenue', '+20%', 'Manual Work', '-55%', 'stylebox-cart-recovery', 3],
    ['Subscription Pricing by Attributes', 'ClearView Optics', 'Eyewear subscriptions needed dynamic pricing based on product attributes.', 'Custom WooCommerce subscription engine with attribute-driven pricing.', 'ClearView sold prescription eyewear on subscription. We built dynamic pricing logic based on lens type, frame, and renewal cycle — eliminating billing errors entirely.', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200', 'Renewal Success', '+28%', 'Pricing Errors', '-100%', 'Support Tickets', '-40%', 'clearview-subscriptions', 4],
    ['Wallet-Based Course Access', 'LearnPoint Platform', 'Learners needed flexible payment via points and shared team access.', 'Integrated secure payments with a wallet and team license system.', 'LearnPoint wanted learners to purchase courses with wallet points and share access across teams. We built a seamless wallet checkout that reduced payment drop-offs significantly.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200', 'Drop-offs', '-35%', 'Wallet Adoption', '+48%', 'Manual Access', '-52%', 'learnpoint-wallet', 5],
  ];
  await connection.query(`INSERT INTO case_studies (title, client, challenge, solution, full_content, image_url, metric1_label, metric1_value, metric2_label, metric2_value, metric3_label, metric3_value, slug, sort_order) VALUES ?`, [caseStudies]);

  await seedExtended(connection);

  await connection.query(`INSERT INTO pricing_plans (name, tagline, price, original_price, discount_label, is_best_seller, features, sort_order) VALUES ?`, [[
    ['Build & Launch', 'Robust, future-ready WordPress presence from day one.', '$4,200', '$6,800', '38% Off', 1, JSON.stringify(['SEO audit for launch','5 key pages design & dev','Responsive layouts','Complete setup & launch','Google Analytics setup','Add-on: SEO copywriting']), 1],
    ['Re-Design & Convert', 'Better design, stronger UX, more conversions.', 'Custom Quote', '$5,200', '45% Off', 0, JSON.stringify(['Custom brand design','CTA-focused wireframes','UX improvements','Elementor/Gutenberg build','Analytics & reporting','SEO copywriting included']), 2],
  ]]);

  await connection.query(`INSERT INTO faqs (question, answer, page_slug, sort_order) VALUES ?`, [[
    ['Does WPProServices provide custom themes and plugins?', 'Yes. We create custom themes and plugins aligned with your brand and business goals.', 'home', 1],
    ['Why choose WPProServices for WordPress development?', 'We specialize in scalable, conversion-focused WordPress websites with clean code and long-term support.', 'home', 2],
    ['What is the cost of building a WordPress website?', 'Cost varies by complexity. Contact us for a personalized quote based on your requirements.', 'home', 3],
    ['Can you redesign my existing website?', 'Absolutely. We revamp sites with improved design, performance, and navigation.', 'home', 4],
    ['How long does development take?', 'Typically 4–8 weeks depending on scope.', 'home', 5],
    ['Is my website secure?', 'We implement SSL, hardened configs, regular updates, and security monitoring.', 'home', 6],
    ['Do you offer post-launch support?', 'Yes — troubleshooting, updates, and maintenance plans available.', 'home', 7],
    ['How do you ensure responsive design?', 'Mobile-first approach tested across all devices and screen sizes.', 'home', 8],
  ]]);

  const blogPosts = [
    ['How to Migrate WordPress Without Breaking SEO', 'migrate-wordpress-seo', 'Most migrations break something the founder discovers too late. Here is how to avoid that.', 'Migrating WordPress is not just about moving files. You need a URL map, redirect plan, and post-migration audit. Start by exporting your current sitemap and identifying all indexed pages. Set up 301 redirects before switching DNS. Test every form, checkout flow, and internal link. Finally, resubmit your sitemap in Google Search Console and monitor crawl errors for 30 days.', 'WPProServices Team', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', '2025-06-12', 1],
    ['Subscription Billing Before You Migrate', 'subscription-billing-migration', 'Lock in the right billing model before moving platforms.', 'Switching e-commerce platforms without planning your subscription logic causes revenue leaks. Map your billing cycles, proration rules, and failed payment flows before migration day. Test renewals in staging with real payment gateways in sandbox mode.', 'WPProServices Team', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', '2025-05-28', 2],
    ['Website Redesign Checklist for Growing Businesses', 'website-redesign-checklist', 'Your website could be your biggest liability when scaling.', 'Before redesigning, audit your top landing pages, conversion funnels, and Core Web Vitals. Define success metrics upfront. Involve sales and support teams in wireframe reviews. Plan content migration early — it always takes longer than expected.', 'WPProServices Team', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', '2025-05-15', 3],
    ['How to Vet a WordPress Development Partner', 'vet-wordpress-agency', 'Six disqualifying answers most agencies will give you.', 'Red flags include vague timelines, no discovery phase, unwillingness to share code samples, and no post-launch support plan. Ask about their process, team structure, and how they handle scope changes. Request case studies in your industry.', 'WPProServices Team', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', '2025-04-22', 4],
    ['Why Stock WooCommerce Stops Working at Scale', 'woocommerce-customization-scale', 'Five customizations most founders need first at $1M+ ARR.', 'At scale, checkout friction, shipping logic, and subscription billing need custom solutions. Off-the-shelf plugins create conflicts and slow load times. Invest in custom cart rules, optimized database queries, and CDN-backed asset delivery.', 'WPProServices Team', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', '2025-04-08', 5],
  ];
  await connection.query(`INSERT INTO blog_posts (title, slug, excerpt, content, author, image_url, published_at, sort_order) VALUES ?`, [blogPosts]);

  await connection.query(`INSERT INTO industries (title, description, has_case_study, sort_order) VALUES ?`, [[
    ['E-Commerce & Retail', 'WooCommerce stores with sub-2-second load times and intuitive buying experiences.', 1, 1],
    ['Education & E-Learning', 'Interactive lessons, progress tracking, and mobile-first LMS interfaces.', 0, 2],
    ['Healthcare & Wellness', 'Patient-friendly navigation, online booking, and secure medical forms.', 0, 3],
    ['Corporate & B2B', 'Service showcases, lead forms, and professional layouts that impress clients.', 1, 4],
    ['Hospitality & Travel', 'Seamless booking and vivid destination showcases.', 0, 5],
    ['Non-Profit & NGO', 'Donation pathways and compelling storytelling layouts.', 0, 6],
    ['Real Estate', 'Searchable listings and high-quality property galleries.', 0, 7],
    ['Startup & Tech', 'Product showcases and modern layouts that accelerate growth.', 0, 8],
  ]]);

  await connection.query(`INSERT INTO portfolio_items (title, category, image_url, sort_order) VALUES ?`, [[
    ['Urban Brew Coffee', 'WooCommerce Store', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800', 1],
    ['AccessAbility UK', 'Corporate Website', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800', 2],
    ['LearnSphere Academy', 'LMS Dashboard', 'https://images.unsplash.com/photo-1501504905252-473a47ee5617?w=800', 3],
    ['NovaTech Solutions', 'B2B Portal', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800', 4],
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
