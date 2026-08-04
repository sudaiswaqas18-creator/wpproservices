import { Link } from 'react-router-dom';
import { Quote, ArrowRight } from 'lucide-react';
import CTA from '../components/CTA';
import SEO from '../components/seo/SEO';

/** Original WPServices principles — not third-party quotations */
const principles = [
  {
    eyebrow: 'Scope',
    text: 'If it is not written in the scope, it is not in the launch. Surprises belong in discovery — not on cutover day.',
  },
  {
    eyebrow: 'Staging',
    text: 'Meaningful WordPress changes earn a staging rehearsal. Production is for traffic, not for first contact with a broken checkout.',
  },
  {
    eyebrow: 'Editors',
    text: 'A theme that only developers can update is unfinished. Handoff docs and Gutenberg patterns are part of delivery, not optional extras.',
  },
  {
    eyebrow: 'WooCommerce',
    text: 'More plugins is not a strategy. Cart rules, shipping logic, and inventory honesty beat another urgency widget every time.',
  },
  {
    eyebrow: 'LearnDash',
    text: 'Access rules that staff cannot explain will fail the first cohort. Role gates and progress views must match how training actually runs.',
  },
  {
    eyebrow: 'Performance',
    text: 'Core Web Vitals are judged on real templates with real media — not a blank page in a lab profile.',
  },
  {
    eyebrow: 'Migrations',
    text: 'Redirect maps and content inventories protect rankings. File copies alone do not.',
  },
  {
    eyebrow: 'Care',
    text: 'Updates without backups and staging are hope, not maintenance. Retainers exist to keep hope out of production.',
  },
  {
    eyebrow: 'Ownership',
    text: 'Clients should leave with code they own and habits they can keep. Lock-in is not a business model we sell.',
  },
];

export default function QuotesPage() {
  return (
    <>
      <SEO
        title="WordPress Build-Floor Principles | WPServices Quotes"
        description="Original WPServices principles on WordPress scope, staging, WooCommerce, LearnDash, Core Web Vitals, migrations, and care — written for operators, not vanity quotes."
        keywords="WordPress agency principles, WooCommerce best practices, WordPress staging, Core Web Vitals WordPress"
        path="/quotes"
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-background py-16 lg:py-24">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="section-container relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Quotes</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Build-Floor Principles We Ship By
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            These are original WPServices operating notes — not borrowed celebrity quotes. Use them as a filter when
            you evaluate WordPress partners, scopes, and launch readiness.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {principles.map(({ eyebrow, text }) => (
            <blockquote
              key={eyebrow}
              className="relative rounded-2xl border border-border bg-white p-6 shadow-card"
            >
              <Quote size={22} className="text-brand-200" aria-hidden="true" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">
                {eyebrow}
              </p>
              <p className="mt-3 text-base font-medium leading-relaxed text-ink">
                &ldquo;{text}&rdquo;
              </p>
              <footer className="mt-4 text-xs font-semibold text-ink-light">— WPServices delivery team</footer>
            </blockquote>
          ))}
        </div>

        <div className="section-container mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Request a scoped quote <ArrowRight size={16} />
          </Link>
          <Link to="/process" className="btn-outline">
            How we work
          </Link>
          <Link to="/customers" className="btn-outline">
            Customer types we serve
          </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}
