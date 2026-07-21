import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check, Clock, Shield, Users, ArrowRight, Package, Sparkles, Zap,
} from 'lucide-react';
import { api, ServiceDetail } from '../api/client';
import ContactForm from '../components/ContactForm';
import CTA from '../components/CTA';
import { getServiceEnrichment } from '../data/serviceEnrichment';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
};

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

  const enriched = getServiceEnrichment(service.slug, service.features);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="section-container relative grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
              <Sparkles size={12} /> {enriched.categoryLabel}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
              {service.hero_title || service.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {service.hero_description || service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Get Free Consultation <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" className="btn-outline">View Case Studies</Link>
            </div>
          </motion.div>
          {service.image_url && (
            <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }}>
              <img
                src={service.image_url}
                alt={service.title}
                className="rounded-2xl shadow-card ring-1 ring-gray-100"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Highlights bar */}
      <section className="border-y border-gray-100 bg-white py-8">
        <div className="section-container grid grid-cols-1 gap-6 sm:grid-cols-3">
          {enriched.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-surface-50 px-5 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white">
                {i === 0 ? <Clock size={18} /> : i === 1 ? <Shield size={18} /> : <Users size={18} />}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{h.label}</p>
                <p className="text-lg font-bold text-gray-900">{h.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main content + sidebar card */}
      <section className="py-16 lg:py-20">
        <div className="section-container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold text-gray-900">{service.subtitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {service.full_content || service.description}
              </p>
            </motion.div>

            {/* Benefits cards */}
            <motion.div {...fadeUp}>
              <h3 className="text-xl font-bold text-gray-900">Why Choose This Service</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {enriched.benefits.map((b) => (
                  <div
                    key={b.title}
                    className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition hover:border-brand-200 hover:shadow-cardHover"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                      <Zap size={16} />
                    </div>
                    <h4 className="mt-3 font-semibold text-gray-900">{b.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div {...fadeUp}>
              <h3 className="text-xl font-bold text-gray-900">How We Work</h3>
              <div className="mt-6 space-y-4">
                {enriched.process.map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-4 rounded-xl border border-gray-100 bg-surface-50 p-5 transition hover:border-brand-200"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{step.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* What You Get — enhanced sidebar card */}
          <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card">
              <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-5">
                <h3 className="text-lg font-bold text-white">What You Get</h3>
                <p className="mt-1 text-sm text-brand-100">Everything included in this service</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3.5">
                  {enriched.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50">
                        <Check size={12} className="text-brand-600" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-dashed border-gray-200 bg-surface-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Package size={16} className="text-brand-500" /> Deliverables
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {enriched.deliverables.map((d) => (
                      <li key={d} className="text-xs text-gray-600">• {d}</li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className="btn-primary mt-6 w-full">
                  Start Your Project
                </Link>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Free consultation · No commitment required
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote form */}
      <section className="bg-surface-50 py-16 lg:py-20">
        <div className="section-container max-w-2xl">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Request a Quote</h2>
            <p className="mt-2 text-gray-600">
              Tell us about your {service.title.toLowerCase()} needs — we respond within 24 hours.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8">
            <ContactForm compact />
          </motion.div>
        </div>
      </section>
      <CTA />
    </>
  );
}
