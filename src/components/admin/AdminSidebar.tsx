import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, Image,
  HelpCircle, Mail, Wrench, LogOut, ExternalLink, Star,
  Package, Bot, BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/blogs', label: 'Blog Posts', icon: FileText },
  { to: '/admin/case-studies', label: 'Case Studies', icon: Briefcase },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/tools', label: 'Tools', icon: Bot },
  { to: '/admin/guidebooks', label: 'Guidebooks', icon: BookOpen },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/portfolio', label: 'Portfolio', icon: Image },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/leads', label: 'Contact Leads', icon: Mail },
];

export default function AdminSidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="flex w-64 flex-col bg-gray-900 text-gray-300">
      <div className="border-b border-gray-800 bg-black px-4 py-4">
        <Logo variant="dark" />
        <p className="mt-2 text-xs text-gray-500">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-brand-500 text-white' : 'hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <p className="truncate text-sm font-medium text-white">{admin?.name}</p>
        <p className="truncate text-xs text-gray-500">{admin?.email}</p>
        <div className="mt-3 flex gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-xs hover:bg-gray-700">
            <ExternalLink size={12} /> Site
          </a>
          <button type="button" onClick={handleLogout} className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-900/50 px-3 py-2 text-xs text-red-300 hover:bg-red-900">
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
