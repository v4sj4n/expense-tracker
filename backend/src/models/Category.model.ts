import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
	name: string;
	createdAt: Date;
}

const categorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Category = model<ICategory>("Category", categorySchema);
