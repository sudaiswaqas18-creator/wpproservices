import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import CTA from '../components/CTA';

export default function BlogPage() {
  const { data: posts } = useApiData('blog');

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">WordPress Development Insights</h1>
          <p className="section-subtitle mx-auto mt-4">Expert articles on migration, optimization, and scaling your WordPress business.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="card group overflow-hidden p-0">
              <div className="aspect-video overflow-hidden">
                <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500"><Calendar size={14} />{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <h2 className="mt-3 font-bold text-gray-900 group-hover:text-brand-600">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">Read More <ArrowRight size={14} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
