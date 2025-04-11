import { Request, Response, NextFunction } from "express";
import { ProjectModel, CartModel } from "../models/Project";
import db from "../config/db";
import { QueryResult } from "pg";

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await ProjectModel.getAll(page, limit);

    res.json({
      success: true,
      data: result.projects,
      pagination: {
        page,
        limit,
        total: result.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, projectId } = req.body;

    await CartModel.addToCart(userId, projectId);

    res.json({
      success: true,
      message: "Project added to cart successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.query.userId as string);

    const cartItems = await CartModel.getCartItems(userId);

    res.json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const userId = parseInt(req.query.userId as string);

    const removed = await CartModel.removeFromCart(userId, parseInt(projectId));

    if (!removed) {
      res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    next(error);
  }
};
