import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "debounce"; // Fixed import
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import ProjectCard from "./components/ProjectCard";
import Profile from "./components/Profile";
import {
  getProjects,
  addToCart,
  removeFromCart,
  getCartItems,
} from "./services/api";
import type { Project } from "./types";

const mockUser = {
  id: 1,
  name: "Lorem Ips",
  role: "Project Manager",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  email: "lorem.ips@company.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 2025",
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const {
    data: projectsData,
    isLoading: isLoadingProjects,
    error: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  const { data: cartData, isLoading: isLoadingCart } = useQuery({
    queryKey: ["cart", mockUser.id],
    queryFn: () => getCartItems(mockUser.id),
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ projectId }: { projectId: number }) =>
      addToCart(mockUser.id, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", mockUser.id] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: ({ projectId }: { projectId: number }) =>
      removeFromCart(mockUser.id, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", mockUser.id] });
    },
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddToCart = (projectId: string) => {
    addToCartMutation.mutate({ projectId: parseInt(projectId) });
  };

  const handleRemoveFromCart = (projectId: string) => {
    removeFromCartMutation.mutate({ projectId: parseInt(projectId) });
  };

  const handleCartClick = () => {
    setActiveTab("cart");
  };

  const filteredProjects: Project[] =
    projectsData?.data.filter(
      (project: Project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const cartItemIds =
    cartData?.data?.map((item: Project) => item.id.toString()) || [];
  const cartProjects: Project[] = cartData?.data || [];

  if (isLoadingProjects || isLoadingCart) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading projects
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "cart":
        return (
          <div className="space-y-4">
            {cartProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              cartProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  isInCart={true}
                />
              ))
            )}
          </div>
        );
      case "portfolio":
        return (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAddToCart={handleAddToCart}
                isInCart={cartItemIds.includes(project.id.toString())}
              />
            ))}
          </div>
        );
      case "profile":
        return (
          <div className="p-6 max-w-2xl mx-auto">
            <Profile user={mockUser} />
          </div>
        );
      default:
        return <div className="text-center py-8">Coming soon...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden sm:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div className="flex-1">
        <Navbar
          user={mockUser}
          onSearch={handleSearch}
          cartCount={cartItemIds.length}
          onCartClick={handleCartClick}
        />
        <main className="p-4 sm:p-6 pb-20 sm:pb-6">{renderContent()}</main>
        <MobileNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          cartCount={cartItemIds.length}
        />
      </div>
    </div>
  );
}

export default App;
