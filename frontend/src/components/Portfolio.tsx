import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import { optimizeImageUrl } from '../utils/imageUrl';
import { getPortfolioImage } from '../data/siteContent';
import ContactLink from './ContactLink';

/** Related pages for each portfolio tile */
const PORTFOLIO_LINKS: Record<string, string> = {
  'Urban Brew Coffee': '/case-studies/grocery-loyalty-shipping',
  'AccessAbility UK': '/case-studies',
  'LearnSphere Academy': '/case-studies/cohort-lms-access',
  'NovaTech Solutions': '/case-studies',
  'E-commerce Client — Specialty Coffee': '/case-studies/grocery-loyalty-shipping',
  'Services Client — Corporate Site': '/case-studies',
  'Education Client — LMS Dashboard': '/case-studies/cohort-lms-access',
  'B2B Client — Member Portal': '/case-studies',
  'Specialty retail WooCommerce storefront': '/case-studies/grocery-loyalty-shipping',
  'Services company WordPress marketing site': '/case-studies',
  'Course team LearnDash dashboard': '/case-studies/cohort-lms-access',
  'B2B member catalog portal': '/case-studies',
};

const PORTFOLIO_LINK_BY_CATEGORY: Record<string, string> = {
  'WooCommerce Store': '/case-studies/grocery-loyalty-shipping',
  'Corporate Website': '/case-studies',
  'LMS Dashboard': '/case-studies/cohort-lms-access',
  'B2B Portal': '/case-studies',
};

function portfolioHref(title: string, category: string) {
  return PORTFOLIO_LINKS[title] || PORTFOLIO_LINK_BY_CATEGORY[category] || '/case-studies';
}

export default function Portfolio() {
  const { data: items } = useApiData('portfolio');
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  const current = items[active];
  const href = portfolioHref(current.title, current.category);

  return (
    <section id="portfolio" className="bg-surface-50 py-20">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">WordPress Work Showcase</h2>
          <p className="section-subtitle mx-auto">
            Representative WordPress, WooCommerce, and LearnDash project types — each tile matches a delivery pattern we scope often.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card"
          >
            <Link to={href} className="block">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={optimizeImageUrl(getPortfolioImage(current.title, current.image_url, current.category), 800)}
                  alt={current.title}
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold">
                    {current.category}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold">{current.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/90">
                    Open related work <ExternalLink size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="flex flex-col justify-center gap-3">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-xl border px-5 py-4 transition ${
                  active === i
                    ? 'border-brand-500 bg-brand-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.category}</div>
                </button>
                <Link
                  to={portfolioHref(item.title, item.category)}
                  className={`ml-3 shrink-0 rounded-lg p-2 transition ${
                    active === i ? 'text-brand-600 hover:bg-brand-100' : 'text-gray-400 hover:bg-gray-50 hover:text-brand-600'
                  }`}
                  aria-label={`Open related page for ${item.title}`}
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            ))}
            <ContactLink className="btn-primary mt-4 inline-flex self-start">
              Let&apos;s Build Together
            </ContactLink>
          </div>
        </div>
      </div>
    </section>
  );
}
