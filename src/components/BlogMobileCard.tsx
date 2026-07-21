import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPostCard } from './BlogCard';

interface BlogMobileCardProps {
  post: BlogPostCard;
}

export default function BlogMobileCard({ post }: BlogMobileCardProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card"
    >
      <div className="aspect-video overflow-hidden">
        <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={14} />
          {formattedDate}
        </div>
        <h3 className="mt-2 font-bold text-gray-900">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
