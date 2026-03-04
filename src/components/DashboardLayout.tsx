import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Sidebar />

      <div className="lg:ml-64">
        <TopBar />

        <main className="p-4 md:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
