import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Cpu, Gauge, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  desc: string;
  scoreBonus: number;
  timeEstimate: string;
}

const SOLUTION_TIERS: Option[] = [
  {
    id: 'performance',
    label: 'Core Web Vitals & Speed Hardening',
    desc: 'Sub-second LCP, 95+ PageSpeed score, database cleanup, TTFB reduction under 150ms.',
    scoreBonus: 35,
    timeEstimate: '3-5 Business Days',
  },
  {
    id: 'custom-theme',
    label: 'Custom Block Theme Engineering',
    desc: 'Bespoke, lightweight Gutenberg block themes built without heavy page builder bloat.',
    scoreBonus: 45,
    timeEstimate: '2-3 Weeks',
  },
  {
    id: 'woocommerce-scale',
    label: 'WooCommerce High-Concurrency Scale',
    desc: 'Optimized checkout flows, custom payment gateway integration, dynamic caching rules.',
    scoreBonus: 40,
    timeEstimate: '2-4 Weeks',
  },
  {
    id: 'api-automation',
    label: 'Headless / Custom API & AI Workflow',
    desc: 'REST/GraphQL endpoints, CRM synchronization, automated inventory & AI content pipelines.',
    scoreBonus: 50,
    timeEstimate: '3-5 Weeks',
  },
];

const SITE_TYPES = [
  { id: 'b2b', label: 'B2B Corporate Portal', multiplier: 1.0 },
  { id: 'ecom', label: 'High-Volume WooCommerce Store', multiplier: 1.25 },
  { id: 'membership', label: 'LMS / Membership Platform', multiplier: 1.15 },
  { id: 'agency', label: 'Multi-Site / Enterprise Network', multiplier: 1.3 },
];

export default function WPEstimatorSection() {
  const [selectedSiteType, setSelectedSiteType] = useState('ecom');
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>(['performance', 'woocommerce-scale']);

  const toggleSolution = (id: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedHealthScore = Math.min(
    99,
    60 +
      selectedSolutions.reduce((acc, curr) => {
        const item = SOLUTION_TIERS.find((s) => s.id === curr);
        return acc + (item ? item.scoreBonus : 0);
      }, 0) / 2
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-dark via-gray-900 to-surface-dark py-24 text-white">
      {/* Subtle Glow Background Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse text-brand-400" />
            <span>Interactive WordPress Architecture Estimator</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Tailor Your Enterprise <span className="gradient-text">WordPress Solution</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            Calculate estimated optimization impact, Core Web Vitals score gains, and project delivery roadmaps tailored specifically for your store or platform.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Left Controls Column */}
          <div className="space-y-6 lg:col-span-7">
            {/* Step 1: Site Type Selection */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-400">
                <Cpu size={16} /> Step 1: Select Platform Architecture
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {SITE_TYPES.map((type) => {
                  const isActive = selectedSiteType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedSiteType(type.id)}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition ${
                        isActive
                          ? 'border-brand-500 bg-brand-500/20 text-white shadow-lg shadow-brand-500/10'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <span>{type.label}</span>
                      {isActive && <CheckCircle2 size={16} className="text-brand-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Desired Objectives */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                <Gauge size={16} /> Step 2: Choose Growth Objectives
              </h3>
              <div className="mt-4 space-y-3">
                {SOLUTION_TIERS.map((tier) => {
                  const isSelected = selectedSolutions.includes(tier.id);
                  return (
                    <div
                      key={tier.id}
                      onClick={() => toggleSolution(tier.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        isSelected
                          ? 'border-brand-500 bg-brand-500/15 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-brand-500 focus:ring-brand-400"
                          />
                          <div>
                            <p className="text-sm font-bold text-white">{tier.label}</p>
                            <p className="mt-1 text-xs text-gray-400 leading-relaxed">{tier.desc}</p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-brand-300">
                          {tier.timeEstimate}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Score Card Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Target Core Web Vitals</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-400">
                  <ShieldCheck size={14} /> Production Ready
                </span>
              </div>

              {/* Animated Health Gauge */}
              <div className="my-8 text-center">
                <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border-4 border-brand-500/30 bg-surface-dark/80 shadow-inner">
                  <motion.div
                    key={calculatedHealthScore}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <span className="text-4xl font-extrabold text-white">{calculatedHealthScore}</span>
                    <span className="text-sm font-semibold text-brand-400">/100</span>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mt-0.5">Speed Index</p>
                  </motion.div>
                </div>
              </div>

              {/* Dynamic Benefits Summary */}
              <div className="space-y-3 rounded-xl border border-white/10 bg-surface-dark/60 p-4 text-xs text-gray-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="text-yellow-400" /> Target LCP Speed:
                  </span>
                  <span className="font-bold text-white">&lt; 0.9 seconds</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-green-400" /> TTFB Server Latency:
                  </span>
                  <span className="font-bold text-white">&lt; 120 ms</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-brand-400" /> Delivery Model:
                  </span>
                  <span className="font-bold text-white">Staging + Zero Downtime</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/contact"
                  className="btn-primary w-full justify-center gap-2 py-3 text-sm font-bold shadow-lg shadow-brand-500/25"
                >
                  Request Custom Scope &amp; Quote <ArrowRight size={16} />
                </Link>
                <p className="mt-3 text-center text-[11px] text-gray-400">
                  Free 30-minute technical discovery call with senior WordPress engineers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
