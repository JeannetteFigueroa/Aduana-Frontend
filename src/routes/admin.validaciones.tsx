import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { validaciones, type Validacion } from "@/lib/mock-data";
import { CheckCircle2, ShieldCheck, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/validaciones")({
  head: () => ({ meta: [{ title: "Validaciones integradas" }] }),
  component: Validaciones,
});

/**
 * Resultado consolidado de validaciones (SAG · PDI · Aduanas · Carabineros).
 *
 * @backend  GET /api/validaciones/{viajeroId}  → Validacion[]
 *           GET /api/validaciones/{viajeroId}/bitacora
 *           POST /api/validaciones/{viajeroId}/autorizar
 */
function Validaciones() {
  const data: Validacion[] = validaciones;

  return (
    <AdminLayout title="Validaciones integradas" subtitle="SAG · PDI · Aduanas · Carabineros">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Resultado de validaciones</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona un viajero para ver el consolidado de cada organismo.
          </p>
          {data.length === 0 ? (
            <div className="mt-6 grid place-items-center rounded-lg border border-dashed bg-muted/20 py-16 text-center text-muted-foreground">
              <Inbox className="h-10 w-10 opacity-40" />
              <p className="mt-3 text-sm">No hay validaciones para mostrar</p>
              <p className="font-mono text-[11px] opacity-70">
                GET /api/validaciones/{"{viajeroId}"}
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {data.map((v) => (
                <div
                  key={v.entidad}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-lg border bg-background p-4"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{v.entidad}</span>
                      <StatusBadge status={v.estado} />
                    </div>
                    <div className="text-sm text-muted-foreground">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-xl border bg-card p-5 text-center shadow-sm">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-muted text-muted-foreground">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h3 className="mt-3 text-lg font-bold">Evaluación de riesgo</h3>
          <div className="mt-1 text-4xl font-extrabold text-muted-foreground">—</div>
          <div className="mt-1 text-xs text-muted-foreground">Disponible al validar un viajero</div>
        </aside>
      </div>
    </AdminLayout>
  );
}
