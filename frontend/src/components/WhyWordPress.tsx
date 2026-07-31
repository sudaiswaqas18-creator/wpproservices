import { Layers, TrendingUp, Search, Wallet } from 'lucide-react';
import ContactLink from './ContactLink';

const benefits = [
  {
    icon: Layers,
    title: 'Editor-friendly builds',
    desc: 'Block patterns and clean admin UX so your team can publish without breaking the layout.',
  },
  {
    icon: TrendingUp,
    title: 'Room to grow',
    desc: 'Themes and plugins structured so catalogs, courses, and content models can expand later.',
  },
  {
    icon: Search,
    title: 'SEO-ready structure',
    desc: 'Sensible URLs, headings, schema hooks, and Core Web Vitals habits before launch — not bolt-on fluff.',
  },
  {
    icon: Wallet,
    title: 'Owned, not rented',
    desc: 'You keep the WordPress site, hosting choice, and code path — with docs that make handoff real.',
  },
];

export default function WhyWordPress() {
  return (
    <section className="bg-surface-50 py-20">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Why We Build on WordPress</h2>
            <p className="section-subtitle">
              WordPress remains a strong fit for marketing sites, WooCommerce stores, and LMS products when
              the theme and plugin stack is deliberate. We choose it when editors need control, catalogs need
              flexibility, and you want a codebase your team can keep.
            </p>
            <ContactLink className="btn-primary mt-8 inline-flex">
              Talk Through a WordPress Build
            </ContactLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card">
                <Icon size={24} className="text-brand-600" />
                <h3 className="mt-3 font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
