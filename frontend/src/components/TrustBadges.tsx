import { Award, Star, Shield, Users } from 'lucide-react';

const badges = [
  { icon: Users, label: 'WordPress Core Contributors' },
  { icon: Award, label: 'Top Rated Agency 2025' },
  { icon: Shield, label: 'Official Woo Partners' },
  { icon: Star, label: '4.9 Clutch Rating' },
  { icon: Star, label: 'DesignRush Top Pick' },
  { icon: Star, label: '5.0 Google Rating' },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-border bg-surface py-8">
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-gray-600">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
                <Icon size={18} className="text-brand-600" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
