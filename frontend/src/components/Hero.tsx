import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import ContactLink from './ContactLink';

const HeroShowcase = lazy(() => import('./HeroShowcase'));

const trustPoints = [
  '500+ Projects Delivered',
  '27+ Countries Served',
  '4.9★ Client Rating',
];

const highlights = [
  'Custom WordPress & WooCommerce',
  'Enterprise-grade performance',
  'Dedicated expert teams',
];

export default function Hero() {
  const [showShowcase, setShowShowcase] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setShowShowcase(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-12 lg:pb-28 lg:pt-20">
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
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <Sparkles size={14} className="text-accent" aria-hidden="true" />
              Premium WordPress Development Agency
            </div>

            <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
              Website Experiences{' '}
              <span className="relative inline-block">
                <span className="text-accent">Beautifully Crafted</span>
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-secondary" />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              We design and develop high-performance WordPress websites that help ambitious brands
              stand out, convert visitors, and scale with confidence.
            </p>

            <ul className="mt-6 space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-ink-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <CheckCircle2 size={16} className="text-accent" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <ContactLink className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-base shadow-lg shadow-accent/25">
                Start Your Project
                <ArrowRight size={18} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
              </ContactLink>
              <Link to="/services" className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-base">
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8">
              {trustPoints.map((point) => (
                <span key={point} className="text-sm font-semibold text-ink-muted">
                  <span className="text-accent" aria-hidden="true">●</span> {point}
                </span>
              ))}
            </div>
          </div>

          {showShowcase && (
            <Suspense
              fallback={
                <div
                  className="min-h-[420px] rounded-3xl bg-gradient-to-br from-brand-50 to-white"
                  aria-hidden="true"
                />
              }
            >
              <HeroShowcase />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
