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
  if (!items.length) return null;

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
    <nav aria-label="Breadcrumb" className="border-y border-border/70 bg-background/90 py-3">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <ol className="section-container flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 transition hover:text-accent"
            aria-label="Home"
          >
            <Home size={14} aria-hidden />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.href ?? item.label}-${i}`} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="shrink-0 text-gray-300" aria-hidden />
              {!isLast && item.href ? (
                <Link to={item.href} className="transition hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-ink" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
