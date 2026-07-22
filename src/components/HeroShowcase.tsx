import { motion } from 'framer-motion';
import { Code2, Gauge, ShoppingCart, Sparkles, Zap } from 'lucide-react';

const floatingCards = [
  { icon: Code2, label: 'WordPress', value: 'Custom Build', x: '-8%', y: '6%', delay: 0 },
  { icon: ShoppingCart, label: 'WooCommerce', value: 'E-commerce', x: '72%', y: '4%', delay: 0.15 },
  { icon: Gauge, label: 'Core Web Vitals', value: '98 Score', x: '78%', y: '62%', delay: 0.3 },
  { icon: Zap, label: 'Performance', value: '+3× Faster', x: '-6%', y: '68%', delay: 0.45 },
];

const codeLines = [
  { width: '72%', opacity: 1 },
  { width: '58%', opacity: 0.85 },
  { width: '80%', opacity: 0.7 },
  { width: '48%', opacity: 0.55 },
  { width: '66%', opacity: 0.4 },
];

export default function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/20 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-8 top-10 h-28 w-28 rounded-full bg-accent-400/25 blur-2xl"
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative aspect-[4/3.2] w-full">
        <motion.div
          className="absolute inset-[8%] rounded-[1.75rem] border border-white/70 bg-white/80 p-1 shadow-[0_30px_80px_rgba(124,58,237,0.18)] backdrop-blur-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute -inset-px rounded-[1.8rem] bg-gradient-to-br from-brand-400/40 via-transparent to-accent-400/30"
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-brand-100/80 bg-gradient-to-br from-white via-brand-50/40 to-white">
            <motion.div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
              animate={{ backgroundPosition: ['0px 0px', '28px 28px'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brand-300/20 blur-2xl"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent-400/20 blur-2xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_20px_50px_rgba(124,58,237,0.12)] backdrop-blur"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-3 flex items-center gap-2">
                <motion.div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </motion.div>
                <div className="ml-2 h-2 flex-1 rounded-full bg-brand-100" />
              </div>

              <div className="space-y-2.5">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    className="h-2.5 rounded-full bg-gradient-to-r from-brand-200 to-brand-100"
                    style={{ width: line.width, opacity: line.opacity }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-500 px-3 py-2 text-white shadow-lg shadow-brand-500/30">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Sparkles size={14} />
                  Launch-ready WordPress
                </div>
                <motion.span
                  className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  LIVE
                </motion.span>
              </div>
            </motion.div>

            <div className="absolute bottom-5 left-5 right-5 h-1.5 overflow-hidden rounded-full bg-brand-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400"
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '88%', '88%'] }}
                transition={{ duration: 2.2, delay: 1.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {floatingCards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              className="absolute z-10 rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 shadow-[0_12px_30px_rgba(124,58,237,0.14)] backdrop-blur-sm"
              style={{ left: card.x, top: card.y }}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.4 + card.delay },
                y: { duration: 4 + card.delay * 2, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
                scale: { duration: 0.5, delay: 0.4 + card.delay },
              }}
            >
              <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={14} />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{card.label}</p>
              <p className="text-xs font-bold text-gray-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
