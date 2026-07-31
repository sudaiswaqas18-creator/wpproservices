import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

const scenes = [
  {
    id: 'craft',
    eyebrow: 'Design System',
    title: 'Brand-led WordPress',
    subtitle: 'Custom themes built for conversion',
    score: 98,
    scoreLabel: 'PageSpeed',
    delta: '+3.2x',
    deltaLabel: 'Faster load',
    accent: 'from-brand-500 to-brand-400',
    nav: ['Home', 'Work', 'Pricing'],
    features: ['Custom theme', 'SEO ready', 'A11y'],
    vitals: [
      { label: 'LCP', value: '1.1s', good: true },
      { label: 'INP', value: '48ms', good: true },
      { label: 'CLS', value: '0.02', good: true },
    ],
    bars: [62, 78, 55, 88, 70, 92],
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
    accent: 'from-ink to-ink',
    nav: ['Shop', 'Cart', 'Account'],
    features: ['Smart cart', 'Payments', 'Upsells'],
    vitals: [
      { label: 'AOV', value: '+18%', good: true },
      { label: 'CR', value: '4.2%', good: true },
      { label: 'Cart', value: '-22%', good: true },
    ],
    bars: [48, 70, 82, 64, 90, 75],
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
    accent: 'from-brand-600 to-brand-600',
    nav: ['Platform', 'Security', 'Support'],
    features: ['CDN', 'WAF', 'Backups'],
    vitals: [
      { label: 'LCP', value: '0.9s', good: true },
      { label: 'INP', value: '32ms', good: true },
      { label: 'CLS', value: '0.01', good: true },
    ],
    bars: [88, 94, 86, 97, 91, 99],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value > 100 ? 100 : value)) / 100;
  // For commerce score 42 meaning %, still show as ring fill
  const fill = value > 100 ? 1 : value / (value <= 50 && label.includes('%') ? 50 : 100);
  const ringPct = Math.min(1, fill);

  return (
    <div className="relative flex h-[100px] w-[100px] items-center justify-center">
      <motion.div
        className="absolute inset-2 rounded-full bg-brand-400/10 blur-md"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg width="100" height="100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#F3F3F3" strokeWidth="8" />
        <motion.circle
          key={`${value}-${label}`}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#heroScoreGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - (value <= 50 && label.includes('lift') ? value / 50 : pct || ringPct)) }}
          transition={{ duration: 1.25, ease }}
        />
        <defs>
          <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="55%" stopColor="#404040" />
            <stop offset="100%" stopColor="#737373" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className="text-xl font-extrabold tracking-tight text-gray-900"
        >
          {value}
        </motion.span>
        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400">{label}</span>
      </div>
    </div>
  );
}

