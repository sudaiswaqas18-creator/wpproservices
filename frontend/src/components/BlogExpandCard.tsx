import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogPostCard } from './BlogCard';
import { getBlogImage } from '../data/siteContent';
import { optimizeImageUrl } from '../utils/imageUrl';

interface BlogExpandCardProps {
  post: BlogPostCard;
}

export default function BlogExpandCard({ post }: BlogExpandCardProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const imageSrc = getBlogImage(post.slug, post.image_url);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="blog-strip__card group/card relative block h-full min-w-0 overflow-hidden rounded-3xl"
      aria-label={`Read article: ${post.title}`}
    >
      <img
        src={optimizeImageUrl(imageSrc, 800)}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
        loading="lazy"
        decoding="async"
        width={800}
        height={500}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/35 to-gray-900/10 transition-opacity duration-500 group-hover/card:from-gray-900/95" />

      <div className="absolute inset-x-0 top-0 p-5 transition-opacity duration-500 group-hover/card:opacity-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Article</p>
        <h3 className="mt-2 line-clamp-3 text-sm font-bold leading-snug text-white">{post.title}</h3>
      </div>

      <div className="blog-strip__details absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-500 ease-out group-hover/card:translate-y-0 group-hover/card:opacity-100">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-200">{formattedDate}</p>
        <h3 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/85">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Read Article
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/card:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
