import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { Inbox, Plus, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { listarVehiculos, autorizarPasoVehiculo, type Vehiculo } from "@/lib/vehiculos";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/permisos")({
  head: () => ({ meta: [{ title: "Permisos de autorización de cruce" }] }),
  component: Permisos,
});

type Permiso = {
  id: string;
  viajero: string;
  vehiculo: string;
  emitido: string;
  vence: string;
  estado: "vigente" | "anulado" | "vencido";
};

function Permisos() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarPendientes = async () => {
    setLoading(true);
    try {
      const vs = await listarVehiculos();
      setVehiculos(vs.filter((v) => v.estado === "AUTORIZADO"));
    } catch {
      toast.error("Error al cargar vehículos autorizados");
    } finally {
      setLoading(false);
    }
  };

  const emitirPermiso = async (vehiculoId: number, patente: string, nombreDuenio: string) => {
    try {
      const permiso = await apiFetch<Permiso>("/api/permisos", {
        method: "POST",
        body: JSON.stringify({
          vehiculoId,
          viajero: nombreDuenio,
          patente,
          emitido: new Date().toISOString().slice(0, 10),
          vence: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        }),
      });
      setPermisos([...permisos, permiso]);
      toast.success("Permiso emitido", {
        description: `Código: ${permiso.id}`,
      });
    } catch {
      toast.success("Permiso emitido (simulado)", {
        description: `Patente ${patente} - ${nombreDuenio}`,
      });
    }
  };

  return (
    <AdminLayout title="Permisos de cruce" subtitle="Emisión y gestión de comprobantes">
      <div className="mb-4 flex justify-end">
        <button
          onClick={cargarPendientes}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {loading ? "Cargando..." : "Cargar autorizados pendientes"}
        </button>
      </div>

      {vehiculos.length > 0 && (
        <div className="mb-6 rounded-xl border bg-card p-4 shadow-sm">
          <h3 className="mb-3 font-semibold">Vehículos autorizados sin permiso</h3>
          <div className="space-y-2">
            {vehiculos.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between rounded-lg border bg-background p-3"
              >
                <div>
                  <div className="font-medium">{v.patente}</div>
                  <div className="text-sm text-muted-foreground">
                    {v.marca} {v.modelo}
                  </div>
                </div>
                <button
                  onClick={() => emitirPermiso(v.id, v.patente, v.nombreDuenio)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-success px-3 py-1.5 text-xs font-medium text-success-foreground hover:bg-success/90"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Emitir permiso
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-5">
          <h3 className="font-semibold">Historial de permisos emitidos</h3>
        </div>
        {permisos.length === 0 ? (
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
                  <th className="px-4 py-2 text-left">Patente</th>
                  <th className="px-4 py-2 text-left">Emitido</th>
                  <th className="px-4 py-2 text-left">Vence</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {permisos.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3">{p.viajero}</td>
                    <td className="px-4 py-3 font-mono">{p.vehiculo}</td>
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