/** Cursor click targets inside the left content panel (%) */
const clickPath = [
  { x: 22, y: 38, target: 'feature-0' as const },
  { x: 42, y: 38, target: 'feature-1' as const },
  { x: 62, y: 38, target: 'feature-2' as const },
  { x: 28, y: 86, target: 'cta' as const },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 18, y: 28 });
  const [sceneProgress, setSceneProgress] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [clickFlash, setClickFlash] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [ctaPressed, setCtaPressed] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % scenes.length);
      setSceneProgress(0);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setSceneProgress(0);
    const start = Date.now();
    const tick = window.setInterval(() => {
      setSceneProgress(Math.min(100, ((Date.now() - start) / 7000) * 100));
    }, 50);
    return () => window.clearInterval(tick);
  }, [active]);

  // Professional move ? pause ? click ? feedback sequence
  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => resolve(), ms);
        timers.push(id);
      });

    const run = async () => {
      setActiveFeature(null);
      setCtaPressed(false);
      setIsClicking(false);
      setCursor({ x: 16, y: 24 });

      await wait(700);
      if (cancelled) return;

      for (let i = 0; i < clickPath.length; i++) {
        if (cancelled) return;
        const step = clickPath[i];

        // Move toward target
        setIsClicking(false);
        setCursor({ x: step.x, y: step.y });
        await wait(900);
        if (cancelled) return;

        // Hover settle
        await wait(220);
        if (cancelled) return;

        // Press down
        setIsClicking(true);
        await wait(140);
        if (cancelled) return;

        // Click feedback
        setClickFlash((n) => n + 1);
        if (step.target.startsWith('feature-')) {
          setActiveFeature(Number(step.target.split('-')[1]));
          setCtaPressed(false);
        } else {
          setCtaPressed(true);
        }

        await wait(180);
        if (cancelled) return;

        // Release
        setIsClicking(false);
        await wait(520);
        if (cancelled) return;

        if (step.target === 'cta') {
          setCtaPressed(false);
        }
      }

      // Soft reset before scene change / loop
      setActiveFeature(null);
      setCursor({ x: 20, y: 30 });
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
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
      <motion.div
        className="pointer-events-none absolute -inset-12 rounded-[42%] bg-gradient-to-br from-brand-400/30 via-brand-200/20 to-accent-400/25 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dual orbit rings */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-[2.75rem] border border-brand-200/40 sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-500 to-accent-400 shadow-[0_0_18px_rgba(26, 26, 26,0.75)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] border border-dashed border-accent-300/30 sm:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-400" />
      </motion.div>

      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [-6, -3.5, -6], rotateX: [4.5, 6.5, 4.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Deployed badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -7, 0] }}
          transition={{
            opacity: { delay: 0.45, duration: 0.5 },
            y: { delay: 1.1, duration: 4.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -right-1 top-5 z-30 hidden overflow-hidden rounded-2xl border border-white/90 bg-white/95 shadow-[0_18px_44px_-14px_rgba(26, 26, 26,0.4)] backdrop-blur-md sm:block"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-55" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Deployed</p>
              <p className="text-[11px] font-semibold text-gray-700">Launch-ready build</p>
            </div>
          </div>
          <div className="h-0.5 bg-gray-100">
            <motion.div className="h-full bg-emerald-400" style={{ width: `${sceneProgress}%` }} />
          </div>
        </motion.div>

        {/* Visitors chip */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 0.65, duration: 0.5 },
            y: { delay: 1.4, duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -right-2 top-[42%] z-30 hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_14px_36px_-12px_rgba(26, 26, 26,0.35)] backdrop-blur-md sm:flex"
        >
          <div className="flex -space-x-1.5">
            {['#1A1A1A', '#737373', '#D4D4D4'].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900">+128 visitors</p>
            <p className="text-[9px] text-gray-500">Live right now</p>
          </div>
        </motion.div>

        {/* Security chip */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
          transition={{
            opacity: { delay: 0.7, duration: 0.5 },
            y: { delay: 1.5, duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -left-3 bottom-14 z-30 hidden items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(26, 26, 26,0.32)] backdrop-blur-md sm:flex"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-surface-dark text-white shadow-md">
            <ShieldCheck size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900">Enterprise security</p>
            <p className="text-[10px] text-gray-500">SSL ? Hardening ? Backups</p>
          </div>
        </motion.div>

        {/* Global chip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: 0.85, duration: 0.5 },
            y: { delay: 1.8, duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -left-1 top-10 z-30 hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_14px_36px_-12px_rgba(26, 26, 26,0.3)] backdrop-blur-md sm:flex"
        >
          <Globe2 size={14} className="text-brand-500" />
          <span className="text-[10px] font-semibold text-gray-700">27+ countries</span>
        </motion.div>

        {/* Main frame */}
        <div className="relative z-10 overflow-hidden rounded-[1.4rem] border border-white/95 bg-white shadow-[0_42px_100px_-28px_rgba(26, 26, 26,0.5)]">
          {/* Shimmer sweep */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-120%', '320%'] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          />

          {/* Browser chrome */}
          <div className="relative flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 via-white to-brand-50/50 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] shadow-sm" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[11px] text-gray-400 shadow-inner ring-1 ring-gray-100">
              <Lock size={10} className="shrink-0 text-emerald-500" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={scene.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="truncate font-medium text-gray-500"
                >
                  https://wpservices.com/{scene.id}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="hidden items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[9px] font-bold text-brand-600 ring-1 ring-brand-100 sm:flex">
              <Sparkles size={10} />
              Studio
            </div>
          </div>

          {/* Stage */}
          <div className="relative aspect-[16/11.2] overflow-hidden bg-gradient-to-br from-background via-white to-accent-soft/60">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 12% 18%, rgba(26, 26, 26,0.14), transparent 40%), radial-gradient(circle at 88% 78%, rgba(184, 149, 106,0.12), transparent 36%)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26, 26, 26,0.07) 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
                className="absolute inset-0 flex flex-col p-3.5 sm:p-5"
              >
                {/* Mini site header */}
                <div className="mb-3 flex items-center justify-between rounded-xl bg-white/85 px-3 py-2 shadow-sm ring-1 ring-gray-100/90 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <div className={`relative h-7 w-7 overflow-hidden rounded-lg bg-gradient-to-br ${scene.accent} shadow-md`}>
                      <span className="absolute inset-0 bg-white/20" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold leading-none text-gray-800">WP Studio</p>
                      <p className="mt-0.5 text-[8px] font-medium text-gray-400">WordPress Agency</p>
                    </div>
                  </div>
                  <div className="hidden items-center gap-3 sm:flex">
                    {scene.nav.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.06 }}
                        className={`text-[10px] font-medium ${i === 0 ? 'text-brand-600' : 'text-gray-400'}`}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex h-7 items-center gap-1 rounded-lg bg-gradient-to-r from-brand-500 to-surface-dark px-2.5 text-[9px] font-bold text-white shadow-md shadow-brand-500/25">
                    Get Started
                    <ArrowUpRight size={11} />
                  </div>
                </div>

                <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[1.4fr_1fr]">
                  {/* Left content panel */}
                  <div className="relative flex min-h-0 flex-col overflow-hidden rounded-xl bg-white/92 p-3.5 shadow-sm ring-1 ring-gray-100/90">
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-brand-600 ring-1 ring-brand-100">
                        {scene.eyebrow}
                      </span>
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    </div>
                    <p className="text-[13px] font-extrabold tracking-tight text-gray-900 sm:text-[15px]">{scene.title}</p>
                    <p className="mt-1 text-[11px] leading-snug text-gray-500">{scene.subtitle}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {scene.features.map((f, i) => {
                        const selected = activeFeature === i;
                        return (
                          <motion.span
                            key={f}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                              opacity: 1,
                              scale: selected ? 1.06 : 1,
                            }}
                            transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 380, damping: 22 }}
                            className={`rounded-md px-2 py-1 text-[9px] font-semibold ring-1 ${
                              selected
                                ? 'bg-brand-50 text-brand-700 ring-brand-300 shadow-sm shadow-brand-500/20'
                                : 'bg-slate-50 text-gray-600 ring-gray-100'
                            }`}
                          >
                            {f}
                          </motion.span>
                        );
                      })}
                    </div>

                    {/* Mini analytics bars */}
                    <div className="mt-3 flex min-h-[44px] flex-1 items-end gap-1 rounded-lg bg-gradient-to-b from-brand-50/50 to-white p-2 ring-1 ring-brand-100/50">
                      {scene.bars.map((h, i) => (
                        <motion.div
                          key={`${scene.id}-bar-${i}`}
                          className={`flex-1 rounded-t-sm bg-gradient-to-t ${scene.accent}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.65, ease }}
                          style={{ opacity: 0.55 + (i % 3) * 0.15 }}
                        />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <motion.div
                        className={`flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r ${scene.accent} px-3 text-[10px] font-bold text-white shadow-lg shadow-brand-500/30`}
                        animate={{
                          scale: ctaPressed ? 0.94 : 1,
                          boxShadow: ctaPressed
                            ? '0 4px 12px rgba(26, 26, 26,0.35)'
                            : '0 10px 24px rgba(26, 26, 26,0.32)',
                        }}
                        transition={{
                          scale: { type: 'spring', stiffness: 420, damping: 24 },
                          boxShadow: { duration: 0.35, ease: 'easeInOut' },
                        }}
                      >
                        Start project
                        <ArrowUpRight size={11} />
                      </motion.div>
                      <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
                        <TrendingUp size={11} />
                        +24% growth
                      </div>
                    </div>

                    {/* Professional cursor + click feedback */}
                    <motion.div
                      className="pointer-events-none absolute z-20"
                      animate={{
                        left: `${cursor.x}%`,
                        top: `${cursor.y}%`,
                        scale: isClicking ? 0.82 : 1,
                        y: isClicking ? 2 : 0,
                      }}
                      transition={{
                        left: { duration: 0.85, ease },
                        top: { duration: 0.85, ease },
                        scale: { type: 'spring', stiffness: 520, damping: 28 },
                        y: { type: 'spring', stiffness: 520, damping: 28 },
                      }}
                      style={{ translateX: '-18%', translateY: '-12%' }}
                    >
                      <motion.span
                        className="absolute left-[2px] top-[2px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/25 blur-[3px]"
                        animate={{ opacity: isClicking ? 0.9 : 0.35, scale: isClicking ? 0.7 : 1 }}
                      />

                      <svg width="20" height="24" viewBox="0 0 18 22" fill="none" className="relative drop-shadow-md">
                        <path
                          d="M1 1L1 16.5L5.2 12.8L8.8 20.2L11.2 19L7.6 11.6L13.5 11.2L1 1Z"
                          fill={isClicking ? '#1A1A1A' : '#111827'}
                          stroke="white"
                          strokeWidth="1.25"
                        />
                      </svg>

                      <AnimatePresence>
                        {clickFlash > 0 && (
                          <motion.span
                            key={`ripple-a-${clickFlash}`}
                            className="absolute left-[3px] top-[3px] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-500"
                            initial={{ scale: 0.35, opacity: 0.85 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55, ease }}
                          />
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {clickFlash > 0 && (
                          <motion.span
                            key={`ripple-b-${clickFlash}`}
                            className="absolute left-[3px] top-[3px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30"
                            initial={{ scale: 0.4, opacity: 0.7 }}
                            animate={{ scale: 1.15, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Right metrics panel */}
                  <div className="flex min-h-0 flex-col gap-2.5">
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white/92 p-2.5 shadow-sm ring-1 ring-gray-100/90">
                      <ScoreRing value={scene.score} label={scene.scoreLabel} />
                      <div className="mt-1 grid w-full grid-cols-3 gap-1">
                        {scene.vitals.map((v) => (
                          <div key={v.label} className="rounded-md bg-slate-50 px-1 py-1 text-center ring-1 ring-gray-100">
                            <p className="text-[8px] font-bold text-gray-400">{v.label}</p>
                            <p className={`text-[10px] font-extrabold ${v.good ? 'text-emerald-600' : 'text-gray-700'}`}>
                              {v.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-xl bg-gradient-to-br ${scene.accent} p-3 text-white shadow-lg shadow-brand-500/30`}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Zap size={12} className="text-secondary" />
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-white/80">
                            {scene.deltaLabel}
                          </span>
                        </div>
                        <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-bold">LIVE</span>
                      </div>
                      <motion.p
                        key={scene.delta}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-extrabold tracking-tight"
                      >
                        {scene.delta}
                      </motion.p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/20">
                        <motion.div
                          className="h-full rounded-full bg-white/90"
                          initial={{ width: 0 }}
                          animate={{ width: '86%' }}
                          transition={{ delay: 0.35, duration: 0.9, ease }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mx-8 mt-1.5 h-8 rounded-b-3xl bg-gradient-to-b from-brand-500/25 to-transparent blur-[3px]" />
      </motion.div>

      <div className="mt-7 flex items-center justify-center gap-1">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setActive(i);
              setSceneProgress(0);
            }}
            aria-label={s.title}
            aria-current={i === active ? 'true' : undefined}
            className="flex h-11 min-w-[44px] items-center justify-center rounded-md"
          >
            <span
              className="relative block h-2 overflow-hidden rounded-full bg-gray-300 transition-all duration-500"
              style={{ width: i === active ? 48 : 10 }}
              aria-hidden="true"
            >
              {i === active && (
                <motion.span
                  layoutId="hero-scene-pill"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${s.accent}`}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
