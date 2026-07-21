import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

export default function Testimonials() {
  const { data: items } = useApiData('testimonials');
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!items.length) return null;

  const t = items[current];

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go(current === 0 ? items.length - 1 : current - 1);
  const next = () => go(current === items.length - 1 ? 0 : current + 1);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 280 : -280,
      opacity: 0,
      rotateY: d > 0 ? 28 : -28,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -280 : 280,
      opacity: 0,
      rotateY: d > 0 ? -28 : 28,
      scale: 0.92,
    }),
  };

  return (
    <section className="overflow-hidden py-20">
      <div className="section-container">
        <h2 className="section-title text-center">Success Stories from Our Clients</h2>
        <p className="section-subtitle mx-auto mt-4 max-w-2xl text-center">
          Real results from businesses that trusted us with their WordPress growth.
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

                <Quote size={36} className="mt-6 text-brand-200" strokeWidth={1.5} />

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

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-600 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-brand-500' : 'w-2.5 bg-gray-300 hover:bg-brand-200'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-gray-600 shadow-sm transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
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
