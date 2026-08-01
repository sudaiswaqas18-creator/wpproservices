import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Mail, Wrench, Image, HelpCircle, Package, Bot, BookOpen, X } from 'lucide-react';
import {
  adminApi,
  BlogForm,
  CaseStudyForm,
  ProductForm,
  ServiceForm,
} from '../../api/admin';
import { FormField, fieldInputClass, textareaClass } from '../../components/admin/AdminModal';
import { PLUGIN_CATEGORIES } from '../../data/productCategories';

const statConfig = [
  { key: 'blog_posts', label: 'Blog Posts', icon: FileText, color: 'bg-brand-500', link: '/admin/blogs' },
  { key: 'case_studies', label: 'Case Studies', icon: Briefcase, color: 'bg-surface-dark', link: '/admin/case-studies' },
  { key: 'services', label: 'Services', icon: Wrench, color: 'bg-surface-dark', link: '/admin/services' },
  { key: 'products', label: 'Plugins', icon: Package, color: 'bg-brand-600', link: '/admin/products' },
  { key: 'tools', label: 'Tools', icon: Bot, color: 'bg-green-500', link: '/admin/tools' },
  { key: 'guidebooks', label: 'Guidebooks', icon: BookOpen, color: 'bg-surface-dark', link: '/admin/guidebooks' },
  { key: 'portfolio_items', label: 'Portfolio', icon: Image, color: 'bg-green-500', link: '/admin/portfolio' },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, color: 'bg-surface-dark', link: '/admin/faqs' },
  { key: 'contact_leads', label: 'New Leads', icon: Mail, color: 'bg-red-500', link: '/admin/leads' },
];

type QuickForm = 'plugin' | 'blog' | 'case' | 'service' | null;

const emptyPlugin: ProductForm = {
  title: '', slug: '', subtitle: '', description: '', full_content: '', features: [],
  category: 'conversion', price: '', rating: '', rating_count: 'WooCommerce extension',
  image_url: '', buy_url: '/contact', sort_order: 0,
};

const emptyBlog: BlogForm = {
  title: '', slug: '', excerpt: '', content: '', author: 'WPServices Team',
  image_url: '', published_at: new Date().toISOString().slice(0, 10), sort_order: 0,
};

const emptyCase: CaseStudyForm = {
  title: '', client: '', challenge: '', solution: '', full_content: '', image_url: '', slug: '', sort_order: 0,
  metric1_label: '', metric1_value: '', metric2_label: '', metric2_value: '', metric3_label: '', metric3_value: '',
};

const emptyService: ServiceForm = {
  title: '', slug: '', subtitle: '', description: '', hero_title: '', hero_description: '',
  full_content: '', features: [], icon: 'code', image_url: '', sort_order: 0,
  category_group: 'build', category_section: 'setup',
};

