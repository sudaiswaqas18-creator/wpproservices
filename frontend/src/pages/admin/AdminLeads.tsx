import { useEffect, useState } from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { adminApi, LeadRow } from '../../api/admin';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function AdminLeads() {
  const [items, setItems] = useState<LeadRow[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => adminApi.getLeads().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminApi.deleteLead(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch (err) {
      alert('Failed to delete lead');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Contact Leads</h1>
      <p className="text-sm text-gray-500">Form submissions from the website contact form</p>

      <div className="mt-6 space-y-4">
        {items.length === 0 && <p className="text-gray-400">No leads yet.</p>}
        {items.map((lead) => (
          <div key={lead.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{lead.name}</h3>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Mail size={14} /> {lead.email}</span>
                  {lead.phone && <span className="flex items-center gap-1"><Phone size={14} /> {lead.phone}</span>}
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">{lead.budget}</span>
                </div>
                <p className="mt-3 text-sm text-gray-700">{lead.project_details}</p>
                <p className="mt-2 text-xs text-gray-400">{new Date(lead.created_at).toLocaleString()}</p>
              </div>
              <button type="button" onClick={() => setDeleteTarget({ id: lead.id, name: lead.name })} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Lead Submission"
        itemName={deleteTarget?.name}
        isDeleting={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
