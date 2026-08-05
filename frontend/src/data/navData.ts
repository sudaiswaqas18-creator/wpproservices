import {
  Code, ShoppingCart, Puzzle, Palette, Shield, Search, Zap,
  ArrowRightLeft, MessageCircle, BookOpen, Wrench, FileText, Briefcase,
  Image, Building2, Route, HelpCircle, Users, Quote,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  title: string;
  slug: string;
  href: string;
  icon: LucideIcon;
  desc?: string;
}

export const NAV_SERVICES: NavItem[] = [
  { title: 'WordPress Development', slug: 'wordpress-website-development', href: '/services/wordpress-website-development', icon: Code },
  { title: 'WooCommerce Development', slug: 'woocommerce-development', href: '/services/woocommerce-development', icon: ShoppingCart },
  { title: 'Custom Plugin Development', slug: 'plugin-development', href: '/services/plugin-development', icon: Puzzle },
  { title: 'Theme Development', slug: 'wordpress-customization', href: '/services/wordpress-customization', icon: Palette },
  { title: 'Website Maintenance', slug: 'wordpress-maintenance', href: '/services/wordpress-maintenance', icon: Shield },
  { title: 'SEO Optimization', slug: 'wordpress-seo-services', href: '/services/wordpress-seo-services', icon: Search },
  { title: 'Speed Optimization', slug: 'wordpress-speed-optimization', href: '/services/wordpress-speed-optimization', icon: Zap },
  { title: 'Security Services', slug: 'wordpress-security', href: '/services/wordpress-maintenance', icon: Shield },
  { title: 'Migration Services', slug: 'wordpress-migration', href: '/services/wordpress-migration', icon: ArrowRightLeft },
  { title: 'Consultation', slug: 'hire-wordpress-developers', href: '/services/hire-wordpress-developers', icon: MessageCircle },
];

/** Same set as Resources hub page */
export const NAV_RESOURCE_LINKS: NavItem[] = [
  { title: 'Blog', slug: 'blog', href: '/blog', icon: FileText, desc: 'Migrations, CWV, WooCommerce & retainers' },
  { title: 'Case Studies', slug: 'case-studies', href: '/case-studies', icon: Briefcase, desc: 'Project stories with honest outcomes' },
  { title: 'Portfolio', slug: 'portfolio', href: '/portfolio', icon: Image, desc: 'WordPress & WooCommerce samples' },
  { title: 'Industries', slug: 'industries', href: '/industries', icon: Building2, desc: 'WordPress by sector' },
  { title: 'Customers', slug: 'customers', href: '/customers', icon: Users, desc: 'Who we build WordPress for' },
  { title: 'Quotes', slug: 'quotes', href: '/quotes', icon: Quote, desc: 'Build-floor principles' },
  { title: 'Our Process', slug: 'process', href: '/process', icon: Route, desc: 'Scope, staging, launch & handoff' },
  { title: 'FAQs', slug: 'faq', href: '/faq', icon: HelpCircle, desc: 'Timelines, migrations & care plans' },
  { title: 'Guidebooks', slug: 'guidebooks', href: '/resources/guidebooks', icon: BookOpen, desc: 'Launch, LMS & store checklists' },
  { title: 'Tools', slug: 'tools', href: '/resources/tools', icon: Wrench, desc: 'Speed, security & conflict helpers' },
];

export const NAV_RESOURCES: { label: string; items: NavItem[] }[] = [
  {
    label: 'Explore',
    items: NAV_RESOURCE_LINKS.slice(0, 8),
  },
  {
    label: 'Downloads',
    items: NAV_RESOURCE_LINKS.slice(8),
  },
];
