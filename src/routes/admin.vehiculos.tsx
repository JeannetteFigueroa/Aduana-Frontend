import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { listarVehiculos, autorizarPasoVehiculo, type Vehiculo } from "@/lib/vehiculos";

export const Route = createFileRoute("/admin/vehiculos")({
  head: () => ({ meta: [{ title: "Gestión de Vehículos — Aduanas Chile" }] }),
  component: AdminVehiculos,
});

function AdminVehiculos() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarVehiculos = async () => {
    setLoading(true);
    try {
      const lista = await listarVehiculos();
      setVehiculos(lista);
    } catch {
      toast.error("Error al cargar vehículos");
    } finally {
      setLoading(false);
    }
  };

  const autorizar = async (id: number) => {
    try {
      await autorizarPasoVehiculo(id, true);
      setVehiculos((v) =>
        v.map((x) => (x.id === id ? { ...x, estado: "AUTORIZADO" as const } : x))
      );
      toast.success("Vehículo autorizado");
    } catch {
      toast.error("Error al autorizar");
    }
  };

  const denegar = async (id: number) => {
    try {
      await autorizarPasoVehiculo(id, false);
      setVehiculos((v) =>
        v.map((x) => (x.id === id ? { ...x, estado: "DENEGADO" as const } : x))
      );
      toast.success("Vehículo denegado");
    } catch {
      toast.error("Error al denegar");
    }
  };

  return (
    <AdminLayout
      title="Gestión de Vehículos"
      subtitle="Administra el cruce vehicular en Paso Los Libertadores"
    >
      <div className="mb-4 flex justify-end">
        <button
          onClick={cargarVehiculos}
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Actualizar lista"}
        </button>
      </div>

      {vehiculos.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center shadow">
          <p className="text-muted-foreground">No hay vehículos registrados.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {vehiculos.map((v) => (
            <div key={v.id} className="rounded-xl border bg-card p-4 shadow">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-bold">{v.patente}</div>
                  <div className="text-sm text-muted-foreground">
                    {v.marca} {v.modelo} · {v.color} · {v.anio}
                  </div>
                  <div className="text-xs">Dueño: {v.nombreDuenio} ({v.rutDuenio})</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={v.estado.toLowerCase()} />
                  {v.estado === "PENDIENTE" && (
                    <>
                      <button
                        onClick={() => autorizar(v.id)}
                        className="rounded-md bg-success px-3 py-1.5 text-xs font-medium text-success-foreground hover:bg-success/90"
                      >
                        Autorizar
                      </button>
                      <button
                        onClick={() => denegar(v.id)}
                        className="rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90"
                      >
                        Denegar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}