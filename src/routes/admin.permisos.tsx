import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { permisos, type Permiso } from "@/lib/mock-data";
import { Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/permisos")({
  head: () => ({ meta: [{ title: "Permisos de autorización de cruce" }] }),
  component: Permisos,
});

/**
 * Listado de permisos de cruce emitidos.
 *
 * @backend  GET /api/permisos              → Permiso[]
 *           GET /api/permisos/{id}         → detalle + QR
 *           POST /api/permisos             → emite un nuevo permiso
 */
function Permisos() {
  const data: Permiso[] = permisos;

  return (
    <AdminLayout title="Permisos de cruce" subtitle="Emisión y gestión de comprobantes">
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-5">
          <h3 className="font-semibold">Historial de permisos emitidos</h3>
        </div>
        {data.length === 0 ? (
          <div className="grid place-items-center py-16 text-center text-muted-foreground">
            <Inbox className="h-10 w-10 opacity-40" />
            <p className="mt-3 text-sm">No hay permisos registrados</p>
            <p className="font-mono text-[11px] opacity-70">GET /api/permisos</p>
          </div>
        ) : (
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
                {data.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3">{p.viajero}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.emitido}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.vence}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
