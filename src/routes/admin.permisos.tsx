import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { permisos } from "@/lib/mock-data";
import { QrCode, Download, Printer, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/permisos")({
  head: () => ({ meta: [{ title: "Permisos de autorización de cruce" }] }),
  component: Permisos,
});

function Permisos() {
  return (
    <AdminLayout title="Permisos de autorización de cruce" subtitle="Emisión y gestión de comprobantes">
      <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Permiso de cruce</div>
                <div className="font-mono text-lg font-bold">PRM-2026-00451</div>
              </div>
              <span className="rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground">AUTORIZADO</span>
            </div>
            <div className="my-5 grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <div className="grid h-32 w-32 place-items-center rounded-lg bg-white">
                <QrCode className="h-28 w-28 text-foreground" strokeWidth={1} />
              </div>
              <dl className="grid content-center gap-y-1.5 text-sm">
                <div><dt className="text-xs text-muted-foreground">Viajero</dt><dd className="font-semibold">Juan Pérez González</dd></div>
                <div><dt className="text-xs text-muted-foreground">RUT</dt><dd className="font-medium">12.345.678-9</dd></div>
                <div><dt className="text-xs text-muted-foreground">Vehículo</dt><dd className="font-medium">JKLM-23 · Toyota Hilux</dd></div>
              </dl>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-primary/20 pt-4 text-sm">
              <div><div className="text-xs text-muted-foreground">Emitido</div><div className="font-medium">11-06-2026 08:45</div></div>
              <div><div className="text-xs text-muted-foreground">Vence</div><div className="font-medium">11-06-2026 23:59</div></div>
              <div><div className="text-xs text-muted-foreground">Paso</div><div className="font-medium">Los Libertadores</div></div>
              <div><div className="text-xs text-muted-foreground">Cabina asignada</div><div className="font-medium">N° 2</div></div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-success/10 p-3 text-sm text-success">
              <CheckCircle2 className="h-4 w-4 shrink-0" /> Validado por SAG, PDI y Aduanas
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4" /> Descargar PDF
            </button>
            <button className="flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-muted">
              <Printer className="h-4 w-4" /> Imprimir
            </button>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-5">
            <h3 className="font-semibold">Historial de permisos emitidos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">N° Permiso</th>
                  <th className="px-4 py-2 text-left">Viajero</th>
                  <th className="px-4 py-2 text-left">Emitido</th>
                  <th className="px-4 py-2 text-left">Vence</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {permisos.map(p => (
                  <tr key={p.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3">{p.viajero}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.emitido}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.vence}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
