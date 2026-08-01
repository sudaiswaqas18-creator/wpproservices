import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { api, BlogPostDetail, BlogPost } from '../api/client';
import { fallbackData, fetchWithFallback } from '../api/fallback';
import { getBlogEnrichment } from '../data/blogEnrichment';
import { getBlogImage } from '../data/siteContent';
import { optimizeImageUrl } from '../utils/imageUrl';
import CTA from '../components/CTA';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    Promise.all([
      api.getBlogPost(slug).catch(() => {
        const match = fallbackData.blog.find((p) => p.slug === slug);
        if (!match) throw new Error('Not found');
        return {
          ...match,
          author: match.author ?? 'WPServices Team',
          content: match.excerpt,
        } as BlogPostDetail;
      }),
      fetchWithFallback(api.getBlog, fallbackData.blog),
    ])
      .then(([detail, allPosts]) => {
        setPost(detail);
        setRelated(allPosts.filter((p) => p.slug !== slug).slice(0, 3));
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  useBreadcrumbLabel(post?.title);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section-container py-32 text-center">
        <p className="text-gray-500">Article not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-brand-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const enrichment = getBlogEnrichment(post.slug, post.excerpt);
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-brand-50/60 via-white to-white pb-10 pt-8 lg:pb-14 lg:pt-12">
        <div className="section-container max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {enrichment.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar size={14} /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock size={14} /> {enrichment.readTime}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.65rem]">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-md shadow-brand-500/25">
              {getInitials(post.author)}
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <User size={14} className="text-brand-500" />
                {post.author}
              </p>
              <p className="text-xs text-gray-500">WPServices Editorial Team</p>
            </div>
          </div>
        </div>
      </section>

      {(getBlogImage(post.slug, post.image_url)) && (
        <div className="section-container -mt-6 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl shadow-brand-500/10">
            <img
              src={optimizeImageUrl(getBlogImage(post.slug, post.image_url), 1200)}
              alt={post.title}
              width={1200}
              height={514}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </div>
      )}

      <article className="py-12 lg:py-16">
        <div className="section-container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            <div className="min-w-0">
              <p className="article-lead">{enrichment.intro || post.excerpt}</p>

              {enrichment.sections.map((section) => (
                <section key={section.heading} className="article-section">
                  <h2 className="article-heading">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="article-paragraph">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="article-list">
                      {section.bullets.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {!enrichment.sections.length && post.content && (
                <section className="article-section">
                  <p className="article-paragraph">{post.content}</p>
                </section>
              )}

              <div className="article-conclusion">
                <BookOpen size={22} className="text-brand-500" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Bottom line</p>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">{enrichment.conclusion}</p>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-brand-100 bg-gradient-to-b from-brand-50/80 to-white p-6 shadow-card">
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-700">Key Takeaways</h3>
                <ul className="mt-4 space-y-3">
                  {enrichment.keyTakeaways.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-gray-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <p className="text-sm font-semibold text-gray-900">Need expert help?</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Talk to our WordPress team about audits, migrations, and custom development.
                </p>
                <Link to="/contact" className="btn-primary mt-4 w-full text-center text-sm">
                  Get Free Consultation
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-200/80 bg-surface-50 py-14">
          <div className="section-container max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-cardHover"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={optimizeImageUrl(getBlogImage(item.slug, item.image_url), 600)}
                      alt={item.title}
                      width={600}
                      height={338}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 transition group-hover:text-brand-600">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
