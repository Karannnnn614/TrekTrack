export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  name: string;
  role: string;
  avatar: string;
}
