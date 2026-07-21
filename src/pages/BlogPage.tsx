import { useApiData } from '../hooks/useApiData';
import BlogCard from '../components/BlogCard';
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
        <div className="section-container grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
