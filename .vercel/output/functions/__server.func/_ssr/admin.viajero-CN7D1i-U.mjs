import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout, S as StatusBadge } from "./admin-layout-C8pAR1EJ.mjs";
import { v as viajeros } from "./mock-data-CuL1kJkt.mjs";
import "../_libs/sonner.mjs";
import { O as Search, z as Inbox, h as CircleCheck, R as CircleX } from "../_libs/lucide-react.mjs";
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
function ProcesamientoViajero() {
  const [selected, setSelected] = reactExports.useState(null);
  const lista = viajeros;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Procesamiento del viajero", subtitle: "Verificación de identidad, documentación y vehículo", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-xl border bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Buscar viajero o patente", className: "h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" })
      ] }) }),
      lista.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center py-16 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-8 w-8 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: "Sin viajeros en cola" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[11px] opacity-70", children: "GET /api/viajeros?estado=cola" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-[70vh] divide-y overflow-y-auto", children: lista.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(v), className: `flex w-full items-center gap-3 p-3 text-left hover:bg-muted/40 ${selected?.id === v.id ? "bg-primary/5" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.foto, className: "h-10 w-10 rounded-full object-cover", alt: "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: v.nombre }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-xs text-muted-foreground", children: [
            v.documento,
            " · ",
            v.patente
          ] })
        ] })
      ] }) }, v.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: !selected ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center rounded-xl border bg-card py-24 text-center text-muted-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mx-auto h-10 w-10 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: "Selecciona un viajero de la lista para revisar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[11px] opacity-70", children: [
        "GET /api/viajeros/",
        "{id}"
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selected.foto, alt: "", className: "h-28 w-28 rounded-lg border object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: selected.nombre }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: selected.estado }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: selected.riesgo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm text-muted-foreground", children: [
            selected.documento,
            " · ",
            selected.nacionalidad
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 md:flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-success-foreground hover:bg-success/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
            " Autorizar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }),
            " Rechazar"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-lg border border-dashed bg-muted/20 p-4 text-center text-xs text-muted-foreground", children: [
        "Las verificaciones (documentos, biometría, vehículo, antecedentes) se cargarán desde",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
          "GET /api/viajeros/",
          selected.id,
          "/verificaciones"
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  ProcesamientoViajero as component
};
