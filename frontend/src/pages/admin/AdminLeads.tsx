import { useEffect, useState } from 'react';
import { ClipboardList, Gauge, Layers, Mail, Phone, Trash2 } from 'lucide-react';
import { adminApi, LeadRow } from '../../api/admin';
import ConfirmModal from '../../components/admin/ConfirmModal';

type ParsedScope = {
  platform?: string;
  workstreams?: string;
  readiness?: string;
};

/** Split brief vs appended Scope Builder block (plain text, not JSON). */
function parseLeadDetails(raw: string | null | undefined) {
  const text = (raw || '').trim();
  if (!text) return { brief: '', scope: null as ParsedScope | null, hasScopeMarker: false };

  const marker = '--- Scope Builder ---';
  const idx = text.indexOf(marker);
  if (idx === -1) {
    return { brief: text, scope: null, hasScopeMarker: false };
  }

  const brief = text.slice(0, idx).trim();
  const scopeBlock = text.slice(idx + marker.length).trim();
  const scope: ParsedScope = {};

  for (const line of scopeBlock.split(/\r?\n/)) {
    const platform = line.match(/^Platform:\s*(.+)$/i);
    const workstreams = line.match(/^Workstreams:\s*(.+)$/i);
    const readiness = line.match(/^Readiness(?: score)?:\s*(.+)$/i);
    if (platform) scope.platform = platform[1].trim();
    if (workstreams) scope.workstreams = workstreams[1].trim();
    if (readiness) scope.readiness = readiness[1].trim();
  }

  const hasParsed = Boolean(scope.platform || scope.workstreams || scope.readiness);
  return {
    brief,
    scope: hasParsed ? scope : null,
    hasScopeMarker: true,
    scopeFallback: hasParsed ? undefined : scopeBlock,
  };
}

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
    } catch {
      alert('Failed to delete lead');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Contact Leads</h1>
      <p className="text-sm text-gray-500">
        Form submissions from the website contact form — including Scope Builder drafts when present.
      </p>

      <div className="mt-6 space-y-4">
        {items.length === 0 && <p className="text-gray-400">No leads yet.</p>}
        {items.map((lead) => {
          const parsed = parseLeadDetails(lead.project_details);
          const workstreamTags =
            parsed.scope?.workstreams
              ?.split(/;/)
              .map((w) => w.trim())
              .filter(Boolean) ?? [];

          return (
            <div key={lead.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-900">{lead.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {lead.phone}
                      </span>
                    )}
                    <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                      {lead.budget}
                    </span>
                  </div>

                  {parsed.brief ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Project brief</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{parsed.brief}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm italic text-gray-400">No project brief text.</p>
                  )}

                  {parsed.scope && (
                    <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/40 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
                          <ClipboardList size={13} /> Scope Builder
                        </p>
                        {parsed.scope.readiness && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
                            <Gauge size={12} /> {parsed.scope.readiness}
                          </span>
                        )}
                      </div>
                      {parsed.scope.platform && (
                        <div className="mt-3 flex items-start gap-2 text-sm">
                          <Layers size={15} className="mt-0.5 shrink-0 text-brand-600" />
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Platform</p>
                            <p className="font-semibold text-gray-900">{parsed.scope.platform}</p>
                          </div>
                        </div>
                      )}
                      {workstreamTags.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Workstreams</p>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {workstreamTags.map((w) => (
                              <span
                                key={w}
                                className="rounded-full border border-brand-100 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-800"
                              >
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {parsed.hasScopeMarker && !parsed.scope && 'scopeFallback' in parsed && parsed.scopeFallback && (
                    <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/50 p-3">
                      <p className="text-xs font-semibold text-amber-800">Scope Builder (raw)</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{parsed.scopeFallback}</p>
                    </div>
                  )}

                  <p className="mt-3 text-xs text-gray-400">{new Date(lead.created_at).toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteTarget({ id: lead.id, name: lead.name })}
                  className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
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
