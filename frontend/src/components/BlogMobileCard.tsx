import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPostCard } from './BlogCard';
import { optimizeImageUrl } from '../utils/imageUrl';

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
        <img
          src={optimizeImageUrl(post.image_url, 720)}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          width={720}
          height={405}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Calendar size={14} aria-hidden="true" />
          {formattedDate}
        </div>
        <h3 className="mt-2 font-bold text-gray-900">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
          Read article <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
