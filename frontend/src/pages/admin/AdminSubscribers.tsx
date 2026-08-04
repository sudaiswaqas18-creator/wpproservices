import { useEffect, useState } from 'react';
import { Ban, CheckCircle2, Mail, Trash2 } from 'lucide-react';
import { adminApi, NewsletterRow } from '../../api/admin';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function AdminSubscribers() {
  const [items, setItems] = useState<NewsletterRow[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; email: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = () => adminApi.getNewsletter().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteNewsletter(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      alert('Failed to delete subscriber');
    } finally {
      setDeleting(false);
    }
  };

  const toggleDisabled = async (row: NewsletterRow) => {
    setBusyId(row.id);
    try {
      await adminApi.updateNewsletter(row.id, { admin_disabled: !row.admin_disabled });
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
      <p className="text-sm text-gray-500">
        Emails from the site signup. Disable an address to block resubscribe until you enable it again.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Admin</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
            {items.map((row) => {
              const disabled = Boolean(row.admin_disabled);
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 font-medium text-gray-900">
                      <Mail size={14} className="text-gray-400" /> {row.email}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        row.status === 'subscribed'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {disabled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                        <Ban size={12} /> Disabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={12} /> Allowed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {row.updated_at ? new Date(row.updated_at).toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busyId === row.id}
                        onClick={() => toggleDisabled(row)}
                        className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold hover:bg-gray-50 disabled:opacity-50"
                      >
                        {disabled ? 'Enable subscribe' : 'Disable subscribe'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget({ id: row.id, email: row.email })}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50"
                        aria-label={`Delete ${row.email}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Subscriber"
        itemName={deleteTarget?.email}
        isDeleting={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
