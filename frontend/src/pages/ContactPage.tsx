import ContactForm from '../components/ContactForm';
import { SITE, OFFICES } from '../config/site';

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Our WordPress Team</h1>
          <p className="section-subtitle mx-auto mt-4">
            Tell us about your theme, WooCommerce store, migration, or retainer needs. We typically reply within 1–2 business days.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reach the studio</h2>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li>
                <strong className="text-gray-900">Email:</strong>{' '}
                <a href={`mailto:${SITE.email}`} className="hover:text-brand-600">{SITE.email}</a>
              </li>
              <li>
                <strong className="text-gray-900">Phone:</strong>{' '}
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="hover:text-brand-600">{SITE.phone}</a>
              </li>
            </ul>

            <div className="mt-8 space-y-5">
              <h3 className="font-bold text-gray-900">Offices</h3>
              {OFFICES.map((o) => (
                <div key={o.city}>
                  <p className="font-semibold text-gray-900">{o.city}</p>
                  <p className="mt-1 text-sm text-gray-600">{o.address}</p>
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="mt-0.5 block text-sm text-brand-600 hover:underline">
                    {o.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-brand-50 p-6">
              <h3 className="font-bold text-gray-900">What to expect</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>✓ Discovery call focused on your WordPress stack</li>
                <li>✓ Written scope before build work begins</li>
                <li>✓ Staging review when hosting allows</li>
                <li>✓ Post-launch support window on every project</li>
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
