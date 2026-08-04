import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs';

type BreadcrumbContextValue = {
  setLeafLabel: (label: string | null) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  setLeafLabel: () => {},
});

/** Known path segment → display label */
const SEGMENT_LABELS: Record<string, string> = {
  about: 'About Us',
  services: 'Services',
  customers: 'Customers',
  quotes: 'Quotes',
  industries: 'Industries',
  faq: 'FAQs',
  portfolio: 'Portfolio',
  process: 'Our Process',
  resources: 'Resources',
  tools: 'Tools',
  guidebooks: 'Guidebooks',
  'case-studies': 'Case Studies',
  blog: 'Blog',
  pricing: 'Pricing',
  contact: 'Contact Us',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'cookie-policy': 'Cookie Policy',
};

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => {
      if (part.toLowerCase() === 'wordpress') return 'WordPress';
      if (part.toLowerCase() === 'woocommerce') return 'WooCommerce';
      if (part.toLowerCase() === 'learndash') return 'LearnDash';
      if (part.toLowerCase() === 'seo') return 'SEO';
      if (part.toLowerCase() === 'api') return 'API';
      if (part.toLowerCase() === 'lms') return 'LMS';
      if (part.toLowerCase() === 'faq' || part.toLowerCase() === 'faqs') return part.toUpperCase();
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function buildItems(pathname: string, leafLabel: string | null): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return [];

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    const known = SEGMENT_LABELS[segment];

    let label: string;
    if (isLast && leafLabel) {
      label = leafLabel;
    } else if (known) {
      label = known;
    } else {
      label = humanizeSlug(segment);
    }

    return isLast ? { label } : { label, href };
  });
}

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [leafLabel, setLeafLabelState] = useState<string | null>(null);

  const setLeafLabel = useCallback((label: string | null) => {
    setLeafLabelState(label);
  }, []);

  // Clear override when the route changes so stale titles never leak
  useEffect(() => {
    setLeafLabelState(null);
  }, [pathname]);

  const value = useMemo(() => ({ setLeafLabel }), [setLeafLabel]);

  const items = useMemo(
    () => buildItems(pathname, leafLabel),
    [pathname, leafLabel],
  );

  const show = pathname !== '/';

  return (
    <BreadcrumbContext.Provider value={value}>
      {show && items.length > 0 && <Breadcrumbs items={items} />}
      {children}
    </BreadcrumbContext.Provider>
  );
}

/** Set the current page title in the breadcrumb (detail pages). */
export function useBreadcrumbLabel(label: string | null | undefined) {
  const { setLeafLabel } = useContext(BreadcrumbContext);

  useEffect(() => {
    if (label) setLeafLabel(label);
    return () => setLeafLabel(null);
  }, [label, setLeafLabel]);
}
