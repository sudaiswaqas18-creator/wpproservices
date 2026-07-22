import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Mail, Search } from 'lucide-react';
import SEO from '../components/seo/SEO';

const popularLinks = [
  { label: 'Our Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | WPServices"
        description="The page you are looking for does not exist or has been moved."
        path="/404"
        noindex
      />

      <section className="section-container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[7rem] font-extrabold leading-none tracking-tighter text-brand-500/20 sm:text-[9rem]"
          aria-hidden
        >
          404
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="-mt-16 sm:-mt-20"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Page Not Found</h1>
          <p className="mx-auto mt-4 max-w-md text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <Home size={16} />
              Go Home
            </Link>
            <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
              <Mail size={16} />
              Contact Us
            </Link>
            <Link to="/services" className="btn-outline inline-flex items-center gap-2">
              View Services
              <ArrowRight size={16} />
            </Link>
          </div>

          <motion.div className="mx-auto mt-10 max-w-md">
            <label htmlFor="404-search" className="sr-only">Search pages</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                id="404-search"
                type="search"
                placeholder="Try searching services..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.target as HTMLInputElement).value.trim();
                    window.location.href = q ? `/services?category=development` : '/services';
                  }
                }}
              />
            </div>
          </motion.div>

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Popular pages</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-brand-200 hover:text-brand-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
