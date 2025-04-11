import React, { useState } from 'react';
import { Bell, ShoppingCart, Search } from 'lucide-react';

interface NavbarProps {
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('project');
  const tabs = ['Project', 'Saved', 'Shared', 'Achievement'];

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold sm:hidden">Portfolio</h1>
            <div className="flex items-center space-x-4 sm:hidden">
              <button className="text-gray-400 hover:text-gray-500">
                <ShoppingCart size={24} />
              </button>
              <button className="text-gray-400 hover:text-gray-500">
                <Bell size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 pb-4 sm:pb-0">
            <div className="flex space-x-8 overflow-x-auto scrollbar-hide border-b sm:border-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors
                    ${activeTab === tab.toLowerCase()
                      ? 'text-[#E84C3D] border-b-2 border-[#E84C3D]'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search a project"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E84C3D] focus:border-transparent"
              />
            </div>
            
            <button className="text-gray-400 hover:text-gray-500">
              <ShoppingCart size={24} />
            </button>
            <button className="text-gray-400 hover:text-gray-500">
              <Bell size={24} />
            </button>
            
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">{user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search a project"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E84C3D] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;