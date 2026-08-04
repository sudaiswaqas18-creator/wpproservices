import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import { SITE, OFFICES } from '../config/site';

/** Four link columns kept to ~5 items each so headings and lists align visually */
const COLUMNS = [
  {
    title: 'Our Services',
    links: [
      { to: '/services/wordpress-website-development', label: 'Website Development' },
      { to: '/services/wordpress-redesign', label: 'Website Revamp' },
      { to: '/services/wordpress-speed-optimization', label: 'Performance Optimization' },
      { to: '/services/wordpress-maintenance', label: 'Maintenance & Care' },
      { to: '/services/api-integrations', label: 'API & Integrations' },
    ],
  },
  {
    title: 'Agency',
    links: [
      { to: '/customers', label: 'Customers' },
      { to: '/quotes', label: 'Build-Floor Quotes' },
      { to: '/portfolio', label: 'Portfolio' },
      { to: '/case-studies', label: 'Case Studies' },
      { to: '/process', label: 'Our Process' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/blog', label: 'WordPress Blog' },
      { to: '/resources/guidebooks', label: 'Guidebooks' },
      { to: '/resources/tools', label: 'Checklists & Tools' },
      { to: '/industries', label: 'Industries' },
      { to: '/faq', label: 'FAQs' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { to: '/contact', label: 'Hire Our Team' },
      { to: '/about', label: 'About WPServices' },
      { to: '/pricing', label: 'Transparent Pricing' },
      { to: '/services/wordpress-ai-automation', label: 'AI Automations' },
      { href: `mailto:${SITE.email}`, label: SITE.email, external: true },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-dark text-text-inverse">
      <div className="section-container py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="dark" to="/" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
              WPServices builds maintainable WordPress themes, WooCommerce stores, and LearnDash flows with staging
              QA, Core Web Vitals checks, and handoffs editors can use.
            </p>
            <p className="mt-3 text-xs font-semibold tracking-wide text-brand-400">
              Remote-first delivery across USA, UAE, and PK time zones.
            </p>
            <SocialLinks className="mt-6" variant="dark" />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:gap-6">
            {COLUMNS.map((col) => (
              <div key={col.title} className="min-w-0">
                <p className="text-sm font-bold text-text-inverse">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          className="break-all text-sm text-gray-400 transition hover:text-secondary"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={'to' in link ? link.to : '/'}
                          className="text-sm text-gray-400 transition hover:text-secondary"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-sm font-bold text-text-inverse">{o.city}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{o.address}</p>
              <a
                href={`tel:${o.phone.replace(/\s/g, '')}`}
                className="mt-2 block text-xs font-semibold text-brand-400 transition hover:text-secondary"
              >
                {o.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} WPServices. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy-policy" className="transition hover:text-secondary">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition hover:text-secondary">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="transition hover:text-secondary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
