import { ModeToggle } from "@/components/mode-toggle";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          Expense Tracker
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-semibold"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-semibold"
          >
            Categories
          </Link>
          <Link
            to="/expenses"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-semibold"
          >
            Expenses
          </Link>
        </div>
        <ModeToggle />
      </div>
    </nav>
    <main>
      <Outlet />
    </main>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
