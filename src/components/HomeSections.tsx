import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { apiUrl } from '../config/api';

interface Award { id: number; title: string; organization: string; year: string; badge_label: string; }

function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>([]);
  useEffect(() => { fetch(apiUrl('awards')).then((r) => r.json()).then((d) => setAwards(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="section-container text-center">
        <h2 className="text-2xl font-bold">Global Awards & Recognitions</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {awards.map((a) => (
            <div key={a.id} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5">
              <p className="text-xs text-brand-400">{a.year}</p>
              <h3 className="mt-2 font-bold">{a.title}</h3>
              <p className="text-sm text-gray-400">{a.organization}</p>
              <p className="mt-3 text-lg font-extrabold text-brand-400">{a.badge_label}</p>
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
  useEffect(() => { fetch(apiUrl('case-studies/featured/list')).then((r) => r.json()).then((d) => setCases(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

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
  const [stats, setStats] = useState<{ stat_value: string; stat_label: string }[]>([]);
  useEffect(() => { fetch(apiUrl('site-stats')).then((r) => r.json()).then((d) => setStats(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  return (
    <section className="border-y border-gray-100 bg-brand-50 py-10">
      <div className="section-container grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.stat_label} className="text-center">
            <p className="text-3xl font-extrabold text-brand-600">{s.stat_value}</p>
            <p className="mt-1 text-sm text-gray-600">{s.stat_label}</p>
          </div>
        ))}
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
