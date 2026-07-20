import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import BuyPluginButton from '../components/BuyPluginButton';
import CTA from '../components/CTA';
import { apiUrl } from '../config/api';

interface Product {
  title: string; slug: string; subtitle: string; description: string; full_content: string;
  features: string[]; price: string; rating: string; rating_count: string; image_url: string;
  buy_url?: string | null;
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) fetch(apiUrl(`products/${slug}`)).then((r) => r.json()).then(setProduct).catch(() => setProduct(null));
  }, [slug]);

  if (!product) return <div className="section-container py-32 text-center text-gray-500">Loading...</div>;

  return (
    <>
      <section className="py-16">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            {product.image_url && <img src={product.image_url} alt={product.title} className="rounded-2xl shadow-card" />}
          </div>
          <div>
            <Link to="/products" className="text-sm text-brand-600 hover:underline">← All Products</Link>
            <h1 className="mt-4 text-4xl font-extrabold">{product.title}</h1>
            <p className="mt-2 text-brand-600">{product.subtitle}</p>
            <p className="mt-4 flex items-center gap-1 text-yellow-600"><Star size={16} /> {product.rating} rated by {product.rating_count}</p>
            <p className="mt-4 text-3xl font-bold">{product.price}</p>
            <p className="mt-4 text-gray-600">{product.full_content || product.description}</p>
            <ul className="mt-6 space-y-2">
              {(product.features || []).map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check size={16} className="text-brand-500" />{f}</li>
              ))}
            </ul>
            <BuyPluginButton product={product} />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
