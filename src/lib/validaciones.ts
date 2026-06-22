import { apiFetch } from "@/lib/api";

export interface Validacion {
  id: string;
  entidad: string;
  desc: string;
  estado: "aprobado" | "pendiente" | "rechazado";
  detalle: string;
}

export async function listarValidaciones(viajeroId: string): Promise<Validacion[]> {
  const data = await apiFetch<any[]>(`/api/validaciones/${viajeroId}`);
  return data.map((v) => ({
    id: v.id.toString(),
    entidad: v.entidad,
    desc: v.descripcion,
    estado: v.estado,
    detalle: v.descripcion,
  }));
}