import {
  BadgePercent,
  Boxes,
  PackageCheck,
  RefreshCcw,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export interface PluginCategoryDef {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  slugs: string[];
}

/** WooCommerce plugin categories — mirrors services category UX */
export const PLUGIN_CATEGORIES: PluginCategoryDef[] = [
  {
    id: 'sales-b2b',
    title: 'Sales & B2B Pricing',
    desc: 'Quote workflows, role-based prices, and catalog visibility rules for wholesale and made-to-order WooCommerce stores.',
    icon: BadgePercent,
    slugs: ['quote-flow-pro', 'smart-pricing', 'catalog-cloak'],
  },
  {
    id: 'catalog',
    title: 'Catalog & Bundles',
    desc: 'Mix-and-match boxes, smarter related products, and kit inventory that stays honest at checkout.',
    icon: Boxes,
    slugs: ['bundlecraft', 'relate-lane', 'kit-lane'],
  },
  {
    id: 'conversion',
    title: 'Conversion & Campaigns',
    desc: 'Urgency tools, sticky add-to-cart bars, and campaign banners that stay under editorial control.',
    icon: ShoppingBag,
    slugs: ['sales-boost-pack', 'sticky-lane', 'banner-forge'],
  },
  {
    id: 'ops-inventory',
    title: 'Ops & Inventory',
    desc: 'Low-stock alerts, multi-location awareness, and restock planning for growing catalogs.',
    icon: Truck,
    slugs: ['stock-alert-pro', 'stock-map', 'restock-pulse'],
  },
  {
    id: 'trust-checkout',
    title: 'Trust & Checkout',
    desc: 'Reviews, one-page checkout, and trust seals that reduce friction between cart and paid order.',
    icon: PackageCheck,
    slugs: ['review-boost', 'checkout-flow', 'seal-strip'],
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions & Membership',
    desc: 'Recurring billing, pause/skip controls, and membership tiers built for WooCommerce operators.',
    icon: RefreshCcw,
    slugs: ['subscripto', 'cycle-flex', 'tier-access'],
  },
];

const slugToCategory = new Map<string, string>();
for (const cat of PLUGIN_CATEGORIES) {
  for (const slug of cat.slugs) {
    slugToCategory.set(slug, cat.id);
  }
}

export function getPluginCategoryById(id: string | null | undefined) {
  if (!id) return undefined;
  return PLUGIN_CATEGORIES.find((c) => c.id === id);
}

export function getPluginCategoryIdForSlug(slug: string) {
  return slugToCategory.get(slug);
}

export function filterPluginsByCategory<T extends { slug: string; category?: string | null }>(
  plugins: T[],
  categoryId: string | null | undefined,
): T[] {
  if (!categoryId) return plugins;
  const cat = getPluginCategoryById(categoryId);
  if (!cat) return plugins;
  return plugins.filter(
    (p) => p.category === categoryId || cat.slugs.includes(p.slug),
  );
}

export const PLUGIN_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  PLUGIN_CATEGORIES.map((c) => [c.id, c.title]),
);
