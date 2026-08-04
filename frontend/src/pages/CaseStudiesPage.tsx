import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import { getCaseStudyMedia, normalizeCaseStudySlug } from '../data/siteContent';
import { optimizeImageUrl } from '../utils/imageUrl';
import CTA from '../components/CTA';

function softMetric(value?: string) {
  if (!value) return 'Documented';
  if (/[+]?\d+%/.test(value) || value === '99.9%' || value === '-100%') return 'Improved';
  return value;
}

export default function CaseStudiesPage() {
  const { data: studies } = useApiData('caseStudies');

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">WordPress Case Studies</h1>
          <p className="section-subtitle mx-auto mt-4">
            Selected anonymized WordPress and WooCommerce delivery patterns — problem, approach, and handoff — until approved client references are published.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container space-y-6">
          {studies.map((cs) => {
            const storySlug = normalizeCaseStudySlug(cs.slug) || cs.slug;
            const media = getCaseStudyMedia(storySlug);
            return (
              <article key={cs.id} className="card overflow-hidden p-0">
                <div className="grid lg:grid-cols-5">
                  <div className="relative h-52 min-h-[220px] overflow-hidden bg-gray-100 lg:col-span-2 lg:h-auto">
                    <img
                      src={optimizeImageUrl(media.image_url, 800)}
                      alt={media.image_alt}
                      width={800}
                      height={440}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="border-b border-gray-100 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
                    <h2 className="text-xl font-bold text-gray-900">{cs.title}</h2>
                    <p className="mt-2 text-sm font-medium text-brand-600">Client: {media.client_label}</p>
                    <p className="mt-4 text-sm text-gray-600">{cs.challenge}</p>
                    <Link to={`/case-studies/${storySlug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                      View Full Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center bg-brand-50/50 p-8">
                    {[{ l: cs.metric1_label, v: cs.metric1_value }, { l: cs.metric2_label, v: cs.metric2_value }, { l: cs.metric3_label, v: cs.metric3_value }].map((m) => (
                      <div key={m.l} className="flex items-center justify-between border-b border-brand-100 py-4 last:border-0">
                        <span className="text-sm text-gray-600">{m.l}</span>
                        <span className="flex items-center gap-1 font-bold text-brand-600"><TrendingUp size={14} />{softMetric(m.v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
