import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { A as AdminLayout } from "./admin-layout-C8pAR1EJ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, c as changePassword } from "./router-CofPkZmn.mjs";
import { U as User, p as Lock, d as Bell, a0 as Monitor, L as LogOut, g as Save, G as Globe } from "../_libs/lucide-react.mjs";
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
import "./theme-toggle-CpAsm--z.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Configuracion() {
  const navigate = useNavigate();
  const {
    session,
    logout: logoutAuth
  } = useAuth();
  const [tab, setTab] = reactExports.useState("perfil");
  if (!session) return null;
  const cerrarSesion = () => {
    logoutAuth();
    toast.success("Sesión cerrada");
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Configuración de la cuenta", subtitle: "Gestiona tu perfil, seguridad y preferencias del sistema", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-xl border bg-card p-3 shadow-sm", children: [
      [{
        id: "perfil",
        label: "Mi perfil",
        icon: User
      }, {
        id: "seguridad",
        label: "Seguridad",
        icon: Lock
      }, {
        id: "notif",
        label: "Notificaciones",
        icon: Bell
      }, {
        id: "preferencias",
        label: "Preferencias",
        icon: Monitor
      }].map(({
        id,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(id), className: `flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${tab === id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        " ",
        label
      ] }, id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 border-t" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: cerrarSesion, className: "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Cerrar sesión"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border bg-card p-6 shadow-sm", children: [
      tab === "perfil" && /* @__PURE__ */ jsxRuntimeExports.jsx(PerfilTab, { session }),
      tab === "seguridad" && /* @__PURE__ */ jsxRuntimeExports.jsx(SeguridadTab, {}),
      tab === "notif" && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificacionesTab, {}),
      tab === "preferencias" && /* @__PURE__ */ jsxRuntimeExports.jsx(PreferenciasTab, {})
    ] })
  ] }) });
}
function PerfilTab({
  session
}) {
  const [form, setForm] = reactExports.useState({
    nombre: session.nombre,
    email: session.email,
    cargo: session.cargo ?? "",
    turno: session.turno ?? "",
    telefono: "+56 2 2345 6789"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    toast.success("Perfil actualizado", {
      description: "Cambios guardados correctamente."
    });
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 border-b pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: session.avatar, alt: "", className: "h-20 w-20 rounded-full border-4 border-primary/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: session.nombre }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          session.cargo,
          " · ",
          session.turno
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "mt-2 text-xs font-medium text-primary hover:underline", children: "Cambiar foto" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre completo", value: form.nombre, onChange: (v) => setForm({
        ...form,
        nombre: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Correo institucional", value: form.email, disabled: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Cargo", value: form.cargo, onChange: (v) => setForm({
        ...form,
        cargo: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Turno", value: form.turno, onChange: (v) => setForm({
        ...form,
        turno: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", value: form.telefono, onChange: (v) => setForm({
        ...form,
        telefono: v
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      " Guardar cambios"
    ] }) })
  ] });
}
function SeguridadTab() {
  const [form, setForm] = reactExports.useState({
    actual: "",
    nueva: "",
    conf: ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  const cambiarPassword = async (e) => {
    e.preventDefault();
    if (form.nueva.length < 8) {
      return toast.error("La nueva contraseña debe tener al menos 8 caracteres");
    }
    if (form.nueva !== form.conf) return toast.error("Las contraseñas no coinciden");
    setSaving(true);
    try {
      await changePassword(form.actual, form.nueva);
      toast.success("Contraseña actualizada");
      setForm({
        actual: "",
        nueva: "",
        conf: ""
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo actualizar la contraseña");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: cambiarPassword, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Cambiar contraseña" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tu sesión se mantendrá activa luego del cambio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid max-w-md gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contraseña actual", type: "password", value: form.actual, onChange: (v) => setForm({
        ...form,
        actual: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nueva contraseña", type: "password", value: form.nueva, onChange: (v) => setForm({
        ...form,
        nueva: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Repetir nueva contraseña", type: "password", value: form.conf, onChange: (v) => setForm({
        ...form,
        conf: v
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60", children: saving ? "Actualizando..." : "Actualizar contraseña" }) })
  ] });
}
function NotificacionesTab() {
  const [pref, setPref] = reactExports.useState({
    alertas: true,
    turnos: true,
    reportes: false,
    email: true,
    push: true
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Notificaciones" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Elige qué eventos quieres recibir y por qué medio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y", children: [["alertas", "Alertas operacionales en tiempo real"], ["turnos", "Cambios o asignaciones de turno"], ["reportes", "Reportes diarios automáticos"], ["email", "Recibir por correo electrónico"], ["push", "Notificaciones del navegador"]].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label, value: pref[key], onChange: (v) => setPref({
      ...pref,
      [key]: v
    }) }, key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.success("Preferencias guardadas"), className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Guardar preferencias" }) })
  ] });
}
function PreferenciasTab() {
  const [pref, setPref] = reactExports.useState({
    idioma: "Español (Chile)",
    tema: "claro",
    densidad: "cómoda"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Preferencias del sistema" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid max-w-md gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "mr-1.5 inline h-3.5 w-3.5" }),
          " Idioma"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: pref.idioma, onChange: (e) => setPref({
          ...pref,
          idioma: e.target.value
        }), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Español (Chile)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "English" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Português" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Tema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 grid grid-cols-3 gap-2", children: ["claro", "oscuro", "auto"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPref({
          ...pref,
          tema: t
        }), className: `rounded-md border px-3 py-2 text-sm capitalize ${pref.tema === t ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted"}`, children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Densidad de visualización" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 grid grid-cols-3 gap-2", children: ["compacta", "cómoda", "amplia"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPref({
          ...pref,
          densidad: t
        }), className: `rounded-md border px-3 py-2 text-sm capitalize ${pref.densidad === t ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted"}`, children: t }, t)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.success("Preferencias aplicadas"), className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Aplicar" }) })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, disabled, onChange: (e) => onChange?.(e.target.value), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 disabled:bg-muted disabled:text-muted-foreground" })
  ] });
}
function Toggle({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(!value), className: `relative h-6 w-11 rounded-full transition-colors ${value ? "bg-primary" : "bg-muted"}`, "aria-pressed": value, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}` }) })
  ] });
}
export {
  Configuracion as component
};
