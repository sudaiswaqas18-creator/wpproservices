import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import HeroShowcase from './HeroShowcase';
import ContactLink from './ContactLink';

const trustPoints = [
  '500+ Projects Delivered',
  '27+ Countries Served',
  '4.9★ Client Rating',
];

const highlights = [
  'Custom WordPress & WooCommerce',
  'Enterprise-grade performance',
  'Dedicated expert teams',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFF] pb-20 pt-12 lg:pb-28 lg:pt-20">
      {/* Background mesh */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-brand-300/20 blur-[100px]" />
        <motion.div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-accent-300/15 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124,58,237,0.06) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="section-container relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left — professional copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              <Sparkles size={14} className="text-brand-500" />
              Premium WordPress Development Agency
            </div>

            <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.35rem]">
              Website Experiences{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-violet-400 bg-clip-text text-transparent">
                  Beautifully Crafted
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-brand-500 to-accent-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
              We design and develop high-performance WordPress websites that help ambitious brands
              stand out, convert visitors, and scale with confidence.
            </p>

            <ul className="mt-6 space-y-2.5">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2.5 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-brand-500" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <ContactLink className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 text-base shadow-lg shadow-brand-500/25">
                Start Your Project
                <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
              </ContactLink>
              <Link to="/services" className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-base">
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-200/80 pt-8">
              {trustPoints.map((point) => (
                <span key={point} className="text-sm font-semibold text-gray-500">
                  <span className="text-brand-600">●</span> {point}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — premium animation */}
          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
