import { useEffect, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, BlogRow, BlogForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import { validateBlogForm, hasErrors, FieldErrors } from '../../utils/validation';

const empty: BlogForm = {
  title: '', slug: '', excerpt: '', content: '', author: 'WPServices Team',
  image_url: '', published_at: new Date().toISOString().slice(0, 10), sort_order: 0,
};

export default function AdminBlogs() {
  const [items, setItems] = useState<BlogRow[]>([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<BlogForm>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const load = () => adminApi.getBlogs().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(empty); setEditId(null); setFieldErrors({}); setModal(true); };
  const openEdit = (row: BlogRow) => {
    setForm({ title: row.title, slug: row.slug, excerpt: row.excerpt, content: row.content, author: row.author, image_url: row.image_url, published_at: row.published_at?.slice(0, 10) || '', sort_order: row.sort_order });
    setEditId(row.id); setFieldErrors({}); setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateBlogForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    try {
      if (editId) await adminApi.updateBlog(editId, form);
      else await adminApi.createBlog(form);
      setModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog post?')) return;
    await adminApi.deleteBlog(id);
    load();
  };

  const set = (k: keyof BlogForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500">Add, edit, and delete blog articles — same posts as the public blog</p>
        </div>
        <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Post</button>
      </div>

      <div className="scroll-area min-h-0 flex-1 overflow-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Author</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.title}</td>
                <td className="px-4 py-3 text-gray-600">{row.author}</td>
                <td className="px-4 py-3 text-gray-500">{row.published_at?.slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <EditBtn onClick={() => openEdit(row)} />
                    <DeleteBtn onClick={() => handleDelete(row.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminModal title={editId ? 'Edit Blog Post' : 'Add Blog Post'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate className="scroll-area max-h-[70vh] overflow-y-auto pr-1">
          <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
          <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="auto-generated if empty" /></FormField>
          <FormField label="Author"><input className={fieldInputClass()} value={form.author} onChange={(e) => set('author', e.target.value)} /></FormField>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <FormField label="Published Date"><input type="date" className={fieldInputClass()} value={form.published_at} onChange={(e) => set('published_at', e.target.value)} /></FormField>
          <FormField label="Excerpt"><textarea rows={2} className={textareaClass} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} /></FormField>
          <FormField label="Content *" error={fieldErrors.content}><textarea rows={8} className={`${textareaClass}${fieldErrors.content ? ' border-red-400' : ''}`} value={form.content} onChange={(e) => set('content', e.target.value)} /></FormField>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
