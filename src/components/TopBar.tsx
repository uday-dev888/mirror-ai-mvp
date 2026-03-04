import { Bell } from 'lucide-react';

export function TopBar() {
  return (
    <div className="h-16 bg-[#FAF8F3] border-b border-[#E0D7C6] flex items-center justify-end px-6 gap-4">
      <button className="p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors duration-200 relative">
        <Bell size={20} className="text-[#6B4423]" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <div className="flex items-center gap-3">
        <img
          src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#E0D7C6]"
        />
      </div>
    </div>
  );
}
