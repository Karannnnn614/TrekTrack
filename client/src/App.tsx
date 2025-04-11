import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import ProjectCard from "./components/ProjectCard";
import { getProjects, addToCart, getCartItems } from "./services/api";
import type { Project } from "./types";

const mockUser = {
  id: 1, // Added ID for API calls
  name: "Lorem Ips",
  role: "Manager",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleAddToCart = (projectId: string) => {
    addToCartMutation.mutate({ projectId: parseInt(projectId) });
  };

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

  const cartItemIds = cartData?.data?.map((item) => item.id.toString()) || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden sm:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div className="flex-1">
        <Navbar user={mockUser} />
        <main className="p-4 sm:p-6 pb-20 sm:pb-6">
          <div className="space-y-4">
            {projectsData?.data.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAddToCart={handleAddToCart}
                isInCart={cartItemIds.includes(project.id.toString())}
              />
            ))}
          </div>
        </main>
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
