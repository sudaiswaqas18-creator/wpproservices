import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { api, ServiceDetail } from '../api/client';
import ContactForm from '../components/ContactForm';
import CTA from '../components/CTA';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.getService(slug).then(setService).catch(() => setService(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="section-container py-32 text-center text-gray-500">Loading...</div>;
  if (!service) {
    return (
      <div className="section-container py-32 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Link to="/services" className="btn-primary mt-4 inline-flex">All Services</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">WordPress Service</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">{service.hero_title || service.title}</h1>
            <p className="mt-4 text-lg text-gray-600">{service.hero_description || service.description}</p>
            <Link to="/contact" className="btn-primary mt-8 inline-flex">Get Free Consultation</Link>
          </div>
          {service.image_url && <img src={service.image_url} alt={service.title} className="rounded-2xl shadow-card" />}
        </div>
      </section>

      <section className="py-16">
        <div className="section-container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900">{service.subtitle}</h2>
            <p className="mt-4 leading-relaxed text-gray-600">{service.full_content || service.description}</p>
          </div>
          <div className="card h-fit">
            <h3 className="font-bold text-gray-900">What You Get</h3>
            <ul className="mt-4 space-y-3">
              {(service.features || []).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-500" />{f}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-6 w-full">Start Your Project</Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-50 py-16">
        <div className="section-container max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
          <p className="mt-2 text-gray-600">Tell us about your {service.title.toLowerCase()} needs.</p>
          <div className="mt-8"><ContactForm compact /></div>
        </div>
      </section>
      <CTA />
    </>
  );
}
