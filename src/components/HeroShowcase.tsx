import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const scenes = [
  {
    id: 'craft',
    eyebrow: 'Design System',
    title: 'Brand-led WordPress',
    subtitle: 'Custom themes built for conversion',
    score: 98,
    scoreLabel: 'PageSpeed',
    delta: '+3.2×',
    deltaLabel: 'Faster load',
    accent: 'from-brand-500 to-violet-500',
    nav: ['Home', 'Work', 'Pricing'],
    heroLines: ['Premium digital presence', 'Built to convert & scale'],
  },
  {
    id: 'commerce',
    eyebrow: 'WooCommerce',
    title: 'High-converting store',
    subtitle: 'Checkout flows that drive revenue',
    score: 42,
    scoreLabel: 'Conv. lift %',
    delta: '1.2s',
    deltaLabel: 'TTI',
    accent: 'from-violet-600 to-indigo-500',
    nav: ['Shop', 'Cart', 'Account'],
    heroLines: ['Product pages that sell', 'Frictionless checkout UX'],
  },
  {
    id: 'scale',
    eyebrow: 'Enterprise',
    title: 'Always-on performance',
    subtitle: 'Core Web Vitals locked in green',
    score: 100,
    scoreLabel: 'CWV Score',
    delta: '99.9%',
    deltaLabel: 'Uptime',
    accent: 'from-brand-600 to-purple-600',
    nav: ['Platform', 'Security', 'Support'],
    heroLines: ['Global CDN delivery', 'Secure & maintainable'],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, value) / 100;

  return (
    <div className="relative flex h-[88px] w-[88px] items-center justify-center">
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#EDE9FE" strokeWidth="7" />
        <motion.circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="url(#heroScoreGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1.1, ease }}
        />
        <defs>
          <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-extrabold tracking-tight text-gray-900"
        >
          {value}
        </motion.span>
        <span className="text-[8px] font-semibold uppercase tracking-wider text-gray-400">{label}</span>
      </div>
    </div>
  );
}

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 58, y: 42 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % scenes.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const path = [
      { x: 28, y: 38 },
      { x: 62, y: 48 },
      { x: 48, y: 68 },
      { x: 72, y: 36 },
    ];
    let step = 0;
    const tick = window.setInterval(() => {
      setCursor(path[step % path.length]);
      step += 1;
    }, 1300);
    return () => window.clearInterval(tick);
  }, [active]);

  const scene = scenes[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.15, ease }}
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
      style={{ perspective: '1600px' }}
    >
      {/* Ambient depth */}
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-[40%] bg-gradient-to-br from-brand-400/25 via-violet-300/10 to-accent-400/20 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbit ring */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-brand-200/50 sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500 to-accent-400 shadow-[0_0_16px_rgba(124,58,237,0.7)]" />
        <span className="absolute bottom-8 right-4 h-1.5 w-1.5 rounded-full bg-accent-400/80" />
      </motion.div>

      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [-7, -4, -7], rotateX: [5, 7, 5] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Floating status pill — top right */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.5, duration: 0.5 },
            y: { delay: 1.2, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -right-2 top-6 z-30 hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(124,58,237,0.35)] backdrop-blur-md sm:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Deployed</p>
            <p className="text-[11px] font-semibold text-gray-700">Launch-ready</p>
          </div>
        </motion.div>

        {/* Floating trust chip — bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{
            opacity: { delay: 0.7, duration: 0.5 },
            y: { delay: 1.5, duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -left-3 bottom-16 z-30 hidden items-center gap-2.5 rounded-2xl border border-white/80 bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(124,58,237,0.3)] backdrop-blur-md sm:flex"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-md">
            <ShieldCheck size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900">Enterprise security</p>
            <p className="text-[10px] text-gray-500">SSL · Hardening · Backups</p>
          </div>
        </motion.div>

        {/* Main glass frame */}
        <div className="relative z-10 overflow-hidden rounded-[1.35rem] border border-white/90 bg-white shadow-[0_40px_90px_-24px_rgba(124,58,237,0.45)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-gray-100/90 bg-gradient-to-r from-slate-50 via-white to-brand-50/40 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[11px] text-gray-400 shadow-inner ring-1 ring-gray-100">
              <Sparkles size={11} className="shrink-0 text-brand-400" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={scene.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="truncate font-medium"
                >
                  wpservices.com/{scene.id}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Stage */}
          <div className="relative aspect-[16/11] overflow-hidden bg-gradient-to-br from-[#F8F7FF] via-white to-brand-50/50">
            {/* Soft mesh */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 15% 20%, rgba(124,58,237,0.12), transparent 42%), radial-gradient(circle at 85% 75%, rgba(249,115,22,0.1), transparent 38%)',
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex flex-col p-4 sm:p-5"
              >
                {/* Mini site header */}
                <div className="mb-3 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-gray-100/80 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-lg bg-gradient-to-br ${scene.accent} shadow-sm`} />
                    <span className="text-[11px] font-bold text-gray-800">WP Studio</span>
                  </div>
                  <div className="hidden items-center gap-3 sm:flex">
                    {scene.nav.map((item) => (
                      <span key={item} className="text-[10px] font-medium text-gray-400">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex h-6 items-center gap-1 rounded-md bg-brand-500 px-2 text-[9px] font-bold text-white">
                    Get Started
                    <ArrowUpRight size={10} />
                  </div>
                </div>

                {/* Mini hero + metrics */}
                <div className="grid flex-1 gap-3 sm:grid-cols-[1.35fr_0.9fr]">
                  <div className="relative overflow-hidden rounded-xl bg-white/90 p-3.5 shadow-sm ring-1 ring-gray-100/80">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-600">{scene.eyebrow}</p>
                    <p className="mt-1 text-sm font-extrabold tracking-tight text-gray-900 sm:text-[15px]">{scene.title}</p>
                    <p className="mt-1 text-[11px] leading-snug text-gray-500">{scene.subtitle}</p>
                    <div className="mt-3 space-y-1.5">
                      {scene.heroLines.map((line, i) => (
                        <motion.div
                          key={line}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: i === 0 ? '92%' : '72%', opacity: 1 }}
                          transition={{ delay: 0.25 + i * 0.12, duration: 0.55, ease }}
                          className="h-2 rounded-full bg-gradient-to-r from-brand-200/90 to-brand-100/40"
                        />
                      ))}
                    </div>
                    <motion.div
                      className={`mt-4 h-8 w-28 rounded-lg bg-gradient-to-r ${scene.accent} shadow-lg shadow-brand-500/25`}
                      animate={{ boxShadow: ['0 8px 20px rgba(124,58,237,0.2)', '0 10px 28px rgba(124,58,237,0.4)', '0 8px 20px rgba(124,58,237,0.2)'] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />

                    {/* Animated cursor */}
                    <motion.div
                      className="pointer-events-none absolute z-10"
                      animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
                      transition={{ duration: 1.1, ease }}
                      style={{ translateX: '-30%', translateY: '-20%' }}
                    >
                      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                        <path
                          d="M1 1L1 16.5L5.2 12.8L8.8 20.2L11.2 19L7.6 11.6L13.5 11.2L1 1Z"
                          fill="#1F2937"
                          stroke="white"
                          strokeWidth="1.2"
                        />
                      </svg>
                      <motion.span
                        className="absolute left-3 top-4 h-5 w-5 rounded-full border-2 border-brand-400/70"
                        animate={{ scale: [0.6, 1.3], opacity: [0.7, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-1 items-center justify-center rounded-xl bg-white/90 p-2 shadow-sm ring-1 ring-gray-100/80">
                      <ScoreRing value={scene.score} label={scene.scoreLabel} />
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 p-3 text-white shadow-lg shadow-brand-500/30">
                      <div className="mb-1 flex items-center gap-1.5">
                        <Zap size={12} className="text-accent-300" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-brand-100">{scene.deltaLabel}</span>
                      </div>
                      <motion.p
                        key={scene.delta}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-extrabold tracking-tight"
                      >
                        {scene.delta}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mx-8 mt-1.5 h-7 rounded-b-3xl bg-gradient-to-b from-brand-500/20 to-transparent blur-[3px]" />
      </motion.div>

      {/* Scene indicators */}
      <div className="mt-7 flex items-center justify-center gap-2.5">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={s.title}
            className="group relative h-1.5 overflow-hidden rounded-full bg-gray-200 transition-all duration-500"
            style={{ width: i === active ? 44 : 10 }}
          >
            {i === active && (
              <motion.span
                layoutId="hero-scene-pill"
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.accent}`}
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
