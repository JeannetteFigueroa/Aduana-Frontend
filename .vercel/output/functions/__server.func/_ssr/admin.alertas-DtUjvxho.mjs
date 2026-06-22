import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./admin-layout-BQCbxGQe.mjs";
import { b as alertas } from "./mock-data-CuL1kJkt.mjs";
import "../_libs/sonner.mjs";
import { a1 as Funnel, z as Inbox, T as TriangleAlert } from "../_libs/lucide-react.mjs";
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
import "./theme-toggle-CTDfpuLp.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./router-T_YAFGjX.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Alertas() {
  const data = alertas;
  const resumen = [{
    l: "Activas",
    c: "text-destructive"
  }, {
    l: "Alta severidad",
    c: "text-destructive"
  }, {
    l: "Resueltas hoy",
    c: "text-success"
  }, {
    l: "Tiempo medio respuesta",
    c: "text-info"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Alertas operacionales", subtitle: "Centro de monitoreo en tiempo real", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 grid gap-3 sm:grid-cols-4", children: resumen.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-2xl font-bold ${s.c}`, children: "—" })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Bandeja de alertas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5" }),
          " Filtrar"
        ] })
      ] }),
      data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center py-16 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-10 w-10 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: "No hay alertas para mostrar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] opacity-70", children: "GET /api/alertas" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: data.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: a.tipo }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: a.desc })
        ] })
      ] }, a.id)) })
    ] })
  ] });
}
export {
  Alertas as component
};
