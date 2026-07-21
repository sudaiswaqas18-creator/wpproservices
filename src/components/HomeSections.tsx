import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { apiUrl } from '../config/api';

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

function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>([]);
  useEffect(() => { fetch('/api/awards').then((r) => r.json()).then((d) => setAwards(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  return (
    <section className="border-y border-brand-100/60 bg-gradient-to-b from-brand-50/50 to-white py-16">
      <div className="section-container text-center">
        <h2 className="text-2xl font-bold text-slate-800">Global Awards & Recognitions</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {awards.map((a) => (
            <div key={a.id} className="rounded-xl border border-brand-100/80 bg-white p-5 shadow-card transition hover:border-brand-200 hover:shadow-cardHover">
              <p className="text-xs font-medium text-brand-600">{a.year}</p>
              <h3 className="mt-2 font-bold text-slate-800">{a.title}</h3>
              <p className="text-sm text-slate-500">{a.organization}</p>
              <p className="mt-3 text-lg font-extrabold text-brand-600">{a.badge_label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CaseStudy { id: number; title: string; client: string; slug: string; tech_stack: string; result_summary: string; }

function FeaturedCases() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  useEffect(() => { fetch('/api/case-studies/featured/list').then((r) => r.json()).then((d) => setCases(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  if (!cases.length) return null;

  return (
    <section className="py-20">
      <div className="section-container">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Featured Cases</p>
        <h2 className="section-title mt-2">Driving Change Through Innovative Projects</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((cs) => (
            <article key={cs.id} className="card">
              <p className="text-xs font-medium text-brand-600">{cs.client}</p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{cs.title}</h3>
              {cs.tech_stack && <p className="mt-3 text-xs font-bold uppercase text-gray-400">Tech Stack: {cs.tech_stack}</p>}
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
    <section className="stats-marquee-section relative overflow-hidden border-y border-brand-200/60 bg-brand-50 py-7 sm:py-8">
      <div className="stats-marquee-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-brand-50 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-brand-50 to-transparent sm:w-20" />

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
    <section className="py-16 bg-white">
      <div className="section-container max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
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
  const categories = [
    { title: 'Website Development', desc: 'Custom tailored tech solutions scaling from robust infrastructures to beautiful, high-performance web applications.', links: [{ l: 'Custom WordPress Development', s: 'wordpress-website-development' }, { l: 'WooCommerce Development', s: 'woocommerce-development' }, { l: 'LearnDash Development', s: 'learndash-development' }] },
    { title: 'Website Revamp', desc: 'Refresh existing experiences with focused redesign and migration work that lifts conversion.', links: [{ l: 'Website Redesign', s: 'wordpress-redesign' }, { l: 'WordPress Migration', s: 'wordpress-migration' }] },
    { title: 'Performance Optimization', desc: 'Make sites measurably faster — page speed, server response, asset weight.', links: [{ l: 'Speed Optimization', s: 'wordpress-speed-optimization' }, { l: 'SEO Improvement', s: 'wordpress-seo-services' }] },
    { title: 'Technology Partnership', desc: 'Long-term retainer engagements with dedicated WordPress / WooCommerce / LearnDash teams.', links: [{ l: 'WordPress Retainer', s: 'hire-wordpress-developers' }, { l: 'WooCommerce Retainer', s: 'hire-woocommerce-developers' }] },
    { title: 'AI Automations', desc: 'Workflow automation that saves teams hours every week.', links: [{ l: 'Custom Automation Workflows', s: 'wordpress-ai-automation' }] },
  ];

  return (
    <section className="py-20 bg-surface-50">
      <div className="section-container">
        <h2 className="section-title text-center">Our Services</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.title} className="card">
              <h3 className="text-lg font-bold text-gray-900">{cat.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{cat.desc}</p>
              <ul className="mt-4 space-y-2">
                {cat.links.map((link) => (
                  <li key={link.s}>
                    <Link to={`/services/${link.s}`} className="text-sm font-medium text-brand-600 hover:underline">{link.l} →</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"><Link to="/services" className="btn-primary">View All Services</Link></div>
      </div>
    </section>
  );
}

export {
  AwardsSection,
  FeaturedCases,
  StatsBar,
  PhilosophySection,
  ServiceCategoriesHome,
};
