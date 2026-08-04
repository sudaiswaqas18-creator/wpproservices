import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Briefcase, Mail, Wrench, Image, HelpCircle, Bot, BookOpen, ArrowUpRight, Star,
} from 'lucide-react';
import {
  adminApi,
  BlogForm,
  CaseStudyForm,
  ServiceForm,
} from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass } from '../../components/admin/AdminModal';

const statConfig = [
  { key: 'blog_posts', label: 'Blog Posts', icon: FileText, color: 'bg-brand-500', link: '/admin/blogs' },
  { key: 'case_studies', label: 'Case Studies', icon: Briefcase, color: 'bg-surface-dark', link: '/admin/case-studies' },
  { key: 'services', label: 'Services', icon: Wrench, color: 'bg-surface-dark', link: '/admin/services' },
  { key: 'tools', label: 'Tools', icon: Bot, color: 'bg-green-500', link: '/admin/tools' },
  { key: 'guidebooks', label: 'Guidebooks', icon: BookOpen, color: 'bg-surface-dark', link: '/admin/guidebooks' },
  { key: 'portfolio_items', label: 'Portfolio', icon: Image, color: 'bg-green-500', link: '/admin/portfolio' },
  { key: 'faqs', label: 'FAQs', icon: HelpCircle, color: 'bg-surface-dark', link: '/admin/faqs' },
  { key: 'testimonials', label: 'Testimonials', icon: Star, color: 'bg-amber-500', link: '/admin/testimonials' },
  { key: 'contact_leads', label: 'New Leads', icon: Mail, color: 'bg-red-500', link: '/admin/leads' },
];

type QuickForm = 'blog' | 'case' | 'service' | null;

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

