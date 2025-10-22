import { Router } from "express";
import {
	createExpense,
	deleteExpense,
	getExpense,
	getExpenses,
	updateExpense,
} from "../controllers/expense.controller";
import { validateBody } from "../middleware/validate";
import {
	createExpenseSchema,
	updateExpenseSchema,
} from "../validators/expense.validators";

const expensesRouter = Router();

expensesRouter.get("/expenses", getExpenses);
expensesRouter.post(
	"/expenses",
	validateBody(createExpenseSchema),
	createExpense,
);
expensesRouter.get("/expenses/:id", getExpense);
expensesRouter.put(
	"/expenses/:id",
	validateBody(updateExpenseSchema),
	updateExpense,
);
expensesRouter.delete("/expenses/:id", deleteExpense);

export default expensesRouter;
