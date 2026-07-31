import pool from './db.js';
import { runSeed } from './seed.js';

export { syncSiteContent };

async function ensureProductsCategoryColumn() {
  try {
    await pool.query(
      "ALTER TABLE products ADD COLUMN category VARCHAR(40) DEFAULT 'conversion'",
    );
  } catch (err) {
    if (!String(err.message || '').includes('Duplicate column')) throw err;
  }
}

const PLUGIN_ROWS = [
  ['QuoteLane Pro', 'quote-flow-pro', 'Product Enquiry Forms', 'Collect WooCommerce quote requests from product pages with email and WhatsApp handoffs.', 'QuoteLane Pro adds product enquiry forms, WhatsApp quick replies, and admin notifications so B2B and made-to-order stores can qualify buyers without exposing every price publicly.', JSON.stringify(['Product enquiry forms', 'WhatsApp quick replies', 'Admin email alerts', 'CSV lead export']), 'sales-b2b', '$79', '4.8/5', 'Stores using plugin', '/section-images/plugin-quotes.jpg', '#', 1],
  ['TierPrice Matrix', 'smart-pricing', 'Role & User Pricing', 'Show the right WooCommerce price by role, user, or bulk tier without messy coupon stacks.', 'TierPrice Matrix handles role-based and user-specific pricing, bulk tiers, guest price hiding, and CSV price list imports for wholesale and membership catalogs.', JSON.stringify(['Role and user pricing', 'Tiered bulk discounts', 'Hide prices from guests', 'CSV price import']), 'sales-b2b', '$99', '4.8/5', 'Stores using plugin', '/section-images/plugin-pricing.jpg', '#', 2],
  ['CatalogCloak', 'catalog-cloak', 'Wholesale Catalog Gate', 'Hide prices and selected catalog areas from guests until a wholesale or member role is logged in.', 'CatalogCloak keeps sensitive B2B pricing and SKUs behind login while still letting shoppers browse approved public collections.', JSON.stringify(['Role-based price hiding', 'Catalog section gates', 'Guest message templates', 'Works with TierPrice Matrix']), 'sales-b2b', '$69', '4.8/5', 'Stores using plugin', '/section-images/plugin-catalog-cloak.jpg', '#', 3],
  ['BundleForge', 'bundlecraft', 'Mix-and-Match Bundles', 'Let shoppers build product boxes with fixed or dynamic WooCommerce pricing.', 'BundleForge powers mix-and-match boxes, fixed or percentage discounts, prebuilt kits, and inventory-aware bundle items for gift and subscription-style catalogs.', JSON.stringify(['Mix-and-match builder', 'Fixed or dynamic pricing', 'Prebuilt kits', 'Inventory-aware items']), 'catalog', '$89', '4.8/5', 'Stores using plugin', '/section-images/plugin-bundles.jpg', '#', 4],
  ['RelateLane', 'relate-lane', 'Smarter Related Products', 'Recommend related WooCommerce products from rules you control — not random you-may-also-like noise.', 'RelateLane lets merchandisers define related and upsell sets by category, tag, or manual lists so product pages stay commercially intentional.', JSON.stringify(['Rule-based related products', 'Manual merchandising lists', 'Category and tag matching', 'Template-ready widgets']), 'catalog', '$59', '4.8/5', 'Stores using plugin', '/section-images/plugin-relate-lane.jpg', '#', 5],
  ['KitLane', 'kit-lane', 'Inventory-Honest Kits', 'Sell fixed kits that deduct child SKU stock correctly when the parent kit sells.', 'KitLane keeps kit parents and component inventory aligned so you do not oversell a bundle when one piece is out of stock.', JSON.stringify(['Parent kit products', 'Component stock deduction', 'Oversell protection', 'Simple kit builder UI']), 'catalog', '$79', '4.8/5', 'Stores using plugin', '/section-images/plugin-kit-lane.jpg', '#', 6],
  ['UrgencyKit Pack', 'sales-boost-pack', 'Conversion Helpers', 'Countdown, scarcity, and shipping-progress tools for campaign windows on WooCommerce.', 'UrgencyKit Pack bundles countdown timers, discount prompts, free-shipping bars, scarcity messages, and exit-intent offers for flash and seasonal campaigns.', JSON.stringify(['Countdown timers', 'Discount prompts', 'Free shipping bar', 'Scarcity messages']), 'conversion', '$69', '4.8/5', 'Stores using plugin', '/section-images/plugin-urgency.jpg', '#', 7],
  ['StickyLane ATC', 'sticky-lane', 'Sticky Add to Cart', 'Keep add-to-cart visible on long product pages without burying the primary action.', 'StickyLane ATC adds a compact sticky bar with price, variation summary, and add-to-cart so mobile shoppers do not lose the purchase action while scrolling.', JSON.stringify(['Sticky ATC bar', 'Variation summary', 'Mobile-first layout', 'Theme-friendly CSS']), 'conversion', '$49', '4.8/5', 'Stores using plugin', '/section-images/plugin-sticky-lane.jpg', '#', 8],
  ['BannerForge', 'banner-forge', 'Campaign Banner Slots', 'Schedule homepage and category banners with start/end times editors can manage.', 'BannerForge gives marketing teams dated banner slots for campaigns without handing them a page-builder free-for-all.', JSON.stringify(['Scheduled banner slots', 'Category and home placements', 'Editor-friendly controls', 'Desktop and mobile images']), 'conversion', '$55', '4.8/5', 'Stores using plugin', '/section-images/plugin-banner-forge.jpg', '#', 9],
  ['StockdenPro', 'stock-alert-pro', 'Inventory Threshold Alerts', 'Notify ops when WooCommerce stock dips below thresholds you set per SKU.', 'StockdenPro watches WooCommerce inventory and sends email or Slack alerts when stock crosses your rules.', JSON.stringify(['Low stock email alerts', 'Slack notifications', 'Back-in-stock emails', 'Daily inventory digests']), 'ops-inventory', '$59', '4.8/5', 'Stores using plugin', '/section-images/plugin-stock.jpg', '#', 10],
  ['StockMap', 'stock-map', 'Multi-Location Stock View', 'See WooCommerce stock by location labels so ops know where inventory actually sits.', 'StockMap adds location-aware stock fields and admin views for teams that store inventory across warehouses or retail rooms.', JSON.stringify(['Location stock fields', 'Admin location views', 'Low-stock by location', 'CSV friendly exports']), 'ops-inventory', '$89', '4.8/5', 'Stores using plugin', '/section-images/plugin-stock-map.jpg', '#', 11],
  ['RestockPulse', 'restock-pulse', 'Restock Planning Digests', 'Weekly restock digests that highlight SKUs approaching zero before campaigns.', 'RestockPulse turns inventory thresholds into planning digests so purchasing does not rely on last-minute panic buys.', JSON.stringify(['Weekly restock digests', 'Campaign prep lists', 'Threshold grouping', 'Email to ops roles']), 'ops-inventory', '$65', '4.8/5', 'Stores using plugin', '/section-images/plugin-restock-pulse.jpg', '#', 12],
  ['Prooflane Reviews', 'review-boost', 'Post-Purchase Reviews', 'Request reviews after delivery and display them with schema-ready markup.', 'Prooflane Reviews schedules post-purchase review asks, supports photo uploads, moderation, and rich-result markup.', JSON.stringify(['Automated review requests', 'Photo uploads', 'Schema markup', 'Review widgets']), 'trust-checkout', '$49', '4.8/5', 'Stores using plugin', '/section-images/plugin-reviews.jpg', '#', 13],
  ['LaneCheckout', 'checkout-flow', 'One-Page Checkout', 'Reduce steps between cart and paid order with a focused WooCommerce checkout.', 'LaneCheckout replaces multi-step checkout with a distraction-free page, address helpers, and optional order bumps.', JSON.stringify(['One-page checkout', 'Address helpers', 'Express pay options', 'Order bumps']), 'trust-checkout', '$89', '4.8/5', 'Stores using plugin', '/section-images/plugin-checkout.jpg', '#', 14],
  ['SealStrip', 'seal-strip', 'Trust Seal Strip', 'Show guarantee, shipping, and payment trust cues near add-to-cart and checkout.', 'SealStrip places editor-controlled trust seals on product and cart templates.', JSON.stringify(['Product and cart seal strips', 'Custom seal icons and copy', 'Placement controls', 'No third-party brand logos required']), 'trust-checkout', '$39', '4.8/5', 'Stores using plugin', '/section-images/plugin-seal-strip.jpg', '#', 15],
  ['Subscrivo', 'subscripto', 'Subscription Billing', 'Flexible WooCommerce subscription intervals with a clear recurring-revenue view.', 'Subscrivo adds subscription billing with trials, pause and skip options, customer self-service, and an MRR-focused dashboard.', JSON.stringify(['Flexible intervals', 'Trials and fees', 'Self-service portal', 'MRR dashboard']), 'subscriptions', '$129', '4.8/5', 'Stores using plugin', '/section-images/plugin-subscriptions.jpg', '#', 16],
  ['CycleFlex', 'cycle-flex', 'Pause & Skip Controls', 'Give subscribers clear pause, skip, and resume actions without support tickets.', 'CycleFlex focuses on self-service subscription lifecycle controls so customers can adjust deliveries without calling your team.', JSON.stringify(['Pause and resume', 'Skip next delivery', 'Customer portal actions', 'Status emails']), 'subscriptions', '$79', '4.8/5', 'Stores using plugin', '/section-images/plugin-cycle-flex.jpg', '#', 17],
  ['TierAccess', 'tier-access', 'Membership Tier Access', 'Gate products and content by membership tier linked to WooCommerce purchases.', 'TierAccess maps membership tiers to catalog and content access so digital products and member pricing stay consistent after checkout.', JSON.stringify(['Membership tiers', 'Product and content gates', 'Purchase-linked access', 'Admin tier overview']), 'subscriptions', '$99', '4.8/5', 'Stores using plugin', '/section-images/plugin-tier-access.jpg', '#', 18],
];

