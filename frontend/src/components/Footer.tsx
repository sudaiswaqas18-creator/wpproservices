import { Link } from 'react-router-dom';
import Logo from './Logo';
import SocialLinks from './SocialLinks';
import { SITE, OFFICES } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-dark text-text-inverse">
      <div className="section-container py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo variant="dark" to="/" />
            <p className="mt-4 text-sm leading-relaxed text-gray-300">
              WPServices is an enterprise-grade WordPress &amp; WooCommerce engineering agency. We specialize in bespoke theme architecture, high-concurrency e-commerce development, custom API integrations, Core Web Vitals optimization, and proactive site care for scaling global brands.
            </p>
            <p className="mt-3 text-xs font-semibold tracking-wide text-brand-400">
              Remote-first delivery across global time zones (USA, UAE, PK).
            </p>
            <SocialLinks className="mt-6" variant="dark" />
          </div>
          <div>
            <p className="font-bold text-text-inverse">Our Services</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/services/wordpress-website-development" className="text-sm text-gray-400 transition hover:text-secondary">Website Development</Link></li>
              <li><Link to="/services/wordpress-redesign" className="text-sm text-gray-400 transition hover:text-secondary">Website Revamp</Link></li>
              <li><Link to="/services/wordpress-speed-optimization" className="text-sm text-gray-400 transition hover:text-secondary">Performance Optimization</Link></li>
              <li><Link to="/services/wordpress-maintenance" className="text-sm text-gray-400 transition hover:text-secondary">Maintenance &amp; Care</Link></li>
              <li><Link to="/services/wordpress-ai-automation" className="text-sm text-gray-400 transition hover:text-secondary">AI Automations</Link></li>
              <li><Link to="/services/api-integrations" className="text-sm text-gray-400 transition hover:text-secondary">API &amp; System Integration</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-text-inverse">Agency &amp; Resources</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/portfolio" className="text-sm text-gray-400 transition hover:text-secondary">Portfolio Showcase</Link></li>
              <li><Link to="/process" className="text-sm text-gray-400 transition hover:text-secondary">Our Engineering Process</Link></li>
              <li><Link to="/case-studies" className="text-sm text-gray-400 transition hover:text-secondary">Case Studies</Link></li>
              <li><Link to="/industries" className="text-sm text-gray-400 transition hover:text-secondary">Industry Solutions</Link></li>
              <li><Link to="/resources/guidebooks" className="text-sm text-gray-400 transition hover:text-secondary">Technical Guidebooks</Link></li>
              <li><Link to="/resources/tools" className="text-sm text-gray-400 transition hover:text-secondary">Performance Tools</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-400 transition hover:text-secondary">WordPress Insights Blog</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-400 transition hover:text-secondary">Frequently Asked Questions</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-text-inverse">Connect</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/contact" className="text-gray-400 transition hover:text-secondary">Hire Our Team</Link></li>
              <li><Link to="/about" className="text-gray-400 transition hover:text-secondary">About WPServices</Link></li>
              <li><Link to="/pricing" className="text-gray-400 transition hover:text-secondary">Transparent Pricing</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="text-gray-400 transition hover:text-secondary">{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 md:grid-cols-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm">
              <p className="text-sm font-bold text-text-inverse">{o.city}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{o.address}</p>
              <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="mt-2 block text-xs font-semibold text-brand-400 transition hover:text-secondary">
                {o.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} WPServices. All rights reserved. Enterprise WordPress Development Studio.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy-policy" className="transition hover:text-secondary">Privacy Policy</Link>
            <Link to="/terms-of-service" className="transition hover:text-secondary">Terms of Service</Link>
            <Link to="/cookie-policy" className="transition hover:text-secondary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
