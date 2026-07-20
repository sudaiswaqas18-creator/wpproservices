import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductBuyTarget } from '../utils/productBuy';
import { apiUrl } from '../config/api';

interface Product {
  id: number; title: string; slug: string; subtitle: string; description: string;
  price: string; rating: string; rating_count: string; image_url: string; buy_url?: string | null;
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { fetch(apiUrl('products')).then((r) => r.json()).then((d) => setProducts(Array.isArray(d) ? d : [])).catch(() => {}); }, []);

  if (!products.length) return null;

  return (
    <section className="py-20 bg-surface-50">
      <div className="section-container">
        <h2 className="section-title text-center">High-Impact WordPress Plugins</h2>
        <p className="section-subtitle mx-auto text-center">For Growth-Focused Businesses</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.id} className="card group overflow-hidden p-0">
              {p.image_url && <img src={p.image_url} alt={p.title} className="h-40 w-full object-cover" />}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 group-hover:text-brand-600">{p.title}</h3>
                <p className="mt-1 text-xs text-brand-600">{p.subtitle}</p>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.description}</p>
                <p className="mt-2 text-xs text-yellow-600">★ {p.rating} rated by {p.rating_count}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{p.price}</span>
                  {(() => {
                    const buy = getProductBuyTarget(p);
                    return buy.type === 'external' ? (
                      <a href={buy.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-600 hover:underline">Buy Plugin →</a>
                    ) : (
                      <Link to={buy.href} className="text-sm font-semibold text-brand-600 hover:underline">Buy Plugin →</Link>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/products" className="btn-outline">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
