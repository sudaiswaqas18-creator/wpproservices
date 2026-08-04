import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Layers,
  Gauge,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import ContactLink from './ContactLink';

/**
 * Unique WPServices Scope Builder — cream/ink brand (not dark SaaS clone).
 * Scores are honest readiness signals, not guaranteed PageSpeed numbers.
 */

const SITE_TYPES = [
  {
    id: 'marketing',
    label: 'Marketing / brochure site',
    focus: 'Editor-safe themes, forms, and SEO-ready structure',
  },
  {
    id: 'woo',
    label: 'WooCommerce store',
    focus: 'Catalog, checkout clarity, shipping rules, staging QA',
  },
  {
    id: 'lms',
    label: 'LearnDash / membership',
    focus: 'Access rules, cohort ops, seat or payment paths',
  },
  {
    id: 'migrate',
    label: 'Migration or redesign',
    focus: 'Redirect maps, content inventory, cutover checklist',
  },
] as const;

const WORKSTREAMS = [
  {
    id: 'scope',
    label: 'Written scope & success criteria',
    desc: 'Inclusions, exclusions, and definition of done before build starts.',
    weeks: '3–5 days',
    weight: 18,
  },
  {
    id: 'theme',
    label: 'Custom theme / Gutenberg patterns',
    desc: 'Layouts editors can update without breaking the design system.',
    weeks: '2–4 weeks',
    weight: 22,
  },
  {
    id: 'commerce',
    label: 'WooCommerce or LearnDash depth',
    desc: 'Checkout, catalog, access, or membership logic matched to ops.',
    weeks: '2–5 weeks',
    weight: 24,
  },
  {
    id: 'performance',
    label: 'Template performance review',
    desc: 'Hero media, queries, and third-party scripts on real money pages.',
    weeks: '3–7 days',
    weight: 16,
  },
  {
    id: 'care',
    label: 'Launch + care handoff',
    desc: 'Staging cutover, docs, and update habits your team can keep.',
    weeks: 'Ongoing',
    weight: 14,
  },
] as const;

export default function WPEstimatorSection() {
  const [siteType, setSiteType] = useState<string>('woo');
  const [selected, setSelected] = useState<string[]>(['scope', 'commerce', 'performance']);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const readiness = useMemo(() => {
    const base = 42;
    const bonus = selected.reduce((sum, id) => {
      const row = WORKSTREAMS.find((w) => w.id === id);
      return sum + (row?.weight ?? 0);
    }, 0);
    return Math.min(96, base + Math.round(bonus * 0.55));
  }, [selected]);

  const site = SITE_TYPES.find((s) => s.id === siteType) ?? SITE_TYPES[1];
  const weeksHint =
    selected.length === 0
      ? 'Add at least one workstream'
      : selected.includes('theme') || selected.includes('commerce')
        ? 'Typically 3–8 weeks after discovery'
        : 'Typically 1–3 weeks after discovery';

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,26,26,0.06) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="section-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
            <Sparkles size={12} /> Scope Builder
          </p>
          <h2 className="section-title mt-4">Build a WordPress Scope You Can Defend</h2>
          <p className="section-subtitle mx-auto mt-3">
            Competitors list plugins. WPServices helps you assemble a maintainable delivery plan — platform,
            workstreams, and a readiness score tied to staging and handoff habits, not invented PageSpeed promises.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-5 lg:col-span-7">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                <Layers size={14} /> Step 1 — Platform shape
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {SITE_TYPES.map((type) => {
                  const active = siteType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSiteType(type.id)}
                      className={`rounded-xl border p-3.5 text-left transition ${
                        active
                          ? 'border-brand-500 bg-brand-50 shadow-sm'
                          : 'border-border bg-surface-50 hover:border-brand-200'
                      }`}
                    >
                      <span className="block text-sm font-bold text-ink">{type.label}</span>
                      <span className="mt-1 block text-xs leading-snug text-ink-muted">{type.focus}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                <ClipboardList size={14} /> Step 2 — Workstreams to include
              </h3>
              <div className="mt-4 space-y-2.5">
                {WORKSTREAMS.map((item) => {
                  const on = selected.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${
                        on ? 'border-brand-500 bg-brand-50/80' : 'border-border hover:border-brand-200'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          on ? 'border-brand-600 bg-brand-600 text-white' : 'border-border bg-white'
                        }`}
                      >
                        {on ? <CheckCircle2 size={14} /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-bold text-ink">{item.label}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-light">
                            {item.weeks}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-muted">{item.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-border bg-white p-6 shadow-cardHover">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-light">Scope readiness</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  <ShieldCheck size={14} /> Staging-minded
                </span>
              </div>

              <div className="my-8 text-center">
                <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[6px] border-brand-100 bg-surface-50">
                  <div
                    className="absolute inset-0 rounded-full border-[6px] border-brand-600"
                    style={{
                      clipPath: `inset(${100 - readiness}% 0 0 0)`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative text-center">
                    <p className="text-4xl font-extrabold text-ink">{readiness}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink-light">/ 100 plan</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  Higher when scope, build depth, performance review, and handoff are selected together.
                </p>
              </div>

              <ul className="space-y-3 rounded-xl bg-surface-50 p-4 text-sm text-ink-muted">
                <li className="flex justify-between gap-3">
                  <span className="flex items-center gap-1.5">
                    <Layers size={14} className="text-brand-600" /> Platform
                  </span>
                  <span className="max-w-[55%] text-right font-semibold text-ink">{site.label}</span>
                </li>
                <li className="flex justify-between gap-3 border-t border-border pt-3">
                  <span className="flex items-center gap-1.5">
                    <Gauge size={14} className="text-brand-600" /> Workstreams
                  </span>
                  <span className="font-semibold text-ink">{selected.length}</span>
                </li>
                <li className="flex justify-between gap-3 border-t border-border pt-3">
                  <span className="flex items-center gap-1.5">
                    <ClipboardList size={14} className="text-brand-600" /> Timing hint
                  </span>
                  <span className="max-w-[55%] text-right font-semibold text-ink">{weeksHint}</span>
                </li>
              </ul>

              <ContactLink className="btn-primary mt-6 flex w-full items-center justify-center gap-2">
                Request a custom scope <ArrowRight size={16} />
              </ContactLink>
              <p className="mt-3 text-center text-[11px] text-ink-light">
                Free discovery call — we map hosting, theme debt, and success criteria before quoting.
              </p>
              <Link to="/quotes" className="mt-3 block text-center text-xs font-semibold text-brand-600 hover:underline">
                Read our build-floor principles →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
