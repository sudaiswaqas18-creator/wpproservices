import { Link } from 'react-router-dom';
import { useApiData } from '../hooks/useApiData';
import BlogCard from './BlogCard';

interface Props { limit?: number; showViewAll?: boolean }

export default function Blog({ limit, showViewAll = true }: Props) {
  const { data: posts } = useApiData('blog');
  const list = Array.isArray(posts) ? posts : [];
  const items = limit ? list.slice(0, limit) : list;
  if (!items.length) return null;

  return (
    <section className="py-20">
      <div className="section-container">
        <h2 className="section-title">WordPress Development Insights</h2>
        <p className="section-subtitle">Expert articles on migration, optimization, and scaling your WordPress business.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        {showViewAll && (
          <div className="mt-10 text-center">
            <Link to="/blog" className="btn-outline">View All Articles</Link>
          </div>
        )}
      </div>
    </section>
  );
}
