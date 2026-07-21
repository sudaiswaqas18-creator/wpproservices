import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

export interface BlogPostCard {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  published_at: string;
}

interface BlogCardProps {
  post: BlogPostCard;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="blog-showcase-card group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image_url}
          alt={post.title}
          className="blog-showcase-card__image h-full w-full object-cover"
          loading="lazy"
        />
        <div className="blog-showcase-card__overlay absolute inset-0 bg-gradient-to-t from-brand-900/85 via-brand-900/35 to-brand-500/10" />
        <div className="blog-showcase-card__shine pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center px-5 pb-6 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-lg shadow-black/10">
            Read Article
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      <div className="blog-showcase-card__body p-6 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
        <div className="flex items-center gap-2 text-xs text-gray-500 transition-colors duration-300 group-hover:text-brand-600">
          <Calendar size={14} />
          {formattedDate}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-gray-900 transition-colors duration-300 group-hover:text-brand-600">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Read More
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}
