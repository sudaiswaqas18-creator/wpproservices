import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../config/site';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `${SITE.url}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-white/80 py-3">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <ol className="section-container flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 transition hover:text-brand-600" aria-label="Home">
            <Home size={14} />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-gray-300" aria-hidden />
            {item.href && i < items.length - 1 ? (
              <Link to={item.href} className="transition hover:text-brand-600">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-700" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
