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

const FALLBACK_AWARDS: Award[] = [
  { id: 1, title: '5-Star Client Feedback', organization: 'Verified project reviews', year: '2026', badge_label: '5.0' },
  { id: 2, title: 'WordPress Specialists', organization: 'Theme, plugin & WooCommerce focus', year: '2026', badge_label: '100%' },
  { id: 3, title: 'Performance-First Builds', organization: 'Core Web Vitals on every launch', year: '2026', badge_label: 'CWV' },
  { id: 4, title: 'Trusted Delivery Partner', organization: 'Long-term retainers & handoffs', year: '2026', badge_label: 'Partner' },
  { id: 5, title: 'Secure Launch Standard', organization: 'Hardening, backups & staging QA', year: '2026', badge_label: 'Secure' },
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
        <h2 className="text-2xl font-bold text-ink">Trust Signals We Stand Behind</h2>
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
  { id: 1, title: 'Loyalty Shipping Rules That Cut Cart Friction', client: 'Northgrove Grocers', slug: 'freshharvest-shipping', tech_stack: 'WooCommerce + Custom PHP', result_summary: '+31% Repeat Checkouts' },
  { id: 2, title: 'Member-Only LMS With Controlled Access', client: 'Brightline Learning Co.', slug: 'eduvault-lms', tech_stack: 'LearnDash + Custom Theme', result_summary: '+28% Course Completions' },
  { id: 3, title: 'Abandoned Cart Flows That Recover Revenue', client: 'Thread & Loom Studio', slug: 'stylebox-cart-recovery', tech_stack: 'Custom Plugin + Email API', result_summary: '+22% Recovered Carts' },
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
