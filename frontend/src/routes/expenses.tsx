import { useAxios } from "@/hooks/useAxios.hook";
import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import AxiosInstance from "@/lib/axios";
import { Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/expenses")({
  component: RouteComponent,
});

interface Category {
  _id: string;
  name: string;
}

interface Expense {
  _id: string;
  categoryId: string;
  amount: number;
  description?: string;
  createdAt: string;
}

interface ExpenseData {
  ok: boolean;
  expenses: Expense[];
}

interface CategoryData {
  ok: boolean;
  categories: Category[];
}

function RouteComponent() {
  const { data, error, loading, refetch } = useAxios<ExpenseData>("expenses");
  const { data: categoriesData } = useAxios<CategoryData>("category");

  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  // --- CREATE ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId || !amount) return;

    setIsSubmitting(true);
    try {
      await AxiosInstance.post("/expenses", {
        categoryId,
        amount: parseFloat(amount),
        description: description || undefined,
      });
      setCategoryId("");
      setAmount("");
      setDescription("");
      await refetch();
    } catch (err) {
      console.error("❌ Failed to create expense:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;
    try {
      await AxiosInstance.delete(`/expenses/${id}`);
      await refetch();
    } catch (err) {
      console.error("❌ Failed to delete expense:", err);
    }
  };

  // --- EDIT MODE ---
  const startEditing = (expense: Expense) => {
    setEditingId(expense._id);
    setEditingCategoryId(expense.categoryId);
    setEditingAmount(expense.amount.toString());
    setEditingDescription(expense.description || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingCategoryId("");
    setEditingAmount("");
    setEditingDescription("");
  };

  // --- UPDATE ---
  const handleUpdate = async (id: string) => {
    if (!editingCategoryId || !editingAmount) {
      cancelEditing();
      return;
    }

    try {
      await AxiosInstance.put(`/expenses/${id}`, {
        categoryId: editingCategoryId,
        amount: parseFloat(editingAmount),
        description: editingDescription || undefined,
      });
      cancelEditing();
      await refetch();
    } catch (err) {
      console.error("❌ Failed to update expense:", err);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categoriesData?.categories.find(
      (cat) => cat._id === categoryId
    );
    return category?.name || "Unknown";
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 pb-8">
      <h1 className="text-3xl font-semibold mb-6">Expenses</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select category</option>
              {categoriesData?.categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Expense"}
        </button>
      </form>

      {/* Expense List */}
      <div className="rounded-md border">
        {loading && (
          <div className="p-8 text-center text-muted-foreground">
            Loading expenses...
          </div>
        )}

        {error && (
          <div className="p-8 text-center text-destructive">
            {error.toString()}
          </div>
        )}

        {!loading && data && (
          <>
            {data.expenses.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No expenses yet.
              </div>
            ) : (
              <ul className="divide-y">
                {data.expenses.map((expense) => (
                  <li
                    key={expense._id}
                    className="px-4 py-3 hover:bg-muted/40 transition-colors"
                  >
                    {editingId === expense._id ? (
                      <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <select
                            value={editingCategoryId}
                            onChange={(e) =>
                              setEditingCategoryId(e.target.value)
                            }
                            className="border border-input bg-background px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {categoriesData?.categories.map((cat) => (
                              <option key={cat._id} value={cat._id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            step="0.01"
                            value={editingAmount}
                            onChange={(e) => setEditingAmount(e.target.value)}
                            className="border border-input bg-background px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                          <input
                            type="text"
                            value={editingDescription}
                            onChange={(e) =>
                              setEditingDescription(e.target.value)
                            }
                            placeholder="Description"
                            className="border border-input bg-background px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdate(expense._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Category
                            </span>
                            <p className="text-sm font-medium">
                              {getCategoryName(expense.categoryId)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Amount
                            </span>
                            <p className="text-sm font-semibold">
                              ${expense.amount.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Description
                            </span>
                            <p className="text-sm">
                              {expense.description || "—"}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">
                              Date
                            </span>
                            <p className="text-sm">
                              {new Date(expense.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            type="button"
                            onClick={() => startEditing(expense)}
                            className="p-1 hover:bg-blue-100 rounded-md text-blue-600"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(expense._id)}
                            className="p-1 hover:bg-red-100 rounded-md text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RouteComponent;
