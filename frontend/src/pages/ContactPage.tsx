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
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { SITE, OFFICES } from '../config/site';
import { readScopeBuilderData, type ScopeBuilderData } from '../utils/scopeBuilderStorage';

const EXPECT_STEPS = [
  {
    icon: MessageSquare,
    title: 'Discovery call',
    body: 'We map your WordPress stack, hosting, and what “done” means before anyone opens a ticket.',
  },
  {
    icon: FileCheck2,
    title: 'Written scope',
    body: 'Inclusions, exclusions, and success criteria you can share with stakeholders — no vague retainers.',
  },
  {
    icon: ShieldCheck,
    title: 'Staging review',
    body: 'Meaningful changes land on staging when hosting allows, so live checkout and editors stay safe.',
  },
  {
    icon: Sparkles,
    title: 'Launch support',
    body: 'Cutover checklist and a post-launch window so the handoff is operational, not a drop-and-run.',
  },
] as const;

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
        <div className="section-container grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          {/* LEFT — fills height with contact + process */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <h2 className="text-2xl font-bold text-gray-900">Reach the studio</h2>
              <p className="mt-2 text-sm text-gray-600">
                Prefer email or a quick call — same team that scopes themes, WooCommerce, and LearnDash work.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface-50 p-3.5 transition hover:border-brand-200 hover:bg-brand-50/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Mail size={16} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Email</span>
                    <span className="mt-0.5 block text-sm font-semibold text-gray-900 break-all">{SITE.email}</span>
                  </span>
                </a>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface-50 p-3.5 transition hover:border-brand-200 hover:bg-brand-50/40"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Phone size={16} />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500">Phone</span>
                    <span className="mt-0.5 block text-sm font-semibold text-gray-900">{SITE.phone}</span>
                  </span>
                </a>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/60 px-3 py-1.5 text-xs font-semibold text-brand-700">
                <Clock3 size={13} /> Typical reply: 1–2 business days
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-700">
                <MapPin size={14} /> Offices
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {OFFICES.map((o) => (
                  <div key={o.city} className="rounded-xl border border-border bg-surface-50 p-3.5">
                    <p className="font-semibold text-gray-900">{o.city}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600">{o.address}</p>
                    <a
                      href={`tel:${o.phone.replace(/\s/g, '')}`}
                      className="mt-2 block text-xs font-semibold text-brand-600 hover:underline"
                    >
                      {o.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-2xl border border-border bg-white p-6 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-gray-900">What to expect</h3>
                <span className="rounded-full bg-surface-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-light">
                  After you send
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                A clear path from first reply to handoff — the same habits we use on scoped WordPress builds.
              </p>
              <ol className="mt-5 flex flex-1 flex-col gap-3">
                {EXPECT_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <li
                      key={step.title}
                      className="flex flex-1 gap-3 rounded-xl border border-border bg-surface-50/80 p-3.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                          <Icon size={14} className="text-brand-600" />
                          {step.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-gray-600">{step.body}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* RIGHT — scope draft + form */}
          <div className="flex flex-col gap-5">
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

            <div className="flex-1">
              <ContactForm
                scopeData={scopeData}
                onScopeSubmitted={() => setScopeData(null)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
