import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Check, ArrowRight } from 'lucide-react';
import { apiUrl } from '../config/api';
import { getProductEnrichment, mergeProducts } from '../data/productEnrichment';
import { getProductImage } from '../data/siteContent';
import {
  filterPluginsByCategory,
} from '../data/productCategories';
import { optimizeImageUrl } from '../utils/imageUrl';

interface Product {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  price: string;
  rating: string;
  rating_count: string;
  image_url: string;
  features?: string[];
  category?: string | null;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.28 },
};

const CATEGORY_CHIPS: { id: string | null; label: string }[] = [
  { id: null, label: 'All' },
  { id: 'sales-b2b', label: 'Sales & B2B' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'conversion', label: 'Conversion' },
  { id: 'ops-inventory', label: 'Ops' },
  { id: 'trust-checkout', label: 'Checkout' },
  { id: 'subscriptions', label: 'Subscriptions' },
];

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch(apiUrl('products'))
      .then((r) => r.json())
      .then((d) => setProducts(mergeProducts(Array.isArray(d) ? d : [])))
      .catch(() => setProducts(mergeProducts([])));
  }, []);

  const filtered = useMemo(() => {
    const list = filterPluginsByCategory(products, activeCategory);
    // Homepage: All shows a compact preview; a category shows its full set
    return activeCategory ? list : list.slice(0, 8);
  }, [products, activeCategory]);

  if (!products.length) return null;

  const viewAllTo = activeCategory
    ? `/products?category=${activeCategory}`
    : '/products';

  return (
    <section className="bg-surface-elevated py-20">
      <div className="section-container">
        <h2 className="section-title text-center">WooCommerce Plugins Built for Real Stores</h2>
        <p className="section-subtitle mx-auto text-center">
          WooCommerce-only extensions across six store jobs: B2B pricing, catalogs, campaigns, inventory, checkout trust, and subscriptions.
        </p>

        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter plugins by category"
        >
          {CATEGORY_CHIPS.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(c.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 ring-1 ring-brand-500'
                    : 'bg-white text-gray-600 shadow-sm ring-1 ring-gray-100 hover:text-brand-700 hover:ring-brand-200'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const enriched = getProductEnrichment(p.slug, p.features);
              const previewFeatures = enriched.features.slice(0, 2);
              const media = getProductImage(p.slug, p.image_url);

              return (
                <motion.div
                  key={p.slug}
                  layout
                  {...fadeUp}
                  transition={{ duration: 0.28, delay: Math.min(i * 0.04, 0.2) }}
                >
                  <Link
                    to={`/products/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition hover:border-brand-200 hover:shadow-cardHover"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={optimizeImageUrl(media.image_url, 480)}
                        alt={media.image_alt}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={480}
                        height={192}
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold uppercase text-brand-600 backdrop-blur-sm">
                        {enriched.categoryLabel}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-brand-600">{p.title}</h3>
                      <p className="mt-0.5 text-xs text-brand-600">{p.subtitle}</p>
                      <p className="mt-2 text-xs leading-relaxed text-gray-600 line-clamp-2">{enriched.tagline}</p>

                      <ul className="mt-3 flex-1 space-y-1.5">
                        {previewFeatures.map((f) => (
                          <li key={f} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                            <Check size={10} className="mt-0.5 shrink-0 text-brand-500" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-2 text-[10px] text-yellow-600">
                        <Star size={10} className="mr-0.5 inline fill-yellow-400 text-yellow-400" />
                        {p.rating} · {p.rating_count}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-3">
                        <span className="text-base font-bold text-gray-900">{p.price}</span>
                        <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand-600">
                          View <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-500">No plugins in this category yet.</p>
        )}

        <div className="mt-8 text-center">
          <Link to={viewAllTo} className="btn-outline">
            {activeCategory ? 'View category on plugins page' : 'View All Plugins'}
          </Link>
        </div>
      </div>
    </section>
  );
}
