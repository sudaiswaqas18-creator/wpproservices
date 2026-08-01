import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import ContactLink from './ContactLink';

const HeroShowcase = lazy(() => import('./HeroShowcase'));

const trustPoints = [
  'Custom themes, WooCommerce stores & plugins',
  'Staging QA before every meaningful launch',
  'Migrations with redirect maps & handoff docs',
];

const highlights = [
  'Themes editors can update without breaking layouts',
  'WooCommerce checkout, catalog & inventory logic',
  'Care retainers for updates, backups and small fixes',
];

export default function Hero() {
  /** Same polished showcase on every width — compact mode handles mid/mobile */
  const visual = (
    <Suspense
      fallback={
        <div
          className="min-h-[280px] rounded-3xl bg-gradient-to-br from-brand-50 to-white sm:min-h-[320px] xl:min-h-[420px]"
          aria-hidden="true"
        />
      }
    >
      <HeroShowcase />
    </Suspense>
  );

  return (
    <section className="relative overflow-hidden bg-background pb-14 pt-10 md:pb-20 md:pt-14 lg:pb-24 lg:pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-black/[0.02] blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(10, 10, 10, 0.06) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="section-container relative">
        {/* md+: text + visual side-by-side so ~1000px does not feel empty / scroll-heavy */}
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-8 lg:gap-12 xl:gap-14">
          <div className="min-w-0">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-[11px] font-semibold text-accent shadow-sm sm:px-4 sm:text-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <Sparkles size={14} className="shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0">WordPress studio for stores, LMS &amp; care</span>
            </div>

            <h1 className="mt-5 text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-[2.35rem] lg:text-5xl xl:text-[3.35rem]">
              WordPress Work That{' '}
              <span className="relative inline-block">
                <span className="text-accent">Stays Maintainable</span>
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-secondary" />
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg md:mt-5">
              WPServices builds custom themes, WooCommerce stores, LearnDash flows, and plugins with
              staging QA, Core Web Vitals checks, and docs your editors can actually use.
            </p>

            <ul className="mt-5 space-y-2 sm:mt-6 sm:space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink-muted">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <CheckCircle2 size={16} className="text-accent" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <ContactLink className="btn-primary group inline-flex items-center gap-2 px-6 py-3 text-sm shadow-lg shadow-accent/25 sm:px-7 sm:py-3.5 sm:text-base">
                Start a Project
                <ArrowRight size={18} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
              </ContactLink>
              <Link to="/services" className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-base">
                View Services
              </Link>
            </div>

            {/* Phone only: visual sits under CTAs — not after a long trust strip */}
            <div className="mt-8 md:hidden">{visual}</div>

            <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 sm:mt-10 sm:pt-8">
              {trustPoints.map((point) => (
                <span key={point} className="text-sm font-semibold leading-snug text-ink-muted">
                  <span className="mr-1.5 text-accent" aria-hidden="true">●</span>
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* Tablet/desktop: visual beside copy */}
          <div className="hidden min-w-0 md:block md:pl-1 lg:pl-2">{visual}</div>
        </div>
      </div>
    </section>
  );
}
