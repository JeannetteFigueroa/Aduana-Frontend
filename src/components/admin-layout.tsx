import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Leaf,
  ShieldCheck,
  FileBadge,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell as BellIcon,
  Search,
  ScanLine,
  Car,
  UserPlus,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type Session } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Layout principal del panel del operador.
 * Verifica la sesión y muestra la información real del usuario logueado.
 *
 * @backend  El `getSession()` se reemplaza por `GET /api/auth/sesion` con JWT.
 *           Si no hay sesión válida, redirige al login.
 */
const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/viajero", label: "Procesamiento viajero", icon: Users },
  { to: "/admin/vehiculos", label: "Vehículos", icon: Car },
  { to: "/admin/scan", label: "Escanear QR", icon: ScanLine },
  { to: "/admin/declaracion", label: "Declaración SAG", icon: Leaf },
  { to: "/admin/validaciones", label: "Validaciones", icon: ShieldCheck },
  { to: "/admin/permisos", label: "Permisos de cruce", icon: FileBadge },
  { to: "/admin/alertas", label: "Alertas operacionales", icon: Bell },
  { to: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/admin/crear-funcionario", label: "Crear funcionario", icon: UserPlus },
];

export function AdminLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const navigate = useNavigate();
  const { session, logout: logoutAuth } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const cerrarSesion = () => {
    logoutAuth();
    navigate({ to: "/" });
  };

  if (!session) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            A
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Aduanas Chile</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">Los Libertadores</div>
          </div>
          <ThemeToggle className="text-sidebar-foreground hover:bg-sidebar-accent" />
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto p-3 pb-32">
          {nav.map((item) => {
            const active =
              pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-sidebar-border p-3">
          <Link
            to="/admin/configuracion"
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              pathname.startsWith("/admin/configuracion")
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
            )}
          >
            <Settings className="h-4 w-4" /> Configuración
          </Link>
          <button
            onClick={cerrarSesion}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-card px-4 sm:px-6">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 hover:bg-muted lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">{title}</h1>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar viajero, patente, ID..."
                className="h-9 w-64 rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
            <button className="relative rounded-md p-2 hover:bg-muted">
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <Link
              to="/admin/configuracion"
              className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 hover:bg-muted"
            >
              <img src={session.avatar} alt="" className="h-7 w-7 rounded-full" />
              <div className="hidden text-xs sm:block">
                <div className="font-medium leading-tight">{session.nombre}</div>
                <div className="text-muted-foreground">{session.cargo ?? "Operador"}</div>
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
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
    alto: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        map[status] ?? "bg-muted text-foreground",
      )}
    >
      {status}
    </span>
  );
}
