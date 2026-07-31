import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { apiUrl } from '../config/api';
import ServicesScrollSection from './ServicesScrollSection';
import { getCaseStudyMedia, isFakeAwardContent, TRUST_AWARDS } from '../data/siteContent';
import { optimizeImageUrl } from '../utils/imageUrl';

interface SiteStat {
  stat_value: string;
  stat_label: string;
}

const FALLBACK_STATS: SiteStat[] = [
  { stat_value: '180+', stat_label: 'WordPress Projects' },
  { stat_value: '14', stat_label: 'Countries Worked With' },
  { stat_value: '4.8★', stat_label: 'Client Satisfaction' },
  { stat_value: '8+', stat_label: 'Years on WordPress' },
  { stat_value: '60+', stat_label: 'WooCommerce Stores' },
  { stat_value: '40+', stat_label: 'Custom Plugins Shipped' },
  { stat_value: '48h', stat_label: 'Typical Proposal Turnaround' },
  { stat_value: '95%', stat_label: 'Clients Under Retainer Care' },
];

interface Award { id: number; title: string; organization: string; year: string; badge_label: string; }

function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>([...TRUST_AWARDS]);

  useEffect(() => {
    fetch(apiUrl('awards'))
      .then((r) => r.json())
      .then((d) => {
        if (!Array.isArray(d) || d.length === 0) return;
        const safe = d.filter((a: Award) => !isFakeAwardContent(a.title || '', a.organization || ''));
        if (safe.length > 0) setAwards(safe);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="border-y border-border bg-gradient-to-b from-background to-surface py-16">
      <div className="section-container text-center">
        <h2 className="text-2xl font-bold text-ink">Trust Signals We Stand Behind</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-light">
          Honest delivery standards for WordPress work — not invented award badges or third-party logos we do not own.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {awards.map((a) => (
            <div key={a.id} className="rounded-xl border border-surface-200 bg-white p-5 shadow-card transition hover:border-brand-400 hover:shadow-cardHover">
              <p className="text-xs font-medium text-brand-600">{a.year}</p>
              <h3 className="mt-2 font-bold text-ink">{a.title}</h3>
              <p className="text-sm text-ink-light">{a.organization}</p>
              <p className="mt-3 text-lg font-extrabold text-brand-500">{a.badge_label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  slug: string;
  tech_stack?: string;
  result_summary?: string;
  image_url?: string;
}

const FALLBACK_FEATURED_CASES: CaseStudy[] = [
  { id: 1, title: 'Loyalty Shipping Rules That Cut Cart Friction', client: 'E-commerce Client — Grocery', slug: 'freshharvest-shipping' },
  { id: 2, title: 'Member-Only LMS With Controlled Access', client: 'Education Client — Private Cohort', slug: 'eduvault-lms' },
  { id: 3, title: 'Abandoned Cart Flows That Recover Revenue', client: 'E-commerce Client — Apparel', slug: 'stylebox-cart-recovery' },
];

function FeaturedCases() {
  const [cases, setCases] = useState<CaseStudy[]>(FALLBACK_FEATURED_CASES);

  useEffect(() => {
    fetch(apiUrl('case-studies/featured/list'))
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d) && d.length > 0) setCases(d); })
      .catch(() => {});
  }, []);

  if (!cases.length) return null;

  return (
    <section className="bg-surface-elevated py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Selected Work</p>
        <h2 className="section-title mt-2">WordPress Projects With Measurable Outcomes</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((cs) => {
            const media = getCaseStudyMedia(cs.slug);
            return (
              <article key={cs.id} className="card overflow-hidden p-0">
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={optimizeImageUrl(media.image_url, 640)}
                    alt={media.image_alt}
                    width={640}
                    height={176}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-brand-600">{media.client_label}</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{cs.title}</h3>
                  <p className="mt-3 text-xs font-bold uppercase text-gray-600">
                    Tech Stack: {cs.tech_stack || media.tech_stack}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand-600">
                    {cs.result_summary && !/[+]?\d+%/.test(cs.result_summary)
                      ? cs.result_summary
                      : media.result_summary}
                  </p>
                  <Link to={`/case-studies/${cs.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                    Read the Story <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const [stats, setStats] = useState<SiteStat[]>(FALLBACK_STATS);

  useEffect(() => {
    fetch(apiUrl('site-stats'))
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) {
          const usable = d.filter((s: SiteStat) => s.stat_value && !/^edit me$/i.test(s.stat_value));
          if (usable.length > 0) setStats(usable);
        }
      })
      .catch(() => {});
  }, []);

  const marqueeItems = [...stats, ...stats];

  return (
    <section className="stats-marquee-section relative overflow-hidden border-y border-border bg-surface-elevated py-7 sm:py-8">
      <div className="stats-marquee-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-elevated to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-elevated to-transparent sm:w-20" />

      <div className="stats-marquee-viewport">
        <div className="stats-marquee-track">
          {marqueeItems.map((s, i) => (
            <div key={`${s.stat_label}-${i}`} className="stats-marquee-item">
              <span className="stats-marquee-value">{s.stat_value}</span>
              <span className="stats-marquee-label">{s.stat_label}</span>
              <span className="stats-marquee-sep" aria-hidden="true">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="bg-surface py-16">
      <div className="section-container max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          Our Standard Is Clear: WordPress Should Feel Fast for Visitors and Steady for Your Team.
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We ship themes, stores, and plugins that hold up under real traffic — with clean code, staging QA,
          and handoff docs your editors can actually use.
        </p>
      </div>
    </section>
  );
}

function ServiceCategoriesHome() {
  return <ServicesScrollSection />;
}

export {
  AwardsSection,
  FeaturedCases,
  StatsBar,
  PhilosophySection,
  ServiceCategoriesHome,
};
