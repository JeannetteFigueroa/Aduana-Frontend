import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";
import { alertas, type Alerta } from "@/lib/mock-data";
import { AlertTriangle, Filter, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/alertas")({
  head: () => ({ meta: [{ title: "Alertas operacionales" }] }),
  component: Alertas,
});

/**
 * Centro de alertas operacionales.
 *
 * @backend  GET /api/alertas?activas=true  → Alerta[]
 *           GET /api/alertas/resumen       → { activas, alta, resueltasHoy, tmr }
 *  El array `alertas` viene vacío (mock-data) — se llenará desde el backend.
 */
function Alertas() {
  const data: Alerta[] = alertas;

  const resumen = [
    { l: "Activas", c: "text-destructive" },
    { l: "Alta severidad", c: "text-destructive" },
    { l: "Resueltas hoy", c: "text-success" },
    { l: "Tiempo medio respuesta", c: "text-info" },
  ];

  return (
    <AdminLayout title="Alertas operacionales" subtitle="Centro de monitoreo en tiempo real">
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {resumen.map((s) => (
          <div key={s.l} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className={`mt-1 text-2xl font-bold ${s.c}`}>—</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b p-5">
          <h3 className="font-semibold">Bandeja de alertas</h3>
          <button className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">
            <Filter className="h-3.5 w-3.5" /> Filtrar
          </button>
        </div>
        {data.length === 0 ? (
          <div className="grid place-items-center py-16 text-center text-muted-foreground">
            <Inbox className="h-10 w-10 opacity-40" />
            <p className="mt-3 text-sm">No hay alertas para mostrar</p>
            <p className="font-mono text-[11px] opacity-70">GET /api/alertas</p>
          </div>
        ) : (
          <ul className="divide-y">
            {data.map((a) => (
              <li key={a.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-4">
                <AlertTriangle className="h-5 w-5" />
                <div>
                  <div className="font-semibold">{a.tipo}</div>
                  <div className="text-sm text-muted-foreground">{a.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
