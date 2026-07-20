import { Layers, TrendingUp, Search, Wallet } from 'lucide-react';

const benefits = [
  { icon: Layers, title: 'Easy Customization', desc: 'Thousands of themes and plugins adapt seamlessly to any business need.' },
  { icon: TrendingUp, title: 'Scalability', desc: 'From small blogs to enterprise websites, WordPress grows with your business.' },
  { icon: Search, title: 'SEO-Friendly', desc: 'Built-in SEO features and integrations help your site rank higher organically.' },
  { icon: Wallet, title: 'Cost-Effective', desc: 'Affordable setup and maintenance make it a smart investment for all sizes.' },
];

export default function WhyWordPress() {
  return (
    <section className="bg-surface-50 py-20">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Why Choose WordPress?</h2>
            <p className="section-subtitle">
              WordPress powers more than 40% of websites worldwide. It offers unmatched flexibility,
              scalability, and cost-efficiency — the go-to platform for startups, growing businesses,
              and enterprises alike.
            </p>
            <a href="#contact" className="btn-primary mt-8 inline-flex">
              Build My WordPress Website
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card">
                <Icon size={24} className="text-brand-600" />
                <h3 className="mt-3 font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
