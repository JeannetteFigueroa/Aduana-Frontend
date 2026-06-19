import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { viajeros, type Viajero } from "@/lib/mock-data";
import { Search, Inbox, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin/viajero")({
  head: () => ({ meta: [{ title: "Procesamiento de viajero" }] }),
  component: ProcesamientoViajero,
});

/**
 * Procesamiento del viajero en cabina.
 *
 * @backend
 *   GET  /api/viajeros?estado=cola             → lista lateral
 *   GET  /api/viajeros/{id}                    → detalle del viajero seleccionado
 *   GET  /api/viajeros/{id}/verificaciones     → documentos, biometría, vehículo, antecedentes
 *   POST /api/viajeros/{id}/autorizar
 *   POST /api/viajeros/{id}/rechazar
 */
function ProcesamientoViajero() {
  const [selected, setSelected] = useState<Viajero | null>(null);
  const lista: Viajero[] = viajeros;

  return (
    <AdminLayout
      title="Procesamiento del viajero"
      subtitle="Verificación de identidad, documentación y vehículo"
    >
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar viajero o patente"
                className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </div>
          {lista.length === 0 ? (
            <div className="grid place-items-center py-16 text-center text-muted-foreground">
              <Inbox className="h-8 w-8 opacity-40" />
              <p className="mt-2 text-sm">Sin viajeros en cola</p>
              <p className="font-mono text-[11px] opacity-70">GET /api/viajeros?estado=cola</p>
            </div>
          ) : (
            <ul className="max-h-[70vh] divide-y overflow-y-auto">
              {lista.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => setSelected(v)}
                    className={`flex w-full items-center gap-3 p-3 text-left hover:bg-muted/40 ${selected?.id === v.id ? "bg-primary/5" : ""}`}
                  >
                    <img src={v.foto} className="h-10 w-10 rounded-full object-cover" alt="" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{v.nombre}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {v.documento} · {v.patente}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section>
          {!selected ? (
            <div className="grid place-items-center rounded-xl border bg-card py-24 text-center text-muted-foreground shadow-sm">
              <div>
                <Search className="mx-auto h-10 w-10 opacity-40" />
                <p className="mt-3 text-sm">Selecciona un viajero de la lista para revisar</p>
                <p className="font-mono text-[11px] opacity-70">GET /api/viajeros/{"{id}"}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="grid gap-5 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center">
                <img
                  src={selected.foto}
                  alt=""
                  className="h-28 w-28 rounded-lg border object-cover"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold">{selected.nombre}</h2>
                    <StatusBadge status={selected.estado} />
                    <StatusBadge status={selected.riesgo} />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {selected.documento} · {selected.nacionalidad}
                  </div>
                </div>
                <div className="flex gap-2 md:flex-col">
                  <button className="inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-success-foreground hover:bg-success/90">
                    <CheckCircle2 className="h-4 w-4" /> Autorizar
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90">
                    <XCircle className="h-4 w-4" /> Rechazar
                  </button>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-dashed bg-muted/20 p-4 text-center text-xs text-muted-foreground">
                Las verificaciones (documentos, biometría, vehículo, antecedentes) se cargarán
                desde{" "}
                <span className="font-mono">
                  GET /api/viajeros/{selected.id}/verificaciones
                </span>
              </div>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
