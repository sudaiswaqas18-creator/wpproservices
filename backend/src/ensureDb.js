import pool from './db.js';
import { runSeed } from './seed.js';

async function ensureProductsCategoryColumn() {
  try {
    await pool.query(
      "ALTER TABLE products ADD COLUMN category VARCHAR(40) DEFAULT 'conversion'",
    );
  } catch (err) {
    if (!String(err.message || '').includes('Duplicate column')) throw err;
  }
}

/** Upsert expanded plugin catalog onto an existing DB without full reseed */
async function syncPluginCatalog() {
  await ensureProductsCategoryColumn();

  const categoryBySlug = {
    'quote-flow-pro': 'sales-b2b',
    'smart-pricing': 'sales-b2b',
    'catalog-cloak': 'sales-b2b',
    bundlecraft: 'catalog',
    'relate-lane': 'catalog',
    'kit-lane': 'catalog',
    'sales-boost-pack': 'conversion',
    'sticky-lane': 'conversion',
    'banner-forge': 'conversion',
    'stock-alert-pro': 'ops-inventory',
    'stock-map': 'ops-inventory',
    'restock-pulse': 'ops-inventory',
    'review-boost': 'trust-checkout',
    'checkout-flow': 'trust-checkout',
    'seal-strip': 'trust-checkout',
    subscripto: 'subscriptions',
    'cycle-flex': 'subscriptions',
    'tier-access': 'subscriptions',
  };

  for (const [slug, category] of Object.entries(categoryBySlug)) {
    await pool.query('UPDATE products SET category = ? WHERE slug = ?', [category, slug]);
  }

  const extras = [
    ['CatalogCloak', 'catalog-cloak', 'Wholesale Catalog Gate', 'Hide prices and selected catalog areas from guests until a wholesale or member role is logged in.', 'CatalogCloak keeps sensitive B2B pricing and SKUs behind login while still letting shoppers browse approved public collections.', JSON.stringify(['Role-based price hiding', 'Catalog section gates', 'Guest message templates', 'Works with TierPrice Matrix']), 'sales-b2b', '$69', '4.8/5', 'Stores using plugin', '/section-images/plugin-catalog-cloak.jpg', '#', 3],
    ['RelateLane', 'relate-lane', 'Smarter Related Products', 'Recommend related WooCommerce products from rules you control — not random you-may-also-like noise.', 'RelateLane lets merchandisers define related and upsell sets by category, tag, or manual lists so product pages stay commercially intentional.', JSON.stringify(['Rule-based related products', 'Manual merchandising lists', 'Category and tag matching', 'Template-ready widgets']), 'catalog', '$59', '4.8/5', 'Stores using plugin', '/section-images/plugin-relate-lane.jpg', '#', 5],
    ['KitLane', 'kit-lane', 'Inventory-Honest Kits', 'Sell fixed kits that deduct child SKU stock correctly when the parent kit sells.', 'KitLane keeps kit parents and component inventory aligned so you do not oversell a bundle when one piece is out of stock.', JSON.stringify(['Parent kit products', 'Component stock deduction', 'Oversell protection', 'Simple kit builder UI']), 'catalog', '$79', '4.8/5', 'Stores using plugin', '/section-images/plugin-kit-lane.jpg', '#', 6],
    ['StickyLane ATC', 'sticky-lane', 'Sticky Add to Cart', 'Keep add-to-cart visible on long product pages without burying the primary action.', 'StickyLane ATC adds a compact sticky bar with price, variation summary, and add-to-cart so mobile shoppers do not lose the purchase action while scrolling.', JSON.stringify(['Sticky ATC bar', 'Variation summary', 'Mobile-first layout', 'Theme-friendly CSS']), 'conversion', '$49', '4.8/5', 'Stores using plugin', '/section-images/plugin-sticky-lane.jpg', '#', 8],
    ['BannerForge', 'banner-forge', 'Campaign Banner Slots', 'Schedule homepage and category banners with start/end times editors can manage.', 'BannerForge gives marketing teams dated banner slots for campaigns without handing them a page-builder free-for-all.', JSON.stringify(['Scheduled banner slots', 'Category and home placements', 'Editor-friendly controls', 'Desktop and mobile images']), 'conversion', '$55', '4.8/5', 'Stores using plugin', '/section-images/plugin-banner-forge.jpg', '#', 9],
    ['StockMap', 'stock-map', 'Multi-Location Stock View', 'See WooCommerce stock by location labels so ops know where inventory actually sits.', 'StockMap adds location-aware stock fields and admin views for teams that store inventory across warehouses or retail rooms.', JSON.stringify(['Location stock fields', 'Admin location views', 'Low-stock by location', 'CSV friendly exports']), 'ops-inventory', '$89', '4.8/5', 'Stores using plugin', '/section-images/plugin-stock-map.jpg', '#', 11],
    ['RestockPulse', 'restock-pulse', 'Restock Planning Digests', 'Weekly restock digests that highlight SKUs approaching zero before campaigns.', 'RestockPulse turns inventory thresholds into planning digests so purchasing does not rely on last-minute panic buys.', JSON.stringify(['Weekly restock digests', 'Campaign prep lists', 'Threshold grouping', 'Email to ops roles']), 'ops-inventory', '$65', '4.8/5', 'Stores using plugin', '/section-images/plugin-restock-pulse.jpg', '#', 12],
    ['SealStrip', 'seal-strip', 'Trust Seal Strip', 'Show guarantee, shipping, and payment trust cues near add-to-cart and checkout.', 'SealStrip places editor-controlled trust seals on product and cart templates.', JSON.stringify(['Product and cart seal strips', 'Custom seal icons and copy', 'Placement controls', 'No third-party brand logos required']), 'trust-checkout', '$39', '4.8/5', 'Stores using plugin', '/section-images/plugin-seal-strip.jpg', '#', 15],
    ['CycleFlex', 'cycle-flex', 'Pause & Skip Controls', 'Give subscribers clear pause, skip, and resume actions without support tickets.', 'CycleFlex focuses on self-service subscription lifecycle controls so customers can adjust deliveries without calling your team.', JSON.stringify(['Pause and resume', 'Skip next delivery', 'Customer portal actions', 'Status emails']), 'subscriptions', '$79', '4.8/5', 'Stores using plugin', '/section-images/plugin-cycle-flex.jpg', '#', 17],
    ['TierAccess', 'tier-access', 'Membership Tier Access', 'Gate products and content by membership tier linked to WooCommerce purchases.', 'TierAccess maps membership tiers to catalog and content access so digital products and member pricing stay consistent after checkout.', JSON.stringify(['Membership tiers', 'Product and content gates', 'Purchase-linked access', 'Admin tier overview']), 'subscriptions', '$99', '4.8/5', 'Stores using plugin', '/section-images/plugin-tier-access.jpg', '#', 18],
  ];

  for (const row of extras) {
    const slug = row[1];
    const [existing] = await pool.query('SELECT id FROM products WHERE slug = ? LIMIT 1', [slug]);
    if (existing.length) continue;
    await pool.query(
      `INSERT INTO products (title, slug, subtitle, description, full_content, features, category, price, rating, rating_count, image_url, buy_url, sort_order)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      row,
    );
  }
}

export async function ensureDatabase() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS count FROM products');
    if (Number(rows[0]?.count) > 0) {
      await syncPluginCatalog();
      return;
    }
  } catch (err) {
    if (err.code !== 'ER_NO_SUCH_TABLE' && err.code !== 'ER_BAD_DB_ERROR') throw err;
  }

  console.log('Database tables missing — running bootstrap seed...');
  await runSeed({ fresh: true });
  console.log('Bootstrap seed complete.');
}
