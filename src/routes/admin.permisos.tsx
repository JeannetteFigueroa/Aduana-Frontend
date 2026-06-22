import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { Inbox, Plus, CheckCircle2, Car, FileText, Shield, Baby } from "lucide-react";
import { useState } from "react";
import { listarVehiculos, type Vehiculo } from "@/lib/vehiculos";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/permisos")({
  head: () => ({ meta: [{ title: "Permisos de autorización de cruce" }] }),
  component: Permisos,
});

type ViajeroCompleto = {
  id: string;
  nombre: string;
  rut: string;
  vehiculo?: Vehiculo;
  documentos: { tipo: string; estado: string }[];
  declaracionSag?: { folio: string; estado: string };
  validacionesPdi?: { estado: string }[];
  menores: { nombre: string; autorizado: boolean }[];
};

function Permisos() {
  const [viajeros, setViajeros] = useState<ViajeroCompleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedViajero, setSelectedViajero] = useState<ViajeroCompleto | null>(null);

  const cargarViajeros = async () => {
    setLoading(true);
    try {
      const vs = await apiFetch<ViajeroCompleto[]>("/api/viajeros?estado=cola");
      setViajeros(vs);
    } catch {
      const vehiculos = await listarVehiculos();
      const mock: ViajeroCompleto[] = vehiculos.map((v) => ({
        id: v.id.toString(),
        nombre: v.nombreDuenio,
        rut: v.rutDuenio,
        vehiculo: v,
        documentos: [
          { tipo: "Cédula", estado: "validado" },
          { tipo: "Pasaporte", estado: "validado" },
        ],
        declaracionSag: { folio: "SAG-2026-08841", estado: "aprobada" },
        validacionesPdi: [{ estado: "autorizado" }],
        menores: [],
      }));
      setViajeros(mock);
    } finally {
      setLoading(false);
    }
  };

  const emitirPermiso = async (viajeroId: string) => {
    try {
      await apiFetch("/api/permisos", {
        method: "POST",
        body: JSON.stringify({ viajeroId, tipo: "vehicular" }),
      });
      toast.success("Permiso emitido");
      setSelectedViajero(null);
    } catch {
      toast.success("Permiso emitido (simulado)");
      setSelectedViajero(null);
    }
  };

  return (
    <AdminLayout title="Permisos de cruce" subtitle="Gestión completa de permisos">
      <div className="mb-4 flex justify-end">
        <button
          onClick={cargarViajeros}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {loading ? "Cargando..." : "Cargar viajeros en cola"}
        </button>
      </div>

      {viajeros.length > 0 && !selectedViajero && (
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-5">
            <h3 className="font-semibold">Viajeros esperando permiso</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">RUT</th>
                  <th className="px-4 py-2 text-left">Patente</th>
                  <th className="px-4 py-2 text-left">Documentos</th>
                  <th className="px-4 py-2 text-left">SAG</th>
                  <th className="px-4 py-2 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {viajeros.map((v) => (
                  <tr key={v.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-3">{v.nombre}</td>
                    <td className="px-4 py-3 font-mono">{v.rut}</td>
                    <td className="px-4 py-3 font-mono">{v.vehiculo?.patente ?? "—"}</td>
                    <td className="px-4 py-3">
                      {v.documentos.every((d) => d.estado === "validado") ? (
                        <span className="text-success">✓ Completos</span>
                      ) : (
                        <span className="text-warning">Pendientes</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={v.declaracionSag?.estado ?? "pendiente"} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedViajero(v)}
                        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedViajero && (
        <div className="grid gap-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedViajero.nombre}</h3>
                <p className="text-sm text-muted-foreground">{selectedViajero.rut}</p>
              </div>
              <button
                onClick={() => setSelectedViajero(null)}
                className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted"
              >
                Volver
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <Car className="h-4 w-4" /> Vehículo
              </h4>
              {selectedViajero.vehiculo ? (
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Patente:</dt>
                    <dd className="font-medium">{selectedViajero.vehiculo.patente}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Marca/Modelo:</dt>
                    <dd className="font-medium">
                      {selectedViajero.vehiculo.marca} {selectedViajero.vehiculo.modelo}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estado:</dt>
                    <dd>
                      <StatusBadge status={selectedViajero.vehiculo.estado.toLowerCase()} />
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">Sin vehículo registrado</p>
              )}
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <FileText className="h-4 w-4" /> Declaración SAG
              </h4>
              {selectedViajero.declaracionSag ? (
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Folio:</dt>
                    <dd className="font-medium">{selectedViajero.declaracionSag.folio}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estado:</dt>
                    <dd>
                      <StatusBadge status={selectedViajero.declaracionSag.estado} />
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">Sin declaración</p>
              )}
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <Shield className="h-4 w-4" /> Validaciones PDI
              </h4>
              {selectedViajero.validacionesPdi?.map((v, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>Validación {i + 1}:</span>
                  <StatusBadge status={v.estado} />
                </div>
              )) ?? <p className="text-sm text-muted-foreground">Sin validaciones</p>}
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h4 className="mb-3 flex items-center gap-2 font-semibold">
                <Baby className="h-4 w-4" /> Menores
              </h4>
              {selectedViajero.menores.length > 0 ? (
                <ul className="text-sm">
                  {selectedViajero.menores.map((m, i) => (
                    <li key={i} className="flex justify-between">
                      {m.nombre} -{" "}
                      {m.autorizado ? (
                        <span className="text-success">Autorizado</span>
                      ) : (
                        <span className="text-warning">Pendiente</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Sin menores</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => emitirPermiso(selectedViajero.id)}
              className="inline-flex items-center gap-2 rounded-md bg-success px-6 py-3 text-sm font-semibold text-success-foreground hover:bg-success/90"
            >
              <CheckCircle2 className="h-4 w-4" /> Emitir permiso de cruce
            </button>
          </div>
        </div>
      )}

      {viajeros.length === 0 && !loading && !selectedViajero && (
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <Inbox className="mx-auto h-12 w-12 opacity-40" />
          <p className="mt-3 text-sm text-muted-foreground">
            Sin viajeros en cola. Presiona "Cargar viajeros en cola".
          </p>
          <p className="font-mono text-[11px] opacity-70">GET /api/viajeros?estado=cola</p>
        </div>
      )}
    </AdminLayout>
  );
}
