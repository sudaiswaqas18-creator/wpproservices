import BlogExpandCard from './BlogExpandCard';
import type { BlogPostCard } from './BlogCard';

interface BlogShowcaseStripProps {
  posts: BlogPostCard[];
}

export default function BlogShowcaseStrip({ posts }: BlogShowcaseStripProps) {
  if (!posts.length) return null;

  return (
    <div className="blog-strip mt-12 hidden h-[min(520px,68vh)] gap-3 md:flex lg:gap-4">
      {posts.map((post) => (
        <BlogExpandCard key={post.id} post={post} />
      ))}
    </div>
  );
}
