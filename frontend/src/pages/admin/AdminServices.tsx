import { useEffect, useMemo, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, ServiceRow, ServiceForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import { validateServiceForm, hasErrors, FieldErrors } from '../../utils/validation';

const SERVICE_GROUPS = [
  { id: 'all', label: 'All' },
  { id: 'build', label: 'Build' },
  { id: 'manage', label: 'Manage' },
  { id: 'enhance', label: 'Enhance' },
] as const;

const empty: ServiceForm = {
  title: '', slug: '', subtitle: '', description: '', hero_title: '', hero_description: '',
  full_content: '', features: [], icon: 'code', image_url: '', sort_order: 0,
  category_group: 'build', category_section: 'setup',
};

export default function AdminServices() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<ServiceForm>(empty);
  const [featuresText, setFeaturesText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const load = () => adminApi.getServices().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (category === 'all') return items;
    return items.filter((row) => (row.category_group || 'build') === category);
  }, [items, category]);

  const openCreate = () => {
    setForm({ ...empty, category_group: category === 'all' ? 'build' : category });
    setFeaturesText('');
    setEditId(null);
    setFieldErrors({});
    setModal(true);
  };

  const openEdit = (row: ServiceRow) => {
    const { id, ...rest } = row;
    setForm({
      ...empty,
      ...rest,
      category_group: rest.category_group || 'build',
      category_section: rest.category_section || 'setup',
    });
    setFeaturesText(Array.isArray(rest.features) ? rest.features.join('\n') : '');
    setEditId(id);
    setFieldErrors({});
    setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateServiceForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    const data = { ...form, features: featuresText.split('\n').filter(Boolean) };
    try {
      if (editId) await adminApi.updateService(editId, data);
      else await adminApi.createService(data);
      setModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (k: keyof ServiceForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-sm text-gray-500">Manage service pages — same records as the public /services site</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Service</button>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2" role="tablist" aria-label="Filter services by category">
        {SERVICE_GROUPS.map((g) => {
          const count = g.id === 'all' ? items.length : items.filter((i) => (i.category_group || 'build') === g.id).length;
          const active = category === g.id;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(g.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand-200'
              }`}
            >
              {g.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="scroll-area min-h-0 flex-1 overflow-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 capitalize text-gray-500">{row.category_group || 'build'}</td>
                <td className="px-4 py-3 text-gray-500">{row.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <EditBtn onClick={() => openEdit(row)} />
                    <DeleteBtn onClick={async () => { if (confirm('Delete?')) { await adminApi.deleteService(row.id); load(); } }} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-500">No services in this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title={editId ? 'Edit Service' : 'Add Service'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate className="scroll-area max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
            <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
          </div>
          <FormField label="Category group">
            <select className={fieldInputClass()} value={form.category_group || 'build'} onChange={(e) => set('category_group', e.target.value)}>
              <option value="build">Build</option>
              <option value="manage">Manage</option>
              <option value="enhance">Enhance</option>
            </select>
          </FormField>
          <FormField label="Category section"><input className={fieldInputClass()} value={form.category_section || ''} onChange={(e) => set('category_section', e.target.value)} placeholder="setup, customize, migrate…" /></FormField>
          <FormField label="Subtitle"><input className={fieldInputClass()} value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></FormField>
          <FormField label="Description *" error={fieldErrors.description}><textarea rows={2} className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`} value={form.description} onChange={(e) => set('description', e.target.value)} /></FormField>
          <FormField label="Hero Title"><input className={fieldInputClass()} value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} /></FormField>
          <FormField label="Hero Description"><textarea rows={2} className={textareaClass} value={form.hero_description} onChange={(e) => set('hero_description', e.target.value)} /></FormField>
          <FormField label="Full Content"><textarea rows={4} className={textareaClass} value={form.full_content} onChange={(e) => set('full_content', e.target.value)} /></FormField>
          <FormField label="Features (one per line)"><textarea rows={4} className={textareaClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></FormField>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
