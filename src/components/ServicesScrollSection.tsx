import { useCallback, useEffect, useRef, useState } from 'react';
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

const COUNT = CATEGORIES.length;
/** Tall section: each category + generous buffer so 05 never gets skipped */
const SECTION_HEIGHT_VH = COUNT * 140 + 160;
const CARD_STEP_PX = 96;

/** Last category (05) owns the final 25% of scroll — cannot be skipped */
function progressToIndex(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  if (p >= 0.76) return COUNT - 1;
  const slice = 0.76 / (COUNT - 1);
  return Math.min(COUNT - 2, Math.floor(p / slice));
}

function indexToProgress(index: number) {
  if (index >= COUNT - 1) return 0.88;
  const slice = 0.76 / (COUNT - 1);
  return index * slice + slice * 0.5;
}

export default function ServicesScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const updateFromScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const scrollRange = el.offsetHeight - window.innerHeight;
    if (scrollRange <= 0) return;

    const scrolled = Math.min(scrollRange, Math.max(0, -el.getBoundingClientRect().top));
    const p = scrolled / scrollRange;
    setScrollProgress(p);
    setActive(progressToIndex(p));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    updateFromScroll();
    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('resize', updateFromScroll);
    return () => {
      window.removeEventListener('scroll', updateFromScroll);
      window.removeEventListener('resize', updateFromScroll);
    };
  }, [isDesktop, updateFromScroll]);

  const handleCategoryClick = (index: number) => {
    setActive(index);
    const el = sectionRef.current;
    if (!isDesktop || !el) return;

    const scrollRange = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + indexToProgress(index) * scrollRange;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const activeCategory = CATEGORIES[active];

  const content = (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
          <Layers size={14} />
          Services
        </span>

        <h2 className="section-title mt-5">Our Services</h2>

        <p className="mt-2 text-sm font-semibold text-brand-600">
          {String(active + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
          <span className="ml-2 font-normal text-gray-500">{activeCategory.title}</span>
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg"
          >
            {activeCategory.desc}
          </motion.p>
        </AnimatePresence>

        {isDesktop && (
          <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-brand-500 transition-[width] duration-150 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        )}

        <div className="mt-5 flex gap-2">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-brand-500' : 'w-1.5 bg-gray-300 hover:bg-brand-200'
              }`}
              aria-label={`Show ${cat.title}`}
            />
          ))}
        </div>

        <Link to="/services" className="btn-primary mt-8 inline-flex items-center gap-2">
          View All Services
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="relative overflow-hidden lg:h-[min(440px,58vh)]">
        <motion.div
          className="space-y-3 lg:space-y-4"
          animate={{ y: isDesktop ? -active * CARD_STEP_PX : 0 }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        >
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = i === active;

            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(i)}
                animate={{ opacity: isActive ? 1 : 0.38, scale: isActive ? 1 : 0.97 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className={`services-scroll-card group w-full rounded-2xl border bg-white text-left ${
                  isActive
                    ? 'border-brand-200 shadow-cardHover ring-1 ring-brand-100'
                    : 'border-slate-200/80 shadow-card'
                }`}
              >
                <div className="flex items-start gap-4 p-5 sm:p-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                        : 'bg-brand-50 text-brand-600'
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className={`text-lg font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {cat.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2 text-sm leading-relaxed text-gray-600">{cat.desc}</p>
                          <ul className="mt-4 space-y-2.5">
                            {cat.links.map((link) => (
                              <li key={link.slug}>
                                <Link
                                  to={`/services/${link.slug}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
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
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-surface-50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface-50 to-transparent" />
      </div>
    </div>
  );

  if (!isDesktop) {
    return (
      <section className="services-scroll-section bg-surface-50 py-20">
        <div className="section-container">{content}</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="services-scroll-section relative bg-surface-50"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center py-8">
        <div className="section-container w-full">{content}</div>
      </div>
    </section>
  );
}
