import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { CheckCircle2, ShieldCheck, Inbox, FileText, Upload, FileUp, X } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/validaciones")({
  head: () => ({ meta: [{ title: "Validaciones de documentos" }] }),
  component: Validaciones,
});

type Documento = {
  id: string;
  viajeroId: string;
  tipo: string;
  nombre: string;
  estado: "pendiente" | "subido" | "validado" | "rechazado";
  observacion?: string;
  tamano?: number;
};

function Validaciones() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(false);
  const [observacion, setObservacion] = useState("");

  const cargar = async () => {
    setLoading(true);
    try {
      const todos = await apiFetch<Documento[]>("/api/viajeros?estado=cola");
      const docsPorViajero = await Promise.all(
        todos.map(async (v: any) => {
          try {
            const docs = await apiFetch<Documento[]>(`/api/documentos/${v.id || v.email}`);
            return docs.map((d) => ({ ...d, viajeroId: v.id || v.email, viajeroNombre: `${v.nombres} ${v.apellidos}` }));
          } catch {
            return [];
          }
        })
      );
      setDocumentos(docsPorViajero.flat());
    } catch {
      toast.error("Error al cargar viajeros");
    } finally {
      setLoading(false);
    }
  };

  const validarDocumento = async (id: string) => {
    try {
      await apiFetch(`/api/documentos/${id}?estado=validado`, { method: "PUT" });
      setDocumentos((d) => d.map((x) => (x.id === id ? { ...x, estado: "validado" } : x)));
      toast.success("Documento validado");
    } catch {
      setDocumentos((d) => d.map((x) => (x.id === id ? { ...x, estado: "validado" } : x)));
      toast.success("Documento validado (simulado)");
    }
  };

  const rechazarDocumento = async (id: string) => {
    if (!observacion) return toast.error("Escribe una observación");
    try {
      await apiFetch(`/api/documentos/${id}?estado=rechazado&observacion=${encodeURIComponent(observacion)}`, {
        method: "PUT",
      });
      setDocumentos((d) => d.map((x) => (x.id === id ? { ...x, estado: "rechazado", observacion } : x)));
      toast.error("Documento rechazado");
    } catch {
      setDocumentos((d) => d.map((x) => (x.id === id ? { ...x, estado: "rechazado", observacion } : x)));
      toast.error("Documento rechazado (simulado)");
    }
  };

  const pendientes = documentos.filter((d) => d.estado === "subido");

  return (
    <AdminLayout title="Validaciones de documentos" subtitle="Revisar documentos subidos por viajeros">
      <div className="mb-4 flex justify-end">
        <button
          onClick={cargar}
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Cargar documentos pendientes"}
        </button>
      </div>

      {pendientes.length === 0 ? (
        <div className="rounded-xl border bg-card p-8 text-center">
          <Inbox className="mx-auto h-12 w-12 opacity-40" />
          <p className="mt-3 text-sm text-muted-foreground">Sin documentos pendientes de revisión</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendientes.map((d) => (
            <div key={d.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold">{d.nombre}</h4>
                  <p className="text-sm text-muted-foreground">
                    Viajero: {d.viajeroNombre} - Tipo: {d.tipo}
                  </p>
                </div>
                <StatusBadge status={d.estado} />
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Observación (rechazo)"
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  className="flex-1 rounded-md border px-3 py-1.5 text-sm"
                />
                <button
                  onClick={() => validarDocumento(d.id)}
                  className="rounded-md bg-success px-3 py-1.5 text-xs font-semibold text-success-foreground hover:bg-success/90"
                >
                  Validar
                </button>
                <button
                  onClick={() => rechazarDocumento(d.id)}
                  className="rounded-md bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground hover:bg-destructive/90"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}