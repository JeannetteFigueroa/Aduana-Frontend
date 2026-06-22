import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, r as registerViajero } from "./router-T_YAFGjX.mjs";
import "../_libs/sonner.mjs";
import { t as ArrowLeft, M as Mountain, h as CircleCheck, u as CircleAlert } from "../_libs/lucide-react.mjs";
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
function RegistroPage() {
  const navigate = useNavigate();
  const {
    setSession,
    logout
  } = useAuth();
  const [form, setForm] = reactExports.useState({
    nombre: "",
    email: "",
    rut: "",
    telefono: "",
    nacionalidad: "Chile",
    fechaNacimiento: "",
    clave: "",
    claveConf: "",
    acepta: false
  });
  const [error, setError] = reactExports.useState(null);
  const [ok, setOk] = reactExports.useState(false);
  const set = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.clave.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (form.clave !== form.claveConf) return setError("Las contraseñas no coinciden");
    if (!form.acepta) return setError("Debes aceptar los términos y condiciones");
    try {
      const session = await registerViajero({
        nombres: form.nombre,
        email: form.email,
        rut: form.rut,
        clave: form.clave,
        telefono: form.telefono,
        nacionalidad: form.nacionalidad,
        fechaNacimiento: form.fechaNacimiento
      });
      setSession(session);
      setOk(true);
      navigate({
        to: "/viajero"
      });
    } catch (err) {
      logout();
      setError(err instanceof Error ? err.message : "Error al crear cuenta");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-muted/30 px-4 py-8 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Volver al inicio"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-hero p-6 text-white sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-lg bg-white/15 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold sm:text-2xl", children: "Crear cuenta de viajero" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80", children: "Registro gratuito — Los Libertadores" })
        ] })
      ] }) }),
      ok ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-bold", children: "¡Cuenta creada exitosamente!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Redirigiendo al portal del viajero..." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-5 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Datos personales" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Información necesaria para validar tu identidad." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre completo *", value: form.nombre, onChange: (v) => set("nombre", v), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "RUT / DNI *", value: form.rut, onChange: (v) => set("rut", v), placeholder: "12.345.678-9", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Correo electrónico *", type: "email", value: form.email, onChange: (v) => set("email", v), placeholder: "tucorreo@mail.com", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", value: form.telefono, onChange: (v) => set("telefono", v), placeholder: "+56 9 1234 5678" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium", children: "Nacionalidad" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.nacionalidad, onChange: (e) => set("nacionalidad", e.target.value), className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Argentina" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Perú" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Bolivia" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Brasil" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Otra" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Fecha de nacimiento", type: "date", value: form.fechaNacimiento, onChange: (v) => set("fechaNacimiento", v) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Seguridad" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Contraseña *", type: "password", value: form.clave, onChange: (v) => set("clave", v), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Repetir contraseña *", type: "password", value: form.claveConf, onChange: (v) => set("claveConf", v), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Mínimo 8 caracteres. Usa letras, números y símbolos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.acepta, onChange: (e) => set("acepta", e.target.checked), className: "mt-1 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Acepto los",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "font-medium text-primary hover:underline", children: "términos y condiciones" }),
            " ",
            "y la",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "font-medium text-primary hover:underline", children: "política de tratamiento de datos" }),
            " ",
            "del Servicio Nacional de Aduanas."
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "rounded-md border bg-card px-5 py-2.5 text-center text-sm font-medium hover:bg-muted", children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Crear cuenta" })
        ] })
      ] })
    ] })
  ] }) });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), placeholder, required, className: "mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" })
  ] });
}
export {
  RegistroPage as component
};
