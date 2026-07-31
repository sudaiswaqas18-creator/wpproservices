import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Check, ArrowRight, Package } from 'lucide-react';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';
import { getProductEnrichment, mergeProducts } from '../data/productEnrichment';
import { getProductImage } from '../data/siteContent';
import {
  filterPluginsByCategory,
  getPluginCategoryById,
  PLUGIN_CATEGORIES,
} from '../data/productCategories';
import { optimizeImageUrl } from '../utils/imageUrl';

interface Product {
  id: number; title: string; slug: string; subtitle: string; description: string;
  price: string; rating: string; rating_count: string; image_url: string;
  features?: string[];
  category?: string | null;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const activeCategory = getPluginCategoryById(categoryId);
  const filtered = filterPluginsByCategory(products, categoryId);

  useEffect(() => {
    fetch(apiUrl('products'))
      .then((r) => r.json())
      .then((d) => setProducts(mergeProducts(Array.isArray(d) ? d : [])))
      .catch(() => setProducts(mergeProducts([])));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="section-container relative text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
            <Package size={12} /> WooCommerce Plugins
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {activeCategory ? activeCategory.title : 'WooCommerce Plugins for Real Stores'}
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            {activeCategory
              ? activeCategory.desc
              : 'Six plugin categories for B2B pricing, catalogs, campaigns, inventory ops, checkout trust, and subscriptions — each with original product copy and a Get Plugin enquiry flow.'}
          </p>
          {activeCategory && (
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
            >
              <ArrowRight size={14} className="rotate-180" />
              View all plugins
            </Link>
          )}
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-6">
        <div className="section-container flex flex-wrap justify-center gap-2">
          <Link
            to="/products"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !categoryId
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                : 'bg-surface-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            All Plugins
          </Link>
          {PLUGIN_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                categoryId === cat.id
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'bg-surface-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="section-container">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-card">
              <p className="text-lg font-semibold text-gray-900">No plugins found in this category yet.</p>
              <Link to="/products" className="btn-primary mt-6 inline-flex">Browse all plugins</Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => {
                const enriched = getProductEnrichment(p.slug, p.features);
                const previewFeatures = enriched.features.slice(0, 2);
                const media = getProductImage(p.slug, p.image_url);

                return (
                  <motion.div key={p.id} {...fadeUp} transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}>
                    <Link
                      to={`/products/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition hover:border-brand-200 hover:shadow-cardHover"
                    >
                      <div className="relative h-28 overflow-hidden sm:h-32">
                        <img
                          src={optimizeImageUrl(media.image_url, 640)}
                          alt={media.image_alt}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                          width={640}
                          height={128}
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-600 backdrop-blur-sm">
                          {enriched.categoryLabel}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h2 className="text-base font-bold text-gray-900 group-hover:text-brand-600">{p.title}</h2>
                        <p className="mt-1 text-xs font-medium text-brand-600">{p.subtitle}</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">{enriched.tagline}</p>

                        <ul className="mt-3 flex-1 space-y-1.5 border-t border-gray-50 pt-3">
                          {previewFeatures.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                              <Check size={12} className="mt-0.5 shrink-0 text-brand-500" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
                          <div>
                            <span className="text-lg font-bold text-gray-900">{p.price}</span>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-yellow-600">
                              <Star size={11} className="fill-yellow-400 text-yellow-400" /> {p.rating}
                            </p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition group-hover:gap-2">
                            View <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}
