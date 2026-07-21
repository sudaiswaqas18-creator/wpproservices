import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Code, Shield, CreditCard, Zap, Puzzle, Check } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import { getServiceEnrichment } from '../data/serviceEnrichment';
import CTA from '../components/CTA';

const iconMap: Record<string, typeof Code> = {
  palette: Palette, code: Code, shield: Shield, 'credit-card': CreditCard, zap: Zap, puzzle: Puzzle,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
};

export default function ServicesPage() {
  const { data: services } = useApiData('services');

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/30 blur-3xl" />
        <div className="section-container relative text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our WordPress Services</h1>
          <p className="section-subtitle mx-auto mt-4">
            End-to-end WordPress development — from design and migration to custom plugins, WooCommerce, and ongoing maintenance.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Code;
            const enriched = getServiceEnrichment(s.slug, s.features);
            const previewFeatures = enriched.features.slice(0, 3);

            return (
              <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}>
                <Link
                  to={`/services/${s.slug}`}
                  className="service-card-fill group flex h-full"
                >
                  <div className="service-card-fill__inner flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-colors duration-500 group-hover:bg-white/20">
                        <Icon size={22} className="text-brand-600 transition-colors duration-500 group-hover:text-white" />
                      </div>
                      <span className="rounded-full bg-surface-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500 transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white/90">
                        {enriched.categoryLabel}
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-gray-900 transition-colors duration-500 group-hover:text-white">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2 transition-colors duration-500 group-hover:text-white/85">
                      {s.description}
                    </p>

                    <ul className="mt-4 flex-1 space-y-2 border-t border-gray-50 pt-4 transition-colors duration-500 group-hover:border-white/20">
                      {previewFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-gray-600 transition-colors duration-500 group-hover:text-white/90">
                          <Check size={12} className="mt-0.5 shrink-0 text-brand-500 transition-colors duration-500 group-hover:text-white" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4 transition-colors duration-500 group-hover:border-white/20">
                      <div className="flex gap-3 text-xs text-gray-500 transition-colors duration-500 group-hover:text-white/75">
                        {enriched.highlights.slice(0, 2).map((h) => (
                          <span key={h.label}>
                            <span className="font-semibold text-gray-700 transition-colors duration-500 group-hover:text-white">{h.value}</span>{' '}
                            <span className="text-gray-400 transition-colors duration-500 group-hover:text-white/70">{h.label}</span>
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all duration-500 group-hover:gap-2 group-hover:text-white">
                        Learn more <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
