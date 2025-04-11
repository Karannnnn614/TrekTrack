import { Router } from "express";
import { body, query, param } from "express-validator";
import {
  getProjects,
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/projectController";
import { validate } from "../middleware/validate";

const router = Router();

// GET /projects - Fetch projects with pagination
router.get(
  "/projects",
  validate([
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
  ]),
  getProjects
);

// POST /cart - Add project to cart
router.post(
  "/cart",
  validate([
    body("userId").isInt({ min: 1 }),
    body("projectId").isInt({ min: 1 }),
  ]),
  addToCart
);

// GET /cart - Get cart items
router.get("/cart", validate([query("userId").isInt({ min: 1 })]), getCart);

// DELETE /cart/:projectId - Remove project from cart
router.delete(
  "/cart/:projectId",
  validate([
    param("projectId").isInt({ min: 1 }),
    query("userId").isInt({ min: 1 }),
  ]),
  removeFromCart
);

export default router;
