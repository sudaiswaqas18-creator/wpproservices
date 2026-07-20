import { X } from 'lucide-react';

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}

export default function AdminModal({ title, open, onClose, children, wide }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-16">
      <div className={`w-full rounded-2xl bg-white shadow-2xl ${wide ? 'max-w-3xl' : 'max-w-lg'}`}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function FormField({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export const inputErrorClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/20';
export const fieldInputClass = (hasError?: boolean) =>
  `${inputClass}${hasError ? ` ${inputErrorClass}` : ''}`;

export const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20';
export const textareaClass = `${inputClass} resize-y`;

export function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
      Delete
    </button>
  );
}

export function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-lg px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50">
      Edit
    </button>
  );
}
