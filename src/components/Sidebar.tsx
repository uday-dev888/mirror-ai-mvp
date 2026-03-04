import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Image, BarChart3, Settings } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/galleries', label: 'Galleries', icon: Image },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#FAF8F3] border-r border-[#E0D7C6] fixed left-0 top-0">
      <div className="p-6 border-b border-[#E0D7C6]">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4E342E] text-white shadow-md'
                      : 'text-[#6B4423] hover:bg-[#F5F1E8]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
