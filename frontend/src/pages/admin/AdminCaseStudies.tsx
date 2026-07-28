import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, CaseStudyRow, CaseStudyForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import { validateCaseStudyForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: CaseStudyForm = {
  title: '', client: '', challenge: '', solution: '', full_content: '', image_url: '', slug: '', sort_order: 0,
  metric1_label: '', metric1_value: '', metric2_label: '', metric2_value: '', metric3_label: '', metric3_value: '',
};

export default function AdminCaseStudies() {
  const [items, setItems] = useState<CaseStudyRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<CaseStudyForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const load = () => adminApi.getCaseStudies().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setFieldErrors({}); setModal(true); };
  const openEdit = (row: CaseStudyRow) => { const { id, ...rest } = row; setForm(rest); setEditId(id); setFieldErrors({}); setModal(true); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateCaseStudyForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateCaseStudy(editId, form);
      else await adminApi.createCaseStudy(form);
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const set = (k: keyof CaseStudyForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Case Studies</h1><p className="text-sm text-gray-500">Manage project case studies</p></div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Case Study</button>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-gray-600">{row.client}</td>
                <td className="px-4 py-3 flex gap-1">
                  <EditBtn onClick={() => openEdit(row)} />
                  <DeleteBtn onClick={async () => { if (confirm('Delete?')) { await adminApi.deleteCaseStudy(row.id); load(); } }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminModal title={editId ? 'Edit Case Study' : 'Add Case Study'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
            <FormField label="Client *" error={fieldErrors.client}><input className={fieldInputClass(!!fieldErrors.client)} value={form.client} onChange={(e) => set('client', e.target.value)} /></FormField>
          </div>
          <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
          <FormField label="Challenge *" error={fieldErrors.challenge}><textarea rows={2} className={`${textareaClass}${fieldErrors.challenge ? ' border-red-400' : ''}`} value={form.challenge} onChange={(e) => set('challenge', e.target.value)} /></FormField>
          <FormField label="Solution *" error={fieldErrors.solution}><textarea rows={2} className={`${textareaClass}${fieldErrors.solution ? ' border-red-400' : ''}`} value={form.solution} onChange={(e) => set('solution', e.target.value)} /></FormField>
          <FormField label="Full Content"><textarea rows={4} className={textareaClass} value={form.full_content} onChange={(e) => set('full_content', e.target.value)} /></FormField>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="grid grid-cols-2 gap-2">
                <FormField label={`Metric ${n} Label`}><input className={fieldInputClass()} value={form[`metric${n}_label` as keyof CaseStudyForm] as string} onChange={(e) => set(`metric${n}_label` as keyof CaseStudyForm, e.target.value)} /></FormField>
                <FormField label="Value"><input className={fieldInputClass()} value={form[`metric${n}_value` as keyof CaseStudyForm] as string} onChange={(e) => set(`metric${n}_value` as keyof CaseStudyForm, e.target.value)} /></FormField>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
