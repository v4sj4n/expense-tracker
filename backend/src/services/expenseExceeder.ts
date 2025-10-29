import { Expense } from "../models/Expense.model";
import { getCurrentMonthRange } from "../utils/helpers";
import { sendEmail } from "./email";

export const checkMonthlyExpenseLimit = async () => {
  const { start, end } = getCurrentMonthRange();
  const total = await Expense.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalAmount = total[0]?.total || 0;

  if (totalAmount > 1000) {
    await sendEmail();
  }

  return totalAmount;
};