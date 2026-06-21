import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ProtectedRoute } from "@/components/protected-route";

export const Route = createFileRoute("/admin")({
  component: () => (
    <ProtectedRoute requiredRole="ADMIN">
      <Outlet />
    </ProtectedRoute>
  ),
});