/** Upsert full WooCommerce plugin catalog + clear placeholder testimonials */
export async function syncSiteContent() {
  await ensureProductsCategoryColumn();

  for (const row of PLUGIN_ROWS) {
    const slug = row[1];
    const [existing] = await pool.query('SELECT id FROM products WHERE slug = ? LIMIT 1', [slug]);
    if (existing.length) {
      await pool.query(
        `UPDATE products SET title=?, subtitle=?, description=?, full_content=?, features=?, category=?, price=?, rating=?, rating_count=?, image_url=?, buy_url=?, sort_order=? WHERE slug=?`,
        [row[0], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], slug],
      );
    } else {
      await pool.query(
        `INSERT INTO products (title, slug, subtitle, description, full_content, features, category, price, rating, rating_count, image_url, buy_url, sort_order)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        row,
      );
    }
  }

  // Testimonials are off until real client quotes are added via admin
  await pool.query('DELETE FROM testimonials');
}

export async function ensureDatabase() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM products');
    if (Number(rows[0]?.count) > 0) {
      await syncSiteContent();
      return;
    }
  } catch (err) {
    if (err.code !== 'ER_NO_SUCH_TABLE' && err.code !== 'ER_BAD_DB_ERROR') throw err;
  }

  console.log('Database tables missing — running bootstrap seed...');
  await runSeed({ fresh: true });
  console.log('Bootstrap seed complete.');
}
