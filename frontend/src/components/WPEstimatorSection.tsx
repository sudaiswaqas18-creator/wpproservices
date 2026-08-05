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
  Timer,
} from 'lucide-react';
import ContactLink from './ContactLink';
import { SCOPE_BUILDER_STORAGE_KEY } from '../utils/scopeBuilderStorage';

/**
 * Unique WPServices Scope Builder — cream/ink brand (not dark SaaS clone).
 * Scores are honest readiness signals, not guaranteed PageSpeed numbers.
 */

const SITE_TYPES = [
  {
    id: 'marketing',
    label: 'Marketing / brochure site',
    focus: 'Editor-safe themes, forms, SEO structure',
    note: 'Editor patterns and forms your marketing team can update without weekly rebuild tickets.',
  },
  {
    id: 'woo',
    label: 'WooCommerce store',
    focus: 'Catalog, checkout, shipping, staging QA',
    note: 'Scoped around real catalog rules, shipping thresholds, and checkout honesty — not demo SKUs.',
  },
  {
    id: 'lms',
    label: 'LearnDash / membership',
    focus: 'Access rules, cohorts, seat paths',
    note: 'Access math first — who gets which course, when drip fires, and how seats assign cleanly.',
  },
  {
    id: 'migrate',
    label: 'Migration or redesign',
    focus: 'Redirects, inventory, cutover checklist',
    note: 'URL maps, plugin keep-lists, and a rollback path before DNS cutover — not hope-based launches.',
  },
] as const;

const WORKSTREAMS = [
  {
    id: 'scope',
    label: 'Written scope & success criteria',
    desc: 'Inclusions, exclusions, and definition of done.',
    weeks: '3–5 days',
    weight: 18,
  },
  {
    id: 'theme',
    label: 'Custom theme / Gutenberg patterns',
    desc: 'Layouts editors can update safely.',
    weeks: '2–4 weeks',
    weight: 22,
  },
  {
    id: 'commerce',
    label: 'WooCommerce or LearnDash depth',
    desc: 'Checkout, catalog, or access logic.',
    weeks: '2–5 weeks',
    weight: 24,
  },
  {
    id: 'performance',
    label: 'Template performance review',
    desc: 'Hero media, queries, third-party scripts.',
    weeks: '3–7 days',
    weight: 16,
  },
  {
    id: 'care',
    label: 'Launch + care handoff',
    desc: 'Cutover docs and update habits.',
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
  const activeLabels = WORKSTREAMS.filter((w) => selected.includes(w.id)).map((w) => w.label);
  const weeksHint =
    selected.length === 0
      ? 'Add a workstream'
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
            Assemble a maintainable delivery plan — platform, workstreams, and a readiness score tied to staging
            habits, not invented PageSpeed promises.
          </p>
        </div>

        {/* Equal columns, equal visual weight */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                <Layers size={14} /> Step 1 — Platform shape
              </h3>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {SITE_TYPES.map((type) => {
                  const active = siteType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSiteType(type.id)}
                      className={`rounded-xl border p-3 text-left transition ${
                        active
                          ? 'border-brand-500 bg-brand-50 shadow-sm'
                          : 'border-border bg-surface-50 hover:border-brand-200'
                      }`}
                    >
                      <span className="block text-sm font-bold text-ink">{type.label}</span>
                      <span className="mt-1 block text-[11px] leading-snug text-ink-muted">{type.focus}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-2xl border border-border bg-white p-5 shadow-card">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
                <ClipboardList size={14} /> Step 2 — Workstreams
              </h3>
              <div className="mt-3 flex flex-1 flex-col justify-between gap-2">
                {WORKSTREAMS.map((item) => {
                  const on = selected.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                        on ? 'border-brand-500 bg-brand-50/80' : 'border-border hover:border-brand-200'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          on ? 'border-brand-600 bg-brand-600 text-white' : 'border-border bg-white'
                        }`}
                      >
                        {on ? <CheckCircle2 size={14} /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-ink">{item.label}</span>
                          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-ink-light">
                            {item.weeks}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[11px] text-ink-muted">{item.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — medium summary, mirrors left height */}
          <aside className="flex">
            <div className="flex w-full flex-col rounded-2xl border border-border bg-white p-5 shadow-cardHover sm:p-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-light">Scope readiness</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  <ShieldCheck size={14} /> Staging-minded
                </span>
              </div>

              <div className="my-5 flex items-center gap-5">
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[5px] border-brand-100 bg-surface-50">
                  <div
                    className="absolute inset-0 rounded-full border-[5px] border-brand-600"
                    style={{ clipPath: `inset(${100 - readiness}% 0 0 0)` }}
                    aria-hidden="true"
                  />
                  <div className="relative text-center">
                    <p className="text-3xl font-extrabold text-ink">{readiness}</p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-ink-light">/ 100</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Score rises when scope, build depth, performance, and handoff are selected together — a planning
                  signal, not a price or PageSpeed guarantee.
                </p>
              </div>

              <ul className="space-y-2.5 rounded-xl bg-surface-50 p-4 text-sm text-ink-muted">
                <li className="flex justify-between gap-3">
                  <span className="flex items-center gap-1.5">
                    <Layers size={14} className="text-brand-600" /> Platform
                  </span>
                  <span className="max-w-[58%] text-right font-semibold text-ink">{site.label}</span>
                </li>
                <li className="flex justify-between gap-3 border-t border-border pt-2.5">
                  <span className="flex items-center gap-1.5">
                    <Gauge size={14} className="text-brand-600" /> Workstreams
                  </span>
                  <span className="font-semibold text-ink">{selected.length} selected</span>
                </li>
                <li className="flex justify-between gap-3 border-t border-border pt-2.5">
                  <span className="flex items-center gap-1.5">
                    <Timer size={14} className="text-brand-600" /> Timing
                  </span>
                  <span className="max-w-[58%] text-right font-semibold text-ink">{weeksHint}</span>
                </li>
              </ul>

              <div className="mt-4 flex-1 space-y-3">
                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-700">For this platform</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{site.note}</p>
                </div>

                <div className="rounded-xl border border-border bg-surface-50 p-3.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-light">Draft includes</p>
                  {activeLabels.length === 0 ? (
                    <p className="mt-1.5 text-xs text-ink-muted">Select workstreams on the left.</p>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {activeLabels.map((label) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-medium text-ink"
                        >
                          <CheckCircle2 size={11} className="text-brand-600" />
                          {label.split(' / ')[0].split(' & ')[0]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <ContactLink
                  className="btn-primary flex w-full items-center justify-center gap-2"
                  onClick={() => {
                    try {
                      localStorage.setItem(
                        SCOPE_BUILDER_STORAGE_KEY,
                        JSON.stringify({
                          platform: site.label,
                          workstreams: activeLabels,
                          readinessScore: readiness,
                        }),
                      );
                    } catch {
                      /* ignore quota / private mode */
                    }
                  }}
                >
                  Request a custom scope <ArrowRight size={16} />
                </ContactLink>
                <p className="mt-2.5 text-center text-[11px] text-ink-light">
                  Free discovery — hosting, theme debt, and success criteria before we quote.
                </p>
                <Link to="/quotes" className="mt-2 block text-center text-xs font-semibold text-brand-600 hover:underline">
                  Read our build-floor principles →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
