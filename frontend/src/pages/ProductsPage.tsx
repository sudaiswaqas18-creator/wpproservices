import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Check, ArrowRight, Package } from 'lucide-react';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';
import { getProductEnrichment, mergeProducts } from '../data/productEnrichment';

interface Product {
  id: number; title: string; slug: string; subtitle: string; description: string;
  price: string; rating: string; rating_count: string; image_url: string;
  features?: string[];
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.4 },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
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
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">High-Impact Plugins</h1>
          <p className="section-subtitle mx-auto mt-4">
            Premium WooCommerce plugins built for conversions, B2B pricing, subscriptions, and store growth.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const enriched = getProductEnrichment(p.slug, p.features);
            const previewFeatures = enriched.features.slice(0, 3);

            return (
              <motion.div key={p.id} {...fadeUp} transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition hover:border-brand-200 hover:shadow-cardHover"
                >
                  {p.image_url && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-600 backdrop-blur-sm">
                        {enriched.categoryLabel}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-600">{p.title}</h2>
                    <p className="mt-1 text-xs font-medium text-brand-600">{p.subtitle}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">{enriched.tagline}</p>

                    <ul className="mt-4 flex-1 space-y-2 border-t border-gray-50 pt-4">
                      {previewFeatures.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                          <Check size={12} className="mt-0.5 shrink-0 text-brand-500" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {enriched.useCases.slice(0, 2).map((u) => (
                        <span key={u} className="rounded-md bg-surface-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                          {u}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-4">
                      <div>
                        <span className="text-xl font-bold text-gray-900">{p.price}</span>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-yellow-600">
                          <Star size={11} className="fill-yellow-400 text-yellow-400" /> {p.rating}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition group-hover:gap-2">
                        View Plugin <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
