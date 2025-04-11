import axios from "axios";
import type { Project } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Dummy data for fallback
const dummyProjects: Project[] = [
  {
    id: 1,
    title: "Mountain Trek Adventure",
    description:
      "Experience the thrill of mountain climbing with expert guides.",
    category: "Adventure",
    author: "John Smith",
    image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    id: 2,
    title: "Beach Paradise Tour",
    description: "Relax on pristine beaches and enjoy water activities.",
    category: "Leisure",
    author: "Sarah Johnson",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 3,
    title: "Cultural Heritage Walk",
    description: "Explore ancient temples and local traditions.",
    category: "Cultural",
    author: "Mike Wilson",
    image_url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
  },
];

export const getProjects = async (page = 1, limit = 10) => {
  try {
    const response = await api.get<{
      success: boolean;
      data: Project[];
      pagination: any;
    }>("/projects", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.log("Falling back to dummy data");
    return {
      success: true,
      data: dummyProjects,
      pagination: {
        page,
        limit,
        total: dummyProjects.length,
      },
    };
  }
};

// Dummy cart state for fallback
let dummyCart: Set<number> = new Set();

export const addToCart = async (userId: number, projectId: number) => {
  try {
    const response = await api.post<{ success: boolean; message: string }>(
      "/cart",
      {
        userId,
        projectId,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Using dummy cart");
    dummyCart.add(projectId);
    return {
      success: true,
      message: "Project added to dummy cart",
    };
  }
};

export const getCartItems = async (userId: number) => {
  try {
    const response = await api.get<{ success: boolean; data: Project[] }>(
      "/cart",
      {
        params: { userId },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Using dummy cart");
    const cartItems = dummyProjects.filter((project) =>
      dummyCart.has(project.id)
    );
    return {
      success: true,
      data: cartItems,
    };
  }
};

export const removeFromCart = async (userId: number, projectId: number) => {
  try {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/cart/${projectId}`,
      {
        params: { userId },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Using dummy cart");
    dummyCart.delete(projectId);
    return {
      success: true,
      message: "Project removed from dummy cart",
    };
  }
};
