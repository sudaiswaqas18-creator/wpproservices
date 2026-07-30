import { Check, Sparkles } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import ContactLink from './ContactLink';

export default function Pricing() {
  const { data: plans } = useApiData('pricing');

  if (!plans.length) return null;

  return (
    <section id="pricing" className="bg-surface-elevated py-20">
      <div className="section-container">
        <div className="text-center">
          <h2 className="section-title">All-In-One WordPress Packages</h2>
          <p className="section-subtitle mx-auto">
            Design, development, and advanced customization — handled by one team. No handoffs,
            no disconnect. High-performing WordPress &amp; WooCommerce websites.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border bg-white p-8 shadow-card ${
                plan.is_best_seller ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-gray-100'
              }`}
            >
              {plan.is_best_seller && (
                <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-white">
                  <Sparkles size={12} /> Best Seller
                </span>
              )}

              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{plan.tagline}</p>

              <div className="mt-6 flex items-end gap-3">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.original_price && (
                  <span className="mb-1 text-lg text-gray-400 line-through">{plan.original_price}</span>
                )}
                {plan.discount_label && (
                  <span className="mb-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700">
                    {plan.discount_label}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">One-time per business license</p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check size={18} className="mt-0.5 shrink-0 text-brand-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <ContactLink className="btn-primary mt-8 w-full block text-center">
                Get a Free Consultation
              </ContactLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
