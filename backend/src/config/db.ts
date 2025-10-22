import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) {
		console.error("❌ FATAL ERROR: MONGO_URI is not defined in .env file");
		process.exit(1);
	}
	mongoose.connection.on("connected", () => {
		console.log("✅ MongoDB connected successfully to 'expense-tracker' DB.");
	});

	mongoose.connection.on("error", (err) => {
		console.error("❌ MongoDB connection error after initial setup:", err);
	});

	mongoose.connection.on("disconnected", () => {
		console.warn("⚠️ MongoDB disconnected.");
	});

	try {
		await mongoose.connect(mongoUri, {});

		console.log("Attempting to connect to MongoDB...");
	} catch (error) {
		console.error("❌ Initial MongoDB connection failed:", error);
		process.exit(1);
	}
};
