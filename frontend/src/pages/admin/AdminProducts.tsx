import { useEffect, useMemo, useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';
import { adminApi, ProductRow, ProductForm } from '../../api/admin';
import AdminModal, { FormField, fieldInputClass, textareaClass, DeleteBtn, EditBtn } from '../../components/admin/AdminModal';
import { validateProductForm, hasErrors, FieldErrors } from '../../utils/validation';
import { PLUGIN_CATEGORIES, PLUGIN_CATEGORY_LABELS } from '../../data/productCategories';

const empty: ProductForm = {
  title: '', slug: '', subtitle: '', description: '', full_content: '', features: [],
  category: 'conversion', price: '', rating: '', rating_count: 'WooCommerce extension', image_url: '', buy_url: '/contact', sort_order: 0,
};

export default function AdminProducts() {
  const [items, setItems] = useState<ProductRow[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState<ProductForm>(empty);
  const [featuresText, setFeaturesText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const load = () => adminApi.getProducts().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    if (category === 'all') return items;
    return items.filter((row) => (row.category || 'conversion') === category);
  }, [items, category]);

  const syncCatalog = async () => {
    setSyncing(true);
    try {
      const result = await adminApi.syncPluginCatalog();
      await load();
      alert(`Synced ${result.products} WooCommerce plugins. Testimonials cleared: ${result.testimonials === 0 ? 'yes' : 'remaining ' + result.testimonials}.`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Sync failed — is the backend DB connected?');
    } finally {
      setSyncing(false);
    }
  };

  const openCreate = () => {
    setForm({ ...empty, category: category === 'all' ? 'conversion' : category });
    setFeaturesText('');
    setEditId(null);
    setFieldErrors({});
    setModal(true);
  };

  const openEdit = (row: ProductRow) => {
    const { id, ...rest } = row;
    setForm({ ...empty, ...rest, category: rest.category || 'conversion' });
    setFeaturesText((rest.features || []).join('\n'));
    setEditId(id);
    setFieldErrors({});
    setModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateProductForm(form);
    setFieldErrors(errs);
    if (hasErrors(errs)) return;
    setSaving(true);
    const data = { ...form, features: featuresText.split('\n').filter(Boolean) };
    try {
      if (editId) await adminApi.updateProduct(editId, data);
      else await adminApi.createProduct(data);
      setModal(false);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (k: keyof ProductForm, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plugins</h1>
          <p className="text-sm text-gray-500">WooCommerce plugins catalog — same records as the public /products page</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={syncCatalog} disabled={syncing} className="btn-outline gap-2 text-sm">
            {syncing ? 'Syncing…' : 'Sync catalog to DB'}
          </button>
          <button type="button" onClick={openCreate} className="btn-primary gap-2 text-sm"><Plus size={16} /> Add Plugin</button>
        </div>
      </div>

      {items.length === 0 && (
        <p className="shrink-0 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No plugins in the database yet. Click <strong>Sync catalog to DB</strong> to load all WooCommerce plugins, or add one manually.
        </p>
      )}

      <div className="flex shrink-0 flex-wrap gap-2" role="tablist" aria-label="Filter plugins by category">
        <button
          type="button"
          role="tab"
          aria-selected={category === 'all'}
          onClick={() => setCategory('all')}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            category === 'all' ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand-200'
          }`}
        >
          All ({items.length})
        </button>
        {PLUGIN_CATEGORIES.map((c) => {
          const count = items.filter((i) => (i.category || '') === c.id).length;
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                active ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand-200'
              }`}
            >
              {c.title.split(' & ')[0]} ({count})
            </button>
          );
        })}
      </div>

      <div className="scroll-area min-h-0 flex-1 overflow-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-gray-500">{PLUGIN_CATEGORY_LABELS[row.category] || row.category || '—'}</td>
                <td className="px-4 py-3 text-gray-500">{row.price}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <EditBtn onClick={() => openEdit(row)} />
                    <DeleteBtn onClick={async () => { if (confirm('Delete?')) { await adminApi.deleteProduct(row.id); load(); } }} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-500">No plugins in this category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AdminModal title={editId ? 'Edit Plugin' : 'Add Plugin'} open={modal} onClose={() => setModal(false)} wide>
        <form onSubmit={handleSubmit} noValidate className="scroll-area max-h-[70vh] overflow-y-auto pr-1">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Title *" error={fieldErrors.title}><input className={fieldInputClass(!!fieldErrors.title)} value={form.title} onChange={(e) => set('title', e.target.value)} /></FormField>
            <FormField label="Slug" error={fieldErrors.slug}><input className={fieldInputClass(!!fieldErrors.slug)} value={form.slug} onChange={(e) => set('slug', e.target.value)} /></FormField>
          </div>
          <FormField label="Subtitle"><input className={fieldInputClass()} value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} /></FormField>
          <FormField label="Category">
            <select className={fieldInputClass()} value={form.category || 'conversion'} onChange={(e) => set('category', e.target.value)}>
              {PLUGIN_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Description" error={fieldErrors.description}><textarea rows={2} className={`${textareaClass}${fieldErrors.description ? ' border-red-400' : ''}`} value={form.description} onChange={(e) => set('description', e.target.value)} /></FormField>
          <FormField label="Full Content"><textarea rows={3} className={textareaClass} value={form.full_content} onChange={(e) => set('full_content', e.target.value)} /></FormField>
          <FormField label="Features (one per line)"><textarea rows={3} className={textareaClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} /></FormField>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField label="Price" error={fieldErrors.price}><input className={fieldInputClass(!!fieldErrors.price)} value={form.price} onChange={(e) => set('price', e.target.value)} /></FormField>
            <FormField label="Rating"><input className={fieldInputClass()} value={form.rating} onChange={(e) => set('rating', e.target.value)} /></FormField>
            <FormField label="Rating Count"><input className={fieldInputClass()} value={form.rating_count} onChange={(e) => set('rating_count', e.target.value)} /></FormField>
          </div>
          <FormField label="Image URL" error={fieldErrors.image_url}><input className={fieldInputClass(!!fieldErrors.image_url)} value={form.image_url} onChange={(e) => set('image_url', e.target.value)} /></FormField>
          <FormField label="Buy URL (optional — full https checkout link; leave empty or /contact for contact form)">
            <input className={fieldInputClass()} value={form.buy_url || ''} onChange={(e) => set('buy_url', e.target.value)} placeholder="https://store.example.com/product/..." />
          </FormField>
          <div className="mt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setModal(false)} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
