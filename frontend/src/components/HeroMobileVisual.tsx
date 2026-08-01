import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Globe2, ShieldCheck, Zap } from 'lucide-react';

const slides = [
  {
    id: 'theme',
    eyebrow: 'Custom theme',
    title: 'Brand-led WordPress',
    points: ['Editor-safe patterns', 'SEO-ready structure', 'Staging QA'],
    accent: 'from-sky-600 to-slate-800',
  },
  {
    id: 'woo',
    eyebrow: 'WooCommerce',
    title: 'Checkout-focused stores',
    points: ['Catalog clarity', 'Payment flows', 'Inventory honesty'],
    accent: 'from-amber-600 to-stone-800',
  },
  {
    id: 'care',
    eyebrow: 'Care retainer',
    title: 'Steady launch habits',
    points: ['Core Web Vitals', 'Backups & updates', 'Handoff docs'],
    accent: 'from-teal-600 to-slate-800',
  },
];

/**
 * Compact animated stand-in for HeroShowcase on viewports &lt; 1024px.
 * Swaps out automatically when the full desktop showcase mounts.
 */
export default function HeroMobileVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-100/80 via-white to-amber-50/60 blur-sm" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-card">
        <div className={`h-2 bg-gradient-to-r ${slide.accent}`} />
        <div className="flex items-center gap-2 border-b border-border/70 bg-surface-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-1 text-[10px] text-ink-muted ring-1 ring-border">
            wpproservices.com
          </span>
          <Globe2 size={14} className="shrink-0 text-ink-muted" />
        </div>

        <div className="relative min-h-[240px] p-4 sm:min-h-[260px] sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                {slide.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-ink sm:text-2xl">{slide.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {slide.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-ink-muted">
                    <CheckCircle2 size={16} className="shrink-0 text-brand-600" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {[Zap, ShieldCheck, Globe2].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="rounded-xl bg-surface-50 p-3 ring-1 ring-border"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                  >
                    <Icon size={16} className="text-brand-600" />
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${slide.accent}`}
                        initial={{ width: '35%' }}
                        animate={{ width: `${55 + i * 15}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.eyebrow}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? 'w-6 bg-brand-500' : 'w-1.5 bg-brand-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
