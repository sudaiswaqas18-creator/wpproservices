import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Clock, Printer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SEO from '../seo/SEO';
import CTA from '../CTA';

export interface LegalSection {
  id: string;
  number: number;
  title: string;
  icon: LucideIcon;
  content: ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  readingMinutes: number;
  seoTitle: string;
  seoDescription: string;
  seoPath: string;
  sections: LegalSection[];
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  readingMinutes,
  seoTitle,
  seoDescription,
  seoPath,
  sections,
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path={seoPath} />

      <section className="legal-hero relative overflow-hidden bg-gradient-to-br from-accent-soft via-surface to-surface-elevated py-16 lg:py-24 print:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26, 26, 26,0.08),_transparent_60%)]" />
        <div className="section-container relative text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">{subtitle}</p>
          <motion.div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm">
              <Clock size={14} />
              {readingMinutes} min read
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">Last updated: {lastUpdated}</span>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-sm transition hover:text-brand-600 print:hidden"
            >
              <Printer size={14} />
              Print
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16 print:py-6">
        <div className="section-container grid gap-12 lg:grid-cols-4">
          <nav className="hidden lg:block lg:sticky lg:top-24 lg:self-start print:hidden" aria-label="Table of contents">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Table of Contents</p>
            <ol className="mt-4 space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                      activeId === s.id
                        ? 'bg-brand-50 font-semibold text-brand-600'
                        : 'text-gray-600 hover:bg-surface-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-xs text-brand-400">{s.number}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="lg:col-span-3 space-y-6">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.id}
                  id={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                  className="legal-section scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8 print:shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 print:hidden">
                      <Icon size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      <span className="mr-2 text-brand-500">{s.number}.</span>
                      {s.title}
                    </h2>
                  </div>
                  <div className="prose-legal mt-4 space-y-4 text-sm leading-relaxed text-gray-600">{s.content}</div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 left-4 z-40 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg print:hidden sm:left-6 lg:bottom-8"
          aria-label="Back to top of page"
        >
          Back to top
        </button>
      )}

      <div className="print:hidden">
        <CTA />
      </div>
    </>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function LegalUl({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
