import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Zap } from 'lucide-react';
import BuyPluginButton from '../components/BuyPluginButton';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';
import { getProductEnrichment, getSupplementalProduct } from '../data/productEnrichment';
import { optimizeImageUrl } from '../utils/imageUrl';

interface Product {
  title: string; slug: string; subtitle: string; description: string; full_content: string;
  features: string[]; price: string; rating: string; rating_count: string; image_url: string;
  buy_url?: string | null;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(apiUrl(`products/${slug}`))
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setProduct({
          ...data,
          features: Array.isArray(data.features) ? data.features : [],
        });
      })
      .catch(() => {
        const fallback = getSupplementalProduct(slug);
        if (fallback) {
          const enriched = getProductEnrichment(slug);
          setProduct({ ...fallback, features: enriched.features, buy_url: null });
        } else {
          setProduct(null);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="section-container py-32 text-center text-gray-500">Loading...</div>;
  if (!product) {
    return (
      <div className="section-container py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="btn-primary mt-4 inline-flex">All Plugins</Link>
      </div>
    );
  }

  const enriched = getProductEnrichment(product.slug, product.features);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-20">
        <div className="section-container grid items-start gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            {product.image_url && (
              <img
                src={optimizeImageUrl(product.image_url, 800)}
                alt={product.title}
                width={800}
                height={600}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full rounded-2xl shadow-card ring-1 ring-gray-100"
              />
            )}
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }}>
            <Link to="/products" className="text-sm font-medium text-brand-600 hover:underline">← All Plugins</Link>
            <span className="ml-3 rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-brand-600">
              {enriched.categoryLabel}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900">{product.title}</h1>
            <p className="mt-2 text-lg text-brand-600">{product.subtitle}</p>
            <p className="mt-3 text-gray-600">{enriched.tagline}</p>
            <p className="mt-4 flex items-center gap-1 text-yellow-600">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              {product.rating} rated by {product.rating_count}
            </p>
            <p className="mt-4 text-3xl font-bold text-gray-900">{product.price}</p>
            <p className="mt-4 leading-relaxed text-gray-600">{product.full_content || product.description}</p>
            <BuyPluginButton product={product} className="btn-primary mt-8 inline-flex" />
            <p className="mt-3 text-xs text-gray-500">{enriched.compatibility}</p>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-8">
        <div className="section-container grid grid-cols-1 gap-4 sm:grid-cols-3">
          {enriched.highlights.map((h, i) => (
            <div key={h.label} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-surface-50 px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
                {i === 0 ? <Zap size={16} /> : i === 1 ? <Shield size={16} /> : <Star size={16} />}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{h.label}</p>
                <p className="font-bold text-gray-900">{h.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="section-container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <motion.div {...fadeUp}>
              <h2 className="text-xl font-bold text-gray-900">Key Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {enriched.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-500" />{f}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp}>
              <h2 className="text-xl font-bold text-gray-900">Perfect For</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {enriched.useCases.map((u) => (
                  <span key={u} className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
                    {u}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
              <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-5">
                <h3 className="text-lg font-bold text-white">Get {product.title}</h3>
                <p className="mt-1 text-sm text-brand-100">One-time purchase · Lifetime updates</p>
              </div>
              <div className="p-6">
                <p className="text-3xl font-bold text-gray-900">{product.price}</p>
                <p className="mt-1 text-sm text-gray-500">Includes 1 year of premium support</p>
                <ul className="mt-5 space-y-2.5">
                  {['Lifetime plugin updates', '1 year premium support', 'Unlimited site license', '30-day money-back guarantee'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check size={14} className="text-brand-500" />{item}
                    </li>
                  ))}
                </ul>
                <BuyPluginButton product={product} className="btn-primary mt-6 w-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <CTA />
    </>
  );
}
