import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout, S as StatusBadge } from "./admin-layout-BQCbxGQe.mjs";
import { a as validaciones } from "./mock-data-CuL1kJkt.mjs";
import "../_libs/sonner.mjs";
import { z as Inbox, h as CircleCheck, j as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function Validaciones() {
  const data = validaciones;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Validaciones integradas", subtitle: "SAG · PDI · Aduanas · Carabineros", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Resultado de validaciones" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Selecciona un viajero para ver el consolidado de cada organismo." }),
      data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid place-items-center rounded-lg border border-dashed bg-muted/20 py-16 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "h-10 w-10 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: "No hay validaciones para mostrar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[11px] opacity-70", children: [
          "GET /api/validaciones/",
          "{viajeroId}"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: data.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-lg border bg-background p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-success/10 text-success", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: v.entidad }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v.estado })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: v.desc })
        ] })
      ] }, v.entidad)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-xl border bg-card p-5 text-center shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-lg font-bold", children: "Evaluación de riesgo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-4xl font-extrabold text-muted-foreground", children: "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: "Disponible al validar un viajero" })
    ] })
  ] }) });
}
export {
  Validaciones as component
};
