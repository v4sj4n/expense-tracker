import { Request, Response } from "express";
import { Category } from "../models/Category.model";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    if (!categories.length)
      return res.status(404).json({ ok: false, msg: "No categories found" });
    return res.status(200).json({ ok: true, categories });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    return res.status(201).json({ ok: true, category });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ ok: false, msg: "Category not found" });
    return res.status(200).json({ ok: true, category });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category)
      return res.status(404).json({ ok: false, msg: "Category not found" });
    return res.status(200).json({ ok: true, category });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ ok: false, msg: "Category not found" });
    return res.status(200).json({ ok: true, category });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: "Internal Server Error" });
  }
};
