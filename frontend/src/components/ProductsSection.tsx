import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, ArrowRight } from 'lucide-react';
import { apiUrl } from '../config/api';
import { getProductEnrichment, mergeProducts } from '../data/productEnrichment';
import { optimizeImageUrl } from '../utils/imageUrl';

interface Product {
  id: number; title: string; slug: string; subtitle: string; description: string;
  price: string; rating: string; rating_count: string; image_url: string;
  features?: string[];
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.35 },
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch(apiUrl('products'))
      .then((r) => r.json())
      .then((d) => setProducts(mergeProducts(Array.isArray(d) ? d : []).slice(0, 8)))
      .catch(() => setProducts(mergeProducts([]).slice(0, 8)));
  }, []);

  if (!products.length) return null;

  return (
    <section className="bg-surface-elevated py-20">
      <div className="section-container">
        <h2 className="section-title text-center">High-Impact WordPress Plugins</h2>
        <p className="section-subtitle mx-auto text-center">For Growth-Focused Businesses</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => {
            const enriched = getProductEnrichment(p.slug, p.features);
            const previewFeatures = enriched.features.slice(0, 2);

            return (
              <motion.div key={p.id} {...fadeUp} transition={{ duration: 0.35, delay: i * 0.05 }}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition hover:border-brand-200 hover:shadow-cardHover"
                >
                  {p.image_url && (
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={optimizeImageUrl(p.image_url, 480)}
                        alt={p.title}
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
                  )}
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
        </div>
        <div className="mt-8 text-center">
          <Link to="/products" className="btn-outline">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
