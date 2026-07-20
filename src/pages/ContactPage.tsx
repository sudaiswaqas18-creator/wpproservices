import { useSearchParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const purchaseProduct = searchParams.get('product');
  const purchasePrice = searchParams.get('price');

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {purchaseProduct ? 'Purchase Enquiry' : 'Contact Us'}
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            {purchaseProduct
              ? `Complete the form below to buy ${purchaseProduct}${purchasePrice ? ` (${purchasePrice})` : ''}.`
              : 'Start with a free consultation. We respond within 24 hours.'}
          </p>
          {purchaseProduct && (
            <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800">
              <ShoppingBag size={16} />
              {purchaseProduct}{purchasePrice ? ` — ${purchasePrice}` : ''}
            </div>
          )}
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li><strong className="text-gray-900">Email:</strong> hello@pixelforge.digital</li>
              <li><strong className="text-gray-900">Phone:</strong> +1 (800) 555-0199</li>
              <li><strong className="text-gray-900">Office:</strong> San Francisco, CA</li>
            </ul>
            <div className="mt-8 rounded-2xl bg-brand-50 p-6">
              <h3 className="font-bold text-gray-900">Why PixelForge?</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>✓ Free initial consultation</li>
                <li>✓ 10+ years WordPress expertise</li>
                <li>✓ 1,500+ successful projects</li>
                <li>✓ Dedicated post-launch support</li>
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
