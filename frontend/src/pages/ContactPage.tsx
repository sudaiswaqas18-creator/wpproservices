import { useEffect, useState } from 'react';
import { CheckCircle2, Gauge, Layers } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { SITE, OFFICES } from '../config/site';
import { readScopeBuilderData, type ScopeBuilderData } from '../utils/scopeBuilderStorage';

export default function ContactPage() {
  const [scopeData, setScopeData] = useState<ScopeBuilderData | null>(null);

  useEffect(() => {
    setScopeData(readScopeBuilderData());
  }, []);

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Our WordPress Team</h1>
          <p className="section-subtitle mx-auto mt-4">
            Tell us about your theme, WooCommerce store, migration, or retainer needs. We typically reply within 1–2 business days.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reach the studio</h2>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li>
                <strong className="text-gray-900">Email:</strong>{' '}
                <a href={`mailto:${SITE.email}`} className="hover:text-brand-600">{SITE.email}</a>
              </li>
              <li>
                <strong className="text-gray-900">Phone:</strong>{' '}
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-brand-600">{SITE.phone}</a>
              </li>
            </ul>

            <div className="mt-8 space-y-5">
              <h3 className="font-bold text-gray-900">Offices</h3>
              {OFFICES.map((o) => (
                <div key={o.city}>
                  <p className="font-semibold text-gray-900">{o.city}</p>
                  <p className="mt-1 text-sm text-gray-600">{o.address}</p>
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="mt-0.5 block text-sm text-brand-600 hover:underline">
                    {o.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-brand-50 p-6">
              <h3 className="font-bold text-gray-900">What to expect</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>✓ Discovery call focused on your WordPress stack</li>
                <li>✓ Written scope before build work begins</li>
                <li>✓ Staging review when hosting allows</li>
                <li>✓ Post-launch support window on every project</li>
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            {scopeData && (
              <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card ring-1 ring-brand-500/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Your Scope Builder draft</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                    <Gauge size={12} /> {scopeData.readinessScore}/100
                  </span>
                </div>
                <div className="mt-3 flex items-start gap-2 text-sm text-gray-700">
                  <Layers size={16} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Platform</p>
                    <p className="font-semibold text-gray-900">{scopeData.platform}</p>
                  </div>
                </div>
                {scopeData.workstreams.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Workstreams</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {scopeData.workstreams.map((w) => (
                        <span
                          key={w}
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-50 px-2.5 py-1 text-[11px] font-medium text-ink"
                        >
                          <CheckCircle2 size={11} className="text-brand-600" />
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="mt-3 text-[11px] text-gray-500">
                  This draft is read-only and will be sent with your contact brief.
                </p>
              </div>
            )}

            <ContactForm
              scopeData={scopeData}
              onScopeSubmitted={() => setScopeData(null)}
            />
          </div>
        </div>
      </section>
    </>
  );
}
