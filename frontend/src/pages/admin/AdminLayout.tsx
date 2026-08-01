import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ProtectedRoute from '../../components/admin/ProtectedRoute';

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar />
        <main className="scroll-area flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden p-6 lg:p-8">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
