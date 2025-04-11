import React from 'react';
import { Home, FolderKanban, FileInput, User } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'portfolio', icon: FolderKanban, label: 'Portfolio' },
    { id: 'input', icon: FileInput, label: 'Input' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center space-y-1"
          >
            <item.icon
              size={24}
              className={activeTab === item.id ? 'text-[#E84C3D]' : 'text-gray-400'}
            />
            <span
              className={`text-xs ${
                activeTab === item.id ? 'text-[#E84C3D]' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;