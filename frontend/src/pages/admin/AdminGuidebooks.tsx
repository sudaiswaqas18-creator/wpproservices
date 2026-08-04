import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, GuidebookRow, GuidebookForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { validateGuidebookForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: GuidebookForm = {
  title: '', slug: '', description: '', content: '', download_url: '', image_url: '', sort_order: 0,
};

export default function AdminGuidebooks() {
  const [items, setItems] = useState<GuidebookRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<GuidebookForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminApi.getGuidebooks().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setFieldErrors({}); setModal(true); };
  const openEdit = (row: GuidebookRow) => {
    const { id, ...rest } = row;
    setForm(rest); setEditId(id); setFieldErrors({}); setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateGuidebookForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateGuidebook(editId, form);
      else await adminApi.createGuidebook(form);
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteGuidebook(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert('Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  const set = (k: keyof GuidebookForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Guidebooks</h1><p className="text-sm text-gray-500">Manage free guides and checklists</p></div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Guidebook</button>
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
                  <DeleteBtn onClick={() => setDeleteTarget({ id: row.id, title: row.title })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminModal title={editId ? 'Edit Guidebook' : 'Add Guidebook'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
            <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
          </div>
          <FormField label="Description" error={fieldErrors.description}><textarea rows={2} className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`} value={form.description} onChange={(e) => set('description', e.target.value)} /></FormField>
          <FormField label="Content"><textarea rows={4} className={textareaClass} value={form.content} onChange={(e) => set('content', e.target.value)} /></FormField>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
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
