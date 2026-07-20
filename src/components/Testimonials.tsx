import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';

export default function Testimonials() {
  const { data: items } = useApiData('testimonials');
  const [current, setCurrent] = useState(0);

  if (!items.length) return null;

  const t = items[current];

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20">
      <div className="section-container">
        <h2 className="section-title text-center">Success Stories from Our Clients</h2>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card text-center"
            >
              <Quote size={32} className="mx-auto text-brand-200" />
              <p className="mt-6 text-lg leading-relaxed text-gray-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-8">
                <div className="font-bold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.company}</div>
                {t.metric_label && (
                  <div className="mt-3 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
                    {t.metric_label}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={prev} className="rounded-full border border-gray-200 p-2 hover:bg-gray-50" aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-brand-500' : 'w-2 bg-gray-300'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={next} className="rounded-full border border-gray-200 p-2 hover:bg-gray-50" aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
