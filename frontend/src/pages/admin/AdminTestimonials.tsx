import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, TestimonialRow, TestimonialForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import { validateTestimonialForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: TestimonialForm = { name: '', company: '', country: '', quote: '', metric_label: '', sort_order: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<TestimonialForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const load = () => adminApi.getTestimonials().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const set = (k: keyof TestimonialForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateTestimonialForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateTestimonial(editId, form);
      else await adminApi.createTestimonial(form);
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-sm text-gray-500">Optional — left empty until you add real client quotes. Public site does not show placeholder testimonials.</p>
        </div>
        <button type="button" onClick={() => { setForm(empty); setEditId(null); setFieldErrors({}); setModal(true); }} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add</button>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Company</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-sm text-gray-500">
                  No testimonials yet. Add only real client quotes when you have permission to publish them.
                </td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-gray-600">{row.company}</td>
                <td className="px-4 py-3 flex gap-1">
                  <EditBtn onClick={() => { const { id, ...rest } = row; setForm(rest); setEditId(id); setModal(true); }} />
                  <DeleteBtn onClick={async () => { if (confirm('Delete?')) { await adminApi.deleteTestimonial(row.id); load(); } }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminModal title={editId ? 'Edit Testimonial' : 'Add Testimonial'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name *" error={fieldErrors.name}><input className={fieldInputClass(!!fieldErrors.name)} value={form.name} onChange={(e) => set('name', e.target.value)} /></FormField>
            <FormField label="Company *" error={fieldErrors.company}><input className={fieldInputClass(!!fieldErrors.company)} value={form.company} onChange={(e) => set('company', e.target.value)} /></FormField>
          </div>
          <FormField label="Country"><input className={fieldInputClass()} value={form.country} onChange={(e) => set('country', e.target.value)} /></FormField>
          <FormField label="Quote *" error={fieldErrors.quote}><textarea rows={3} className={`${textareaClass}${fieldErrors.quote ? ' border-red-400' : ''}`} value={form.quote} onChange={(e) => set('quote', e.target.value)} /></FormField>
          <FormField label="Metric Label"><input className={fieldInputClass()} value={form.metric_label} onChange={(e) => set('metric_label', e.target.value)} /></FormField>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">Save</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
