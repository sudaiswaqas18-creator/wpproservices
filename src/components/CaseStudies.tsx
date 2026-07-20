import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';

interface Props { limit?: number; showViewAll?: boolean }

export default function CaseStudies({ limit, showViewAll = true }: Props) {
  const { data: studies } = useApiData('caseStudies');
  const list = Array.isArray(studies) ? studies : [];
  const items = limit ? list.slice(0, limit) : list;
  if (!items.length) return null;

  return (
    <section className="bg-surface-50 py-20">
      <div className="section-container">
        <h2 className="section-title">WordPress Development Case Studies</h2>
        <p className="section-subtitle">Real projects showing custom websites, seamless migrations, and measurable growth.</p>
        <div className="mt-12 space-y-6">
          {items.map((cs) => (
            <article key={cs.id} className="card overflow-hidden p-0">
              <div className="grid lg:grid-cols-3">
                <div className="border-b border-gray-100 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
                  <h3 className="text-xl font-bold text-gray-900">{cs.title}</h3>
                  <p className="mt-2 text-sm font-medium text-brand-600">Client: {cs.client}</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div><h4 className="text-xs font-bold uppercase text-gray-400">The Challenge</h4><p className="mt-2 text-sm text-gray-600">{cs.challenge}</p></div>
                    <div><h4 className="text-xs font-bold uppercase text-gray-400">Our Solution</h4><p className="mt-2 text-sm text-gray-600">{cs.solution}</p></div>
                  </div>
                </div>
                <div className="flex flex-col justify-center bg-brand-50/50 p-8">
                  {[{ l: cs.metric1_label, v: cs.metric1_value }, { l: cs.metric2_label, v: cs.metric2_value }, { l: cs.metric3_label, v: cs.metric3_value }].map((m) => (
                    <div key={m.l} className="flex items-center justify-between border-b border-brand-100 py-4 last:border-0">
                      <span className="text-sm text-gray-600">{m.l}</span>
                      <span className="flex items-center gap-1 font-bold text-brand-600"><TrendingUp size={16} />{m.v}</span>
                    </div>
                  ))}
                  <Link to={`/case-studies/${cs.slug}`} className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                    View Full Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {showViewAll && (
          <div className="mt-10 text-center">
            <Link to="/case-studies" className="btn-outline">View All Case Studies</Link>
          </div>
        )}
      </div>
    </section>
  );
}
