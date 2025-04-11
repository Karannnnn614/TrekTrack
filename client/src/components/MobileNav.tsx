import React from "react";
import { Home, FolderKanban, ShoppingCart, User } from "lucide-react";

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  count?: number;
}

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
}

const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  cartCount = 0,
}) => {
  const navItems: NavItem[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "portfolio", icon: FolderKanban, label: "Portfolio" },
    { id: "cart", icon: ShoppingCart, label: "Cart", count: cartCount },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center space-y-1 relative"
          >
            <item.icon
              size={24}
              className={
                activeTab === item.id ? "text-[#E84C3D]" : "text-gray-400"
              }
            />
            {item.count && item.count > 0 && item.id === "cart" && (
              <span className="absolute -top-1 -right-1 bg-[#E84C3D] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {item.count}
              </span>
            )}
            <span
              className={`text-xs ${
                activeTab === item.id ? "text-[#E84C3D]" : "text-gray-400"
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
