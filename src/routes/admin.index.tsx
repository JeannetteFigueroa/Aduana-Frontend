import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";
import {
  Users,
  Car,
  FileCheck,
  AlertTriangle,
  Inbox,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Aduanas Los Libertadores" }] }),
  component: Dashboard,
});

/**
 * Dashboard del operador.
 *
 * @backend  Esta pantalla se rellena con varios endpoints:
 *    GET /api/dashboard/kpis            → KPIs (viajeros, vehículos, declaraciones, alertas)
 *    GET /api/reportes/flujo-horario    → Serie horaria para el AreaChart
 *    GET /api/reportes/nacionalidad     → Distribución por nacionalidad
 *    GET /api/viajeros?estado=cola      → Cola activa
 *    GET /api/cabinas/estado            → Estado de cabinas
 *    GET /api/alertas?recientes=true    → Alertas recientes
 *  Mientras no exista el backend, los paneles se muestran vacíos.
 */
function Dashboard() {
  // Estructura de KPIs lista para mapear la respuesta del backend.
  const kpis = [
    { icon: Users, label: "Viajeros hoy", accent: "bg-primary/10 text-primary" },
    { icon: Car, label: "Vehículos procesados", accent: "bg-info/10 text-info" },
    { icon: FileCheck, label: "Declaraciones SAG", accent: "bg-success/10 text-success" },
    {
      icon: AlertTriangle,
      label: "Alertas activas",
      accent: "bg-destructive/10 text-destructive",
    },
  ];

  return (
    <AdminLayout
      title="Dashboard operador"
      subtitle="Resumen operativo del paso fronterizo"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className={`grid h-10 w-10 place-items-center rounded-lg ${k.accent}`}>
              <k.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-3xl font-bold tracking-tight text-muted-foreground">
              —
            </div>
            <div className="text-sm text-muted-foreground">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <EmptyPanel
          className="lg:col-span-2"
          title="Flujo de cruces por hora"
          hint="GET /api/reportes/flujo-horario"
        />
        <EmptyPanel
          title="Distribución por nacionalidad"
          hint="GET /api/reportes/nacionalidad"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <EmptyPanel
          className="lg:col-span-2"
          title="Cola activa de viajeros"
          hint="GET /api/viajeros?estado=cola"
        />
        <EmptyPanel title="Estado de cabinas" hint="GET /api/cabinas/estado" />
      </div>

      <div className="mt-4">
        <EmptyPanel title="Alertas recientes" hint="GET /api/alertas?recientes=true" />
      </div>
    </AdminLayout>
  );
}

function EmptyPanel({
  title,
  hint,
  className,
}: {
  title: string;
  hint: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border bg-card p-5 shadow-sm ${className ?? ""}`}>
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 grid place-items-center rounded-lg border border-dashed bg-muted/20 py-12 text-center text-muted-foreground">
        <Inbox className="h-8 w-8 opacity-40" />
        <p className="mt-2 text-sm">Sin datos disponibles</p>
        <p className="font-mono text-[11px] opacity-70">{hint}</p>
      </div>
    </div>
  );
}
