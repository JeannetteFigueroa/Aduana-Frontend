import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./admin-layout-C8pAR1EJ.mjs";
import "../_libs/sonner.mjs";
import { y as Users, C as Car, i as FileCheck, T as TriangleAlert, z as Inbox } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./router-CofPkZmn.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Dashboard() {
  const kpis = [{
    icon: Users,
    label: "Viajeros hoy",
    accent: "bg-primary/10 text-primary"
  }, {
    icon: Car,
    label: "Vehículos procesados",
    accent: "bg-info/10 text-info"
  }, {
    icon: FileCheck,
    label: "Declaraciones SAG",
    accent: "bg-success/10 text-success"
  }, {
    icon: TriangleAlert,
    label: "Alertas activas",
    accent: "bg-destructive/10 text-destructive"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Dashboard operador", subtitle: "Resumen operativo del paso fronterizo", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4", children: kpis.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 place-items-center rounded-lg ${k.accent}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-3xl font-bold tracking-tight text-muted-foreground", children: "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: k.label })
    ] }, k.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, { className: "lg:col-span-2", title: "Flujo de cruces por hora", hint: "GET /api/reportes/flujo-horario" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, { title: "Distribución por nacionalidad", hint: "GET /api/reportes/nacionalidad" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, { className: "lg:col-span-2", title: "Cola activa de viajeros", hint: "GET /api/viajeros?estado=cola" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, { title: "Estado de cabinas", hint: "GET /api/cabinas/estado" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPanel, { title: "Alertas recientes", hint: "GET /api/alertas?recientes=true" }) })
  ] });
}
function EmptyPanel({
  title,
  hint,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border bg-card p-5 shadow-sm ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid place-items-center rounded-lg border border-dashed bg-muted/20 py-12 text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-8 w-8 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: "Sin datos disponibles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] opacity-70", children: hint })
    ] })
  ] });
}
export {
  Dashboard as component
};
