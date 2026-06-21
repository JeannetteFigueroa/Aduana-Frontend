import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as ThemeToggle, c as cn } from "./theme-toggle-CpAsm--z.mjs";
import { u as useAuth } from "./router-CofPkZmn.mjs";
import { D as LayoutDashboard, y as Users, n as ScanLine, J as Leaf, j as ShieldCheck, K as FileBadge, d as Bell, N as ChartColumn, b as Settings, L as LogOut, X, c as Menu, O as Search } from "../_libs/lucide-react.mjs";
const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/viajero", label: "Procesamiento viajero", icon: Users },
  { to: "/admin/scan", label: "Escanear QR", icon: ScanLine },
  { to: "/admin/declaracion", label: "Declaración SAG", icon: Leaf },
  { to: "/admin/validaciones", label: "Validaciones", icon: ShieldCheck },
  { to: "/admin/permisos", label: "Permisos de cruce", icon: FileBadge },
  { to: "/admin/alertas", label: "Alertas operacionales", icon: Bell },
  { to: "/admin/reportes", label: "Reportes", icon: ChartColumn }
];
function AdminLayout({
  children,
  title,
  subtitle
}) {
  const navigate = useNavigate();
  const { session, logout: logoutAuth } = useAuth();
  const [open, setOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cerrarSesion = () => {
    logoutAuth();
    navigate({ to: "/" });
  };
  if (!session) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: "Cargando..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-sidebar-border px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold", children: "A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold", children: "Aduanas Chile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-sidebar-foreground/60", children: "Los Libertadores" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { className: "text-sidebar-foreground hover:bg-sidebar-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1 overflow-y-auto p-3 pb-32", children: nav.map((item) => {
            const active = pathname === item.to || item.to !== "/admin" && pathname.startsWith(item.to);
            const Icon = item.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                onClick: () => setOpen(false),
                className: cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
                ]
              },
              item.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 border-t border-sidebar-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin/configuracion",
                onClick: () => setOpen(false),
                className: cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname.startsWith("/admin/configuracion") ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
                  " Configuración"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: cerrarSesion,
                className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                  " Cerrar sesión"
                ]
              }
            )
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setOpen(false), className: "fixed inset-0 z-30 bg-black/40 lg:hidden" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-card px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen(!open),
            className: "rounded-md p-2 hover:bg-muted lg:hidden",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-base font-semibold sm:text-lg", children: title }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: subtitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                placeholder: "Buscar viajero, patente, ID...",
                className: "h-9 w-64 rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative rounded-md p-2 hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin/configuracion",
              className: "flex items-center gap-2 rounded-md border bg-background px-2 py-1 hover:bg-muted",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: session.avatar, alt: "", className: "h-7 w-7 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden text-xs sm:block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: session.nombre }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: session.cargo ?? "Operador" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 sm:p-6", children })
    ] })
  ] });
}
function StatusBadge({ status }) {
  const map = {
    aprobado: "bg-success/15 text-success border-success/30",
    vigente: "bg-success/15 text-success border-success/30",
    pendiente: "bg-warning/20 text-warning-foreground border-warning/40",
    revision: "bg-info/15 text-info border-info/30",
    rechazado: "bg-destructive/15 text-destructive border-destructive/30",
    anulado: "bg-destructive/15 text-destructive border-destructive/30",
    alta: "bg-destructive/15 text-destructive border-destructive/30",
    media: "bg-warning/20 text-warning-foreground border-warning/40",
    baja: "bg-info/15 text-info border-info/30",
    bajo: "bg-success/15 text-success border-success/30",
    medio: "bg-warning/20 text-warning-foreground border-warning/40",
    alto: "bg-destructive/15 text-destructive border-destructive/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        map[status] ?? "bg-muted text-foreground"
      ),
      children: status
    }
  );
}
export {
  AdminLayout as A,
  StatusBadge as S
};
