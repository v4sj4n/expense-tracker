import z from "zod";

export const createExpenseSchema = z.object({
	categoryId: z.string().min(1, "Category is required"),
	amount: z.number().min(0.001, "Amount must be greater than 0"),
	description: z.string().optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial();
