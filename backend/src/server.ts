import dotenv from "dotenv";
import express, { Express, Request, Response, Application } from "express";
import categoryRouter from "./routes/category.route";
import { connectDB } from "./config/db";
import expensesRouter from "./routes/expense.route";
import cors from "cors";
dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

const app: Application = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to Express & TypeScript Server");
});

app.use("/api", categoryRouter);
app.use("/api", expensesRouter);

try {
	app.listen(PORT, () => {
		console.log(
			`[expenses-server]: Server is running at http://localhost:${PORT}`,
		);
	});
} catch (error) {
	if (error instanceof Error) {
		console.error(`[expenses-server]: Error starting server: ${error.message}`);
	} else {
		console.error(`[expenses-server]: An unknown error occurred.`);
	}
}
