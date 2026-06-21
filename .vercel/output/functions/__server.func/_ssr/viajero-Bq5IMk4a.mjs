import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as ThemeToggle, c as cn } from "./theme-toggle-CpAsm--z.mjs";
import { u as useAuth, a as apiFetch, c as changePassword } from "./router-CofPkZmn.mjs";
import { P as ProtectedRoute } from "./protected-route-CUEYnVVw.mjs";
import { M as Mountain, H as House, U as User, F as FileText, a as FileUp, S as ScanFace, C as Car, B as Baby, Q as QrCode, b as Settings, L as LogOut, c as Menu, d as Bell, e as MapPin, A as ArrowRight, f as Clock, g as Save, P as Plus, X, T as TriangleAlert, h as CircleCheck, I as IdCard, i as FileCheck, j as ShieldCheck, k as Upload, E as Eye, l as Trash2, m as Camera, n as ScanLine, o as Calendar, p as Lock, G as Globe, q as ChevronRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const navItems = [{
  id: "home",
  label: "Inicio",
  icon: House
}, {
  id: "datos",
  label: "Datos personales",
  icon: User
}, {
  id: "declarar",
  label: "Declaración SAG",
  icon: FileText
}, {
  id: "documentos",
  label: "Documentos",
  icon: FileUp
}, {
  id: "biometria",
  label: "Validación facial",
  icon: ScanFace
}, {
  id: "vehiculo",
  label: "Vehículo",
  icon: Car
}, {
  id: "menores",
  label: "Menores de edad",
  icon: Baby
}, {
  id: "permiso",
  label: "Mi permiso",
  icon: QrCode
}, {
  id: "perfil",
  label: "Mi cuenta",
  icon: Settings
}];
function AppViajero() {
  const navigate = useNavigate();
  const {
    session,
    logout
  } = useAuth();
  const [tab, setTab] = reactExports.useState("home");
  const [open, setOpen] = reactExports.useState(false);
  if (!session) return null;
  const go = (t) => {
    setTab(t);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-muted/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: cn("fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-sidebar-border px-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold", children: "Portal Viajero" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[11px] text-sidebar-foreground/60", children: "Los Libertadores" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { className: "text-sidebar-foreground hover:bg-sidebar-accent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-1 flex-col gap-1 overflow-y-auto p-3", children: navItems.map(({
        id,
        label,
        icon: Icon
      }) => {
        const active = tab === id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => go(id), className: cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
        ] }, id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-sidebar-border p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        logout();
        navigate({
          to: "/"
        });
      }, className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Cerrar sesión"
      ] }) })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setOpen(false), className: "fixed inset-0 z-30 bg-black/40 lg:hidden" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col pb-16 lg:pb-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-card px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(true), className: "rounded-md p-2 hover:bg-muted lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-base font-semibold sm:text-lg", children: navItems.find((n) => n.id === tab)?.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden truncate text-xs text-muted-foreground sm:block", children: "Portal de autoatención del viajero" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative rounded-md p-2 hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => go("perfil"), className: "flex items-center gap-2 rounded-md border bg-background px-2 py-1 hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: session.avatar, className: "h-7 w-7 rounded-full", alt: "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden text-xs sm:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: session.nombre }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Viajero" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 p-4 sm:p-6", children: [
        tab === "home" && /* @__PURE__ */ jsxRuntimeExports.jsx(HomePanel, { go, session }),
        tab === "datos" && /* @__PURE__ */ jsxRuntimeExports.jsx(DatosPanel, { session }),
        tab === "declarar" && /* @__PURE__ */ jsxRuntimeExports.jsx(DeclararPanel, {}),
        tab === "documentos" && /* @__PURE__ */ jsxRuntimeExports.jsx(DocumentosPanel, {}),
        tab === "biometria" && /* @__PURE__ */ jsxRuntimeExports.jsx(BiometriaPanel, {}),
        tab === "menores" && /* @__PURE__ */ jsxRuntimeExports.jsx(MenoresPanel, {}),
        tab === "vehiculo" && /* @__PURE__ */ jsxRuntimeExports.jsx(VehiculoPanel, {}),
        tab === "permiso" && /* @__PURE__ */ jsxRuntimeExports.jsx(PermisoPanel, { session }),
        tab === "perfil" && /* @__PURE__ */ jsxRuntimeExports.jsx(PerfilPanel, { session })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-card/95 backdrop-blur lg:hidden", children: [["home", House, "Inicio"], ["declarar", FileText, "Declarar"], ["documentos", FileUp, "Docs"], ["permiso", QrCode, "Permiso"], ["perfil", Settings, "Cuenta"]].map(([id, Icon, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(id), className: cn("flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium", tab === id ? "text-primary" : "text-muted-foreground"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
      label
    ] }, id)) })
  ] });
}
function Card({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("rounded-xl border bg-card p-5 shadow-sm", className), children });
}
function SectionTitle({
  title,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold sm:text-2xl", children: title }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: sub })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: v })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, disabled, placeholder, onChange: (e) => onChange?.(e.target.value), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 disabled:bg-muted disabled:text-muted-foreground" })
  ] });
}
function HomePanel({
  go,
  session
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero relative overflow-hidden rounded-2xl p-6 text-white sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-white/70", children: "Bienvenido" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-bold sm:text-3xl", children: session.nombre }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/80 sm:text-base", children: "Prepara tu cruce fronterizo en minutos. Declara, sube documentos y obtén tu permiso QR." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Santiago, CL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Mendoza, AR" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { onClick: () => go("datos"), icon: User, title: "Datos personales", desc: "Información del viajero", color: "bg-primary/10 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { onClick: () => go("documentos"), icon: FileUp, title: "Subir documentos", desc: "Pasaporte, licencia, seguro", color: "bg-info/10 text-info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { onClick: () => go("biometria"), icon: ScanFace, title: "Validación facial", desc: "Verifica tu identidad", color: "bg-success/10 text-success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionCard, { onClick: () => go("declarar"), icon: FileText, title: "Declaración SAG", desc: "Productos vegetales/animales", color: "bg-warning/20 text-warning-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Estado del trámite" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-warning/20 px-2.5 py-0.5 text-xs font-semibold text-warning-foreground", children: "En preparación" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-4 space-y-3", children: [["Datos personales", false, "datos"], ["Documentos cargados", false, "documentos"], ["Validación facial", false, "biometria"], ["Declaración SAG", false, "declarar"], ["Datos vehículo", false, "vehiculo"], ["Permiso emitido", false, "permiso"]].map(([label, done, target], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold", done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"), children: done ? "✓" : i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm", done ? "font-medium" : "text-muted-foreground"), children: label }),
          !done && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => go(target), className: "ml-auto text-xs font-semibold text-primary hover:underline", children: "Completar →" })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Información del paso" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Tiempo espera", v: "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Cabinas activas", v: "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Clima", v: "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Horario", v: "24 hrs" })
        ] })
      ] })
    ] })
  ] });
}
function ActionCard({
  onClick,
  icon: Icon,
  title,
  desc,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "group flex items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg", color), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-semibold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5" })
  ] });
}
function DatosPanel({
  session
}) {
  const [form, setForm] = reactExports.useState({
    nombres: "",
    apellidos: "",
    rut: session.rut ?? "",
    email: session.email,
    telefono: "",
    nacionalidad: "Chile",
    fechaNacimiento: "",
    sexo: "Masculino",
    estadoCivil: "Soltero/a",
    direccion: "",
    ciudad: "",
    profesion: "",
    contactoEmergenciaNombre: "",
    contactoEmergenciaTel: "",
    motivoViaje: ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  const set = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const guardarDatos = async () => {
    if (!form.rut.trim() || !form.nombres.trim() || !form.apellidos.trim()) {
      return toast.error("Completa RUT, nombres y apellidos");
    }
    setSaving(true);
    try {
      let viajero = null;
      try {
        viajero = await apiFetch(`/api/viajeros/rut/${encodeURIComponent(form.rut.trim())}`);
      } catch {
        viajero = null;
      }
      const payload = {
        rut: form.rut.trim(),
        nombres: form.nombres.trim(),
        apellidos: form.apellidos.trim(),
        documento: form.rut.trim(),
        nacionalidad: form.nacionalidad,
        origen: "Santiago, CL",
        destino: "Mendoza, AR",
        estado: "ACTIVO",
        riesgo: "BAJO"
      };
      const saved = viajero?.id ? await apiFetch(`/api/viajeros/${viajero.id}`, {
        method: "PUT",
        body: JSON.stringify(payload)
      }) : await apiFetch("/api/viajeros", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      toast.success("Datos guardados", {
        description: saved?.id ? `Viajero actualizado #${saved.id}` : "Viajero creado correctamente"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudieron guardar los datos");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Datos personales", sub: "Información del viajero — usada para validar tu identidad en frontera." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      void guardarDatos();
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Información básica" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombres *", value: form.nombres, onChange: (v) => set("nombres", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Apellidos *", value: form.apellidos, onChange: (v) => set("apellidos", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "RUT / DNI *", value: form.rut, onChange: (v) => set("rut", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fecha de nacimiento *", type: "date", value: form.fechaNacimiento, onChange: (v) => set("fechaNacimiento", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Sexo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.sexo, onChange: (e) => set("sexo", e.target.value), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Masculino" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Femenino" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Otro" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Prefiero no decir" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Nacionalidad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.nacionalidad, onChange: (e) => set("nacionalidad", e.target.value), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Argentina" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Perú" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Bolivia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Brasil" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Otra" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Estado civil" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.estadoCivil, onChange: (e) => set("estadoCivil", e.target.value), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Soltero/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Casado/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Divorciado/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Viudo/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Conviviente civil" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Profesión / Oficio", value: form.profesion, onChange: (v) => set("profesion", v) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Contacto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Correo electrónico", type: "email", value: form.email, disabled: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono *", value: form.telefono, onChange: (v) => set("telefono", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Dirección", value: form.direccion, onChange: (v) => set("direccion", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Ciudad", value: form.ciudad, onChange: (v) => set("ciudad", v) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Contacto de emergencia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre", value: form.contactoEmergenciaNombre, onChange: (v) => set("contactoEmergenciaNombre", v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", value: form.contactoEmergenciaTel, onChange: (v) => set("contactoEmergenciaTel", v) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Motivo del viaje" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4", children: ["Turismo", "Trabajo", "Estudios", "Visita familiar", "Tránsito", "Negocios", "Salud", "Otro"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => set("motivoViaje", m), className: cn("rounded-md border px-3 py-2 text-sm transition-colors", form.motivoViaje === m ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted"), children: m }, m)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: saving, className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
        " ",
        saving ? "Guardando..." : "Guardar datos"
      ] }) })
    ] })
  ] });
}
const categorias = [{
  id: "frutas",
  label: "Frutas frescas",
  emoji: "🍎"
}, {
  id: "carnes",
  label: "Carnes / embutidos",
  emoji: "🥩"
}, {
  id: "vegetales",
  label: "Vegetales",
  emoji: "🥬"
}, {
  id: "lacteos",
  label: "Lácteos / huevos",
  emoji: "🥛"
}, {
  id: "semillas",
  label: "Semillas / plantas",
  emoji: "🌱"
}, {
  id: "miel",
  label: "Miel y derivados",
  emoji: "🍯"
}, {
  id: "frutos",
  label: "Frutos secos",
  emoji: "🥜"
}, {
  id: "ninguno",
  label: "No transporto nada",
  emoji: "🚫"
}];
function DeclararPanel() {
  const [step, setStep] = reactExports.useState(1);
  const [sel, setSel] = reactExports.useState([]);
  const [items, setItems] = reactExports.useState([]);
  const toggle = (id) => {
    if (id === "ninguno") {
      setSel(["ninguno"]);
      setItems([]);
      return;
    }
    setSel((s) => {
      const next = s.filter((x) => x !== "ninguno");
      return next.includes(id) ? next.filter((x) => x !== id) : [...next, id];
    });
  };
  const enviar = () => {
    toast.loading("Enviando declaración al SAG...", {
      id: "sag"
    });
    setTimeout(() => {
      toast.success("Declaración recibida — Folio SAG-2026-08841", {
        id: "sag",
        description: "Validada por inspector. Sin productos restringidos."
      });
      setStep(3);
    }, 1600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Declaración SAG digital", sub: "Servicio Agrícola y Ganadero · Obligatorio según Ley 18.755" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center gap-2 overflow-x-auto pb-2", children: ["Categorías", "Detalle productos", "Confirmación"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold", step > i + 1 ? "bg-success text-success-foreground" : step === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"), children: step > i + 1 ? "✓" : i + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("whitespace-nowrap text-sm", step === i + 1 ? "font-semibold" : "text-muted-foreground"), children: s }),
      i < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-px w-12 bg-border sm:block" })
    ] }, s)) }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "¿Qué productos transportas?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Selecciona todas las categorías aplicables." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4", children: categorias.map((c) => {
        const on = sel.includes(c.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggle(c.id), className: cn("flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all", on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: c.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center text-sm font-medium", children: c.label }),
          on && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground", children: "SELECCIONADO" })
        ] }, c.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: sel.length === 0, onClick: () => {
        if (sel.includes("ninguno")) {
          enviar();
          return;
        }
        setStep(2);
      }, className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: "Continuar →" }) })
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Detalle de productos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Agrega cada producto con cantidad aproximada." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setItems([...items, {
            id: Date.now(),
            nombre: "",
            cantidad: "",
            origen: ""
          }]), className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Agregar"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
          items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground", children: [
            "Sin productos agregados. Pulsa",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Agregar"' }),
            " para comenzar."
          ] }),
          items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 rounded-md border bg-background p-3 sm:grid-cols-[2fr_1fr_1fr_auto]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: it.nombre, placeholder: "Ej: Manzanas Gala", className: "h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: it.cantidad, placeholder: "Cantidad (kg / un)", className: "h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: it.origen, placeholder: "País origen", className: "h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setItems(items.filter((x) => x.id !== it.id)), className: "grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
          ] }, it.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border bg-warning/10 p-4 text-sm text-warning-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "La no declaración o declaración falsa constituye infracción sancionada con multas hasta ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "50 UTM" }),
          " y decomiso de productos."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(1), className: "rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted", children: "← Volver" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: enviar, className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Enviar declaración" })
      ] })
    ] }),
    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-xl font-bold", children: "Declaración enviada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Folio ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: "SAG-2026-08841" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-5 max-w-md rounded-md border bg-success/5 p-4 text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Estado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: "Aprobada" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Productos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: items.length || "Sin productos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Inspector" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "M. Sánchez" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        setStep(1);
        setSel([]);
        setItems([]);
      }, className: "mt-5 rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted", children: "Nueva declaración" })
    ] })
  ] });
}
const DOCS_BASE = [{
  id: "carnet",
  nombre: "Cédula de identidad / DNI",
  descripcion: "Frontal y reverso",
  obligatorio: true,
  icon: IdCard,
  aceptaTipos: "image/*,.pdf",
  estado: "pendiente"
}, {
  id: "pasaporte",
  nombre: "Pasaporte",
  descripcion: "Página de datos personales",
  obligatorio: true,
  icon: IdCard,
  aceptaTipos: "image/*,.pdf",
  estado: "pendiente"
}, {
  id: "antecedentes",
  nombre: "Certificado de antecedentes",
  descripcion: "Vigencia máxima 30 días",
  obligatorio: true,
  icon: FileCheck,
  aceptaTipos: ".pdf",
  estado: "pendiente"
}, {
  id: "licencia",
  nombre: "Licencia de conducir",
  descripcion: "Vigente y clase apropiada",
  obligatorio: false,
  icon: IdCard,
  aceptaTipos: "image/*,.pdf",
  estado: "pendiente"
}, {
  id: "padron",
  nombre: "Padrón del vehículo",
  descripcion: "Documento de propiedad",
  obligatorio: false,
  icon: FileText,
  aceptaTipos: "image/*,.pdf",
  estado: "pendiente"
}, {
  id: "permisoCirc",
  nombre: "Permiso de circulación",
  descripcion: "Vigente al año en curso",
  obligatorio: false,
  icon: FileText,
  aceptaTipos: "image/*,.pdf",
  estado: "pendiente"
}, {
  id: "seguro",
  nombre: "Seguro responsabilidad civil internacional",
  descripcion: "Cobertura para Chile y Argentina",
  obligatorio: false,
  icon: ShieldCheck,
  aceptaTipos: ".pdf",
  estado: "pendiente"
}];
function DocumentosPanel() {
  const [docs, setDocs] = reactExports.useState(DOCS_BASE);
  const inputsRef = reactExports.useRef({});
  const triggerFile = (id) => inputsRef.current[id]?.click();
  const handleFile = (id, file) => {
    const finish = (preview) => {
      setDocs((d) => d.map((x) => x.id === id ? {
        ...x,
        estado: "subido",
        file: {
          nombre: file.name,
          tamano: file.size,
          preview
        }
      } : x));
      toast.success(`"${file.name}" cargado`, {
        description: "En revisión por el operador."
      });
      setTimeout(() => {
        setDocs((d) => d.map((x) => x.id === id ? {
          ...x,
          estado: "validado"
        } : x));
        toast.success(`${DOCS_BASE.find((dd) => dd.id === id)?.nombre} validado`, {
          description: "Documento aprobado por el sistema."
        });
      }, 2500);
    };
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => finish(e.target?.result);
      reader.readAsDataURL(file);
    } else {
      finish();
    }
  };
  const eliminar = (id) => {
    setDocs((d) => d.map((x) => x.id === id ? {
      ...x,
      estado: "pendiente",
      file: void 0
    } : x));
    toast.info("Documento eliminado");
  };
  const obligatorios = docs.filter((d) => d.obligatorio);
  const completos = obligatorios.filter((d) => d.estado === "validado").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Documentos del viajero", sub: "Sube tus documentos en PDF o imagen (máx. 10 MB por archivo)." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 rounded-xl border bg-card p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Progreso de documentos obligatorios" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            completos,
            " de ",
            obligatorios.length,
            " validados"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-primary", children: [
          Math.round(completos / obligatorios.length * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all", style: {
        width: `${completos / obligatorios.length * 100}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: docs.map((d) => {
      const Icon = d.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "!p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: d.aceptaTipos, className: "hidden", ref: (el) => {
          inputsRef.current[d.id] = el;
        }, onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(d.id, f);
          e.target.value = "";
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-14 w-14 shrink-0 place-items-center rounded-lg", d.estado === "validado" ? "bg-success/15 text-success" : d.estado === "subido" ? "bg-info/15 text-info" : d.estado === "rechazado" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"), children: d.file?.preview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.file.preview, alt: "", className: "h-full w-full rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: d.nombre }),
              d.obligatorio && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive", children: "OBLIGATORIO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { estado: d.estado })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              d.descripcion,
              d.file && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
                "· ",
                d.file.nombre,
                " · ",
                (d.file.tamano / 1024).toFixed(0),
                " KB"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: d.estado === "pendiente" || d.estado === "rechazado" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => triggerFile(d.id), className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
            " Subir"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            d.file?.preview && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.open(d.file?.preview, "_blank"), className: "grid h-9 w-9 place-items-center rounded-md border hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => triggerFile(d.id), className: "grid h-9 w-9 place-items-center rounded-md border hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => eliminar(d.id), className: "grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] })
      ] }, d.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-4 bg-info/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Privacidad de tus datos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Tus documentos solo serán consultados por las autoridades correspondientes (PDI, SAG, Aduanas) durante el proceso de cruce. Se almacenan cifrados y se eliminan según la política de retención del servicio." })
      ] })
    ] }) })
  ] });
}
function Badge({
  estado
}) {
  const map = {
    validado: "bg-success/15 text-success",
    subido: "bg-info/15 text-info",
    pendiente: "bg-muted text-muted-foreground",
    rechazado: "bg-destructive/15 text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", map[estado]), children: estado });
}
function BiometriaPanel() {
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [estado, setEstado] = reactExports.useState("inicial");
  const [score, setScore] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };
  const abrirCamara = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user"
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setEstado("camara");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No fue posible acceder a la cámara frontal.";
      setError(msg);
      toast.error("Cámara no disponible", {
        description: msg
      });
    }
  };
  const capturarYAnalizar = () => {
    setEstado("analizando");
    toast.loading("Analizando rostro...", {
      id: "bio"
    });
    setTimeout(() => {
      const s = Math.floor(95 + Math.random() * 5);
      setScore(s);
      setEstado("ok");
      stopCamera();
      toast.success(`Validación facial exitosa — ${s}% match`, {
        id: "bio",
        description: "Tu identidad ha sido confirmada (simulación)."
      });
    }, 1800);
  };
  const reintentar = () => {
    stopCamera();
    setEstado("inicial");
    setScore(null);
    setError(null);
  };
  reactExports.useEffect(() => stopCamera, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Validación facial", sub: "Cámara frontal · el resultado del match es simulado en esta versión." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-slate-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, playsInline: true, muted: true, className: "absolute inset-0 h-full w-full object-cover", style: {
            transform: "scaleX(-1)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-8 rounded-full border-4 border-dashed border-white/30" }),
          estado === "analizando" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-8 animate-pulse rounded-full border-4 border-primary shadow-[0_0_40px_rgba(59,130,246,0.5)]" }),
          estado === "inicial" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "mx-auto h-16 w-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: 'Pulsa "Iniciar" para activar la cámara frontal' })
          ] }) }),
          estado === "ok" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-16 w-16 text-emerald-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg font-bold", children: "¡Verificación exitosa!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-80", children: [
              "Match: ",
              score,
              "% (simulado)"
            ] })
          ] }) }),
          estado === "fallo" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mx-auto h-16 w-16 text-red-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg font-bold", children: "No fue posible verificar" })
          ] }) })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex justify-center gap-2", children: [
          estado === "inicial" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: abrirCamara, className: "inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4" }),
            " Iniciar validación"
          ] }),
          estado === "camara" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: capturarYAnalizar, className: "inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanFace, { className: "h-4 w-4" }),
            " Capturar y analizar"
          ] }),
          (estado === "ok" || estado === "fallo" || estado === "camara") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: reintentar, className: "rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted", children: "Repetir" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Antes de empezar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Asegúrate de estar en un lugar bien iluminado." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Retira lentes oscuros, gorros o accesorios." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Mira directamente a la cámara." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Permite el acceso a la cámara cuando el navegador lo solicite." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-info/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Tu rostro está seguro" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "En esta versión la comparación es simulada y la imagen no se envía a ningún servidor." })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function MenoresPanel() {
  const [menores, setMenores] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState({
    nombre: "",
    rut: "",
    fecha: "",
    parentesco: "Hijo/a"
  });
  const agregar = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.rut) return toast.error("Completa los campos obligatorios");
    setMenores([...menores, {
      id: Date.now(),
      ...form,
      autorizado: false
    }]);
    toast.success("Menor agregado", {
      description: "Sube el permiso notarial para autorizar el cruce."
    });
    setForm({
      nombre: "",
      rut: "",
      fecha: "",
      parentesco: "Hijo/a"
    });
  };
  const autorizar = (id) => {
    toast.loading("Validando autorización notarial...", {
      id: `m${id}`
    });
    setTimeout(() => {
      setMenores((m) => m.map((x) => x.id === id ? {
        ...x,
        autorizado: true
      } : x));
      toast.success("Permiso de menor validado", {
        id: `m${id}`,
        description: "Notaría verificada con éxito."
      });
    }, 1400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Menores de edad acompañantes", sub: "Todo menor que cruce la frontera requiere autorización notarial vigente." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: menores.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "!p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Baby, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: m.nombre }),
            m.autorizado ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
              " Autorizado"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-warning/20 px-2 py-0.5 text-[11px] font-semibold text-warning-foreground", children: "Falta autorización" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 grid gap-x-4 text-xs text-muted-foreground sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "RUT: ",
              m.rut
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Nac: ",
              m.fecha || "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.parentesco })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          !m.autorizado && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => autorizar(m.id), className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
            " Subir permiso"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMenores(menores.filter((x) => x.id !== m.id)), className: "grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }) }, m.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Agregar menor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: agregar, className: "mt-3 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre completo *", value: form.nombre, onChange: (v) => setForm({
            ...form,
            nombre: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "RUT / Doc. identidad *", value: form.rut, onChange: (v) => setForm({
            ...form,
            rut: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fecha de nacimiento", type: "date", value: form.fecha, onChange: (v) => setForm({
            ...form,
            fecha: v
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: "Parentesco" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.parentesco, onChange: (e) => setForm({
              ...form,
              parentesco: e.target.value
            }), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Hijo/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Sobrino/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Nieto/a" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Otro" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Agregar menor" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-info/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Requisitos para menores" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Cédula o pasaporte del menor vigente." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Permiso notarial firmado por ambos padres si viaja con un solo padre o tercero." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Resolución judicial en caso de tuición." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Acta de defunción si uno de los padres ha fallecido." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· El permiso tiene una validez máxima de 30 días." })
      ] })
    ] })
  ] });
}
function VehiculoPanel() {
  const [form, setForm] = reactExports.useState({
    patente: "",
    marca: "",
    modelo: "",
    color: "",
    chasis: "",
    seguro: ""
  });
  const submit = (e) => {
    e.preventDefault();
    toast.loading("Verificando datos del vehículo...", {
      id: "veh"
    });
    setTimeout(() => {
      toast.success("Vehículo registrado", {
        id: "veh",
        description: `Patente ${form.patente} validada con Registro Civil.`
      });
    }, 1400);
  };
  const aprobar = () => toast.success("Cruce APROBADO ✓", {
    description: "Permiso emitido. Diríjase a cabina 2.",
    duration: 6e3
  });
  const rechazar = () => toast.error("Cruce RECHAZADO", {
    description: "Documentación incompleta. Acuda a oficina de atención.",
    duration: 6e3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { title: "Datos del vehículo", sub: "Información necesaria para autorizar el cruce vehicular." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Patente *", value: form.patente, onChange: (v) => setForm({
          ...form,
          patente: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Marca", value: form.marca, onChange: (v) => setForm({
          ...form,
          marca: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Modelo", value: form.modelo, onChange: (v) => setForm({
          ...form,
          modelo: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Color", value: form.color, onChange: (v) => setForm({
          ...form,
          color: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "N° Chasis / VIN", value: form.chasis, onChange: (v) => setForm({
          ...form,
          chasis: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Compañía de seguro", value: form.seguro, onChange: (v) => setForm({
          ...form,
          seguro: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2 rounded-lg border border-dashed bg-muted/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Foto de la patente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "JPG o PNG, hasta 5 MB" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toast.success("Foto cargada"), className: "rounded-md border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted", children: "Adjuntar" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 flex flex-wrap justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: rechazar, className: "rounded-md border border-destructive/30 bg-destructive/5 px-5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10", children: "Simular rechazo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: aprobar, className: "rounded-md border border-success/30 bg-success/10 px-5 py-2.5 text-sm font-medium text-success hover:bg-success/15", children: "Simular aprobación" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Guardar y validar" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Resumen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 space-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Patente", v: form.patente }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Vehículo", v: `${form.marca} ${form.modelo}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Color", v: form.color || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Seguro", v: form.seguro || "—" })
      ] })
    ] })
  ] });
}
function PermisoPanel({
  session
}) {
  const [permiso] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      !permiso ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-xl border-2 border-dashed border-muted bg-muted/20 p-10 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-12 w-12 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-medium text-foreground", children: "Aún no tienes un permiso emitido" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs", children: "Completa todos los pasos del trámite para generar tu permiso QR de cruce." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 font-mono text-[11px] opacity-70", children: [
          "GET /api/viajeros/",
          session.id,
          "/permiso"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Permiso de cruce" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-lg font-bold", children: permiso.codigo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground", children: "AUTORIZADO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-44 w-44 place-items-center rounded-lg bg-white sm:mx-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-40 w-40 text-foreground", strokeWidth: 1 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid gap-y-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Viajero" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-semibold", children: session.nombre })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "RUT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: session.rut ?? "—" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground", children: "Vehículo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: permiso.vehiculo })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 border-t border-primary/20 pt-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Emitido" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: permiso.emitido })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Vence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: permiso.vence })
          ] })
        ] })
      ] }),
      permiso && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 rotate-180" }),
          " Descargar PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Mostrando QR para escaneo en cabina"), className: "flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4" }),
          " Escanear en cabina"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-warning/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-warning-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Recuerda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: "Tu permiso es válido solo durante la fecha indicada. Después deberás generar uno nuevo." })
    ] })
  ] });
}
function PerfilPanel({
  session
}) {
  const navigate = useNavigate();
  const {
    logout
  } = useAuth();
  const [sub, setSub] = reactExports.useState("perfil");
  const cerrar = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: session.avatar, alt: "", className: "mx-auto h-24 w-24 rounded-full border-4 border-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-lg font-bold", children: session.nombre }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: session.rut ?? "RUT no registrado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: session.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
          " Identidad verificada"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "!p-2", children: [
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
          icon: Globe
        }].map(({
          id,
          label,
          icon: Icon
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSub(id), className: cn("flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors", sub === id ? "bg-primary text-primary-foreground" : "hover:bg-muted"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          " ",
          label
        ] }, id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: cerrar, className: "mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Cerrar sesión"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      sub === "perfil" && /* @__PURE__ */ jsxRuntimeExports.jsx(PerfilSub, { session }),
      sub === "seguridad" && /* @__PURE__ */ jsxRuntimeExports.jsx(SeguridadSub, {}),
      sub === "notif" && /* @__PURE__ */ jsxRuntimeExports.jsx(NotifSub, {}),
      sub === "preferencias" && /* @__PURE__ */ jsxRuntimeExports.jsx(PrefSub, {})
    ] })
  ] });
}
function PerfilSub({
  session
}) {
  const [form, setForm] = reactExports.useState({
    nombre: session.nombre,
    email: session.email,
    rut: session.rut ?? "",
    telefono: "",
    direccion: ""
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    toast.success("Datos actualizados");
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Información del perfil" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre completo", value: form.nombre, onChange: (v) => setForm({
        ...form,
        nombre: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "RUT / DNI", value: form.rut || "No registrado", disabled: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Correo electrónico", value: form.email, disabled: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", value: form.telefono, onChange: (v) => setForm({
        ...form,
        telefono: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Dirección", value: form.direccion, onChange: (v) => setForm({
        ...form,
        direccion: v
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
      " Guardar"
    ] }) })
  ] });
}
function SeguridadSub() {
  const [form, setForm] = reactExports.useState({
    actual: "",
    nueva: "",
    conf: ""
  });
  const [saving, setSaving] = reactExports.useState(false);
  const cambiarPassword = async (e) => {
    e.preventDefault();
    if (form.nueva.length < 8) return toast.error("Mínimo 8 caracteres");
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60", children: saving ? "Actualizando..." : "Actualizar contraseña" }) })
  ] });
}
function NotifSub() {
  const [p, setP] = reactExports.useState({
    alertas: true,
    recordatorios: true,
    promos: false,
    email: true,
    push: true
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Notificaciones" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 divide-y", children: [["alertas", "Alertas sobre el estado de mi cruce"], ["recordatorios", "Recordatorios de documentos por vencer"], ["promos", "Novedades y promociones"], ["email", "Recibir por correo electrónico"], ["push", "Notificaciones del navegador"]].map(([k, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: l, value: p[k], onChange: (v) => setP({
      ...p,
      [k]: v
    }) }, k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.success("Preferencias guardadas"), className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Guardar" }) })
  ] });
}
function PrefSub() {
  const [p, setP] = reactExports.useState({
    idioma: "Español (Chile)",
    tema: "claro"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Preferencias" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid max-w-md gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "mr-1.5 inline h-3.5 w-3.5" }),
          " Idioma"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: p.idioma, onChange: (e) => setP({
          ...p,
          idioma: e.target.value
        }), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Español (Chile)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "English" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Português" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Tema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 grid grid-cols-3 gap-2", children: ["claro", "oscuro", "auto"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setP({
          ...p,
          tema: t
        }), className: cn("rounded-md border px-3 py-2 text-sm capitalize", p.tema === t ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted"), children: t }, t)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.success("Preferencias aplicadas"), className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Aplicar" }) })
  ] });
}
function Toggle({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(!value), className: cn("relative h-6 w-11 rounded-full transition-colors", value ? "bg-primary" : "bg-muted"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", value ? "translate-x-5" : "translate-x-0.5") }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { requiredRole: "VIAJERO", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppViajero, {}) });
export {
  SplitComponent as component
};
