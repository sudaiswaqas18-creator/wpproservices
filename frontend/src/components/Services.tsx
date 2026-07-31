import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Palette, Code, Shield, CreditCard, Zap, Puzzle } from 'lucide-react';
import { useApiData } from '../hooks/useApiData';

const iconMap: Record<string, typeof Code> = {
  palette: Palette,
  code: Code,
  shield: Shield,
  'credit-card': CreditCard,
  zap: Zap,
  puzzle: Puzzle,
};

export default function Services() {
  const { data: services } = useApiData('services');
  const [active, setActive] = useState(0);

  if (!services.length) return null;

  const current = services[active];
  const Icon = iconMap[current.icon] || Code;

  return (
    <section id="services" className="py-20">
      <div className="section-container">
        <h2 className="section-title">WordPress Services Built Around Real Delivery Work</h2>
        <p className="section-subtitle">
          Custom themes, WooCommerce stores, LearnDash, plugins, migrations, and care — scoped clearly
          and handed off with docs your editors can use.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="flex flex-col gap-2 lg:col-span-2">
            {services.map((s, i) => {
              const SIcon = iconMap[s.icon] || Code;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition ${
                    active === i
                      ? 'bg-brand-500 text-white shadow-md'
                      : 'bg-surface-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <SIcon size={20} />
                  <span className="text-sm font-semibold">{s.title}</span>
                </button>
              );
            })}
          </div>

          <div className="card lg:col-span-3">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
              <Icon size={24} className="text-brand-600" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {current.title}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900">{current.subtitle}</h3>
            <p className="mt-4 leading-relaxed text-gray-600">{current.description}</p>
            <Link to={`/services/${current.slug}`} className="btn-primary mt-6 inline-flex">Get Started</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
