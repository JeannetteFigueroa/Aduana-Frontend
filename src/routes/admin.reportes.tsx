import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";
import { flujoHorario } from "@/lib/mock-data";
import { Download, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Route = createFileRoute("/admin/reportes")({
  head: () => ({ meta: [{ title: "Reportes y estadísticas" }] }),
  component: Reportes,
});

const semana = [
  { dia: "Lun", cruces: 9320, espera: 14 },
  { dia: "Mar", cruces: 10120, espera: 16 },
  { dia: "Mié", cruces: 11400, espera: 18 },
  { dia: "Jue", cruces: 12836, espera: 21 },
  { dia: "Vie", cruces: 14200, espera: 28 },
  { dia: "Sáb", cruces: 16800, espera: 35 },
  { dia: "Dom", cruces: 15600, espera: 30 },
];

function Reportes() {
  return (
    <AdminLayout
      title="Reportes y estadísticas"
      subtitle="Indicadores de desempeño del paso fronterizo"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>05 jun — 11 jun 2026</span>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" /> Exportar CSV
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Total cruces", v: "35.482", d: "+12.4% vs semana anterior" },
          { l: "Vehículos", v: "12.843", d: "+8.1%" },
          { l: "Tiempo prom. cruce", v: "08m 41s", d: "-2m respecto a la semana anterior" },
          { l: "Horario peak", v: "12:00 – 16:00", d: "Sábado el día más concurrido" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="text-xs text-muted-foreground">{k.l}</div>
            <div className="mt-1 text-3xl font-bold">{k.v}</div>
            <div className="mt-1 text-xs text-success">{k.d}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Flujo semanal de cruces</h3>
          <div className="mt-2 h-64">
            <ResponsiveContainer>
              <LineChart data={semana}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 250)" />
                <XAxis dataKey="dia" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="cruces"
                  stroke="oklch(0.5 0.16 255)"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Tiempo promedio de espera (min)</h3>
          <div className="mt-2 h-64">
            <ResponsiveContainer>
              <BarChart data={semana}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 250)" />
                <XAxis dataKey="dia" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="espera" fill="oklch(0.6 0.13 235)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-2">
          <h3 className="font-semibold">Cruces por franja horaria (hoy)</h3>
          <div className="mt-2 h-64">
            <ResponsiveContainer>
              <BarChart data={flujoHorario}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 250)" />
                <XAxis dataKey="hora" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="entradas" fill="oklch(0.5 0.16 255)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="salidas" fill="oklch(0.62 0.16 150)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
