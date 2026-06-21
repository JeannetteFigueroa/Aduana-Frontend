import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, g as getSession, b as getToken } from "./router-CofPkZmn.mjs";
function includesRole(requiredRole, role) {
  return Array.isArray(requiredRole) ? requiredRole.includes(role) : requiredRole === role;
}
function ProtectedRoute({ children, requiredRole, redirectTo = "/" }) {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();
  const localSession = getSession();
  const effectiveSession = session ?? localSession;
  const isAuthenticated = Boolean(effectiveSession && getToken());
  const hasRequiredRole = !requiredRole || Boolean(effectiveSession && includesRole(requiredRole, effectiveSession.rol));
  reactExports.useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate({ to: redirectTo, replace: true });
      return;
    }
    if (requiredRole && !hasRequiredRole && effectiveSession) {
      const fallbackPath = effectiveSession.rol === "VIAJERO" ? "/viajero" : effectiveSession.rol === "ADMIN" ? "/admin" : redirectTo;
      navigate({ to: fallbackPath, replace: true });
    }
  }, [
    effectiveSession,
    hasRequiredRole,
    isAuthenticated,
    isLoading,
    navigate,
    redirectTo,
    requiredRole
  ]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: "Cargando..." });
  }
  if (!isAuthenticated || !hasRequiredRole) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
export {
  ProtectedRoute as P
};
