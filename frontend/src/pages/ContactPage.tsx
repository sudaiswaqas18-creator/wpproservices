import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  Gauge,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { SITE, OFFICES } from '../config/site';
import {
  clearScopeBuilderData,
  getActiveScopeBuilderData,
  type ScopeBuilderData,
} from '../utils/scopeBuilderStorage';

const EXPECT_STEPS = [
  {
    icon: MessageSquare,
    title: 'Discovery call',
    body: 'Stack, hosting, and success criteria mapped before build.',
  },
  {
    icon: FileCheck2,
    title: 'Written scope',
    body: 'Clear inclusions and exclusions you can share internally.',
  },
  {
    icon: ShieldCheck,
    title: 'Staging review',
    body: 'Changes verified on staging when hosting allows.',
  },
  {
    icon: Sparkles,
    title: 'Launch support',
    body: 'Cutover checklist plus a short post-launch window.',
  },
] as const;

export default function ContactPage() {
  const [scopeData, setScopeData] = useState<ScopeBuilderData | null>(null);

  useEffect(() => {
    // Only show after "Request a custom scope" in this session — not for navbar visits
    setScopeData(getActiveScopeBuilderData());
  }, []);

  const dismissScope = () => {
    clearScopeBuilderData();
    setScopeData(null);
  };

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-14 lg:py-20">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Our WordPress Team</h1>
          <p className="section-subtitle mx-auto mt-4">
            Tell us about your theme, WooCommerce store, migration, or retainer needs. We typically reply within 1–2 business days.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container grid items-start gap-8 lg:grid-cols-2 lg:gap-8">
          {/* LEFT — compact, matches form height */}
          <aside className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Reach the studio</h2>
            <p className="mt-1.5 text-sm text-gray-600">
              Same team that scopes themes, WooCommerce, and LearnDash work.
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-50 px-3 py-2.5 transition hover:border-brand-200"
              >
                <Mail size={15} className="shrink-0 text-brand-600" />
                <span className="min-w-0 truncate text-sm font-semibold text-gray-900">{SITE.email}</span>
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-50 px-3 py-2.5 transition hover:border-brand-200"
              >
                <Phone size={15} className="shrink-0 text-brand-600" />
                <span className="text-sm font-semibold text-gray-900">{SITE.phone}</span>
              </a>
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <Clock3 size={12} /> Typical reply: 1–2 business days
            </p>

            <div className="mt-5 border-t border-border pt-5">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                <MapPin size={13} /> Offices
              </h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {OFFICES.map((o) => (
                  <div key={o.city} className="rounded-lg bg-surface-50 px-3 py-2.5">
                    <p className="text-sm font-semibold text-gray-900">{o.city}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-gray-600">{o.address}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-sm font-bold text-gray-900">What to expect</h3>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {EXPECT_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="rounded-xl border border-border bg-surface-50/90 p-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        <Icon size={13} className="text-brand-600" />
                        <span className="text-sm font-semibold text-gray-900">{step.title}</span>
                      </div>
                      <p className="mt-1.5 text-[11px] leading-snug text-gray-600">{step.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT — optional scope card + form */}
          <div className="flex flex-col gap-4">
            {scopeData && (
              <div className="relative rounded-2xl border border-brand-100 bg-white p-5 shadow-card ring-1 ring-brand-500/5">
                <button
                  type="button"
                  onClick={dismissScope}
                  className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Remove Scope Builder draft"
                  title="Remove draft"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center justify-between gap-3 pr-8">
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
                  <div className="mt-3">
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
                  Read-only — included with your brief. Use × to remove before sending.
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
