import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { api, CaseStudyDetail } from '../api/client';
import { fallbackData } from '../api/fallback';
import { getCaseStudyMedia, normalizeCaseStudySlug } from '../data/siteContent';
import { getCaseStudyEnrichment } from '../data/caseStudyEnrichment';
import { optimizeImageUrl } from '../utils/imageUrl';
import CTA from '../components/CTA';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';
import SEO from '../components/seo/SEO';
import { buildTitle } from '../config/seo';

function softMetric(value?: string) {
  if (!value) return 'Documented';
  if (/[+]?\d+%/.test(value) || value === '99.9%' || value === '-100%') return 'Improved';
  return value;
}

function fromFallback(slug: string): CaseStudyDetail | null {
  const row = fallbackData.caseStudies.find((c) => c.slug === slug);
  if (!row) return null;
  const media = getCaseStudyMedia(slug);
  return {
    ...row,
    full_content: `${row.solution} ${media.result_summary}. Stack notes: ${media.tech_stack}. Delivery used staging QA and a written handoff so editors could keep the result maintainable.`,
    image_url: media.image_url,
  };
}

export default function CaseStudyDetailPage() {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const slug = normalizeCaseStudySlug(rawSlug);
  const [study, setStudy] = useState<CaseStudyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setStudy(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    api
      .getCaseStudy(slug)
      .then((data) => {
        if (!cancelled) setStudy(data);
      })
      .catch(() => {
        if (!cancelled) setStudy(fromFallback(slug));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useBreadcrumbLabel(study?.title);

  if (loading) {
    return <div className="section-container py-32 text-center text-gray-500">Loading...</div>;
  }

  if (!study) {
    return (
      <div className="section-container py-32 text-center">
        <h1 className="text-2xl font-bold text-ink">Case study not found</h1>
        <p className="mt-2 text-ink-muted">This project page may have moved or is unavailable offline.</p>
        <Link to="/case-studies" className="btn-primary mt-6 inline-flex">
          All case studies
        </Link>
      </div>
    );
  }

  const media = getCaseStudyMedia(study.slug || slug);
  const enrich = getCaseStudyEnrichment(study.slug || slug);
  const heroImage = study.image_url?.startsWith('/') ? study.image_url : media.image_url;

  return (
    <>
      <SEO
        title={buildTitle(study.title)}
        description={(enrich?.seoBlurb || study.challenge || study.solution || study.title).slice(0, 160)}
        path={`/case-studies/${study.slug || slug}`}
      />
      <section className="bg-surface-50 py-12">
        <div className="section-container">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{study.title}</h1>
          <p className="mt-2 font-medium text-brand-600">Client: {media.client_label || study.client}</p>
        </div>
      </section>

      {heroImage && (
        <div className="section-container -mt-4">
          <img
            src={optimizeImageUrl(heroImage, 1200)}
            alt={media.image_alt}
            width={1200}
            height={400}
            loading="lazy"
            decoding="async"
            className="max-h-96 w-full rounded-2xl object-cover shadow-card"
          />
        </div>
      )}

      <section className="py-16">
        <div className="section-container grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">The Challenge</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Our Solution</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{study.solution}</p>
            </div>
            {study.full_content && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Delivery notes</h2>
                <p className="mt-3 leading-relaxed text-gray-700">{study.full_content}</p>
              </div>
            )}
            {enrich && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Engagement context</h2>
                <p className="mt-3 leading-relaxed text-gray-700">{enrich.context}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
                  {enrich.lessons.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Stack &amp; outcome</h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {media.tech_stack}. {media.result_summary}. Work shipped with staging QA and editor-facing handoff
                notes so the result stays maintainable after launch.
              </p>
            </div>
          </div>
          <div className="card h-fit">
            <h3 className="font-bold text-gray-900">Key Metrics</h3>
            {[
              { l: study.metric1_label, v: study.metric1_value },
              { l: study.metric2_label, v: study.metric2_value },
              { l: study.metric3_label, v: study.metric3_value },
            ].map((m) => (
              <div
                key={m.l}
                className="mt-4 flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
              >
                <span className="text-sm text-gray-600">{m.l}</span>
                <span className="flex items-center gap-1 font-bold text-brand-600">
                  <TrendingUp size={14} />
                  {softMetric(m.v)}
                </span>
              </div>
            ))}
            <Link to="/contact" className="btn-primary mt-6 w-full">
              Start Similar Project
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
