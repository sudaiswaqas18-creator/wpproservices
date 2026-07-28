import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import { SITE, OFFICES } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-gradient-to-b from-white to-brand-50/30 text-ink-muted">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              WPServices builds scalable, secure, and conversion-focused WordPress websites for businesses worldwide.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-700">Delivering excellence across 27+ countries.</p>
            <SocialLinks className="mt-6" />
          </div>
          <div>
            <p className="font-bold text-slate-800">Our Services</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/services/wordpress-website-development" className="text-sm hover:text-brand-600">Website Development</Link></li>
              <li><Link to="/services/wordpress-redesign" className="text-sm hover:text-brand-600">Website Revamp</Link></li>
              <li><Link to="/services/wordpress-speed-optimization" className="text-sm hover:text-brand-600">Performance Optimization</Link></li>
              <li><Link to="/services/wordpress-maintenance" className="text-sm hover:text-brand-600">Technology Partnership</Link></li>
              <li><Link to="/services/wordpress-ai-automation" className="text-sm hover:text-brand-600">AI Automations</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-800">Products & Resources</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/products" className="text-sm hover:text-brand-600">WooCommerce Plugins</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-brand-600">Resources Hub</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-brand-600">Blog</Link></li>
              <li><Link to="/case-studies" className="text-sm hover:text-brand-600">Case Studies</Link></li>
              <li><Link to="/resources/guidebooks" className="text-sm hover:text-brand-600">Guidebooks</Link></li>
              <li><Link to="/resources/tools" className="text-sm hover:text-brand-600">Tools</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-800">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/contact" className="hover:text-brand-600">Hire Us</Link></li>
              <li><Link to="/about" className="hover:text-brand-600">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-600">Pricing</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-brand-600">{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city}>
              <p className="text-sm font-bold text-slate-800">{o.city}</p>
              <p className="mt-2 text-sm text-slate-500">{o.address}</p>
              <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="mt-1 block text-sm text-slate-500 transition hover:text-brand-600">
                {o.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-600 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} WPServices. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy-policy" className="transition hover:text-brand-600">Privacy Policy</Link>
            <Link to="/terms-of-service" className="transition hover:text-brand-600">Terms of Service</Link>
            <Link to="/cookie-policy" className="transition hover:text-brand-600">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
