import { Link } from 'react-router-dom';
import { FileText, BookOpen, Wrench, Briefcase } from 'lucide-react';
import CTA from '../components/CTA';

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-50 to-white py-16 lg:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Resources</h1>
          <p className="section-subtitle mx-auto mt-4">Insights, guidebooks, and tools to help you grow.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: '/blog', icon: FileText, title: 'Blog', desc: 'WordPress development insights and news' },
            { to: '/case-studies', icon: Briefcase, title: 'Case Studies', desc: 'Real project outcomes and metrics' },
            { to: '/resources/guidebooks', icon: BookOpen, title: 'Guidebooks', desc: 'Free guides and checklists' },
            { to: '/resources/tools', icon: Wrench, title: 'Tools', desc: 'On-demand website tools' },
          ].map(({ to, icon: Icon, title, desc }) => (
            <Link key={to} to={to} className="card group text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 group-hover:bg-brand-500">
                <Icon size={26} className="text-brand-600 group-hover:text-white" />
              </div>
              <h2 className="mt-4 text-lg font-bold group-hover:text-brand-600">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
