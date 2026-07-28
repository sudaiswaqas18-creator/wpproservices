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
    title: 'Website Development',
    desc: 'Custom tailored tech solutions scaling from robust infrastructures to beautiful, high-performance web applications.',
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
    title: 'Website Revamp',
    desc: 'Refresh existing experiences with focused redesign and migration work that lifts conversion.',
    icon: RefreshCw,
    slugs: ['wordpress-redesign', 'wordpress-migration'],
    links: [
      { label: 'Website Redesign', slug: 'wordpress-redesign' },
      { label: 'WordPress Migration', slug: 'wordpress-migration' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    desc: 'Make sites measurably faster — page speed, server response, asset weight.',
    icon: Zap,
    slugs: ['wordpress-speed-optimization', 'wordpress-seo-services', 'wordpress-maintenance'],
    links: [
      { label: 'Speed Optimization', slug: 'wordpress-speed-optimization' },
      { label: 'SEO Improvement', slug: 'wordpress-seo-services' },
    ],
  },
  {
    id: 'partnership',
    title: 'Technology Partnership',
    desc: 'Long-term retainer engagements with dedicated WordPress, WooCommerce, and LearnDash teams.',
    icon: Users,
    slugs: ['hire-wordpress-developers', 'hire-woocommerce-developers'],
    links: [
      { label: 'WordPress Retainer', slug: 'hire-wordpress-developers' },
      { label: 'WooCommerce Retainer', slug: 'hire-woocommerce-developers' },
    ],
  },
  {
    id: 'automation',
    title: 'AI Automations',
    desc: 'Workflow automation that saves teams hours every week.',
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
