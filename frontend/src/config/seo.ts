import { SITE } from './site';

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  noindex?: boolean;
  path?: string;
}

const defaultDesc =
  'WPServices builds and maintains WordPress sites, WooCommerce stores, and custom plugins — with staging QA, clear handoffs, and performance in mind.';

export const STATIC_SEO: Record<string, PageSEO> = {
  '/': {
    title: 'WPServices | WordPress Development Agency',
    description:
      'Custom WordPress themes, WooCommerce stores, plugins, migrations, and care plans. A WordPress development agency focused on maintainable delivery.',
    keywords: 'WordPress development agency, WooCommerce development, custom WordPress themes, WordPress maintenance',
    path: '/',
  },
  '/about': {
    title: 'About WPServices | WordPress Studio',
    description:
      'Learn how WPServices approaches WordPress builds — discovery, staging, and long-term maintainability for growing teams.',
    keywords: 'WordPress agency, about WPServices, WordPress developers',
    path: '/about',
  },
  '/services': {
    title: 'WordPress Services | WPServices',
    description:
      'Browse WordPress services: custom builds, WooCommerce, LearnDash, migrations, speed work, SEO, retainers, and plugin development.',
    keywords: 'WordPress services, WooCommerce development, WordPress migration, plugin development',
    path: '/services',
  },
  '/products': {
    title: 'WooCommerce Plugins | WPServices',
    description:
      'WooCommerce plugins for quotes, pricing, bundles, inventory alerts, reviews, subscriptions, and checkout — built for real stores.',
    keywords: 'WooCommerce plugins, WordPress plugins, ecommerce plugins',
    path: '/products',
  },
  '/resources': {
    title: 'WordPress Resources | WPServices',
    description:
      'WordPress guides, tools, case studies, and articles on performance, security, WooCommerce, and migrations.',
    keywords: 'WordPress resources, WordPress guides, WordPress tools',
    path: '/resources',
  },
  '/case-studies': {
    title: 'WordPress Case Studies | WPServices',
    description:
      'Selected WordPress and WooCommerce projects with honest outcome notes — migrations, LMS builds, and store improvements.',
    keywords: 'WordPress case studies, WooCommerce projects',
    path: '/case-studies',
  },
  '/blog': {
    title: 'WordPress Blog | WPServices',
    description:
      'Practical WordPress articles on migrations, Core Web Vitals, WooCommerce limits, SEO foundations, and agency partnerships.',
    keywords: 'WordPress blog, WooCommerce tips, Core Web Vitals, WordPress SEO',
    path: '/blog',
  },
  '/pricing': {
    title: 'WordPress Pricing | WPServices',
    description:
      'WordPress package options for new builds and redesigns, plus custom quotes for stores, plugins, and retainers.',
    keywords: 'WordPress pricing, website development cost, WooCommerce cost',
    path: '/pricing',
  },
  '/contact': {
    title: 'Contact WPServices | WordPress Consultation',
    description:
      'Request a WordPress consultation. Share your brief — we typically reply within one to two business days.',
    keywords: 'contact WordPress agency, WordPress consultation',
    path: '/contact',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | WPServices',
    description:
      'How WPServices collects, uses, and protects personal information when you use our website or request services.',
    path: '/privacy-policy',
  },
  '/terms-of-service': {
    title: 'Terms of Service | WPServices',
    description:
      'Terms for WPServices WordPress development engagements, including delivery, payments, and intellectual property.',
    path: '/terms-of-service',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | WPServices',
    description:
      'How WPServices uses cookies for essential site functions, analytics, and preferences.',
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
  return `${pageTitle} | ${SITE.name}`;
}
