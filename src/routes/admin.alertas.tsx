import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { alertas } from "@/lib/mock-data";
import { AlertTriangle, MapPin, Filter } from "lucide-react";

export const Route = createFileRoute("/admin/alertas")({
  head: () => ({ meta: [{ title: "Alertas operacionales" }] }),
  component: Alertas,
});

function Alertas() {
  return (
    <AdminLayout title="Alertas operacionales" subtitle="Centro de monitoreo en tiempo real">
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          { l: "Activas", v: 14, c: "text-destructive" },
          { l: "Alta severidad", v: 4, c: "text-destructive" },
          { l: "Resueltas hoy", v: 28, c: "text-success" },
          { l: "Tiempo medio respuesta", v: "3.2m", c: "text-info" },
        ].map(s => (
          <div key={s.l} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className={`mt-1 text-2xl font-bold ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b p-5">
            <h3 className="font-semibold">Bandeja de alertas</h3>
            <button className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">
              <Filter className="h-3.5 w-3.5" /> Filtrar
            </button>
          </div>
          <ul className="divide-y">
            {alertas.map(a => (
              <li key={a.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 hover:bg-muted/30">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${a.severidad === "alta" ? "bg-destructive/10 text-destructive" : a.severidad === "media" ? "bg-warning/20 text-warning-foreground" : "bg-info/10 text-info"}`}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{a.tipo}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{a.id}</span>
                  </div>
                  <div className="truncate text-sm text-muted-foreground">{a.desc}</div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <StatusBadge status={a.severidad} />
                  <span className="hidden text-xs text-muted-foreground sm:block">{a.hora}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Mapa del recinto</h3>
          </div>
          <div className="relative h-80 overflow-hidden rounded-lg border bg-gradient-to-br from-primary/5 via-muted to-info/5">
            {/* Pseudo map */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-40">
              <path d="M10,160 Q60,40 190,80" stroke="oklch(0.5 0.16 255)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
              <rect x="60" y="70" width="80" height="50" rx="4" stroke="oklch(0.5 0.16 255)" strokeWidth="1.5" fill="oklch(0.9 0.012 250)" />
              <text x="100" y="100" textAnchor="middle" fontSize="6" fill="oklch(0.32 0.12 255)">EDIFICIO CONTROL</text>
            </svg>
            {[
              { x: "30%", y: "40%", s: "alta" },
              { x: "55%", y: "60%", s: "media" },
              { x: "75%", y: "30%", s: "baja" },
              { x: "20%", y: "75%", s: "alta" },
            ].map((p, i) => (
              <div key={i} style={{ left: p.x, top: p.y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${p.s === "alta" ? "text-destructive" : p.s === "media" ? "text-warning-foreground" : "text-info"}`}>
                <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-current opacity-30" />
                <AlertTriangle className="relative h-5 w-5" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Visualización geográfica de incidentes activos en el complejo fronterizo.</p>
        </aside>
      </div>
    </AdminLayout>
  );
}
