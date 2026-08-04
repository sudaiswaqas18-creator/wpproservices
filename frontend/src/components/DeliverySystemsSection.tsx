import { Link } from 'react-router-dom';
import { ClipboardList, Layers, ShieldCheck, Gauge, FileCheck, ArrowRight } from 'lucide-react';
import ContactLink from './ContactLink';

const pillars = [
  {
    icon: ClipboardList,
    title: 'Written delivery scopes',
    desc: 'Every WordPress engagement starts with inclusions, exclusions, and success criteria — so editors and stakeholders share one definition of done.',
  },
  {
    icon: Layers,
    title: 'Theme & store architecture',
    desc: 'Custom themes, WooCommerce catalogs, and LearnDash flows structured for updates — not fragile page-builder stacks that break on the next plugin release.',
  },
  {
    icon: ShieldCheck,
    title: 'Staging-first cutovers',
    desc: 'Meaningful launches and migrations rehearse on staging with redirect maps, form tests, and checkout checks before DNS moves.',
  },
  {
    icon: Gauge,
    title: 'Field-aware performance',
    desc: 'Core Web Vitals reviewed on real templates — hero media, product queries, and third-party scripts — not lab-only Lighthouse screenshots.',
  },
  {
    icon: FileCheck,
    title: 'Editor-ready handoffs',
    desc: 'Docs, training notes, and update habits your team can use in wp-admin after we leave — so maintainability survives the handoff.',
  },
];

/** Homepage section replacing the old plugins catalog — unique WPServices positioning */
export default function DeliverySystemsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-elevated py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,26,26,0.06) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>
      <div className="section-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
            Maintainable WordPress systems
          </p>
          <h2 className="section-title mt-3">
            How We Keep Themes, Stores &amp; LMS Builds Ownable
          </h2>
          <p className="section-subtitle mx-auto mt-3">
            Instead of a plugin marketplace, WPServices publishes the delivery habits that protect rankings,
            checkout, and editor workflows after launch — the work competitors often leave undocumented.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-white p-5 shadow-card transition hover:shadow-cardHover"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ContactLink className="btn-primary inline-flex items-center gap-2">
            Start a scoped project <ArrowRight size={16} />
          </ContactLink>
          <Link to="/process" className="btn-outline inline-flex items-center gap-2">
            See our process
          </Link>
          <Link to="/customers" className="btn-outline inline-flex items-center gap-2">
            Who we build for
          </Link>
        </div>
      </div>
    </section>
  );
}
