import { Link } from 'react-router-dom';
import Process from '../components/Process';
import TechStack from '../components/TechStack';
import CTA from '../components/CTA';

const values = [
  {
    title: 'WordPress craft over shortcuts',
    desc: 'We ship themes, plugins, and WooCommerce flows that editors can maintain — not fragile page-builder stacks that collapse under the next update.',
  },
  {
    title: 'Staging before production',
    desc: 'Every meaningful change is reviewed on staging when hosting allows. Cutover plans, redirects, and rollback paths are part of the job, not an afterthought.',
  },
  {
    title: 'Honest scope, written first',
    desc: 'You get a clear brief before build work starts: what is included, what is not, and how success will be measured on your WordPress site.',
  },
];

const milestones = [
  { v: 'Themes', l: 'Custom WordPress builds editors can maintain' },
  { v: 'Stores', l: 'WooCommerce catalogs, checkout & inventory logic' },
  { v: 'Care', l: 'Updates, backups, staging checks & retainers' },
];
export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About WPServices</h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            WPServices is a WordPress development studio built for teams that need dependable themes,
            plugins, WooCommerce stores, and long-term care — not generic “website packages.” We work
            inside the WordPress ecosystem every day: Gutenberg and classic editors, custom post types,
            WP-CLI, staging migrations, and Core Web Vitals tuning.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface-50">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-brand-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
              Why We Exist
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Engineered to Eliminate Silent WordPress Failures
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Too many enterprise WordPress sites look finished on launch day but fail quietly underneath — broken SEO redirects, fragile plugin stacks that collapse during core updates, and slow database queries that choke checkout speed. We founded WPServices to establish a higher standard of WordPress engineering.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">Zero-Fragility Themes</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Lightweight Gutenberg block architecture built for high-speed delivery without fragile, bloated page builders.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">High-Scale WooCommerce</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Optimized checkout flows and object caching tailored for high concurrency, preventing cart drop-offs during spikes.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">Staging Verification</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Every code deployment undergoes rigorous staging tests, automated database backups, and zero-downtime cutover plans.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">Editor Governance</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600">
                Intuitive publishing experiences designed so non-technical content managers can update layouts without developer aid.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Process />

      <section className="py-16">
        <div className="section-container">
          <h2 className="section-title text-center">How we work together</h2>
          <p className="section-subtitle mx-auto mt-4 text-center">
            Culture that keeps WordPress projects calm, measurable, and editor-friendly.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((item) => (
              <div key={item.title} className="card text-left">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-50 py-16">
        <div className="section-container max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">The team behind the work</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Our practitioners cover theme architecture, WooCommerce checkout logic, plugin development,
            performance and security hardening, and content migration. You talk with people who know
            WordPress admin, not a rotating sales desk. Dedicated retainers pair you with developers who
            already understand your stack, hosting, and editorial habits.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {milestones.map((s) => (
            <div key={s.l} className="card">
              <div className="text-4xl font-extrabold text-brand-600">{s.v}</div>
              <p className="mt-2 text-gray-600">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="section-container mt-6 max-w-2xl text-center text-sm text-gray-500">
          Focus areas for WPServices — verified client counts and ratings are published only when we can back them with real references.
        </p>
      </section>

      <TechStack />
      <section className="pb-16 text-center">
        <Link to="/contact" className="btn-primary">Talk Through a WordPress Project</Link>
      </section>
      <CTA />
    </>
  );
}
