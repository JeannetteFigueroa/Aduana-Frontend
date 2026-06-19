import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Apple, Beef, Leaf, Sprout, Wheat, Plus, X, Info } from "lucide-react";

export const Route = createFileRoute("/admin/declaracion")({
  head: () => ({ meta: [{ title: "Declaración SAG digital" }] }),
  component: Declaracion,
});

const categorias = [
  { id: "frutas", label: "Frutas frescas", icon: Apple, color: "text-red-500" },
  { id: "carnes", label: "Carnes y embutidos", icon: Beef, color: "text-rose-600" },
  { id: "vegetales", label: "Vegetales", icon: Sprout, color: "text-green-600" },
  { id: "semillas", label: "Semillas / plantas", icon: Leaf, color: "text-emerald-600" },
  { id: "cereales", label: "Cereales / granos", icon: Wheat, color: "text-amber-600" },
];

function Declaracion() {
  const [selected, setSelected] = useState<string[]>([]);
  const [items, setItems] = useState<
    { id: number; nombre: string; cantidad: string; origen: string }[]
  >([{ id: 1, nombre: "Manzanas Gala", cantidad: "2 kg", origen: "Argentina" }]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <AdminLayout
      title="Declaración SAG digital"
      subtitle="Productos de origen vegetal, animal o derivados"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold">1. ¿Transporta alguno de estos productos?</h3>
            <p className="text-sm text-muted-foreground">
              Seleccione todas las categorías que correspondan.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {categorias.map((c) => {
                const on = selected.includes(c.id);
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                  >
                    <Icon className={`h-8 w-8 ${c.color}`} />
                    <span className="text-center text-sm font-medium">{c.label}</span>
                    {on && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                        SELECCIONADO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">2. Detalle de productos declarados</h3>
              <button
                onClick={() =>
                  setItems([...items, { id: Date.now(), nombre: "", cantidad: "", origen: "" }])
                }
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar producto
              </button>
            </div>
            <div className="space-y-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="grid grid-cols-1 gap-2 rounded-md border bg-background p-3 sm:grid-cols-[2fr_1fr_1fr_auto]"
                >
                  <input
                    defaultValue={it.nombre}
                    placeholder="Nombre del producto"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  />
                  <input
                    defaultValue={it.cantidad}
                    placeholder="Cantidad"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  />
                  <input
                    defaultValue={it.origen}
                    placeholder="País de origen"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  />
                  <button
                    onClick={() => setItems(items.filter((x) => x.id !== it.id))}
                    className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted">
              Guardar borrador
            </button>
            <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Enviar declaración
            </button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-info/5 p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-info">
              <Info className="h-4 w-4" />
              <h4 className="font-semibold">Información importante</h4>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>· Es obligatorio declarar todo producto de origen vegetal o animal.</li>
              <li>· La no declaración constituye infracción según Ley 18.755.</li>
              <li>· Inspectores SAG pueden retener productos no autorizados.</li>
              <li>· Productos lácteos, miel y frutos secos también deben declararse.</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h4 className="font-semibold">Resumen</h4>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Categorías</dt>
                <dd className="font-medium">{selected.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Productos</dt>
                <dd className="font-medium">{items.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estado</dt>
                <dd className="font-medium text-warning-foreground">Borrador</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}
