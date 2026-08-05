import { useEffect, useRef, useState } from 'react';
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
    scoreLabel: 'Example CWV',
    delta: 'Staging',
    deltaLabel: 'Pre-launch QA',
    accent: 'from-sky-600 to-slate-800',
    ringFrom: '#0EA5E9',
    ringTo: '#1A1A1A',
    barClass: 'from-sky-500 to-slate-700',
    chip: 'bg-sky-50 text-sky-700 ring-sky-100',
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
    title: 'Checkout-focused storefront',
    subtitle: 'Cart and payment flows scoped for operators',
    score: 88,
    scoreLabel: 'Checkout UX',
    delta: 'Scoped',
    deltaLabel: 'Written brief',
    accent: 'from-amber-600 to-stone-800',
    ringFrom: '#D97706',
    ringTo: '#1A1A1A',
    barClass: 'from-amber-500 to-stone-700',
    chip: 'bg-amber-50 text-amber-800 ring-amber-100',
    nav: ['Shop', 'Cart', 'Account'],
    features: ['Smart cart', 'Payments', 'Upsells'],
    vitals: [
      { label: 'Cart', value: 'Clear', good: true },
      { label: 'Pay', value: 'Focused', good: true },
      { label: 'Stock', value: 'Honest', good: true },
    ],
    bars: [48, 70, 82, 64, 90, 75],
  },
  {
    id: 'scale',
    eyebrow: 'Care & scale',
    title: 'Steady performance habits',
    subtitle: 'Core Web Vitals checked on real templates',
    score: 96,
    scoreLabel: 'Launch ready',
    delta: 'Care',
    deltaLabel: 'Retainer path',
    accent: 'from-teal-600 to-slate-800',
    ringFrom: '#0D9488',
    ringTo: '#1A1A1A',
    barClass: 'from-teal-500 to-slate-700',
    chip: 'bg-teal-50 text-teal-800 ring-teal-100',
    nav: ['Platform', 'Security', 'Support'],
    features: ['CDN', 'WAF', 'Backups'],
    vitals: [
      { label: 'SSL', value: 'On', good: true },
      { label: 'Backup', value: 'Scheduled', good: true },
      { label: 'Updates', value: 'Staged', good: true },
    ],
    bars: [88, 94, 86, 97, 91, 99],
  },
];

const ease = [0.25, 0.1, 0.25, 1] as const;
/** Long enough for move → pause → click on 3 chips + CTA */
const SCENE_MS = 12000;
const cursorEase = [0.33, 1, 0.68, 1] as const;

function ScoreRing({
  value,
  label,
  ringFrom,
  ringTo,
}: {
  value: number;
  label: string;
  ringFrom: string;
  ringTo: string;
}) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value > 100 ? 100 : value)) / 100;
  const fill = value > 100 ? 1 : value / (value <= 50 && label.includes('%') ? 50 : 100);
  const ringPct = Math.min(1, fill);
  const offset = c * (1 - (value <= 50 && label.includes('lift') ? value / 50 : pct || ringPct));
  const gradId = `heroScoreGrad-${label.replace(/\s/g, '')}`;

  return (
    <div className="relative flex h-[100px] w-[100px] items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E8E8E8" strokeWidth="8" />
        <motion.circle
          key={`${value}-${label}`}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.15, ease }}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ringFrom} />
            <stop offset="100%" stopColor={ringTo} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="text-xl font-extrabold tracking-tight text-gray-900"
        >
          {value}
        </motion.span>
        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400">{label}</span>
      </div>
    </div>
  );
}

