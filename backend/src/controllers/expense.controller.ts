import { Request, Response } from "express";
import { Expense } from "../models/Expense.model";

export const getExpenses = async (req: Request, res: Response) => {
	try {
		const expenses = await Expense.find().sort({ createdAt: -1 });
		if (!expenses.length)
			return res.status(404).json({ ok: false, msg: "No expenses found" });
		return res.status(200).json({ ok: true, expenses });
	} catch (error) {
		return res.status(500).json({ ok: false, msg: "Internal Server Error" });
	}
};

export const createExpense = async (req: Request, res: Response) => {
	try {
		const { categoryId, amount, description } = req.body;
		const expense = await Expense.create({
			categoryId,
			amount,
			description,
		});
		return res.status(201).json({ ok: true, expense });
	} catch (error) {
		return res.status(500).json({ ok: false, msg: "Internal Server Error" });
	}
};

export const getExpense = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const expense = await Expense.findById(id);
		if (!expense)
			return res.status(404).json({ ok: false, msg: "Expense not found" });
		return res.status(200).json({ ok: true, expense });
	} catch (error) {
		return res.status(500).json({ ok: false, msg: "Internal Server Error" });
	}
};

export const updateExpense = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { ...fieldsToUpdate } = req.body;
		const expense = await Expense.findByIdAndUpdate(
			id,
			{ ...fieldsToUpdate },
			{ new: true },
		);
		if (!expense)
			return res.status(404).json({ ok: false, msg: "Expense not found" });
		return res.status(200).json({ ok: true, expense });
	} catch (error) {
		return res.status(500).json({ ok: false, msg: "Internal Server Error" });
	}
};

export const deleteExpense = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const expense = await Expense.findByIdAndDelete(id);
		if (!expense)
			return res.status(404).json({ ok: false, msg: "Expense not found" });
		return res.status(200).json({ ok: true, expense });
	} catch (error) {
		return res.status(500).json({ ok: false, msg: "Internal Server Error" });
	}
};
