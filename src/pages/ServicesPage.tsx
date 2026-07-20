import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Code, Shield, CreditCard, Zap, Puzzle } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import CTA from '../components/CTA';

const iconMap: Record<string, typeof Code> = {
  palette: Palette, code: Code, shield: Shield, 'credit-card': CreditCard, zap: Zap, puzzle: Puzzle,
};

export default function ServicesPage() {
  const { data: services } = useApiData('services');

  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our WordPress Services</h1>
          <p className="section-subtitle mx-auto mt-4">
            End-to-end WordPress development — from design and migration to custom plugins, WooCommerce, and ongoing maintenance.
          </p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] || Code;
            return (
              <Link key={s.id} to={`/services/${s.slug}`} className="card group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 transition group-hover:bg-brand-500">
                  <Icon size={22} className="text-brand-600 group-hover:text-white" />
                </div>
                <h2 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-brand-600">{s.title}</h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
