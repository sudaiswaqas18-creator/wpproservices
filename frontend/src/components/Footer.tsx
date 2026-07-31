import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import { SITE, OFFICES } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-dark text-text-inverse">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="dark" />
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              WPServices is a WordPress development studio focused on custom themes, WooCommerce,
              plugins, migrations, and ongoing care for teams that need reliable delivery.
            </p>
            <p className="mt-4 text-sm font-semibold text-gray-300">Remote-first delivery across multiple time zones.</p>
            <SocialLinks className="mt-6" variant="dark" />
          </div>
          <div>
            <p className="font-bold text-text-inverse">Our Services</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/services/wordpress-website-development" className="text-sm text-gray-400 transition hover:text-secondary">Website Development</Link></li>
              <li><Link to="/services/wordpress-redesign" className="text-sm text-gray-400 transition hover:text-secondary">Website Revamp</Link></li>
              <li><Link to="/services/wordpress-speed-optimization" className="text-sm text-gray-400 transition hover:text-secondary">Performance Optimization</Link></li>
              <li><Link to="/services/wordpress-maintenance" className="text-sm text-gray-400 transition hover:text-secondary">Technology Partnership</Link></li>
              <li><Link to="/services/wordpress-ai-automation" className="text-sm text-gray-400 transition hover:text-secondary">AI Automations</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-text-inverse">Plugins & Resources</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/products" className="text-sm text-gray-400 transition hover:text-secondary">WooCommerce Plugins</Link></li>
              <li><Link to="/portfolio" className="text-sm text-gray-400 transition hover:text-secondary">Portfolio</Link></li>
              <li><Link to="/process" className="text-sm text-gray-400 transition hover:text-secondary">Our Process</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-400 transition hover:text-secondary">FAQs</Link></li>
              <li><Link to="/industries" className="text-sm text-gray-400 transition hover:text-secondary">Industries</Link></li>
              <li><Link to="/resources" className="text-sm text-gray-400 transition hover:text-secondary">Resources Hub</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-400 transition hover:text-secondary">Blog</Link></li>
              <li><Link to="/case-studies" className="text-sm text-gray-400 transition hover:text-secondary">Case Studies</Link></li>
              <li><Link to="/resources/guidebooks" className="text-sm text-gray-400 transition hover:text-secondary">Guidebooks</Link></li>
              <li><Link to="/resources/tools" className="text-sm text-gray-400 transition hover:text-secondary">Tools</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-text-inverse">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/contact" className="text-gray-400 transition hover:text-secondary">Hire Us</Link></li>
              <li><Link to="/about" className="text-gray-400 transition hover:text-secondary">About Us</Link></li>
              <li><Link to="/pricing" className="text-gray-400 transition hover:text-secondary">Pricing</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="text-gray-400 transition hover:text-secondary">{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city}>
              <p className="text-sm font-bold text-text-inverse">{o.city}</p>
              <p className="mt-2 text-sm text-gray-400">{o.address}</p>
              <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="mt-1 block text-sm text-gray-400 transition hover:text-secondary">
                {o.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} WPServices. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy-policy" className="transition hover:text-secondary">Privacy Policy</Link>
            <Link to="/terms-of-service" className="transition hover:text-secondary">Terms of Service</Link>
            <Link to="/cookie-policy" className="transition hover:text-secondary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
