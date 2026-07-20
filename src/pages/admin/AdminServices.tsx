import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, ServiceRow, ServiceForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import { validateServiceForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: ServiceForm = {
  title: '', slug: '', subtitle: '', description: '', hero_title: '', hero_description: '',
  full_content: '', features: [], icon: 'code', image_url: '', sort_order: 0,
};

export default function AdminServices() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<ServiceForm>(empty);
  const [featuresText, setFeaturesText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const load = () => adminApi.getServices().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setFeaturesText(''); setEditId(null); setFieldErrors({}); setModal(true); };
  const openEdit = (row: ServiceRow) => {
    const { id, ...rest } = row;
    setForm(rest); setFeaturesText((rest.features || []).join('\n')); setEditId(id); setFieldErrors({}); setModal(true);
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
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const set = (k: keyof ServiceForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Services</h1><p className="text-sm text-gray-500">Manage service pages</p></div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Service</button>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-gray-500">{row.slug}</td>
                <td className="px-4 py-3 flex gap-1">
                  <EditBtn onClick={() => openEdit(row)} />
                  <DeleteBtn onClick={async () => { if (confirm('Delete?')) { await adminApi.deleteService(row.id); load(); } }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminModal title={editId ? 'Edit Service' : 'Add Service'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
            <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
          </div>
          <FormField label="Subtitle"><input className={fieldInputClass()} value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></FormField>
          <FormField label="Description *" error={fieldErrors.description}><textarea rows={2} className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`} value={form.description} onChange={(e) => set('description', e.target.value)} /></FormField>
          <FormField label="Hero Title"><input className={fieldInputClass()} value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} /></FormField>
          <FormField label="Hero Description"><textarea rows={2} className={textareaClass} value={form.hero_description} onChange={(e) => set('hero_description', e.target.value)} /></FormField>
          <FormField label="Full Content"><textarea rows={4} className={textareaClass} value={form.full_content} onChange={(e) => set('full_content', e.target.value)} /></FormField>
          <FormField label="Features (one per line)"><textarea rows={4} className={textareaClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></FormField>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
