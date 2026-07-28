const raw = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

/** `/api` in dev (Vite proxy); full backend URL in production */
export const API_BASE = raw ? `${raw}/api` : '/api';

export function apiUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${API_BASE}/${clean}`;
}
