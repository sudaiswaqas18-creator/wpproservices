import { Link } from 'react-router-dom';
import Logo from './Logo';

const offices = [
  { city: 'USA Office', address: '2035 Sunset Lake Road, Suite B-2, Newark, Delaware, 19702, United States' },
  { city: 'Mumbai Office', address: '105, Aniket, Kolbad, Thane (West), Mumbai, India – 400 601' },
  { city: 'Dubai Office', address: 'T1-12-4K RAKEZ Amenity Centre, Al Hamra Industrial Zone FZ, RAK, UAE' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-900 text-gray-300">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo className="[&_span]:text-white [&_.text-brand-600]:text-brand-400" />
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              PixelForge Digital builds scalable, secure, and conversion-focused WordPress websites for businesses worldwide.
            </p>
            <p className="mt-4 text-sm font-semibold text-white">Delivering excellence across 27+ countries.</p>
          </div>
          <div>
            <h4 className="font-bold text-white">Our Services</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/services/wordpress-website-development" className="text-sm hover:text-brand-400">Website Development</Link></li>
              <li><Link to="/services/wordpress-redesign" className="text-sm hover:text-brand-400">Website Revamp</Link></li>
              <li><Link to="/services/wordpress-speed-optimization" className="text-sm hover:text-brand-400">Performance Optimization</Link></li>
              <li><Link to="/services/wordpress-maintenance" className="text-sm hover:text-brand-400">Technology Partnership</Link></li>
              <li><Link to="/services/wordpress-ai-automation" className="text-sm hover:text-brand-400">AI Automations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Products & Resources</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/products" className="text-sm hover:text-brand-400">WooCommerce Plugins</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-brand-400">Resources Hub</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-brand-400">Blog</Link></li>
              <li><Link to="/case-studies" className="text-sm hover:text-brand-400">Case Studies</Link></li>
              <li><Link to="/resources/guidebooks" className="text-sm hover:text-brand-400">Guidebooks</Link></li>
              <li><Link to="/resources/tools" className="text-sm hover:text-brand-400">Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/contact" className="hover:text-brand-400">Hire Us</Link></li>
              <li><Link to="/about" className="hover:text-brand-400">About Us</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-400">Pricing</Link></li>
              <li>hello@pixelforge.digital</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-gray-800 pt-8 md:grid-cols-3">
          {offices.map((o) => (
            <div key={o.city}>
              <h5 className="text-sm font-bold text-white">{o.city}</h5>
              <p className="mt-2 text-sm text-gray-400">{o.address}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-sm text-gray-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} PixelForge Digital. All rights reserved.</p>
          <Link to="/privacy-policy" className="hover:text-brand-400">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
