import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Gauge, ShoppingCart, Zap } from 'lucide-react';

const slides = [
  {
    id: 'build',
    label: 'Custom WordPress',
    sub: 'Launch-ready builds',
    metric: '98',
    metricLabel: 'Performance Score',
    color: 'from-brand-500 to-violet-600',
    bars: [88, 72, 94, 65, 80, 91],
  },
  {
    id: 'commerce',
    label: 'WooCommerce Store',
    sub: 'Conversion-focused shops',
    metric: '+42%',
    metricLabel: 'Conversion Lift',
    color: 'from-violet-600 to-indigo-600',
    bars: [70, 85, 78, 92, 68, 84],
  },
  {
    id: 'speed',
    label: 'Speed Optimized',
    sub: 'Core Web Vitals tuned',
    metric: '1.2s',
    metricLabel: 'Load Time',
    color: 'from-brand-600 to-purple-700',
    bars: [95, 88, 91, 86, 93, 89],
  },
];

const floatCards = [
  {
    id: 'wp',
    icon: Code2,
    label: 'WORDPRESS',
    value: 'Custom Build',
    className: 'left-0 top-4 sm:-left-6 sm:top-8',
    delay: 0,
  },
  {
    id: 'woo',
    icon: ShoppingCart,
    label: 'WOOCOMMERCE',
    value: 'E-commerce',
    className: 'right-0 top-0 sm:-right-4 sm:top-6',
    delay: 0.15,
  },
  {
    id: 'perf',
    icon: Zap,
    label: 'PERFORMANCE',
    value: '+3× Faster',
    className: 'bottom-16 left-0 sm:-left-8 sm:bottom-20',
    delay: 0.3,
  },
  {
    id: 'cwv',
    icon: Gauge,
    label: 'CORE WEB VITALS',
    value: '98 Score',
    className: 'bottom-8 right-0 sm:-right-6 sm:bottom-12',
    delay: 0.45,
  },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
      setProgress(0);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / 4500) * 100));
    }, 40);
    return () => window.clearInterval(tick);
  }, [active]);

  const slide = slides[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-400/30 via-violet-400/10 to-accent-400/25 blur-3xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [-5, -3, -5], rotateX: [4, 6, 4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        {floatCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 0.4 + card.delay, duration: 0.5 },
                scale: { delay: 0.4 + card.delay, duration: 0.5 },
                y: { delay: 1 + card.delay, duration: 4 + card.delay * 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className={`absolute z-20 hidden w-[132px] rounded-xl border border-white/70 bg-white/95 px-3 py-2.5 shadow-[0_12px_40px_-8px_rgba(124,58,237,0.35)] backdrop-blur-md sm:block ${card.className}`}
            >
              <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-sm">
                <Icon size={14} strokeWidth={2.5} />
              </div>
              <p className="text-[9px] font-bold tracking-wider text-brand-600">{card.label}</p>
              <p className="text-[11px] font-semibold text-gray-800">{card.value}</p>
            </motion.div>
          );
        })}

        <motion.div
          className="relative z-10 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_32px_80px_-16px_rgba(124,58,237,0.4)]"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-400/40 via-transparent to-accent-400/30"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
            </div>
            <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-white px-3 py-1.5 text-[11px] text-gray-400 shadow-inner ring-1 ring-gray-100">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <motion.span key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">
                wpservices.com / {slide.id}
              </motion.span>
            </div>
          </motion.div>

          <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50/40 p-5 sm:p-6">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.05) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex h-full flex-col"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`mb-4 h-1 rounded-full bg-gradient-to-r ${slide.color}`}
                />

                <div className="mb-3 flex items-start justify-between gap-3">
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Live Preview</p>
                    <p className="text-sm font-bold text-gray-900">{slide.label}</p>
                    <p className="text-[11px] text-gray-500">{slide.sub}</p>
                  </motion.div>
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.25, type: 'spring' }}
                    className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-100"
                  >
                    LIVE
                  </motion.span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4 rounded-xl bg-white/90 p-3.5 shadow-sm ring-1 ring-gray-100/90"
                >
                  <motion.div
                    className="h-2 rounded-full bg-gray-100"
                    initial={{ width: '40%' }}
                    animate={{ width: ['40%', '65%', '55%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  <motion.div className="mt-2.5 h-3 w-3/4 rounded-full bg-gradient-to-r from-brand-500/70 to-brand-300/50" />
                  <motion.div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${slide.color}`}
                      style={{ width: `${progress}%` }}
                    />
                  </motion.div>
                  <motion.div className="mt-3 flex gap-2">
                    <motion.div
                      className="h-7 w-20 rounded-lg bg-brand-500 shadow-md shadow-brand-500/30"
                      animate={{
                        boxShadow: [
                          '0 4px 14px rgba(124,58,237,0.25)',
                          '0 4px 20px rgba(124,58,237,0.45)',
                          '0 4px 14px rgba(124,58,237,0.25)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div className="h-7 w-20 rounded-lg border border-brand-200 bg-brand-50/80" />
                  </motion.div>
                </motion.div>

                <motion.div className="flex flex-1 items-end gap-1.5 rounded-xl bg-white/80 p-3 ring-1 ring-gray-100/80">
                  {slide.bars.map((h, i) => (
                    <motion.div
                      key={`${slide.id}-${i}`}
                      className={`flex-1 rounded-t-md bg-gradient-to-t ${slide.color}`}
                      initial={{ height: 0, opacity: 0.4 }}
                      animate={{ height: `${h}%`, opacity: 0.85 }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`metric-${slide.id}`}
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              className="absolute bottom-4 right-4 rounded-xl border border-white/90 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm"
            >
              <p className="text-2xl font-extrabold tracking-tight text-brand-600">{slide.metric}</p>
              <p className="text-[10px] font-medium text-gray-500">{slide.metricLabel}</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mx-6 mt-1 h-6 rounded-b-2xl bg-gradient-to-b from-brand-500/15 to-transparent blur-[2px]" />
      </motion.div>

      <motion.div
        className="mt-6 flex justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setActive(i);
              setProgress(0);
            }}
            className="group relative h-2 overflow-hidden rounded-full bg-gray-200 transition-all"
            style={{ width: i === active ? 40 : 8 }}
            aria-label={`Show ${s.label}`}
          >
            {i === active && (
              <motion.span
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.color}`}
                layoutId="hero-slide-indicator"
              />
            )}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}
