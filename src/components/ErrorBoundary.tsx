import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Application error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const isDev = import.meta.env.DEV;

    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50 px-4">
        <div className="max-w-lg rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertTriangle size={28} />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-3 text-gray-600">
            We encountered an unexpected error. Please reload the page or return to the homepage.
          </p>
          {isDev && this.state.error && (
            <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-gray-50 p-3 text-left text-xs text-red-700">
              {this.state.error.message}
            </pre>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Reload Page
            </button>
            <Link to="/" className="btn-outline inline-flex items-center gap-2">
              <Home size={16} />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
