import pool from "../config/db";

export interface Project {
  id?: number;
  title: string;
  description: string;
  category: string;
  author: string;
  image_url: string;
}

export class ProjectModel {
  static async getAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ projects: Project[]; total: number }> {
    const offset = (page - 1) * limit;
    const [projects] = await pool.query(
      "SELECT * FROM projects LIMIT ? OFFSET ?",
      [limit, offset]
    );
    const [count] = await pool.query("SELECT COUNT(*) as total FROM projects");
    return {
      projects: projects as Project[],
      total: (count as any)[0].total,
    };
  }

  static async create(project: Project): Promise<Project> {
    const [result] = await pool.execute(
      "INSERT INTO projects (title, description, category, author, image_url) VALUES (?, ?, ?, ?, ?)",
      [
        project.title,
        project.description,
        project.category,
        project.author,
        project.image_url,
      ]
    );
    return { ...project, id: (result as any).insertId };
  }
}

export interface CartItem {
  userId: number;
  projectId: number;
}

export class CartModel {
  static async addToCart(userId: number, projectId: number): Promise<void> {
    await pool.execute("INSERT INTO cart (user_id, project_id) VALUES (?, ?)", [
      userId,
      projectId,
    ]);
  }

  static async getCartItems(userId: number): Promise<Project[]> {
    const [items] = await pool.execute(
      "SELECT p.* FROM projects p JOIN cart c ON p.id = c.project_id WHERE c.user_id = ?",
      [userId]
    );
    return items as Project[];
  }

  static async removeFromCart(
    userId: number,
    projectId: number
  ): Promise<boolean> {
    const [result] = await pool.execute(
      "DELETE FROM cart WHERE user_id = ? AND project_id = ?",
      [userId, projectId]
    );
    return (result as any).affectedRows > 0;
  }
}
