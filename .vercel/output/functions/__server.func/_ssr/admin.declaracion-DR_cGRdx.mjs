import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./admin-layout-BQCbxGQe.mjs";
import "../_libs/sonner.mjs";
import { W as Apple, Y as Beef, Z as Sprout, J as Leaf, _ as Wheat, P as Plus, X, $ as Info } from "../_libs/lucide-react.mjs";
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
const categorias = [{
  id: "frutas",
  label: "Frutas frescas",
  icon: Apple,
  color: "text-red-500"
}, {
  id: "carnes",
  label: "Carnes y embutidos",
  icon: Beef,
  color: "text-rose-600"
}, {
  id: "vegetales",
  label: "Vegetales",
  icon: Sprout,
  color: "text-green-600"
}, {
  id: "semillas",
  label: "Semillas / plantas",
  icon: Leaf,
  color: "text-emerald-600"
}, {
  id: "cereales",
  label: "Cereales / granos",
  icon: Wheat,
  color: "text-amber-600"
}];
function Declaracion() {
  const [selected, setSelected] = reactExports.useState([]);
  const [items, setItems] = reactExports.useState([]);
  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Declaración SAG digital", subtitle: "Productos de origen vegetal, animal o derivados", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "1. ¿Transporta alguno de estos productos?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Seleccione todas las categorías que correspondan." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5", children: categorias.map((c) => {
          const on = selected.includes(c.id);
          const Icon = c.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggle(c.id), className: `flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-8 w-8 ${c.color}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center text-sm font-medium", children: c.label })
          ] }, c.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "2. Detalle de productos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setItems([...items, {
            id: Date.now(),
            nombre: "",
            cantidad: "",
            origen: ""
          }]), className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Agregar producto"
          ] })
        ] }),
        items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground", children: "Sin productos agregados." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 rounded-md border bg-background p-3 sm:grid-cols-[2fr_1fr_1fr_auto]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: it.nombre, placeholder: "Nombre del producto", className: "h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: it.cantidad, placeholder: "Cantidad", className: "h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: it.origen, placeholder: "País de origen", className: "h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setItems(items.filter((x) => x.id !== it.id)), className: "grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }, it.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted", children: "Guardar borrador" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Enviar declaración" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-info/5 p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Información importante" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Es obligatorio declarar todo producto de origen vegetal o animal." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· La no declaración constituye infracción según Ley 18.755." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "· Inspectores SAG pueden retener productos no autorizados." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Resumen" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-3 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Categorías" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: selected.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Productos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: items.length })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Declaracion as component
};
