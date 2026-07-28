import { useEffect, useState } from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { adminApi, LeadRow } from '../../api/admin';

export default function AdminLeads() {
  const [items, setItems] = useState<LeadRow[]>([]);

  const load = () => adminApi.getLeads().then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this lead?')) return;
    await adminApi.deleteLead(id);
    load();
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
              <button type="button" onClick={() => handleDelete(lead.id)} className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
