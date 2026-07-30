import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import { optimizeImageUrl } from '../utils/imageUrl';
import ContactLink from './ContactLink';

export default function Portfolio() {
  const { data: items } = useApiData('portfolio');
  const [active, setActive] = useState(0);

  if (!items.length) return null;

  return (
    <section id="portfolio" className="bg-surface-50 py-20">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">Your Vision Made Real — Websites We Built</h2>
          <p className="section-subtitle mx-auto">
            Great design speaks louder than words. Here is a showcase of custom WordPress websites,
            WooCommerce stores, and LMS dashboards we crafted for global brands.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card"
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100">
              <img
                src={optimizeImageUrl(items[active].image_url, 800)}
                alt={items[active].title}
                width={800}
                height={450}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold">
                  {items[active].category}
                </span>
                <h3 className="mt-2 text-2xl font-bold">{items[active].title}</h3>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col justify-center gap-3">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
                  active === i
                    ? 'border-brand-500 bg-brand-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.category}</div>
                </div>
                <ExternalLink size={18} className={active === i ? 'text-brand-600' : 'text-gray-400'} />
              </button>
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
