import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-DGBHJC6q.css";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const API_BASE = "https://theories-conversation-ethernet-observations.trycloudflare.com".trim();
const TOKEN_KEY = "los_libertadores_token";
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}
async function apiFetch(path, init = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...init.headers
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path.trim()}`, { ...init, headers });
  const text = await res.text();
  const data = parseResponseBody(text, res.headers.get("content-type"));
  if (!res.ok) {
    const err = new Error(
      data?.message ?? (typeof data === "string" ? data : `Error ${res.status}`)
    );
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}
function parseResponseBody(text, contentType) {
  if (!text) return void 0;
  if (contentType?.includes("application/json")) {
    return JSON.parse(text);
  }
  const trimmed = text.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return JSON.parse(text);
  }
  return text;
}
const STORAGE_KEY = "los_libertadores_session";
function persist(session) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}
function firstDefinedValue(...values) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}
function resolveRut(profile, previousSession, requestRut) {
  return firstDefinedValue(
    profile.rut,
    profile.dni,
    profile.documento,
    requestRut,
    previousSession?.rut
  );
}
async function login(identificador, clave) {
  const response = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: identificador,
      password: clave
    })
  });
  setToken(response.token);
  const previousSession = getSession();
  const profile = await apiFetch("/api/auth/me");
  const session = {
    id: profile.email,
    email: profile.email,
    rol: profile.rol,
    nombre: `${profile.nombres} ${profile.apellidos}`,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(profile.nombres),
    rut: resolveRut(profile, previousSession, response.rut)
  };
  persist(session);
  return session;
}
async function registerViajero(data) {
  const response = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      rut: data.rut,
      nombres: data.nombres ?? data.nombre ?? "",
      apellidos: data.apellidos,
      email: data.email,
      password: data.password ?? data.clave ?? ""
    })
  });
  setToken(response.token);
  const previousSession = getSession();
  const profile = await apiFetch("/api/auth/me");
  const session = {
    id: profile.email,
    email: profile.email,
    rol: profile.rol,
    nombre: `${profile.nombres} ${profile.apellidos}`,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(profile.nombres),
    rut: resolveRut(profile, previousSession, response.rut ?? data.rut)
  };
  persist(session);
  return session;
}
async function changePassword(oldPassword, newPassword) {
  await apiFetch("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify({
      oldPassword,
      newPassword
    })
  });
}
function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  setToken(null);
}
const AuthContext = reactExports.createContext(null);
function readSession() {
  return getSession();
}
function AuthProvider({ children }) {
  const [session, setSessionState] = reactExports.useState(() => readSession());
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    setSessionState(readSession());
    setIsLoading(false);
  }, []);
  reactExports.useEffect(() => {
    const syncSession = () => setSessionState(readSession());
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);
  const effectiveSession = session ?? readSession();
  const value = reactExports.useMemo(
    () => ({
      session: effectiveSession,
      isLoading,
      isAuthenticated: Boolean(effectiveSession && getToken()),
      setSession: setSessionState,
      logout: () => {
        logout();
        setSessionState(null);
      }
    }),
    [effectiveSession, isLoading]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
const THEME_KEY = "los_libertadores_theme";
const ThemeContext = reactExports.createContext(null);
function readTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_KEY, theme);
}
function ThemeProvider({ children }) {
  const [theme, setThemeState] = reactExports.useState(() => readTheme());
  reactExports.useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  const setTheme = reactExports.useCallback((nextTheme) => {
    setThemeState(nextTheme);
  }, []);
  const toggleTheme = reactExports.useCallback(() => {
    setThemeState((current) => current === "dark" ? "light" : "dark");
  }, []);
  const value = reactExports.useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme
    }),
    [setTheme, theme, toggleTheme]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$d = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aduana Los Libertadores" },
      {
        name: "description",
        content: "Sistema Integrado de Gestión Aduana Los Libertadores"
      },
      {
        name: "author",
        content: "Jeannette Figueroa Díaz"
      },
      {
        property: "og:title",
        content: "Aduana Los Libertadores"
      },
      {
        property: "og:description",
        content: "Sistema Integrado de Gestión Aduana Los Libertadores"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        name: "twitter:card",
        content: "summary"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `(function(){try{var t=localStorage.getItem('los_libertadores_theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$d.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true, closeButton: true })
  ] }) }) });
}
const $$splitComponentImporter$c = () => import("./viajero-Bq5IMk4a.mjs");
const Route$c = createFileRoute("/viajero")({
  head: () => ({
    meta: [{
      title: "Portal Viajero — Aduanas Chile"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./registro-CD1F73xX.mjs");
const Route$b = createFileRoute("/registro")({
  head: () => ({
    meta: [{
      title: "Registro de viajero — Los Libertadores"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin-D1FibAHo.mjs");
const Route$a = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-DM8dPyhn.mjs");
const Route$9 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Sistema Integrado Los Libertadores — Aduanas Chile"
    }, {
      name: "description",
      content: "Plataforma de gestión integrada del paso fronterizo Los Libertadores."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.index-DoqwMlYp.mjs");
const Route$8 = createFileRoute("/admin/")({
  head: () => ({
    meta: [{
      title: "Dashboard — Aduanas Los Libertadores"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.viajero-CN7D1i-U.mjs");
const Route$7 = createFileRoute("/admin/viajero")({
  head: () => ({
    meta: [{
      title: "Procesamiento de viajero"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.validaciones-ChXeKOaT.mjs");
const Route$6 = createFileRoute("/admin/validaciones")({
  head: () => ({
    meta: [{
      title: "Validaciones integradas"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.scan-bSoVHn7u.mjs");
const Route$5 = createFileRoute("/admin/scan")({
  head: () => ({
    meta: [{
      title: "Escanear QR del viajero"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.reportes-ChTowBTV.mjs");
const Route$4 = createFileRoute("/admin/reportes")({
  head: () => ({
    meta: [{
      title: "Reportes y estadísticas"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.permisos-C_rPhNMZ.mjs");
const Route$3 = createFileRoute("/admin/permisos")({
  head: () => ({
    meta: [{
      title: "Permisos de autorización de cruce"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.declaracion-dN5iFeEG.mjs");
const Route$2 = createFileRoute("/admin/declaracion")({
  head: () => ({
    meta: [{
      title: "Declaración SAG digital"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.configuracion-Dq0QGTo2.mjs");
const Route$1 = createFileRoute("/admin/configuracion")({
  head: () => ({
    meta: [{
      title: "Configuración de la cuenta"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.alertas-T6ZzgiMu.mjs");
const Route = createFileRoute("/admin/alertas")({
  head: () => ({
    meta: [{
      title: "Alertas operacionales"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ViajeroRoute = Route$c.update({
  id: "/viajero",
  path: "/viajero",
  getParentRoute: () => Route$d
});
const RegistroRoute = Route$b.update({
  id: "/registro",
  path: "/registro",
  getParentRoute: () => Route$d
});
const AdminRoute = Route$a.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const AdminIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminViajeroRoute = Route$7.update({
  id: "/viajero",
  path: "/viajero",
  getParentRoute: () => AdminRoute
});
const AdminValidacionesRoute = Route$6.update({
  id: "/validaciones",
  path: "/validaciones",
  getParentRoute: () => AdminRoute
});
const AdminScanRoute = Route$5.update({
  id: "/scan",
  path: "/scan",
  getParentRoute: () => AdminRoute
});
const AdminReportesRoute = Route$4.update({
  id: "/reportes",
  path: "/reportes",
  getParentRoute: () => AdminRoute
});
const AdminPermisosRoute = Route$3.update({
  id: "/permisos",
  path: "/permisos",
  getParentRoute: () => AdminRoute
});
const AdminDeclaracionRoute = Route$2.update({
  id: "/declaracion",
  path: "/declaracion",
  getParentRoute: () => AdminRoute
});
const AdminConfiguracionRoute = Route$1.update({
  id: "/configuracion",
  path: "/configuracion",
  getParentRoute: () => AdminRoute
});
const AdminAlertasRoute = Route.update({
  id: "/alertas",
  path: "/alertas",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAlertasRoute,
  AdminConfiguracionRoute,
  AdminDeclaracionRoute,
  AdminPermisosRoute,
  AdminReportesRoute,
  AdminScanRoute,
  AdminValidacionesRoute,
  AdminViajeroRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  RegistroRoute,
  ViajeroRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  apiFetch as a,
  getToken as b,
  changePassword as c,
  useTheme as d,
  router as e,
  getSession as g,
  login as l,
  registerViajero as r,
  useAuth as u
};
