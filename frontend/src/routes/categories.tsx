import { useAxios } from "@/hooks/useAxios.hook";
import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import AxiosInstance from "@/lib/axios";
import { X, Check, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
});

interface Category {
  _id: number;
  name: string;
}

interface CategoryData {
  ok: boolean;
  categories: Category[];
}

function RouteComponent() {
  const { data, error, loading, refetch } = useAxios<CategoryData>("category");
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  // --- CREATE ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = categoryName.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      await AxiosInstance.post("/category", { name: trimmed });
      setCategoryName("");
      await refetch();
    } catch (err) {
      console.error("❌ Failed to create category:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await AxiosInstance.delete(`/category/${id}`);
      await refetch();
    } catch (err) {
      console.error("❌ Failed to delete category:", err);
    }
  };

  // --- EDIT MODE ---
  const startEditing = (category: Category) => {
    setEditingId(category._id);
    setEditingName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  // --- UPDATE ---
  const handleUpdate = async (id: number) => {
    const trimmed = editingName.trim();
    if (!trimmed) {
      cancelEditing();
      return;
    }

    try {
      await AxiosInstance.put(`/category/${id}`, { name: trimmed });
      cancelEditing();
      await refetch();
    } catch (err) {
      console.error("❌ Failed to update category:", err);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdate(id);
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Categories</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter a category name"
          className="flex-1 border border-input bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Category List */}
      <div className="rounded-md border">
        {loading && (
          <div className="p-8 text-center text-muted-foreground">
            Loading categories...
          </div>
        )}

        {error && (
          <div className="p-8 text-center text-destructive">
            {error.toString()}
          </div>
        )}

        {!loading && data && (
          <>
            {data.categories.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No categories yet.
              </div>
            ) : (
              <ul className="divide-y">
                {data.categories.map((category) => (
                  <li
                    key={category._id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-muted/40 transition-colors"
                  >
                    {editingId === category._id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, category._id)}
                          onBlur={() => handleUpdate(category._id)}
                          className="flex-1 border border-input bg-background px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdate(category._id)}
                          className="p-1 hover:bg-green-100 rounded-md text-green-600"
                          title="Save"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="p-1 hover:bg-red-100 rounded-md text-red-600"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm flex-1">{category.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEditing(category)}
                            className="p-1 hover:bg-blue-100 rounded-md text-blue-600"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(category._id)}
                            className="p-1 hover:bg-red-100 rounded-md text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </>
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
