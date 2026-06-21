import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { getToken } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { getSession, type Rol } from "@/lib/auth";

type RequiredRole = Rol | Rol[];

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: RequiredRole;
  redirectTo?: string;
}

function includesRole(requiredRole: RequiredRole, role: Rol) {
  return Array.isArray(requiredRole) ? requiredRole.includes(role) : requiredRole === role;
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/" }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();
  const localSession = getSession();
  const effectiveSession = session ?? localSession;
  const isAuthenticated = Boolean(effectiveSession && getToken());
  const hasRequiredRole =
    !requiredRole || Boolean(effectiveSession && includesRole(requiredRole, effectiveSession.rol));

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate({ to: redirectTo, replace: true });
      return;
    }

    if (requiredRole && !hasRequiredRole && effectiveSession) {
      const fallbackPath =
        effectiveSession.rol === "VIAJERO"
          ? "/viajero"
          : effectiveSession.rol === "ADMIN"
            ? "/admin"
            : redirectTo;
      navigate({ to: fallbackPath, replace: true });
    }
  }, [
    effectiveSession,
    hasRequiredRole,
    isAuthenticated,
    isLoading,
    navigate,
    redirectTo,
    requiredRole,
  ]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>;
  }

  if (!isAuthenticated || !hasRequiredRole) return null;

  return <>{children}</>;
}
