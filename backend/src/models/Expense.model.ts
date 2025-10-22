import { model, Schema, Types } from "mongoose";
import { ICategory } from "./Category.model";

export interface IExpense extends Document {
	categoryId: Types.ObjectId | ICategory;
	amount: number;
	description?: string;
	createdAt: Date;
}

const expenseSchema = new Schema<IExpense>({
	amount: {
		type: Number,
		required: [true, "Amount is required"],
		min: [0.001, "Amount must be greater than 0"],
	},
	description: {
		type: String,
		trim: true,
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: [true, "Category is required"],
		index: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Expense = model<IExpense>("Expense", expenseSchema);
