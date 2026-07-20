import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';

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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <article key={post.id} className="card group overflow-hidden p-0">
              <div className="aspect-video overflow-hidden">
                <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />
                  {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="mt-3 font-bold text-gray-900 group-hover:text-brand-600">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </article>
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
