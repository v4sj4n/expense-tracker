import express, { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { validateBody } from "../middleware/validate";
import { createCategorySchema } from "../validators/category.validators";

const categoryRouter = Router();

categoryRouter.get("/category", getCategories);
categoryRouter.post(
  "/category",
  validateBody(createCategorySchema),
  createCategory
);
categoryRouter.get("/category/:id", getCategory);
categoryRouter.put(
  "/category/:id",
  validateBody(createCategorySchema),
  updateCategory
);
categoryRouter.delete("/category/:id", deleteCategory);

export default categoryRouter;
