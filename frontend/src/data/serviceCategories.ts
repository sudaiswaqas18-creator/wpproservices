import {
  Bot,
  Code2,
  RefreshCw,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceCategoryLink {
  label: string;
  slug: string;
}

export interface ServiceCategoryDef {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  slugs: string[];
  links: ServiceCategoryLink[];
}

export const SERVICE_CATEGORIES: ServiceCategoryDef[] = [
  {
    id: 'development',
    title: 'WordPress & WooCommerce Development',
    desc: 'Custom themes, storefronts, and plugin features built for your catalog, content model, and editorial workflow — not a one-size template.',
    icon: Code2,
    slugs: [
      'wordpress-website-development',
      'woocommerce-development',
      'learndash-development',
      'woocommerce-setup',
      'plugin-development',
      'wordpress-customization',
    ],
    links: [
      { label: 'Custom WordPress Development', slug: 'wordpress-website-development' },
      { label: 'WooCommerce Development', slug: 'woocommerce-development' },
      { label: 'LearnDash Development', slug: 'learndash-development' },
    ],
  },
  {
    id: 'revamp',
    title: 'Redesign & Migration',
    desc: 'Refresh outdated WordPress sites or move from another CMS with a redirect plan, content map, and staged cutover so SEO and checkout stay intact.',
    icon: RefreshCw,
    slugs: ['wordpress-redesign', 'wordpress-migration'],
    links: [
      { label: 'Website Redesign', slug: 'wordpress-redesign' },
      { label: 'WordPress Migration', slug: 'wordpress-migration' },
    ],
  },
  {
    id: 'performance',
    title: 'Speed, SEO & Maintenance',
    desc: 'Improve LCP, reduce plugin bloat, tighten caching, and keep WordPress, themes, and plugins patched on a predictable cadence.',
    icon: Zap,
    slugs: ['wordpress-speed-optimization', 'wordpress-seo-services', 'wordpress-maintenance'],
    links: [
      { label: 'Speed Optimization', slug: 'wordpress-speed-optimization' },
      { label: 'SEO Improvement', slug: 'wordpress-seo-services' },
    ],
  },
  {
    id: 'partnership',
    title: 'Dedicated WordPress Teams',
    desc: 'Ongoing capacity for feature work, WooCommerce tweaks, and LearnDash updates — with a retainer so you are not starting from zero each sprint.',
    icon: Users,
    slugs: ['hire-wordpress-developers', 'hire-woocommerce-developers'],
    links: [
      { label: 'WordPress Retainer', slug: 'hire-wordpress-developers' },
      { label: 'WooCommerce Retainer', slug: 'hire-woocommerce-developers' },
    ],
  },
  {
    id: 'automation',
    title: 'WordPress Workflow Automation',
    desc: 'Connect forms, CRM, and store events so lead routing, inventory alerts, and content tasks run without manual busywork.',
    icon: Bot,
    slugs: ['wordpress-ai-automation'],
    links: [{ label: 'Custom Automation Workflows', slug: 'wordpress-ai-automation' }],
  },
];

const slugToCategory = new Map<string, string>();
for (const cat of SERVICE_CATEGORIES) {
  for (const slug of cat.slugs) {
    slugToCategory.set(slug, cat.id);
  }
}

export function getCategoryById(id: string | null | undefined) {
  if (!id) return undefined;
  return SERVICE_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryIdForSlug(slug: string) {
  return slugToCategory.get(slug);
}

export function filterServicesByCategory<T extends { slug: string }>(
  services: T[],
  categoryId: string | null | undefined,
) {
  if (!categoryId) return services;
  const category = getCategoryById(categoryId);
  if (!category) return services;
  const allowed = new Set(category.slugs);
  return services.filter((s) => allowed.has(s.slug));
}
