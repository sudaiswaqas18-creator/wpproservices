import { Link } from 'react-router-dom';
import { useApiData } from '../hooks/useApiData';
import BlogShowcaseStrip from './BlogShowcaseStrip';
import BlogMobileCard from './BlogMobileCard';

/** Seed / default articles only — admin test posts stay off the homepage */
export const HOMEPAGE_BLOG_SLUGS = [
  'migrate-wordpress-seo',
  'website-redesign-checklist',
  'woocommerce-customization-scale',
  'core-web-vitals-wordpress',
] as const;

interface Props {
  limit?: number;
  showViewAll?: boolean;
  /** When true (homepage), only curated default slugs are shown */
  featuredOnly?: boolean;
}

export default function Blog({ limit, showViewAll = true, featuredOnly = false }: Props) {
  const { data: posts } = useApiData('blog');
  const list = Array.isArray(posts) ? posts : [];
  const curated = featuredOnly
    ? HOMEPAGE_BLOG_SLUGS.map((slug) => list.find((p) => p.slug === slug)).filter(
        (p): p is (typeof list)[number] => Boolean(p),
      )
    : list;
  const items = limit ? curated.slice(0, limit) : curated;
  if (!items.length) return null;

  return (
    <section className="bg-surface-elevated py-20">
      <div className="section-container">
        <h2 className="section-title">WordPress Notes From the Build Floor</h2>
        <p className="section-subtitle">
          Straight talk on migrations, Core Web Vitals, WooCommerce limits, and keeping sites maintainable after
          launch.
        </p>

        <BlogShowcaseStrip posts={items} />

        <div className="mt-8 grid gap-6 md:hidden">
          {items.map((post) => (
            <BlogMobileCard key={post.id} post={post} />
          ))}
        </div>

        {showViewAll && (
          <div className="mt-10 text-center">
            <Link to="/blog" className="btn-outline">
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
