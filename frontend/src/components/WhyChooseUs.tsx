import { Link } from 'react-router-dom';
import { DollarSign, Clock, RefreshCw, HeadphonesIcon } from 'lucide-react';

const reasons = [
  {
    icon: DollarSign,
    title: 'Written scope before build',
    desc: 'You see what is included for themes, plugins, and WooCommerce work — before development starts.',
  },
  {
    icon: Clock,
    title: 'Staging-first delivery',
    desc: 'Review WordPress changes on staging when hosting allows, then cut over with a clear checklist.',
  },
  {
    icon: RefreshCw,
    title: 'Editor-friendly outcomes',
    desc: 'Templates and blocks your team can update without breaking layouts or checkout flows.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Care after launch',
    desc: 'Support windows and retainers for updates, small fixes, and WordPress plugin hygiene.',
  },
];

const extraServices = [
  { label: 'WordPress Migration', to: '/services/wordpress-migration' },
  { label: 'Custom Plugin Development', to: '/services/plugin-development' },
  { label: 'LearnDash Development', to: '/services/learndash-development' },
  { label: 'API & Integrations', to: '/services/api-integrations' },
  { label: 'WooCommerce Development', to: '/services/woocommerce-development' },
  { label: 'WordPress Maintenance', to: '/services/wordpress-maintenance' },
  { label: 'WordPress Speed Optimization', to: '/services/wordpress-speed-optimization' },
  { label: 'WordPress SEO Services', to: '/services/wordpress-seo-services' },
  { label: 'WordPress Redesign', to: '/services/wordpress-redesign' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="section-container">
        <h2 className="section-title">What You Get Before We Write a Line of PHP</h2>
        <p className="section-subtitle">
          Written scopes, staging QA, editor-friendly templates, and care after launch — the habits that
          keep WordPress and WooCommerce projects calm after go-live.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
                <Icon size={26} className="text-brand-600" />
              </div>
              <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-gray-900">Explore More WordPress Services</h3>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {extraServices.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-surface-50 px-5 py-4 text-sm font-medium text-gray-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {s.label}
                <span className="text-brand-500">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" className="btn-primary">Start a WordPress Conversation</Link>
        </div>
      </div>
    </section>
  );
}
