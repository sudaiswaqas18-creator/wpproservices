import { useApiData } from '../hooks/useApiData';
import BlogShowcaseStrip from '../components/BlogShowcaseStrip';
import BlogMobileCard from '../components/BlogMobileCard';
import CTA from '../components/CTA';

export default function BlogPage() {
  const { data: posts } = useApiData('blog');

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">WordPress Insights & Playbooks</h1>
          <p className="section-subtitle mx-auto mt-4">
            Practical writing on migrations, Core Web Vitals, WooCommerce, security, plugins, and maintenance — written for operators who live in wp-admin.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container">
          <BlogShowcaseStrip posts={posts} />
          <div className="mt-8 grid gap-6 md:hidden">
            {posts.map((post) => (
              <BlogMobileCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
