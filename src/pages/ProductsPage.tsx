import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';

interface Product {
  id: number; title: string; slug: string; subtitle: string; description: string;
  price: string; rating: string; rating_count: string; image_url: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { fetch(apiUrl('products')).then((r) => r.json()).then((d) => setProducts(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">WooCommerce Plugins</h1>
          <p className="section-subtitle mx-auto mt-4">High-impact plugins for growth-focused businesses.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-8 sm:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="card flex gap-6 overflow-hidden p-0">
              {p.image_url && <img src={p.image_url} alt={p.title} className="hidden w-48 object-cover sm:block" />}
              <div className="p-6">
                <h2 className="text-xl font-bold">{p.title}</h2>
                <p className="text-sm text-brand-600">{p.subtitle}</p>
                <p className="mt-2 text-sm text-gray-600">{p.description}</p>
                <p className="mt-2 flex items-center gap-1 text-sm text-yellow-600"><Star size={14} /> {p.rating} — {p.rating_count}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-2xl font-bold">{p.price}</span>
                  <Link to={`/products/${p.slug}`} className="btn-primary text-sm">View Plugin</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
