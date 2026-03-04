import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Image, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/galleries', label: 'Galleries', icon: Image },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#FAF8F3] border-t border-[#E0D7C6] z-50">
      <ul className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path} className="flex-1">
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center h-full gap-1 transition-colors duration-200 ${
                  isActive ? 'text-[#4E342E]' : 'text-[#A08A6D]'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
