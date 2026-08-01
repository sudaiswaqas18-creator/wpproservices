import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import { NAV_RESOURCE_LINKS } from '../data/navData';

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">WordPress Resources</h1>
          <p className="section-subtitle mx-auto mt-4">
            Guides, tools, proof pages, and operator notes for teams running WordPress, WooCommerce, and LearnDash.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {NAV_RESOURCE_LINKS.map(({ href, icon: Icon, title, desc }) => (
            <Link key={href} to={href} className="card group text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 group-hover:bg-brand-500">
                <Icon size={26} className="text-brand-600 group-hover:text-white" />
              </div>
              <h2 className="mt-4 text-lg font-bold group-hover:text-brand-600">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
