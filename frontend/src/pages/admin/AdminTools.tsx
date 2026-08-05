import { Plus } from 'lucide-react';
import { useEffect, useState, FormEvent } from 'react';
import { adminApi, ToolRow, ToolForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { validateToolForm, hasErrors, FieldErrors } from '../../utils/validation';

const ICON_OPTIONS = [
  { value: 'wrench', label: 'Wrench (default)' },
  { value: 'bug', label: 'Bug' },
  { value: 'palette', label: 'Palette' },
  { value: 'message-circle', label: 'Message' },
  { value: 'zap', label: 'Zap / Speed' },
  { value: 'trending-up', label: 'Trending / Conversion' },
  { value: 'shield', label: 'Shield / Security' },
  { value: 'clipboard-list', label: 'Checklist' },
];

const empty: ToolForm = {
  title: '',
  slug: '',
  description: '',
  full_content: '',
  icon: 'wrench',
  is_new: false,
  sort_order: 0,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminTools() {
  const [items, setItems] = useState<ToolRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<ToolForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loadError, setLoadError] = useState('');

  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    adminApi
      .getTools()
      .then((rows) => {
        setItems(rows);
        setLoadError('');
      })
      .catch((err) => {
        console.error(err);
        setLoadError(err instanceof Error ? err.message : 'Failed to load tools — is the backend running on :5002?');
      });

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(empty);
    setEditId(null);
    setFieldErrors({});
    setModal(true);
  };

  const openEdit = (row: ToolRow) => {
    const { id, ...rest } = row;
    setForm({ ...rest, is_new: Boolean(rest.is_new), icon: rest.icon || 'wrench' });
    setEditId(id);
    setFieldErrors({});
    setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload: ToolForm = {
      ...form,
      slug: form.slug.trim() || slugify(form.title),
      sort_order: Number(form.sort_order) || 0,
    };
    const errs = validateToolForm(payload);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateTool(editId, payload);
      else await adminApi.createTool(payload);
      setModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed — check backend connection');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteTool(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      alert('Failed to delete item — check backend connection');
    } finally {
      setDeleting(false);
    }
  };

  const set = (k: keyof ToolForm, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
          <p className="text-sm text-gray-500">Manage checklist cards shown on /resources/tools</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm">
          <Plus size={16} /> Add Tool
        </button>
      </div>

      {loadError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">New</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-gray-500">{row.slug}</td>
                <td className="px-4 py-3 text-gray-500">{row.icon || 'wrench'}</td>
                <td className="px-4 py-3">{row.sort_order}</td>
                <td className="px-4 py-3">{row.is_new ? 'Yes' : 'No'}</td>
                <td className="flex gap-1 px-4 py-3">
                  <EditBtn onClick={() => openEdit(row)} />
                  <DeleteBtn onClick={() => setDeleteTarget({ id: row.id, title: row.title })} />
                </td>
              </tr>
            ))}
            {!items.length && !loadError && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No tools yet — add one to show it on the frontend.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title={editId ? 'Edit Tool' : 'Add Tool'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}>
              <input
                className={fieldInputClass(!!fieldErrors.title)}
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: editId ? f.slug : slugify(title),
                  }));
                }}
              />
            </FormField>
            <FormField label="Slug" error={fieldErrors.slug}>
              <input
                className={fieldInputClass(!!fieldErrors.slug)}
                value={form.slug}
                onChange={(e) => set('slug', e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Description" error={fieldErrors.description}>
            <textarea
              rows={2}
              className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
          </FormField>
          <FormField label="Full Content (shown on detail page)">
            <textarea
              rows={5}
              className={textareaClass}
              value={form.full_content}
              onChange={(e) => set('full_content', e.target.value)}
              placeholder="Write the checklist body. Use blank lines between paragraphs for multiple cards."
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Icon">
              <select
                className={fieldInputClass(false)}
                value={form.icon || 'wrench'}
                onChange={(e) => set('icon', e.target.value)}
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Sort order">
              <input
                type="number"
                className={fieldInputClass(false)}
                value={form.sort_order}
                onChange={(e) => set('sort_order', Number(e.target.value))}
              />
            </FormField>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(form.is_new)}
              onChange={(e) => set('is_new', e.target.checked)}
            />{' '}
            Mark as NEW
          </label>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">
              Cancel
            </button>
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