type CursorTarget = { x: number; y: number; kind: 'feature' | 'cta'; featureIndex?: number };

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState({ x: 12, y: 18 });
  const [sceneProgress, setSceneProgress] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [clickFlash, setClickFlash] = useState(0);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [ctaPressed, setCtaPressed] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const measureTarget = (el: HTMLElement | null): { x: number; y: number } | null => {
    const stage = stageRef.current;
    if (!stage || !el) return null;
    const stageBox = stage.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    if (stageBox.width < 8 || stageBox.height < 8) return null;
    return {
      x: ((box.left + box.width / 2 - stageBox.left) / stageBox.width) * 100,
      y: ((box.top + box.height / 2 - stageBox.top) / stageBox.height) * 100,
    };
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % scenes.length);
    }, SCENE_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setSceneProgress(0);
    const start = Date.now();
    const tick = window.setInterval(() => {
      setSceneProgress(Math.min(100, ((Date.now() - start) / SCENE_MS) * 100));
    }, 80);
    return () => window.clearInterval(tick);
  }, [active]);

  const scene = scenes[active];

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
      setCursor({ x: 10, y: 14 });
      featureRefs.current = [];

      await wait(750);
      if (cancelled) return;

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
      if (cancelled) return;

      const buildPath = (): CursorTarget[] => {
        const path: CursorTarget[] = [];
        scenes[active].features.forEach((_, i) => {
          const pos = measureTarget(featureRefs.current[i]);
          if (pos) path.push({ ...pos, kind: 'feature', featureIndex: i });
        });
        const cta = measureTarget(ctaRef.current);
        if (cta) path.push({ ...cta, kind: 'cta' });
        return path;
      };

      let path = buildPath();
      if (!path.length) {
        path = [
          { x: 22, y: 38, kind: 'feature', featureIndex: 0 },
          { x: 38, y: 38, kind: 'feature', featureIndex: 1 },
          { x: 54, y: 38, kind: 'feature', featureIndex: 2 },
          { x: 24, y: 78, kind: 'cta' },
        ];
      }

      for (const step of path) {
        if (cancelled) return;

        if (step.kind === 'feature' && step.featureIndex != null) {
          const live = measureTarget(featureRefs.current[step.featureIndex]);
          if (live) {
            step.x = live.x;
            step.y = live.y;
          }
        }
        if (step.kind === 'cta') {
          const live = measureTarget(ctaRef.current);
          if (live) {
            step.x = live.x;
            step.y = live.y;
          }
        }

        setIsClicking(false);
        setCursor({ x: step.x, y: step.y });
        await wait(950);
        if (cancelled) return;

        await wait(220);
        if (cancelled) return;

        setIsClicking(true);
        await wait(110);
        if (cancelled) return;

        setClickFlash((n) => n + 1);
        if (step.kind === 'feature' && step.featureIndex != null) {
          setActiveFeature(step.featureIndex);
          setCtaPressed(false);
        } else {
          setCtaPressed(true);
        }

        await wait(180);
        if (cancelled) return;

        setIsClicking(false);
        await wait(420);
        if (cancelled) return;

        if (step.kind === 'cta') setCtaPressed(false);
      }

      setActiveFeature(null);
      setCursor({ x: 14, y: 20 });
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08, ease }}
      className="relative mx-auto w-full max-w-md sm:max-w-lg xl:max-w-none"
    >
      <div className="pointer-events-none absolute -inset-6 rounded-[42%] bg-gradient-to-br from-sky-100/50 via-amber-50/30 to-teal-100/40 blur-2xl sm:-inset-10 sm:blur-3xl" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{
            opacity: { delay: 0.35, duration: 0.45 },
            y: { delay: 1, duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -right-1 top-5 z-30 hidden overflow-hidden rounded-2xl border border-white/90 bg-white/95 shadow-[0_18px_44px_-14px_rgba(26,26,26,0.28)] backdrop-blur-md xl:block"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal-400 opacity-40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-teal-500 ring-2 ring-teal-100" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Staging</p>
              <p className="text-[11px] font-semibold text-gray-700">QA before go-live</p>
            </div>
          </div>
          <div className="h-0.5 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-sky-500"
              animate={{ width: `${sceneProgress}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0, y: [0, 3, 0] }}
          transition={{
            opacity: { delay: 0.5, duration: 0.45 },
            y: { delay: 1.2, duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -right-2 top-[42%] z-30 hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_14px_36px_-12px_rgba(26,26,26,0.22)] backdrop-blur-md xl:flex"
        >
          <div className="flex -space-x-1.5">
            {['#0EA5E9', '#D97706', '#0D9488'].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900">Editor-ready</p>
            <p className="text-[9px] text-gray-500">Gutenberg patterns</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0, y: [0, 3, 0] }}
          transition={{
            opacity: { delay: 0.55, duration: 0.45 },
            y: { delay: 1.4, duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -left-3 bottom-14 z-30 hidden items-center gap-2.5 rounded-2xl border border-white/90 bg-white/95 px-3.5 py-2.5 shadow-[0_16px_40px_-12px_rgba(26,26,26,0.22)] backdrop-blur-md xl:flex"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-slate-800 text-white shadow-md">
            <ShieldCheck size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900">Security basics</p>
            <p className="text-[10px] text-gray-500">SSL · Hardening · Backups</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, -3, 0] }}
          transition={{
            opacity: { delay: 0.65, duration: 0.45 },
            y: { delay: 1.6, duration: 6.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute -left-1 top-10 z-30 hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_14px_36px_-12px_rgba(26,26,26,0.2)] backdrop-blur-md xl:flex"
        >
          <Globe2 size={14} className="text-sky-600" />
          <span className="text-[10px] font-semibold text-gray-700">WooCommerce · LearnDash</span>
        </motion.div>

        <motion.div
          className="relative z-10 overflow-hidden rounded-[1.4rem] border border-white/95 bg-white shadow-[0_36px_90px_-28px_rgba(26,26,26,0.38)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/4 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ['-140%', '380%'] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
          />

          <div className="relative flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 via-white to-brand-50/40 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] shadow-sm" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-[11px] text-gray-400 shadow-inner ring-1 ring-gray-100">
              <Lock size={10} className="shrink-0 text-brand-500" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={scene.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="truncate font-medium text-gray-500"
                >
                  https://wpservices.studio/{scene.id}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="hidden items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-[9px] font-bold text-brand-600 ring-1 ring-brand-100 sm:flex">
              <Sparkles size={10} />
              Studio
            </div>
          </div>

          <div className="relative aspect-[16/11.2] overflow-hidden bg-gradient-to-br from-background via-white to-brand-50/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease }}
                className="absolute inset-0 flex flex-col p-3.5 sm:p-5"
              >
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
                      <span
                        key={item}
                        className={`text-[10px] font-medium ${i === 0 ? 'text-brand-600' : 'text-gray-400'}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className={`flex h-7 items-center gap-1 rounded-lg bg-gradient-to-r ${scene.accent} px-2.5 text-[9px] font-bold text-white shadow-md`}>
                    Get Started
                    <ArrowUpRight size={11} />
                  </div>
                </div>

                <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[1.4fr_1fr]">
                  <div
                    ref={stageRef}
                    className="relative flex min-h-0 flex-col overflow-hidden rounded-xl bg-white/92 p-3.5 shadow-sm ring-1 ring-gray-100/90"
                  >
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] ring-1 ${scene.chip}`}>
                        {scene.eyebrow}
                      </span>
                      <CheckCircle2 size={12} className="text-teal-600" />
                    </div>
                    <p className="text-[13px] font-extrabold tracking-tight text-gray-900 sm:text-[15px]">{scene.title}</p>
                    <p className="mt-1 text-[11px] leading-snug text-gray-500">{scene.subtitle}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {scene.features.map((f, i) => {
                        const selected = activeFeature === i;
                        return (
                          <motion.span
                            key={f}
                            ref={(el) => {
                              featureRefs.current[i] = el;
                            }}
                            layout
                            animate={{
                              scale: selected ? 1.06 : 1,
                              backgroundColor: selected ? '#EEF2FF' : '#F8FAFC',
                            }}
                            transition={{ duration: 0.25, ease }}
                            className={`rounded-md px-2 py-1 text-[9px] font-semibold ring-1 ${
                              selected
                                ? 'text-brand-700 ring-brand-400 shadow-sm'
                                : 'text-gray-600 ring-gray-100'
                            }`}
                          >
                            {f}
                          </motion.span>
                        );
                      })}
                    </div>

                    <div className="mt-3 flex min-h-[44px] flex-1 items-end gap-1 rounded-lg bg-gradient-to-b from-slate-50 to-white p-2 ring-1 ring-slate-100/80">
                      {scene.bars.map((h, i) => (
                        <motion.div
                          key={`${scene.id}-bar-${i}`}
                          className={`flex-1 rounded-t-sm bg-gradient-to-t ${scene.barClass}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.15 + i * 0.04, duration: 0.55, ease }}
                          style={{ opacity: 0.65 + (i % 3) * 0.12 }}
                        />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <motion.div
                        ref={ctaRef}
                        className={`flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r ${scene.accent} px-3 text-[10px] font-bold text-white shadow-md`}
                        animate={{
                          scale: ctaPressed ? 0.94 : 1,
                          boxShadow: ctaPressed
                            ? '0 0 0 3px rgba(14,165,233,0.35)'
                            : '0 4px 12px rgba(26,26,26,0.18)',
                        }}
                        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      >
                        Start project
                        <ArrowUpRight size={11} />
                      </motion.div>
                      <div className="flex items-center gap-1 text-[9px] font-semibold text-amber-700">
                        <TrendingUp size={11} />
                        Clear handoff
                      </div>
                    </div>

                    <motion.div
                      className="pointer-events-none absolute z-20"
                      animate={{
                        left: `${cursor.x}%`,
                        top: `${cursor.y}%`,
                        scale: isClicking ? 0.86 : 1,
                      }}
                      transition={{
                        left: { duration: 0.9, ease: cursorEase },
                        top: { duration: 0.9, ease: cursorEase },
                        scale: { duration: 0.14 },
                      }}
                      style={{ translateX: '-12%', translateY: '-8%' }}
                    >
                      <svg width="20" height="24" viewBox="0 0 18 22" fill="none" className="relative drop-shadow-md">
                        <path
                          d="M1 1L1 16.5L5.2 12.8L8.8 20.2L11.2 19L7.6 11.6L13.5 11.2L1 1Z"
                          fill={isClicking ? '#000000' : '#1A1A1A'}
                          stroke="white"
                          strokeWidth="1.25"
                        />
                      </svg>
                      <AnimatePresence>
                        {clickFlash > 0 && (
                          <motion.span
                            key={`ripple-${clickFlash}`}
                            className="absolute left-[3px] top-[3px] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-500/70 bg-sky-400/20"
                            initial={{ scale: 0.35, opacity: 0.75 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.42, ease }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="flex min-h-0 flex-col gap-2.5">
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white/92 p-2.5 shadow-sm ring-1 ring-gray-100/90">
                      <ScoreRing
                        value={scene.score}
                        label={scene.scoreLabel}
                        ringFrom={scene.ringFrom}
                        ringTo={scene.ringTo}
                      />
                      <div className="mt-1 grid w-full grid-cols-3 gap-1">
                        {scene.vitals.map((v) => (
                          <div key={v.label} className="rounded-md bg-slate-50 px-1 py-1 text-center ring-1 ring-gray-100">
                            <p className="text-[8px] font-bold text-gray-400">{v.label}</p>
                            <p className={`text-[10px] font-extrabold ${v.good ? 'text-teal-700' : 'text-gray-700'}`}>
                              {v.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-xl bg-gradient-to-br ${scene.accent} p-3 text-white shadow-lg`}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Zap size={12} className="text-white/80" />
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-white/80">
                            {scene.deltaLabel}
                          </span>
                        </div>
                        <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] font-bold">LIVE</span>
                      </div>
                      <motion.p
                        key={scene.delta}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease }}
                        className="text-2xl font-extrabold tracking-tight"
                      >
                        {scene.delta}
                      </motion.p>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/20">
                        <motion.div
                          className="h-full rounded-full bg-white/90"
                          initial={{ width: 0 }}
                          animate={{ width: '86%' }}
                          transition={{ delay: 0.25, duration: 0.8, ease }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mx-8 mt-1.5 h-6 rounded-b-3xl bg-gradient-to-b from-sky-500/15 via-teal-500/10 to-transparent blur-[2px]" />
      </div>

      <div className="mt-7 flex items-center justify-center gap-1">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={s.title}
            aria-current={i === active ? 'true' : undefined}
            className="flex h-11 min-w-[44px] items-center justify-center rounded-md"
          >
            <span
              className="relative block h-2 overflow-hidden rounded-full bg-gray-300 transition-all duration-400"
              style={{ width: i === active ? 44 : 8 }}
              aria-hidden="true"
            >
              {i === active && (
                <motion.span
                  layoutId="hero-scene-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 via-teal-500 to-amber-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
