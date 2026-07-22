import { SITE } from './site';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
  path?: string;
}

const defaultDesc =
  'WPServices delivers premium WordPress development, WooCommerce solutions, custom plugins, speed optimization, and ongoing maintenance for ambitious businesses worldwide.';

export const STATIC_SEO: Record<string, PageSEO> = {
  '/': {
    title: 'WPServices | Premium WordPress Development Agency',
    description:
      'Premium WordPress development agency building fast, secure, conversion-focused websites. Custom WordPress, WooCommerce, plugins, and maintenance.',
    keywords: 'WordPress development agency, WooCommerce development, custom WordPress, WordPress maintenance',
    path: '/',
  },
  '/about': {
    title: 'About Us | WPServices - WordPress Development Agency',
    description:
      'Meet WPServices — a global WordPress agency with 10+ years of experience delivering scalable websites for businesses in 27+ countries.',
    keywords: 'WordPress agency, about WPServices, WordPress experts',
    path: '/about',
  },
  '/services': {
    title: 'Our Services | WPServices - WordPress Development Agency',
    description:
      'Explore WordPress development services: custom builds, WooCommerce, redesign, migration, speed optimization, retainers, and AI automation.',
    keywords: 'WordPress services, WooCommerce development, WordPress redesign',
    path: '/services',
  },
  '/products': {
    title: 'Products | WPServices - WooCommerce Plugins & Tools',
    description:
      'Premium WooCommerce plugins and WordPress tools built by WPServices to boost conversions, pricing, bundles, and store performance.',
    keywords: 'WooCommerce plugins, WordPress products, ecommerce tools',
    path: '/products',
  },
  '/resources': {
    title: 'Resources | WPServices - WordPress Guides & Tools',
    description:
      'Free WordPress resources, guidebooks, tools, and expert insights from the WPServices team to help you grow your website.',
    keywords: 'WordPress resources, WordPress guides, WordPress tools',
    path: '/resources',
  },
  '/case-studies': {
    title: 'Case Studies | WPServices - WordPress Success Stories',
    description:
      'See how WPServices helps businesses grow with custom WordPress, WooCommerce, and LMS solutions. Real results from real clients.',
    keywords: 'WordPress case studies, client success stories',
    path: '/case-studies',
  },
  '/blog': {
    title: 'Blog | WPServices - WordPress Insights & Tips',
    description:
      'WordPress development insights, SEO tips, WooCommerce strategies, and agency advice from the WPServices team.',
    keywords: 'WordPress blog, WooCommerce tips, WordPress SEO',
    path: '/blog',
  },
  '/pricing': {
    title: 'Pricing | WPServices - WordPress Development Packages',
    description:
      'Transparent WordPress development pricing. Build & launch packages, redesign projects, and custom quotes for growing businesses.',
    keywords: 'WordPress pricing, website development cost',
    path: '/pricing',
  },
  '/contact': {
    title: 'Contact Us | WPServices - WordPress Development Agency',
    description:
      'Get a free WordPress consultation. Tell us about your project and our team will respond within 24 hours.',
    keywords: 'contact WordPress agency, free consultation',
    path: '/contact',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | WPServices',
    description:
      'Learn how WPServices collects, uses, and protects your personal information. GDPR-ready privacy practices for our clients.',
    path: '/privacy-policy',
  },
  '/terms-of-service': {
    title: 'Terms of Service | WPServices',
    description:
      'Terms of Service for WPServices WordPress development services including project delivery, payments, IP ownership, and liability.',
    path: '/terms-of-service',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | WPServices',
    description:
      'Understand how WPServices uses cookies for essential functionality, analytics, and preferences on our website.',
    path: '/cookie-policy',
  },
};

export function getStaticSEO(pathname: string): PageSEO {
  const base = pathname.split('?')[0].replace(/\/$/, '') || '/';
  return (
    STATIC_SEO[base] ?? {
      title: `${SITE.name} | ${SITE.tagline}`,
      description: defaultDesc,
      path: base,
    }
  );
}

export function buildTitle(pageTitle: string) {
  if (pageTitle.includes(SITE.name)) return pageTitle;
  return `${pageTitle} | ${SITE.name} - ${SITE.tagline}`;
}
