import { Layers, ShieldCheck, Gauge, Code2, RefreshCw, FileCheck } from 'lucide-react';

/** Honest capability signals — no fake awards / partner badges */
const badges = [
  { icon: Code2, label: 'WordPress specialists', tone: 'bg-sky-50 text-sky-700' },
  { icon: Layers, label: 'WooCommerce & LearnDash', tone: 'bg-violet-50 text-violet-700' },
  { icon: ShieldCheck, label: 'Staging-first delivery', tone: 'bg-emerald-50 text-emerald-700' },
  { icon: Gauge, label: 'Core Web Vitals focused', tone: 'bg-amber-50 text-amber-700' },
  { icon: RefreshCw, label: 'Care & update retainers', tone: 'bg-rose-50 text-rose-700' },
  { icon: FileCheck, label: 'Clear handoff docs', tone: 'bg-slate-100 text-slate-700' },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-border bg-surface py-8">
      <div className="section-container">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-light">
          How we work
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {badges.map(({ icon: Icon, label, tone }) => (
            <div key={label} className="flex items-center gap-2.5 text-ink-muted">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tone}`}>
                <Icon size={16} strokeWidth={2.25} />
              </div>
              <span className="text-sm font-medium text-ink-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
