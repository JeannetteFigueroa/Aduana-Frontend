import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { flujoHorario, distribucionNacionalidad, viajeros, alertas } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Users, Car, FileCheck, AlertTriangle, MapPin } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Aduanas Los Libertadores" }] }),
  component: Dashboard,
});

const COLORS = ["oklch(0.5 0.16 255)", "oklch(0.62 0.16 150)", "oklch(0.78 0.16 75)", "oklch(0.6 0.2 25)", "oklch(0.55 0.18 305)"];

function KpiCard({ icon: Icon, label, value, delta, up, accent }: any) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-destructive"}`}>
          {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />} {delta}
        </span>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Dashboard() {
  return (
    <AdminLayout title="Dashboard operador" subtitle="Resumen operativo del paso fronterizo · 11 jun 2026">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={Users} label="Viajeros hoy" value="12.836" delta="+8.2%" up accent="bg-primary/10 text-primary" />
        <KpiCard icon={Car} label="Vehículos procesados" value="3.892" delta="+3.1%" up accent="bg-info/10 text-info" />
        <KpiCard icon={FileCheck} label="Declaraciones SAG" value="2.451" delta="-1.4%" up={false} accent="bg-success/10 text-success" />
        <KpiCard icon={AlertTriangle} label="Alertas activas" value="14" delta="+5" up={false} accent="bg-destructive/10 text-destructive" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Flujo de cruces por hora</h3>
              <p className="text-xs text-muted-foreground">Entradas y salidas vehiculares</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Entradas</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Salidas</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={flujoHorario}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.5 0.16 255)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.5 0.16 255)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.16 150)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.62 0.16 150)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.012 250)" />
                <XAxis dataKey="hora" tickLine={false} fontSize={11} />
                <YAxis tickLine={false} fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="entradas" stroke="oklch(0.5 0.16 255)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="salidas" stroke="oklch(0.62 0.16 150)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold">Distribución por nacionalidad</h3>
          <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={distribucionNacionalidad} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {distribucionNacionalidad.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 text-xs">
            {distribucionNacionalidad.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />{d.name}</span>
                <span className="font-medium">{d.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b p-5">
            <h3 className="font-semibold">Cola activa de viajeros</h3>
            <a href="/admin/viajero" className="text-xs font-medium text-primary hover:underline">Ver todos →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Viajero</th>
                  <th className="px-4 py-2 text-left">Vehículo</th>
                  <th className="px-4 py-2 text-left">Hora</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {viajeros.map((v) => (
                  <tr key={v.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-mono text-xs">{v.id}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <img src={v.foto} className="h-7 w-7 rounded-full" alt="" />
                        <div className="min-w-0">
                          <div className="truncate font-medium">{v.nombre}</div>
                          <div className="truncate text-xs text-muted-foreground">{v.nacionalidad}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="font-medium">{v.patente}</div>
                      <div className="text-xs text-muted-foreground">{v.vehiculo}</div>
                    </td>
                    <td className="px-4 py-2.5">{v.hora}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={v.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold">Estado de cabinas</h3>
            <div className="mt-3 space-y-2.5">
              {["Cabina 1","Cabina 2","Cabina 3","Cabina 4","Cabina 5","Cabina 6"].map((c, i) => (
                <div key={c} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${i === 4 ? "bg-destructive" : i === 2 ? "bg-warning" : "bg-success"}`} />
                    {c}
                  </span>
                  <span className="text-xs text-muted-foreground">{i === 4 ? "Sin señal" : `${Math.floor(Math.random()*12)+2} en cola`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Tiempos de espera</h3>
            </div>
            <div className="h-32">
              <ResponsiveContainer>
                <BarChart data={[{n:"C1",t:8},{n:"C2",t:14},{n:"C3",t:22},{n:"C4",t:6},{n:"C5",t:0},{n:"C6",t:11}]}>
                  <XAxis dataKey="n" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="t" fill="oklch(0.5 0.16 255)" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-muted-foreground">minutos promedio por cabina</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Alertas recientes</h3>
          <a href="/admin/alertas" className="text-xs font-medium text-primary hover:underline">Centro de alertas →</a>
        </div>
        <ul className="divide-y">
          {alertas.slice(0,3).map(a => (
            <li key={a.id} className="flex items-center gap-3 py-3">
              <AlertTriangle className={`h-4 w-4 shrink-0 ${a.severidad === "alta" ? "text-destructive" : a.severidad === "media" ? "text-warning-foreground" : "text-info"}`} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{a.tipo}</div>
                <div className="truncate text-xs text-muted-foreground">{a.desc}</div>
              </div>
              <StatusBadge status={a.severidad} />
              <span className="hidden text-xs text-muted-foreground sm:block">{a.hora}</span>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