const SERVICE_GROUPS = [
  { id: 'build', label: 'Build' },
  { id: 'manage', label: 'Manage' },
  { id: 'enhance', label: 'Enhance' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [quick, setQuick] = useState<QuickForm>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [plugin, setPlugin] = useState<ProductForm>(emptyPlugin);
  const [blog, setBlog] = useState<BlogForm>(emptyBlog);
  const [caseStudy, setCaseStudy] = useState<CaseStudyForm>(emptyCase);
  const [service, setService] = useState<ServiceForm>(emptyService);
  const [featuresText, setFeaturesText] = useState('');

  const refreshStats = () => adminApi.stats().then(setStats).catch(console.error);
  useEffect(() => { refreshStats(); }, []);

  const openQuick = (type: QuickForm) => {
    setMessage('');
    setQuick((prev) => (prev === type ? null : type));
    setPlugin(emptyPlugin);
    setBlog({ ...emptyBlog, published_at: new Date().toISOString().slice(0, 10) });
    setCaseStudy(emptyCase);
    setService(emptyService);
    setFeaturesText('');
  };

  const afterSave = async (label: string) => {
    setMessage(`${label} saved — live on the public site after refresh.`);
    setQuick(null);
    await refreshStats();
  };

  const savePlugin = async (e: FormEvent) => {
    e.preventDefault();
    if (!plugin.title.trim()) return alert('Plugin title is required');
    setSaving(true);
    try {
      await adminApi.createProduct({
        ...plugin,
        features: featuresText.split('\n').filter(Boolean),
        description: plugin.description || plugin.subtitle || plugin.title,
      });
      await afterSave('Plugin');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save plugin');
    } finally {
      setSaving(false);
    }
  };

  const saveBlog = async (e: FormEvent) => {
    e.preventDefault();
    if (!blog.title.trim() || !blog.content.trim()) return alert('Blog title and content are required');
    setSaving(true);
    try {
      await adminApi.createBlog(blog);
      await afterSave('Blog post');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const saveCase = async (e: FormEvent) => {
    e.preventDefault();
    if (!caseStudy.title.trim() || !caseStudy.client.trim()) return alert('Title and client are required');
    setSaving(true);
    try {
      await adminApi.createCaseStudy({
        ...caseStudy,
        challenge: caseStudy.challenge || 'Scoped delivery challenge',
        solution: caseStudy.solution || 'WordPress delivery approach',
      });
      await afterSave('Case study');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save case study');
    } finally {
      setSaving(false);
    }
  };

  const saveService = async (e: FormEvent) => {
    e.preventDefault();
    if (!service.title.trim() || !service.description.trim()) return alert('Service title and description are required');
    setSaving(true);
    try {
      await adminApi.createService({
        ...service,
        hero_title: service.hero_title || service.title,
        hero_description: service.hero_description || service.subtitle || service.description,
        full_content: service.full_content || service.description,
        features: featuresText.split('\n').filter(Boolean),
      });
      await afterSave('Service');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">Welcome back! Manage website content — same data the public site uses.</p>
      </div>

      <div className="grid shrink-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="shrink-0 border-b border-gray-100 p-6">
          <h2 className="font-bold text-gray-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-gray-500">Click an action — the form opens below (no page jump).</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => openQuick('plugin')} className={`text-sm ${quick === 'plugin' ? 'btn-primary' : 'btn-outline'}`}>+ Add Plugin</button>
            <button type="button" onClick={() => openQuick('blog')} className={`text-sm ${quick === 'blog' ? 'btn-primary' : 'btn-outline'}`}>+ Add Blog Post</button>
            <button type="button" onClick={() => openQuick('case')} className={`text-sm ${quick === 'case' ? 'btn-primary' : 'btn-outline'}`}>+ Add Case Study</button>
            <button type="button" onClick={() => openQuick('service')} className={`text-sm ${quick === 'service' ? 'btn-primary' : 'btn-outline'}`}>+ Add Service</button>
            <Link to="/admin/leads" className="btn-outline text-sm">View Leads</Link>
          </div>
          {message && <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}
        </div>

        {quick && (
          <div className="scroll-area min-h-0 flex-1 overflow-y-auto p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {quick === 'plugin' && 'Add Plugin'}
                {quick === 'blog' && 'Add Blog Post'}
                {quick === 'case' && 'Add Case Study'}
                {quick === 'service' && 'Add Service'}
              </h3>
              <button type="button" onClick={() => setQuick(null)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Close form">
                <X size={18} />
              </button>
            </div>

            {quick === 'plugin' && (
              <form onSubmit={savePlugin} className="max-w-3xl space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Title *"><input className={fieldInputClass()} value={plugin.title} onChange={(e) => setPlugin({ ...plugin, title: e.target.value })} /></FormField>
                  <FormField label="Price"><input className={fieldInputClass()} value={plugin.price} onChange={(e) => setPlugin({ ...plugin, price: e.target.value })} placeholder="$79" /></FormField>
                </div>
                <FormField label="Subtitle"><input className={fieldInputClass()} value={plugin.subtitle} onChange={(e) => setPlugin({ ...plugin, subtitle: e.target.value })} /></FormField>
                <FormField label="Category">
                  <select className={fieldInputClass()} value={plugin.category} onChange={(e) => setPlugin({ ...plugin, category: e.target.value })}>
                    {PLUGIN_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </FormField>
                <FormField label="Description"><textarea rows={2} className={textareaClass} value={plugin.description} onChange={(e) => setPlugin({ ...plugin, description: e.target.value })} /></FormField>
                <FormField label="Features (one per line)"><textarea rows={3} className={textareaClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></FormField>
                <FormField label="Image URL"><input className={fieldInputClass()} value={plugin.image_url} onChange={(e) => setPlugin({ ...plugin, image_url: e.target.value })} placeholder="/section-images/plugin-….jpg" /></FormField>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setQuick(null)} className="btn-outline text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Plugin'}</button>
                </div>
              </form>
            )}

            {quick === 'blog' && (
              <form onSubmit={saveBlog} className="max-w-3xl space-y-3">
                <FormField label="Title *"><input className={fieldInputClass()} value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} /></FormField>
                <FormField label="Excerpt"><textarea rows={2} className={textareaClass} value={blog.excerpt} onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })} /></FormField>
                <FormField label="Content *"><textarea rows={6} className={textareaClass} value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} /></FormField>
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Author"><input className={fieldInputClass()} value={blog.author} onChange={(e) => setBlog({ ...blog, author: e.target.value })} /></FormField>
                  <FormField label="Publish date"><input type="date" className={fieldInputClass()} value={blog.published_at} onChange={(e) => setBlog({ ...blog, published_at: e.target.value })} /></FormField>
                </div>
                <FormField label="Image URL"><input className={fieldInputClass()} value={blog.image_url} onChange={(e) => setBlog({ ...blog, image_url: e.target.value })} /></FormField>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setQuick(null)} className="btn-outline text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Blog Post'}</button>
                </div>
              </form>
            )}

            {quick === 'case' && (
              <form onSubmit={saveCase} className="max-w-3xl space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Title *"><input className={fieldInputClass()} value={caseStudy.title} onChange={(e) => setCaseStudy({ ...caseStudy, title: e.target.value })} /></FormField>
                  <FormField label="Client *"><input className={fieldInputClass()} value={caseStudy.client} onChange={(e) => setCaseStudy({ ...caseStudy, client: e.target.value })} /></FormField>
                </div>
                <FormField label="Challenge"><textarea rows={2} className={textareaClass} value={caseStudy.challenge} onChange={(e) => setCaseStudy({ ...caseStudy, challenge: e.target.value })} /></FormField>
                <FormField label="Solution"><textarea rows={2} className={textareaClass} value={caseStudy.solution} onChange={(e) => setCaseStudy({ ...caseStudy, solution: e.target.value })} /></FormField>
                <FormField label="Image URL"><input className={fieldInputClass()} value={caseStudy.image_url} onChange={(e) => setCaseStudy({ ...caseStudy, image_url: e.target.value })} /></FormField>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setQuick(null)} className="btn-outline text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Case Study'}</button>
                </div>
              </form>
            )}

            {quick === 'service' && (
              <form onSubmit={saveService} className="max-w-3xl space-y-3">
                <FormField label="Title *"><input className={fieldInputClass()} value={service.title} onChange={(e) => setService({ ...service, title: e.target.value })} /></FormField>
                <FormField label="Subtitle"><input className={fieldInputClass()} value={service.subtitle} onChange={(e) => setService({ ...service, subtitle: e.target.value })} /></FormField>
                <FormField label="Category group">
                  <select className={fieldInputClass()} value={service.category_group || 'build'} onChange={(e) => setService({ ...service, category_group: e.target.value })}>
                    {SERVICE_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </FormField>
                <FormField label="Description *"><textarea rows={2} className={textareaClass} value={service.description} onChange={(e) => setService({ ...service, description: e.target.value })} /></FormField>
                <FormField label="Features (one per line)"><textarea rows={3} className={textareaClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></FormField>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setQuick(null)} className="btn-outline text-sm">Cancel</button>
                  <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Service'}</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
