import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ProtectedRoute from '../../components/admin/ProtectedRoute';

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="scroll-area flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
