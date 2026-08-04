import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Logo from '../Logo';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = 'Confirm Delete Action',
  message = 'Are you sure you want to delete this item? This operation cannot be undone.',
  itemName,
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  isDeleting = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
          >
            {/* Header with Logo */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <Logo variant="light" to="#" />
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="mt-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <AlertTriangle size={28} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              {itemName && (
                <p className="mt-1 line-clamp-1 text-sm font-semibold text-ink">
                  &ldquo;{itemName}&rdquo;
                </p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                {message}
              </p>
            </div>

            {/* Action Buttons — brand black / outline to match site */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-border bg-white py-2.5 text-xs font-bold text-ink-muted transition hover:bg-surface-50"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-brand-500 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-500/20 transition hover:bg-brand-600 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
