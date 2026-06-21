import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, l as login } from "./router-CofPkZmn.mjs";
import { T as ThemeToggle } from "./theme-toggle-CpAsm--z.mjs";
import "../_libs/sonner.mjs";
import { M as Mountain, v as Cloud, u as CircleAlert, w as Smartphone, j as ShieldCheck, U as User, p as Lock, x as EyeOff, E as Eye } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const {
    session,
    setSession,
    isLoading,
    isAuthenticated,
    logout
  } = useAuth();
  const [tipo, setTipo] = reactExports.useState("viajero");
  const [usuario, setUsuario] = reactExports.useState("");
  const [clave, setClave] = reactExports.useState("");
  const [showClave, setShowClave] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({
        to: session?.rol === "ADMIN" ? "/admin" : "/viajero",
        replace: true
      });
    }
  }, [isAuthenticated, isLoading, navigate, session]);
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (tipo === "admin" && !usuario.toLowerCase().endsWith("@aduana.cl")) {
      setError("Los operadores deben ingresar con un correo @aduana.cl");
      return;
    }
    setLoading(true);
    try {
      const session2 = await login(usuario, clave);
      if (tipo === "admin" && session2.rol !== "ADMIN") {
        logout();
        setError("Esta cuenta no tiene permisos de operador");
        return;
      }
      setSession(session2);
    } catch (err) {
      logout();
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: "Cargando..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-[1.1fr_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden gradient-hero text-white lg:flex lg:flex-col lg:justify-between lg:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { className: "absolute right-6 top-6 text-white hover:bg-white/10 hover:text-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-lg bg-white/15 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-white/70", children: "Gobierno de Chile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Aduanas · SAG · PDI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400" }),
          " Sistema operativo"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-bold leading-tight xl:text-5xl", children: [
          "Sistema Integrado",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "Los Libertadores" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-white/80", children: "Control fronterizo Chile · Argentina. Gestión unificada de viajeros, declaraciones y validaciones interinstitucionales." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { className: "h-4 w-4" }),
          " 7°C · Despejado · Andes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "v3.2.1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center bg-background p-6 sm:p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between gap-3 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Sistema Integrado" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Los Libertadores" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Aviso importante" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: "Estamos en mantenimiento debido a la creación del backend, si desea probar el proyecto descargue el repositorio para revisar desde el local o bien acceda con la credenciales de la demo pero verá la web sin datos hasta nuevo aviso." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Iniciar sesión" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Selecciona tu tipo de cuenta para continuar." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 rounded-lg border bg-muted/40 p-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setTipo("viajero");
          setError(null);
        }, className: `flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors ${tipo === "viajero" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }),
          " Viajero"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          setTipo("admin");
          setError(null);
        }, className: `flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors ${tipo === "admin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
          " Operador"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: tipo === "admin" ? "Correo institucional" : "RUT o correo electrónico" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: usuario, onChange: (e) => setUsuario(e.target.value), placeholder: tipo === "admin" ? "operador@aduana.cl" : "12.345.678-9 o tucorreo@mail.com", className: "h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", autoComplete: "username", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Contraseña" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: clave, onChange: (e) => setClave(e.target.value), type: showClave ? "text" : "password", placeholder: "••••••••", className: "h-11 w-full rounded-md border bg-background pl-9 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring/50", autoComplete: "current-password", required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              setShowClave((v) => !v);
            }, className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:bg-muted", "aria-label": showClave ? "Ocultar" : "Mostrar", children: showClave ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "rounded" }),
            " Recordarme"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "font-medium text-primary hover:underline", children: "¿Olvidó su clave?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60", children: loading ? "Ingresando..." : "Ingresar al panel" })
      ] }),
      tipo === "viajero" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-sm text-muted-foreground", children: [
        "¿No tienes cuenta?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/registro", className: "font-semibold text-primary hover:underline", children: "Regístrate aquí" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-md border border-dashed bg-muted/30 p-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 font-semibold text-foreground", children: "Cuentas de prueba" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "admin@aduana.cl" }),
          " /",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "admin1234" }),
          " · operador"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "viajero@correo.cl" }),
          " /",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "viajero1234" }),
          " · viajero"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "© 2026 Servicio Nacional de Aduanas · Sistema Integrado Los Libertadores" })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
