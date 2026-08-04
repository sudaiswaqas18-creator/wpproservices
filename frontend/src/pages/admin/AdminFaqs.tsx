import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, FaqRow, FaqForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { validateFaqForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: FaqForm = { question: '', answer: '', page_slug: 'home', sort_order: 0 };

export default function AdminFaqs() {
  const [items, setItems] = useState<FaqRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<FaqForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminApi.getFaqs().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const set = (k: keyof FaqForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateFaqForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateFaq(editId, form);
      else await adminApi.createFaq(form);
      setModal(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : 'Failed'); }
    finally { setSaving(false); }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteFaq(deleteTarget.id);
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
        <div><h1 className="text-2xl font-bold text-gray-900">FAQs</h1></div>
        <button type="button" onClick={() => { setForm(empty); setEditId(null); setModal(true); }} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add FAQ</button>
      </div>
      <div className="mt-6 space-y-3">
        {items.map((row) => (
          <div key={row.id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{row.question}</h3>
                <p className="mt-1 text-sm text-gray-600">{row.answer}</p>
              </div>
              <div className="flex gap-1 shrink-0 ml-4">
                <EditBtn onClick={() => { const { id, ...rest } = row; setForm(rest); setEditId(id); setModal(true); }} />
                <DeleteBtn onClick={() => setDeleteTarget({ id: row.id, title: row.question })} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminModal title={editId ? 'Edit FAQ' : 'Add FAQ'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <FormField label="Question *" error={fieldErrors.question}><input className={fieldInputClass(!!fieldErrors.question)} value={form.question} onChange={(e) => set('question', e.target.value)} /></FormField>
          <FormField label="Answer *" error={fieldErrors.answer}><textarea rows={3} className={`${textareaClass}${fieldErrors.answer ? ' border-red-400' : ''}`} value={form.answer} onChange={(e) => set('answer', e.target.value)} /></FormField>
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
