import { useState, useRef, useEffect } from 'react';
import { Bell, User as UserIcon, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../lib/authContext';

export function TopBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="h-16 bg-[#FAF8F3] border-b border-[#E0D7C6] flex items-center justify-end px-6 gap-4">
      <button className="p-2 hover:bg-[#F5F1E8] rounded-lg transition-colors duration-200 relative">
        <Bell size={20} className="text-[#6B4423]" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          <img
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#E0D7C6]"
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E0D7C6] overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-[#E0D7C6] bg-[#FAF8F3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8B6F47] flex items-center justify-center">
                  <UserIcon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#6B4423] truncate">
                    {currentUser?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-[#9B8B7E] truncate">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/settings');
                }}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FAF8F3] transition-colors duration-200 text-left"
              >
                <SettingsIcon size={18} className="text-[#8B6F47]" />
                <span className="text-sm text-[#6B4423]">Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors duration-200 text-left border-t border-[#E0D7C6]"
              >
                <LogOut size={18} className="text-red-600" />
                <span className="text-sm text-red-600">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

