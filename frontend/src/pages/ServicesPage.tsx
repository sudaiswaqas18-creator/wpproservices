import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Code, Shield, CreditCard, Zap, Puzzle, Check } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import { getServiceEnrichment } from '../data/serviceEnrichment';
import { getServiceImage } from '../data/siteContent';
import { filterServicesByCategory, getCategoryById, SERVICE_CATEGORIES } from '../data/serviceCategories';
import { optimizeImageUrl } from '../utils/imageUrl';
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
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const activeCategory = getCategoryById(categoryId);
  const filteredServices = filterServicesByCategory(services, categoryId);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-100/30 blur-3xl" />
        <motion.div className="section-container relative text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {activeCategory ? activeCategory.title : 'WordPress Services'}
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            {activeCategory
              ? activeCategory.desc
              : 'Custom themes, WooCommerce, LearnDash, migrations, speed, SEO, security care, and dedicated WordPress developers — scoped per engagement with staging and handoff documentation.'}
          </p>

          {activeCategory && (
            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
            >
              <ArrowRight size={14} className="rotate-180" />
              View all services
            </Link>
          )}
        </motion.div>
      </section>

      <section className="border-b border-gray-100 bg-white py-6">
        <div className="section-container flex flex-wrap justify-center gap-2">
          <Link
            to="/services"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !categoryId
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                : 'bg-surface-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            All Services
          </Link>
          {SERVICE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/services?category=${cat.id}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                categoryId === cat.id
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-surface-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="section-container">
          {filteredServices.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-card">
              <p className="text-lg font-semibold text-gray-900">No services found in this category yet.</p>
              <Link to="/services" className="btn-primary mt-6 inline-flex">Browse all services</Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((s, i) => {
                const Icon = iconMap[s.icon] || Code;
                const enriched = getServiceEnrichment(s.slug, s.features);
                const previewFeatures = enriched.features.slice(0, 3);
                const media = getServiceImage(s.slug);

                return (
                  <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="service-card-fill group flex h-full"
                    >
                      <div className="service-card-fill__inner flex h-full flex-col overflow-hidden">
                        <div className="relative h-40 overflow-hidden bg-surface-100">
                          <img
                            src={optimizeImageUrl(media.image_url, 640)}
                            alt={media.image_alt}
                            width={640}
                            height={160}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.opacity = '0';
                            }}
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-600 backdrop-blur-sm">
                            {enriched.categoryLabel}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-start justify-between">
                          <motion.div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition-colors duration-500 group-hover:bg-white/20">
                            <Icon size={22} className="text-brand-600 transition-colors duration-500 group-hover:text-white" />
                          </motion.div>
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
                          <motion.div className="flex gap-3 text-xs text-gray-500 transition-colors duration-500 group-hover:text-white/75">
                            {enriched.highlights.slice(0, 2).map((h) => (
                              <span key={h.label}>
                                <span className="font-semibold text-gray-700 transition-colors duration-500 group-hover:text-white">{h.value}</span>{' '}
                                <span className="text-gray-400 transition-colors duration-500 group-hover:text-white/70">{h.label}</span>
                              </span>
                            ))}
                          </motion.div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all duration-500 group-hover:gap-2 group-hover:text-white">
                            Learn more <ArrowRight size={14} />
                          </span>
                        </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}
