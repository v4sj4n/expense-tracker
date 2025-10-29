import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, FolderOpen, Receipt } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary p-4 rounded-full">
              <Wallet className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Expense Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your expenses and organize them by categories. Take control of
            your finances with simple, powerful tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            to="/categories"
            className="bg-card rounded-lg border p-8 hover:bg-accent transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="bg-muted p-3 rounded-lg">
                <FolderOpen className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-semibold ml-4">
                Categories
              </h2>
            </div>
            <p className="text-muted-foreground">
              Create and manage expense categories to organize your spending.
            </p>
          </Link>

          <Link
            to="/expenses"
            className="bg-card rounded-lg border p-8 hover:bg-accent transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="bg-muted p-3 rounded-lg">
                <Receipt className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-semibold ml-4">
                Expenses
              </h2>
            </div>
            <p className="text-muted-foreground">
              Add, edit, and track all your expenses in one place.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
