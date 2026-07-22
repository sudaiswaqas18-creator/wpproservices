import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center shadow-card">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon size={28} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">{message}</p>
      {actionLabel && actionHref && (
        <Link to={actionHref} className="btn-primary mt-6 inline-flex">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
