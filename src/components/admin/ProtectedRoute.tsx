import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center text-gray-500">Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
