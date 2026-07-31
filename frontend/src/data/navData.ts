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
  { title: 'Sales & B2B Pricing', slug: 'sales-b2b', href: '/products?category=sales-b2b', icon: Package },
  { title: 'Catalog & Bundles', slug: 'catalog', href: '/products?category=catalog', icon: Package },
  { title: 'Conversion & Campaigns', slug: 'conversion', href: '/products?category=conversion', icon: Package },
  { title: 'Ops & Inventory', slug: 'ops-inventory', href: '/products?category=ops-inventory', icon: Package },
  { title: 'Trust & Checkout', slug: 'trust-checkout', href: '/products?category=trust-checkout', icon: Package },
  { title: 'Subscriptions & Membership', slug: 'subscriptions', href: '/products?category=subscriptions', icon: Package },
];

export const NAV_RESOURCES: { label: string; items: NavItem[] }[] = [
  {
    label: 'Insights',
    items: [
      { title: 'Blog', slug: 'blog', href: '/blog', icon: FileText },
      { title: 'Case Studies', slug: 'case-studies', href: '/case-studies', icon: Briefcase },
      { title: 'Industries', slug: 'industries', href: '/industries', icon: Briefcase },
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
