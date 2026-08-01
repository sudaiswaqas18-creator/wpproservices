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
          <h1 className="text-4xl font-extrabold text-gray-900">About WPServices</h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            WPServices is a WordPress development studio built for teams that need dependable themes,
            plugins, WooCommerce stores, and long-term care — not generic “website packages.” We work
            inside the WordPress ecosystem every day: Gutenberg and classic editors, custom post types,
            WP-CLI, staging migrations, and Core Web Vitals tuning.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Why we exist</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Too many WordPress projects ship looking finished and fail quietly — broken redirects after
            a migration, checkout friction from plugin collisions, or themes editors cannot update without
            calling a developer. We started WPServices to close that gap: discovery-led scoping, maintainable
            code, and handoffs your internal team can actually use.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Whether you need a custom theme, a WooCommerce rebuild, LearnDash configuration, or a retainer
            for ongoing plugin work, the through-line is the same — WordPress specialists who document
            decisions and leave the site healthier than we found it.
          </p>
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
        <div className="section-container grid gap-8 sm:grid-cols-3 text-center">
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
