import {
  Code, ShoppingCart, Puzzle, Palette, Shield, Search, Zap,
  ArrowRightLeft, MessageCircle, Package, BookOpen, Wrench, FileText, Briefcase,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  slug: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_SERVICES: NavItem[] = [
  { title: 'WordPress Development', slug: 'wordpress-website-development', href: '/services/wordpress-website-development', icon: Code },
  { title: 'WooCommerce Development', slug: 'woocommerce-development', href: '/services/woocommerce-development', icon: ShoppingCart },
  { title: 'Custom Plugin Development', slug: 'plugin-development', href: '/services/plugin-development', icon: Puzzle },
  { title: 'Theme Development', slug: 'wordpress-customization', href: '/services/wordpress-customization', icon: Palette },
  { title: 'Website Maintenance', slug: 'wordpress-maintenance', href: '/services/wordpress-maintenance', icon: Shield },
  { title: 'SEO Optimization', slug: 'wordpress-seo-services', href: '/services/wordpress-seo-services', icon: Search },
  { title: 'Speed Optimization', slug: 'wordpress-speed-optimization', href: '/services/wordpress-speed-optimization', icon: Zap },
  { title: 'Security Services', slug: 'wordpress-maintenance', href: '/services/wordpress-maintenance', icon: Shield },
  { title: 'Migration Services', slug: 'wordpress-migration', href: '/services/wordpress-migration', icon: ArrowRightLeft },
  { title: 'Consultation', slug: 'hire-wordpress-developers', href: '/services/hire-wordpress-developers', icon: MessageCircle },
];

export const NAV_PRODUCTS: NavItem[] = [
  { title: 'QuoteFlow Pro', slug: 'quote-flow-pro', href: '/products/quote-flow-pro', icon: Package },
  { title: 'SmartPricing', slug: 'smart-pricing', href: '/products/smart-pricing', icon: Package },
  { title: 'BundleCraft', slug: 'bundlecraft', href: '/products/bundlecraft', icon: Package },
  { title: 'SalesBoost Pack', slug: 'sales-boost-pack', href: '/products/sales-boost-pack', icon: Package },
  { title: 'StockAlert Pro', slug: 'stock-alert-pro', href: '/products/stock-alert-pro', icon: Package },
  { title: 'ReviewBoost', slug: 'review-boost', href: '/products/review-boost', icon: Package },
];

export const NAV_RESOURCES: { label: string; items: NavItem[] }[] = [
  {
    label: 'Insights',
    items: [
      { title: 'Blog', slug: 'blog', href: '/blog', icon: FileText },
      { title: 'Case Studies', slug: 'case-studies', href: '/case-studies', icon: Briefcase },
    ],
  },
  {
    label: 'Guidebooks',
    items: [
      { title: 'All Guidebooks', slug: 'guidebooks', href: '/resources/guidebooks', icon: BookOpen },
    ],
  },
  {
    label: 'Tools',
    items: [
      { title: 'All Tools', slug: 'tools', href: '/resources/tools', icon: Wrench },
    ],
  },
];
