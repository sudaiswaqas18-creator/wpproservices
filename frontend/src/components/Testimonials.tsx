import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';

const AUTOPLAY_MS = 6000;
const DOT_SIZE = 10;
const DOT_HIT = 44;
const PILL_WIDTH = 32;

const LEGACY_MARKERS = [
  'skillbridge',
  'horizon analytics',
  'greenpath retail',
  'medconnect',
  'nordic learning',
  'artisan foods',
  'david chen',
  'sarah mitchell',
  'wpproservices delivered beyond',
];

function isLegacy(name: string, company: string, quote: string) {
  const hay = `${name} ${company} ${quote}`.toLowerCase();
  return LEGACY_MARKERS.some((m) => hay.includes(m));
}

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

function pillOffset(index: number) {
  return index * DOT_HIT - (PILL_WIDTH - DOT_SIZE) / 2 + (DOT_HIT - DOT_SIZE) / 2;
}

export default function Testimonials() {
  const { data: apiItems } = useApiData('testimonials');
  const items = useMemo(() => {
    return apiItems.filter((t) => !isLegacy(t.name || '', t.company || '', t.quote || ''));
  }, [apiItems]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  if (!items.length) return null;

  const go = useCallback((next: number) => {
    if (next === current) return;
    let d = next - current;
    if (d > items.length / 2) d -= items.length;
    if (d < -items.length / 2) d += items.length;
    setDirection(d > 0 ? 1 : -1);
    setCurrent(next);
    setProgressKey((k) => k + 1);
  }, [current, items.length]);

  const prev = useCallback(() => {
    go(current === 0 ? items.length - 1 : current - 1);
  }, [current, go, items.length]);

  const nextSlide = useCallback(() => {
    go(current === items.length - 1 ? 0 : current + 1);
  }, [current, go, items.length]);

  useEffect(() => {
    setCurrent(0);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [items.length, current]);

  if (!items.length) return null;

  const t = items[current];

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 280 : -280,
      opacity: 0,
      rotateY: d > 0 ? 28 : -28,
      scale: 0.92,
    }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -280 : 280,
      opacity: 0,
      rotateY: d > 0 ? -28 : 28,
      scale: 0.92,
    }),
  };

  return (
    <section className="overflow-hidden bg-background py-20">
      <div className="section-container">
        <h2 className="section-title text-center">WordPress Client Feedback</h2>
        <p className="section-subtitle mx-auto mt-4 max-w-2xl text-center">
          Notes from anonymized WordPress, WooCommerce, and LearnDash engagements — focused on delivery quality, not invented brand claims.
        </p>

        <div className="testimonial-stage relative mx-auto mt-12 max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={t.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="testimonial-card relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-brand-500/10 sm:p-10"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-100/60 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-brand-50 blur-2xl" />

              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-lg shadow-brand-500/30">
                  {initials(t.name)}
                </div>
                <Quote size={36} className="mt-6 text-brand-400" strokeWidth={1.5} />
                <blockquote className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-8 w-full max-w-md border-t border-slate-100 pt-6">
                  <p className="text-lg font-bold text-gray-900">{t.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{t.company}</p>
                  {t.metric_label && (
                    <div className="mt-4 inline-flex items-center rounded-full bg-brand-50 px-5 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                      {t.metric_label}
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex min-w-0 items-center justify-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-600 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              className="relative flex max-w-[min(100%,14rem)] items-center overflow-x-auto sm:max-w-[min(100%,18rem)]"
              style={{ height: DOT_HIT }}
            >
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(i)}
                  className="relative z-10 flex items-center justify-center rounded-md"
                  style={{ width: DOT_HIT, height: DOT_HIT }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                >
                  <span
                    className="rounded-full bg-gray-400 transition-colors hover:bg-brand-200"
                    style={{ width: DOT_SIZE, height: DOT_SIZE }}
                    aria-hidden="true"
                  />
                </button>
              ))}

              <motion.div
                className="testimonial-active-pill pointer-events-none absolute top-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-brand-500 shadow-md shadow-brand-500/50"
                style={{ width: PILL_WIDTH, height: DOT_SIZE }}
                animate={{ x: pillOffset(current) }}
                transition={{ type: 'spring', stiffness: 380, damping: 26, mass: 0.8 }}
              >
                <motion.div
                  key={progressKey}
                  className="absolute inset-y-0 left-0 bg-white/45"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
                <span className="testimonial-pill-shimmer" aria-hidden="true" />
              </motion.div>
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-600 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
