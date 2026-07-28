import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  className?: string;
}

export default function LoadingSpinner({ label = 'Loading...', className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-16 ${className}`} role="status" aria-live="polite">
      <Loader2 size={32} className="animate-spin text-brand-500" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
