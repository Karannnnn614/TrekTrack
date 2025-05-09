import React from "react";
import {
  LayoutDashboard,
  FolderKanban,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
  activeTab,
  onTabChange,
}) => {
  const navItems = [
    { id: "home", icon: LayoutDashboard, label: "Home" },
    { id: "portfolio", icon: FolderKanban, label: "Portfolio" },
    { id: "cart", icon: ShoppingCart, label: "Cart" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div
      className={`bg-[#E84C3D] text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen`}
    >
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && <span className="text-xl font-bold">LOGO</span>}
        <button onClick={toggleSidebar} className="p-2">
          <Menu size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center p-4 hover:bg-white/10 transition-colors
              ${activeTab === item.id ? "bg-white/20" : ""}`}
          >
            <item.icon size={24} />
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
