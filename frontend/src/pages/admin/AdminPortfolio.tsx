import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, PortfolioRow, PortfolioForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { validatePortfolioForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: PortfolioForm = { title: '', category: '', image_url: '', sort_order: 0 };

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<PortfolioForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminApi.getPortfolio().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const set = (k: keyof PortfolioForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validatePortfolioForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updatePortfolio(editId, form);
      else await adminApi.createPortfolio(form);
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deletePortfolio(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert('Failed to delete item');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Portfolio</h1></div>
        <button type="button" onClick={() => { setForm(empty); setEditId(null); setModal(true); }} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add</button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((row) => (
          <div key={row.id} className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm">
            {row.image_url && <img src={row.image_url} alt={row.title} className="h-40 w-full object-cover" />}
            <div className="p-4">
              <h3 className="font-bold">{row.title}</h3>
              <p className="text-sm text-gray-500">{row.category}</p>
              <div className="mt-3 flex gap-1">
                <EditBtn onClick={() => { const { id, ...rest } = row; setForm(rest); setEditId(id); setModal(true); }} />
                <DeleteBtn onClick={() => setDeleteTarget({ id: row.id, title: row.title })} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminModal title={editId ? 'Edit Portfolio' : 'Add Portfolio'} open={modal} onClose={() => setModal(false)}>
        <form onSubmit={handleSubmit} noValidate>
          <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
          <FormField label="Category"><input className={fieldInputClass()} value={form.category} onChange={(e) => set('category', e.target.value)} /></FormField>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">Save</button>
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
