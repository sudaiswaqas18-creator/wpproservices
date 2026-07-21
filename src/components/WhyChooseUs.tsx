import { Link } from 'react-router-dom';
import { DollarSign, Clock, RefreshCw, HeadphonesIcon } from 'lucide-react';

const reasons = [
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'No hidden costs. ROI-focused solutions that maximize your investment.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    desc: 'Launch quickly without compromising on quality or performance.',
  },
  {
    icon: RefreshCw,
    title: 'Multiple Iterations',
    desc: 'Flexible revisions to ensure the website matches your vision.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Dedicated Support',
    desc: 'Reliable post-launch assistance and troubleshooting.',
  },
];

const extraServices = [
  { label: 'WordPress Migration', to: '/services/wordpress-migration' },
  { label: 'Plugin Development', to: '/services/plugin-development' },
  { label: 'LearnDash Development', to: '/services/learndash-development' },
  { label: 'API & Integrations', to: '/services/api-integrations' },
  { label: 'E-Commerce Development', to: '/services/woocommerce-development' },
  { label: 'Security Hardening', to: '/services/security-hardening' },
  { label: 'Headless WordPress', to: '/services/headless-wordpress' },
  { label: 'Multisite Solutions', to: '/services/multisite-solutions' },
  { label: 'Code Audit & Optimization', to: '/services/code-audit' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="section-container">
        <h2 className="section-title">Why Businesses Choose WPServices</h2>
        <p className="section-subtitle">
          We solve the challenges most businesses face — delivering ROI-focused, scalable, and
          future-ready WordPress &amp; WooCommerce solutions.
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
          <h3 className="text-center text-xl font-bold text-gray-900">Additional WordPress Services</h3>
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
          <Link to="/contact" className="btn-primary">Get Your WordPress Website Today</Link>
        </div>
      </div>
    </section>
  );
}
