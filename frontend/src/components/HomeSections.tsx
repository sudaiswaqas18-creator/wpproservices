import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { apiUrl } from '../config/api';
import ServicesScrollSection from './ServicesScrollSection';

interface SiteStat {
  stat_value: string;
  stat_label: string;
}

const FALLBACK_STATS: SiteStat[] = [
  { stat_value: '500+', stat_label: 'Projects Delivered' },
  { stat_value: '27+', stat_label: 'Countries Served' },
  { stat_value: '4.9★', stat_label: 'Clutch Rating' },
  { stat_value: '10+', stat_label: 'Years Experience' },
  { stat_value: '99.9%', stat_label: 'Uptime SLA' },
  { stat_value: '50+', stat_label: 'Expert Developers' },
  { stat_value: '24/7', stat_label: 'Support Available' },
  { stat_value: '100%', stat_label: 'Client Satisfaction' },
];

interface Award { id: number; title: string; organization: string; year: string; badge_label: string; }

const FALLBACK_AWARDS: Award[] = [
  { id: 1, title: 'Best UI Design', organization: 'CSS Design Awards', year: '2026', badge_label: 'WINNER' },
  { id: 2, title: 'Best UX Design', organization: 'CSS Design Awards', year: '2026', badge_label: 'WINNER' },
  { id: 3, title: 'Best Innovation', organization: 'CSS Design Awards', year: '2026', badge_label: 'WINNER' },
  { id: 4, title: 'Top WordPress Agency', organization: 'Clutch', year: '2026', badge_label: '4.7/5' },
  { id: 5, title: 'Top Design Agency', organization: 'DesignRush', year: '2026', badge_label: '4.8/5' },
];

function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>(FALLBACK_AWARDS);

  useEffect(() => {
    fetch(apiUrl('awards'))
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d) && d.length > 0) setAwards(d); })
      .catch(() => {});
  }, []);

  return (
    <section className="border-y border-border bg-gradient-to-b from-background to-surface py-16">
      <div className="section-container text-center">
        <h2 className="text-2xl font-bold text-ink">Global Awards & Recognitions</h2>
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

interface CaseStudy { id: number; title: string; client: string; slug: string; tech_stack: string; result_summary: string; }

const FALLBACK_FEATURED_CASES: CaseStudy[] = [
  { id: 1, title: 'Smart Shipping Rules Boost Repeat Orders', client: 'FreshHarvest Market', slug: 'freshharvest-shipping', tech_stack: 'WooCommerce + PHP', result_summary: '+38% Returning Orders' },
  { id: 2, title: 'Gated LMS for Private Education', client: 'EduVault Members', slug: 'eduvault-lms', tech_stack: 'LearnDash + React', result_summary: '+32% Completion Rate' },
  { id: 3, title: 'Cart Recovery Increases Revenue', client: 'StyleBox Boutique', slug: 'stylebox-cart-recovery', tech_stack: 'Custom Plugin + REST API', result_summary: '+25% Recovery Rate' },
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
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Featured Cases</p>
        <h2 className="section-title mt-2">Driving Change Through Innovative Projects</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((cs) => (
            <article key={cs.id} className="card">
              <p className="text-xs font-medium text-brand-600">{cs.client}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{cs.title}</h3>
              {cs.tech_stack && <p className="mt-3 text-xs font-bold uppercase text-gray-600">Tech Stack: {cs.tech_stack}</p>}
              {cs.result_summary && <p className="mt-2 text-sm font-semibold text-brand-600">{cs.result_summary}</p>}
              <Link to={`/case-studies/${cs.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
                Read the Story <ArrowRight size={14} />
              </Link>
            </article>
          ))}
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
        if (Array.isArray(d) && d.length > 0) setStats(d);
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
          Our Bar Is Simple: Websites Should Feel Effortless For Users, And Stay Dependable For Teams.
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          That is why we build solutions that perform when real users, real traffic, and real growth hit.
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
