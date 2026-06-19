import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";
import { Download, Calendar, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin/reportes")({
  head: () => ({ meta: [{ title: "Reportes y estadísticas" }] }),
  component: Reportes,
});

/**
 * Reportes operativos.
 *
 * @backend
 *   GET /api/reportes/kpis?desde=...&hasta=...      → tarjetas
 *   GET /api/reportes/flujo-semanal?desde=...       → LineChart
 *   GET /api/reportes/espera-semanal?desde=...      → BarChart
 *   GET /api/reportes/flujo-horario?fecha=...       → BarChart entradas/salidas
 *   GET /api/reportes/export?formato=csv            → descarga CSV
 */
function Reportes() {
  const kpis = ["Total cruces", "Vehículos", "Tiempo prom. cruce", "Horario peak"];

  return (
    <AdminLayout
      title="Reportes y estadísticas"
      subtitle="Indicadores de desempeño del paso fronterizo"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Selecciona rango</span>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((l) => (
          <div key={l} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="text-xs text-muted-foreground">{l}</div>
            <div className="mt-1 text-3xl font-bold text-muted-foreground">—</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Empty title="Flujo semanal de cruces" hint="GET /api/reportes/flujo-semanal" />
        <Empty title="Tiempo promedio de espera" hint="GET /api/reportes/espera-semanal" />
        <div className="lg:col-span-2">
          <Empty title="Cruces por franja horaria (hoy)" hint="GET /api/reportes/flujo-horario" />
        </div>
      </div>
    </AdminLayout>
  );
}

function Empty({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 grid h-56 place-items-center rounded-lg border border-dashed bg-muted/20 text-center text-muted-foreground">
        <div>
          <BarChart3 className="mx-auto h-8 w-8 opacity-40" />
          <p className="mt-2 text-sm">Sin datos</p>
          <p className="font-mono text-[11px] opacity-70">{hint}</p>
        </div>
      </div>
    </div>
  );
}
