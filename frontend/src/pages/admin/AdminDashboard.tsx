import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Mail, Wrench, Star, Image, HelpCircle } from 'lucide-react';
import { adminApi } from '../../api/admin';

const statConfig = [
  { key: 'blog_posts', label: 'Blog Posts', icon: FileText, color: 'bg-brand-500', link: '/admin/blogs' },
  { key: 'case_studies', label: 'Case Studies', icon: Briefcase, color: 'bg-surface-dark', link: '/admin/case-studies' },
  { key: 'services', label: 'Services', icon: Wrench, color: 'bg-surface-dark', link: '/admin/services' },
  { key: 'testimonials', label: 'Testimonials', icon: Star, color: 'bg-brand-600', link: '/admin/testimonials' },
  { key: 'portfolio_items', label: 'Portfolio', icon: Image, color: 'bg-green-500', link: '/admin/portfolio' },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, color: 'bg-surface-dark', link: '/admin/faqs' },
  { key: 'contact_leads', label: 'New Leads', icon: Mail, color: 'bg-red-500', link: '/admin/leads' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    adminApi.stats().then(setStats).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-gray-500">Welcome back! Manage your website content from here.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statConfig.map(({ key, label, icon: Icon, color, link }) => (
          <Link key={key} to={link} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{stats[key] ?? '—'}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} text-white`}>
                <Icon size={22} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-bold text-gray-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/admin/blogs" className="btn-primary text-sm">+ Add Blog Post</Link>
          <Link to="/admin/case-studies" className="btn-outline text-sm">+ Add Case Study</Link>
          <Link to="/admin/services" className="btn-outline text-sm">+ Add Service</Link>
          <Link to="/admin/leads" className="btn-outline text-sm">View Leads</Link>
        </div>
      </div>
    </div>
  );
}
