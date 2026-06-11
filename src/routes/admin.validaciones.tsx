import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { validaciones } from "@/lib/mock-data";
import { CheckCircle2, ShieldCheck, Activity } from "lucide-react";

export const Route = createFileRoute("/admin/validaciones")({
  head: () => ({ meta: [{ title: "Validaciones integradas" }] }),
  component: Validaciones,
});

function Validaciones() {
  return (
    <AdminLayout title="Validaciones integradas" subtitle="SAG · PDI · Aduanas · Carabineros">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold">Resultado de validaciones — VJ-001 Juan Pérez González</h3>
            <p className="text-sm text-muted-foreground">Consolidado de respuestas de cada organismo</p>
            <div className="mt-4 space-y-3">
              {validaciones.map(v => (
                <div key={v.entidad} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border bg-background p-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-success/10 text-success">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{v.entidad}</span>
                      <StatusBadge status={v.estado} />
                    </div>
                    <div className="text-sm text-muted-foreground">{v.desc}</div>
                    <div className="mt-1 text-sm">{v.detalle}</div>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">hace 12s</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Bitácora de validación</h3>
            </div>
            <ol className="relative space-y-4 border-l-2 border-border pl-5">
              {[
                ["08:42:01","Consulta enviada a PDI"],
                ["08:42:03","Respuesta PDI: Identidad confirmada"],
                ["08:42:04","Consulta enviada a SAG"],
                ["08:42:06","Respuesta SAG: Sin restricciones"],
                ["08:42:07","Consulta enviada a Aduanas"],
                ["08:42:09","Respuesta Aduanas: Declaración aprobada"],
                ["08:42:10","Resultado final: AUTORIZADO PARA CRUZAR"],
              ].map(([h, t], i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-card" />
                  <div className="text-xs text-muted-foreground">{h}</div>
                  <div className="text-sm font-medium">{t}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/10 text-success">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <h3 className="mt-3 text-lg font-bold text-success">Evaluación de riesgo</h3>
            <div className="mt-1 text-4xl font-extrabold">BAJO</div>
            <div className="mt-1 text-xs text-muted-foreground">Score: 12 / 100</div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[12%] bg-success" />
            </div>
            <button className="mt-5 w-full rounded-md bg-success py-2.5 text-sm font-semibold text-success-foreground hover:bg-success/90">
              AUTORIZAR PARA CRUZAR
            </button>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h4 className="font-semibold">Tiempo de procesamiento</h4>
            <div className="mt-2 text-3xl font-bold">9.3 s</div>
            <p className="text-xs text-muted-foreground">Promedio del turno: 12.8 s</p>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}
