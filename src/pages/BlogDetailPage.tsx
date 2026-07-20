import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { api, BlogPostDetail } from '../api/client';
import CTA from '../components/CTA';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);

  useEffect(() => {
    if (slug) api.getBlogPost(slug).then(setPost).catch(() => setPost(null));
  }, [slug]);

  if (!post) return <div className="section-container py-32 text-center text-gray-500">Loading...</div>;

  return (
    <>
      <article className="py-12">
        <div className="section-container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"><ArrowLeft size={14} /> Back to Blog</Link>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500"><Calendar size={14} />{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {post.author}</div>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900">{post.title}</h1>
          {post.image_url && <img src={post.image_url} alt={post.title} className="mt-8 w-full rounded-2xl" />}
          <div className="prose prose-gray mt-8 max-w-none">
            <p className="text-lg text-gray-600">{post.excerpt}</p>
            <p className="mt-6 leading-relaxed text-gray-700">{post.content}</p>
          </div>
        </div>
      </article>
      <CTA />
    </>
  );
}
