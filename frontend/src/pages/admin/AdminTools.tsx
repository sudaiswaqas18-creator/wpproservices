import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, ToolRow, ToolForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { validateToolForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: ToolForm = {
  title: '', slug: '', description: '', full_content: '', icon: 'wrench', is_new: false, sort_order: 0,
};

export default function AdminTools() {
  const [items, setItems] = useState<ToolRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<ToolForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminApi.getTools().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setFieldErrors({}); setModal(true); };
  const openEdit = (row: ToolRow) => {
    const { id, ...rest } = row;
    setForm({ ...rest, is_new: Boolean(rest.is_new) }); setEditId(id); setFieldErrors({}); setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateToolForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateTool(editId, form);
      else await adminApi.createTool(form);
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteTool(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert('Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  const set = (k: keyof ToolForm, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Tools</h1><p className="text-sm text-gray-500">Manage on-demand website tools</p></div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Tool</button>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">New</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3">{row.is_new ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 flex gap-1">
                  <EditBtn onClick={() => openEdit(row)} />
                  <DeleteBtn onClick={() => setDeleteTarget({ id: row.id, title: row.title })} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminModal title={editId ? 'Edit Tool' : 'Add Tool'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
            <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
          </div>
          <FormField label="Description" error={fieldErrors.description}><textarea rows={2} className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`} value={form.description} onChange={(e) => set('description', e.target.value)} /></FormField>
          <FormField label="Full Content"><textarea rows={4} className={textareaClass} value={form.full_content} onChange={(e) => set('full_content', e.target.value)} /></FormField>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.is_new)} onChange={(e) => set('is_new', e.target.checked)} /> Mark as NEW</label>
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
