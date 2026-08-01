import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { api, CaseStudyDetail } from '../api/client';
import { getCaseStudyMedia } from '../data/siteContent';
import { optimizeImageUrl } from '../utils/imageUrl';
import CTA from '../components/CTA';
import { useBreadcrumbLabel } from '../components/SiteBreadcrumbs';

function softMetric(value?: string) {
  if (!value) return 'Documented';
  if (/[+]?\d+%/.test(value) || value === '99.9%' || value === '-100%') return 'Improved';
  return value;
}

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [study, setStudy] = useState<CaseStudyDetail | null>(null);

  useEffect(() => {
    if (slug) api.getCaseStudy(slug).then(setStudy).catch(() => setStudy(null));
  }, [slug]);

  useBreadcrumbLabel(study?.title);

  if (!study) return <div className="section-container py-32 text-center text-gray-500">Loading...</div>;

  const media = getCaseStudyMedia(study.slug || slug || '');
  const heroImage = media.image_url;

  return (
    <>
      <section className="bg-surface-50 py-12">
        <div className="section-container">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{study.title}</h1>
          <p className="mt-2 text-brand-600 font-medium">Client: {media.client_label}</p>
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
            className="w-full rounded-2xl shadow-card max-h-96 object-cover"
          />
        </div>
      )}

      <section className="py-16">
        <div className="section-container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">The Challenge</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Our Solution</h2>
              <p className="mt-3 text-gray-700 leading-relaxed">{study.solution}</p>
            </div>
            {study.full_content && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Results</h2>
                <p className="mt-3 text-gray-700 leading-relaxed">{study.full_content}</p>
              </div>
            )}
          </div>
          <div className="card h-fit">
            <h3 className="font-bold text-gray-900">Key Metrics</h3>
            {[{ l: study.metric1_label, v: study.metric1_value }, { l: study.metric2_label, v: study.metric2_value }, { l: study.metric3_label, v: study.metric3_value }].map((m) => (
              <div key={m.l} className="mt-4 flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                <span className="text-sm text-gray-600">{m.l}</span>
                <span className="flex items-center gap-1 font-bold text-brand-600"><TrendingUp size={14} />{softMetric(m.v)}</span>
              </div>
            ))}
            <Link to="/contact" className="btn-primary mt-6 w-full">Start Similar Project</Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