const quickActions = [
  {
    id: 'blog' as const,
    title: 'Add Blog Post',
    desc: 'Publish an article for SEO and resources',
    icon: FileText,
    tone: 'bg-sky-50 text-sky-700 ring-sky-100',
  },
  {
    id: 'case' as const,
    title: 'Add Case Study',
    desc: 'Document a WordPress delivery story',
    icon: Briefcase,
    tone: 'bg-amber-50 text-amber-800 ring-amber-100',
  },
  {
    id: 'service' as const,
    title: 'Add Service',
    desc: 'Add a service page under Build / Manage / Enhance',
    icon: Wrench,
    tone: 'bg-violet-50 text-violet-700 ring-violet-100',
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [quick, setQuick] = useState<QuickForm>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [blog, setBlog] = useState<BlogForm>(emptyBlog);
  const [caseStudy, setCaseStudy] = useState<CaseStudyForm>(emptyCase);
  const [service, setService] = useState<ServiceForm>(emptyService);
  const [featuresText, setFeaturesText] = useState('');

  const refreshStats = () => adminApi.stats().then(setStats).catch(console.error);
  useEffect(() => { refreshStats(); }, []);

  const openQuick = (type: Exclude<QuickForm, null>) => {
    setMessage('');
    setBlog({ ...emptyBlog, published_at: new Date().toISOString().slice(0, 10) });
    setCaseStudy(emptyCase);
    setService(emptyService);
    setFeaturesText('');
    setQuick(type);
  };

  const closeQuick = () => setQuick(null);

  const afterSave = async (label: string) => {
    setMessage(`${label} saved — it will show on the public site after refresh.`);
    closeQuick();
    await refreshStats();
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

  const modalTitle =
    quick === 'blog' ? 'Add Blog Post'
      : quick === 'case' ? 'Add Case Study'
        : quick === 'service' ? 'Add Service'
          : '';

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

      <section className="shrink-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Create content</h2>
            <p className="mt-1 text-sm text-gray-500">
              Opens a full editor modal — room to fill fields properly, like a real admin app.
            </p>
          </div>
          <Link to="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
            View leads <ArrowUpRight size={14} />
          </Link>
        </div>

        {message && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-100">{message}</p>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map(({ id, title, desc, icon: Icon, tone }) => (
            <button
              key={id}
              type="button"
              onClick={() => openQuick(id)}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/80 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${tone}`}>
                <Icon size={20} />
              </div>
              <p className="mt-4 text-base font-bold text-gray-900 group-hover:text-brand-700">{title}</p>
              <p className="mt-1 text-sm leading-snug text-gray-500">{desc}</p>
              <span className="mt-4 inline-flex text-xs font-semibold uppercase tracking-wide text-brand-600">
                Open editor →
              </span>
            </button>
          ))}
        </div>
      </section>

      <AdminModal title={modalTitle} open={!!quick} onClose={closeQuick} wide>

        {quick === 'blog' && (
          <form onSubmit={saveBlog}>
            <FormField label="Title *"><input className={fieldInputClass()} value={blog.title} onChange={(e) => setBlog({ ...blog, title: e.target.value })} autoFocus /></FormField>
            <FormField label="Excerpt"><textarea rows={2} className={textareaClass} value={blog.excerpt} onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })} /></FormField>
            <FormField label="Content *"><textarea rows={8} className={textareaClass} value={blog.content} onChange={(e) => setBlog({ ...blog, content: e.target.value })} /></FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Author"><input className={fieldInputClass()} value={blog.author} onChange={(e) => setBlog({ ...blog, author: e.target.value })} /></FormField>
              <FormField label="Publish date"><input type="date" className={fieldInputClass()} value={blog.published_at} onChange={(e) => setBlog({ ...blog, published_at: e.target.value })} /></FormField>
            </div>
            <FormField label="Image URL"><input className={fieldInputClass()} value={blog.image_url} onChange={(e) => setBlog({ ...blog, image_url: e.target.value })} /></FormField>
            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button type="button" onClick={closeQuick} className="btn-outline text-sm">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Blog Post'}</button>
            </div>
          </form>
        )}

        {quick === 'case' && (
          <form onSubmit={saveCase}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Title *"><input className={fieldInputClass()} value={caseStudy.title} onChange={(e) => setCaseStudy({ ...caseStudy, title: e.target.value })} autoFocus /></FormField>
              <FormField label="Client *"><input className={fieldInputClass()} value={caseStudy.client} onChange={(e) => setCaseStudy({ ...caseStudy, client: e.target.value })} /></FormField>
            </div>
            <FormField label="Challenge"><textarea rows={3} className={textareaClass} value={caseStudy.challenge} onChange={(e) => setCaseStudy({ ...caseStudy, challenge: e.target.value })} /></FormField>
            <FormField label="Solution"><textarea rows={3} className={textareaClass} value={caseStudy.solution} onChange={(e) => setCaseStudy({ ...caseStudy, solution: e.target.value })} /></FormField>
            <FormField label="Full content"><textarea rows={4} className={textareaClass} value={caseStudy.full_content} onChange={(e) => setCaseStudy({ ...caseStudy, full_content: e.target.value })} /></FormField>
            <FormField label="Image URL"><input className={fieldInputClass()} value={caseStudy.image_url} onChange={(e) => setCaseStudy({ ...caseStudy, image_url: e.target.value })} /></FormField>
            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button type="button" onClick={closeQuick} className="btn-outline text-sm">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Case Study'}</button>
            </div>
          </form>
        )}

        {quick === 'service' && (
          <form onSubmit={saveService}>
            <FormField label="Title *"><input className={fieldInputClass()} value={service.title} onChange={(e) => setService({ ...service, title: e.target.value })} autoFocus /></FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Subtitle"><input className={fieldInputClass()} value={service.subtitle} onChange={(e) => setService({ ...service, subtitle: e.target.value })} /></FormField>
              <FormField label="Category group">
                <select className={fieldInputClass()} value={service.category_group || 'build'} onChange={(e) => setService({ ...service, category_group: e.target.value })}>
                  {SERVICE_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                </select>
              </FormField>
            </div>
            <FormField label="Description *"><textarea rows={3} className={textareaClass} value={service.description} onChange={(e) => setService({ ...service, description: e.target.value })} /></FormField>
            <FormField label="Features (one per line)"><textarea rows={4} className={textareaClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></FormField>
            <FormField label="Image URL"><input className={fieldInputClass()} value={service.image_url} onChange={(e) => setService({ ...service, image_url: e.target.value })} /></FormField>
            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button type="button" onClick={closeQuick} className="btn-outline text-sm">Cancel</button>
              <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving…' : 'Save Service'}</button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
