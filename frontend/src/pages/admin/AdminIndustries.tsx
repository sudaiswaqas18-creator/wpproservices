import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, IndustryRow, IndustryForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { validateIndustryForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: IndustryForm = {
  title: '',
  description: '',
  has_case_study: false,
  sort_order: 0,
};

export default function AdminIndustries() {
  const [items, setItems] = useState<IndustryRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<IndustryForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminApi.getIndustries().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setFieldErrors({}); setModal(true); };
  const openEdit = (row: IndustryRow) => {
    const { id, ...rest } = row;
    setForm({ ...rest, has_case_study: Boolean(rest.has_case_study) });
    setEditId(id);
    setFieldErrors({});
    setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateIndustryForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateIndustry(editId, form);
      else await adminApi.createIndustry(form);
      setModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteIndustry(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      alert('Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  const set = (k: keyof IndustryForm, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Industries</h1>
          <p className="text-sm text-gray-500">
            Card titles and blurbs on /industries. Detail page SEO copy stays in code (industryContent).
          </p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm">
          <Plus size={16} /> Add Industry
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{row.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{row.description}</p>
                </td>
                <td className="px-4 py-3">{row.sort_order}</td>
                <td className="flex gap-1 px-4 py-3">
                  <EditBtn onClick={() => openEdit(row)} />
                  <DeleteBtn onClick={() => setDeleteTarget({ id: row.id, title: row.title })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal title={editId ? 'Edit Industry' : 'Add Industry'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <FormField label="Title *" error={fieldErrors.title}>
            <input
              className={fieldInputClass(!!fieldErrors.title)}
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
            />
          </FormField>
          <FormField label="Description *" error={fieldErrors.description}>
            <textarea
              rows={3}
              className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Sort order">
              <input
                type="number"
                className={fieldInputClass(false)}
                value={form.sort_order}
                onChange={(e) => set('sort_order', Number(e.target.value) || 0)}
              />
            </FormField>
            <label className="flex items-center gap-2 self-end pb-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(form.has_case_study)}
                onChange={(e) => set('has_case_study', e.target.checked)}
              />
              Has case study
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmModal
        isOpen={!!deleteTarget}
        itemName={deleteTarget?.title}
        isDeleting={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
