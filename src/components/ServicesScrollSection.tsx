import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Code2,
  Layers,
  RefreshCw,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

interface ServiceLink {
  label: string;
  slug: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  links: ServiceLink[];
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'development',
    title: 'Website Development',
    desc: 'Custom tailored tech solutions scaling from robust infrastructures to beautiful, high-performance web applications.',
    icon: Code2,
    links: [
      { label: 'Custom WordPress Development', slug: 'wordpress-website-development' },
      { label: 'WooCommerce Development', slug: 'woocommerce-development' },
      { label: 'LearnDash Development', slug: 'learndash-development' },
    ],
  },
  {
    id: 'revamp',
    title: 'Website Revamp',
    desc: 'Refresh existing experiences with focused redesign and migration work that lifts conversion.',
    icon: RefreshCw,
    links: [
      { label: 'Website Redesign', slug: 'wordpress-redesign' },
      { label: 'WordPress Migration', slug: 'wordpress-migration' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    desc: 'Make sites measurably faster — page speed, server response, asset weight.',
    icon: Zap,
    links: [
      { label: 'Speed Optimization', slug: 'wordpress-speed-optimization' },
      { label: 'SEO Improvement', slug: 'wordpress-seo-services' },
    ],
  },
  {
    id: 'partnership',
    title: 'Technology Partnership',
    desc: 'Long-term retainer engagements with dedicated WordPress, WooCommerce, and LearnDash teams.',
    icon: Users,
    links: [
      { label: 'WordPress Retainer', slug: 'hire-wordpress-developers' },
      { label: 'WooCommerce Retainer', slug: 'hire-woocommerce-developers' },
    ],
  },
  {
    id: 'automation',
    title: 'AI Automations',
    desc: 'Workflow automation that saves teams hours every week.',
    icon: Bot,
    links: [{ label: 'Custom Automation Workflows', slug: 'wordpress-ai-automation' }],
  },
];

export default function ServicesScrollSection() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(visible[0].target.getAttribute('data-index'));
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { root: null, rootMargin: '-35% 0px -35% 0px', threshold: [0.25, 0.5, 0.75] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeCategory = CATEGORIES[active];

  return (
    <section className="services-scroll-section bg-surface-50 py-20 lg:py-24">
      <div className="section-container">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
              <Layers size={14} />
              Services
            </span>

            <h2 className="section-title mt-5">Our Services</h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg"
              >
                {activeCategory.desc}
              </motion.p>
            </AnimatePresence>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-500">
              Choose a category to explore the services that fit your WordPress goals.
            </p>

            <Link to="/services" className="btn-primary mt-8 inline-flex items-center gap-2">
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>

          <div ref={listRef} className="services-scroll-list space-y-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = i === active;

              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  data-index={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  onClick={() => setActive(i)}
                  layout
                  animate={{
                    opacity: isActive ? 1 : 0.55,
                    scale: isActive ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className={`services-scroll-card group w-full rounded-2xl border bg-white text-left transition-shadow duration-300 ${
                    isActive
                      ? 'border-brand-200 shadow-cardHover ring-1 ring-brand-100'
                      : 'border-slate-200/80 shadow-card hover:border-brand-100 hover:shadow-cardHover'
                  }`}
                >
                  <div className="flex items-start gap-4 p-5 sm:p-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                          : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                        {cat.title}
                      </h3>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <p className="mt-2 text-sm leading-relaxed text-gray-600">{cat.desc}</p>
                            <ul className="mt-4 space-y-2.5">
                              {cat.links.map((link) => (
                                <li key={link.slug}>
                                  <Link
                                    to={`/services/${link.slug}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition hover:text-brand-700 hover:underline"
                                  >
                                    {link.label}
                                    <ArrowRight size={14} />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
