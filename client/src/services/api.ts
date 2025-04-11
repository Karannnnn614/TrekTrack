import axios from "axios";
import type { Project } from "../types";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProjects = async (page = 1, limit = 10) => {
  const response = await api.get<{
    success: boolean;
    data: Project[];
    pagination: any;
  }>("/projects", {
    params: { page, limit },
  });
  return response.data;
};

export const addToCart = async (userId: number, projectId: number) => {
  const response = await api.post<{ success: boolean; message: string }>(
    "/cart",
    {
      userId,
      projectId,
    }
  );
  return response.data;
};

export const getCartItems = async (userId: number) => {
  const response = await api.get<{ success: boolean; data: Project[] }>(
    "/cart",
    {
      params: { userId },
    }
  );
  return response.data;
};

export const removeFromCart = async (userId: number, projectId: number) => {
  const response = await api.delete<{ success: boolean; message: string }>(
    `/cart/${projectId}`,
    {
      params: { userId },
    }
  );
  return response.data;
};
