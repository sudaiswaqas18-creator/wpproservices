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
  FileCheck2,
  Timer,
  Waypoints,
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
    deliveryNote:
      'We treat brochure builds as editor systems — patterns, forms, and meta that marketing can change without a rebuild ticket every week.',
    stagingFocus: 'Form endpoints, analytics tags, and key landing templates checked on staging before DNS cutover.',
  },
  {
    id: 'woo',
    label: 'WooCommerce store',
    focus: 'Catalog, checkout clarity, shipping rules, staging QA',
    deliveryNote:
      'Store scopes start from how you sell — catalog rules, shipping thresholds, and checkout honesty under real product data, not demo SKUs.',
    stagingFocus: 'Cart, coupons, shipping, and payment sandbox paths rehearsed before campaign traffic.',
  },
  {
    id: 'lms',
    label: 'LearnDash / membership',
    focus: 'Access rules, cohort ops, seat or payment paths',
    deliveryNote:
      'LMS work is access math first — who gets which course, when drip fires, and how seats assign without support chaos.',
    stagingFocus: 'Role gates, enrollment, and progress views verified with sample cohorts before launch.',
  },
  {
    id: 'migrate',
    label: 'Migration or redesign',
    focus: 'Redirect maps, content inventory, cutover checklist',
    deliveryNote:
      'Migrations succeed on inventory and redirects, not hope. We map URLs, plugins that stay, and a rollback path before go-live.',
    stagingFocus: 'Redirect spot-checks, media paths, and editor login on the new stack before cutover day.',
  },
] as const;

const WORKSTREAMS = [
  {
    id: 'scope',
    label: 'Written scope & success criteria',
    desc: 'Inclusions, exclusions, and definition of done before build starts.',
    weeks: '3–5 days',
    weight: 18,
    panelHint: 'Locks what “done” means so mid-build surprises stay out of the critical path.',
  },
  {
    id: 'theme',
    label: 'Custom theme / Gutenberg patterns',
    desc: 'Layouts editors can update without breaking the design system.',
    weeks: '2–4 weeks',
    weight: 22,
    panelHint: 'Patterns and spacing rules your editors reuse — not one-off page-builder free-for-alls.',
  },
  {
    id: 'commerce',
    label: 'WooCommerce or LearnDash depth',
    desc: 'Checkout, catalog, access, or membership logic matched to ops.',
    weeks: '2–5 weeks',
    weight: 24,
    panelHint: 'Commerce or LMS depth scoped to real ops — shipping, seats, or access — not plugin pile-ons.',
  },
  {
    id: 'performance',
    label: 'Template performance review',
    desc: 'Hero media, queries, and third-party scripts on real money pages.',
    weeks: '3–7 days',
    weight: 16,
    panelHint: 'LCP and query weight reviewed on templates that earn money, not a blank homepage alone.',
  },
  {
    id: 'care',
    label: 'Launch + care handoff',
    desc: 'Staging cutover, docs, and update habits your team can keep.',
    weeks: 'Ongoing',
    weight: 14,
    panelHint: 'Cutover checklist, update cadence, and who owns plugins after we leave the build floor.',
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
  const activeStreams = WORKSTREAMS.filter((w) => selected.includes(w.id));
  const weeksHint =
    selected.length === 0
      ? 'Add at least one workstream'
      : selected.includes('theme') || selected.includes('commerce')
        ? 'Typically 3–8 weeks after discovery'
        : 'Typically 1–3 weeks after discovery';

  const gapNotes = useMemo(() => {
    const missing = WORKSTREAMS.filter((w) => !selected.includes(w.id));
    if (!missing.length) {
      return 'Full workstream set selected — this is the profile we prefer before a fixed-price conversation.';
    }
    return `Still optional: ${missing.map((m) => m.label.split(' / ')[0]).join(' · ')}. Adding them raises readiness and reduces mid-project change orders.`;
  }, [selected]);

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

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col space-y-5 lg:col-span-7">
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

            <div className="flex-1 rounded-2xl border border-border bg-white p-5 shadow-card sm:p-6">
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

          <aside className="flex lg:col-span-5">
            <div className="flex w-full flex-col rounded-2xl border border-border bg-white p-6 shadow-cardHover">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-light">Scope readiness</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  <ShieldCheck size={14} /> Staging-minded
                </span>
              </div>

              <div className="my-6 text-center">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-brand-100 bg-surface-50">
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
                    <Timer size={14} className="text-brand-600" /> Timing hint
                  </span>
                  <span className="max-w-[55%] text-right font-semibold text-ink">{weeksHint}</span>
                </li>
              </ul>

              <div className="mt-4 flex-1 space-y-4">
                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                    <Waypoints size={12} /> How we deliver this platform
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">{site.deliveryNote}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    <span className="font-semibold text-ink">Staging focus: </span>
                    {site.stagingFocus}
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface-50 p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-light">
                    <FileCheck2 size={12} /> In your draft scope
                  </p>
                  {activeStreams.length === 0 ? (
                    <p className="mt-2 text-xs text-ink-muted">Select workstreams on the left to preview what lands in the written plan.</p>
                  ) : (
                    <ul className="mt-2 space-y-2.5">
                      {activeStreams.map((w) => (
                        <li key={w.id} className="flex gap-2 text-xs leading-snug text-ink-muted">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-brand-600" />
                          <span>
                            <span className="font-semibold text-ink">{w.label}</span>
                            {' — '}
                            {w.panelHint}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-3 border-t border-border pt-3 text-[11px] leading-relaxed text-ink-light">
                    {gapNotes}
                  </p>
                </div>

                <div className="rounded-xl border border-dashed border-border px-4 py-3 text-[11px] leading-relaxed text-ink-muted">
                  WPServices quotes only after discovery maps hosting, theme debt, and success criteria — this panel is a
                  planning signal, not a price guarantee or PageSpeed promise.
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <ContactLink className="btn-primary flex w-full items-center justify-center gap-2">
                  Request a custom scope <ArrowRight size={16} />
                </ContactLink>
                <p className="mt-3 text-center text-[11px] text-ink-light">
                  Free discovery call — we map hosting, theme debt, and success criteria before quoting.
                </p>
                <Link to="/quotes" className="mt-3 block text-center text-xs font-semibold text-brand-600 hover:underline">
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
