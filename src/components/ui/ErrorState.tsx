import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong while loading data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50/50 px-6 py-12 text-center">
      <AlertCircle className="mx-auto text-red-500" size={32} />
      <p className="mt-4 font-medium text-gray-900">Unable to load content</p>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary mt-6 inline-flex items-center gap-2">
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}
