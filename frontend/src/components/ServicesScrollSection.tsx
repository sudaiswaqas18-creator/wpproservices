import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/serviceCategories';

const CATEGORIES = SERVICE_CATEGORIES;
const COUNT = CATEGORIES.length;
const SECTION_HEIGHT_VH = COUNT * 140 + 160;
const CARD_STEP_PX = 96;

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

  // Below lg: scroll-linked animation pauses — keep presence with a gentle autoplay cycle
  useEffect(() => {
    if (isDesktop) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % COUNT);
    }, 3800);
    return () => window.clearInterval(id);
  }, [isDesktop]);

  const handleDotClick = (index: number) => {
    setActive(index);
    const el = sectionRef.current;
    if (!isDesktop || !el) return;

    const scrollRange = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + indexToProgress(index) * scrollRange;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const activeCategory = CATEGORIES[active];

  const content = (
    <motion.div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
          <Layers size={14} />
          WordPress Services
        </span>

        <h2 className="section-title mt-5">How We Help WordPress Teams Ship</h2>

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
          <motion.div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-brand-500 transition-[width] duration-150 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </motion.div>
        )}

        <div className="mt-5 flex flex-wrap gap-1">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleDotClick(i)}
              className="flex h-11 min-w-[44px] items-center justify-center rounded-md"
              aria-label={`Show ${cat.title}`}
              aria-current={i === active ? 'true' : undefined}
            >
              <span
                className={`block h-2 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-brand-500' : 'w-2 bg-gray-400 hover:bg-brand-200'
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={`/services?category=${activeCategory.id}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            View {activeCategory.title}
            <ArrowRight size={16} />
          </Link>
          <Link to="/services" className="btn-outline inline-flex items-center gap-2">
            All Services
          </Link>
        </div>
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
              <motion.div
                key={cat.id}
                animate={{ opacity: isActive ? 1 : 0.72, scale: isActive ? 1 : 0.97 }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link
                  to={`/services?category=${cat.id}`}
                  className={`services-scroll-card group block w-full rounded-2xl border bg-white text-left transition-shadow ${
                    isActive
                      ? 'border-brand-200 shadow-cardHover ring-1 ring-brand-100'
                      : 'border-slate-200/80 shadow-card hover:border-brand-200'
                  }`}
                >
                  <motion.div className="flex items-start gap-4 p-5 sm:p-6">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                          : 'bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <motion.div className="min-w-0 flex-1 text-left">
                      <h3 className={`text-lg font-bold ${isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
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
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.location.href = `/services/${link.slug}`;
                                    }}
                                    className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                                  >
                                    {link.label}
                                    <ArrowRight size={14} />
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2">
                              View category services <ArrowRight size={14} />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-surface-50 to-transparent" />
        <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface-50 to-transparent" />
      </div>
    </motion.div>
  );

  if (!isDesktop) {
    return (
      <section className="services-scroll-section bg-background py-20">
        <div className="section-container">{content}</div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="services-scroll-section relative bg-background"
      style={{ height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center py-8">
        <div className="section-container w-full">{content}</div>
      </div>
    </section>
  );
}
