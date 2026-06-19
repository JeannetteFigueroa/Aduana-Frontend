/**
 * ============================================================================
 *  Tipos compartidos del dominio.
 * ============================================================================
 *  Antes este archivo contenía datos "seed" para pintar la UI.
 *  Ahora exporta SOLO los tipos para que cada pantalla los consuma del backend.
 *
 *  >>> CUANDO SE INTEGRE EL BACKEND <<<
 *  Cada listado proviene de un endpoint REST distinto:
 *    GET /api/viajeros               → Viajero[]
 *    GET /api/alertas                → Alerta[]
 *    GET /api/permisos               → Permiso[]
 *    GET /api/validaciones/{id}      → Validacion[]
 *    GET /api/reportes/flujo-horario → PuntoFlujo[]
 *    GET /api/reportes/nacionalidad  → SliceNacionalidad[]
 * ============================================================================
 */

export type EstadoCruce = "aprobado" | "pendiente" | "revision" | "rechazado";
export type Severidad = "alta" | "media" | "baja";
export type Riesgo = "bajo" | "medio" | "alto";

export interface Viajero {
  id: string;
  nombre: string;
  documento: string;
  nacionalidad: string;
  vehiculo: string;
  patente: string;
  origen: string;
  destino: string;
  estado: EstadoCruce;
  riesgo: Riesgo;
  hora: string;
  foto: string;
}

export interface Alerta {
  id: string;
  tipo: string;
  desc: string;
  severidad: Severidad;
  hora: string;
}

export interface Permiso {
  id: string;
  viajero: string;
  emitido: string;
  vence: string;
  estado: "vigente" | "anulado" | "vencido";
}

export interface Validacion {
  entidad: string;
  desc: string;
  estado: "aprobado" | "pendiente" | "rechazado";
  detalle: string;
}

export interface PuntoFlujo {
  hora: string;
  entradas: number;
  salidas: number;
}

export interface SliceNacionalidad {
  name: string;
  value: number;
}

/* Arrays vacíos por defecto — el backend los rellena en runtime. */
export const viajeros: Viajero[] = [];
export const alertas: Alerta[] = [];
export const permisos: Permiso[] = [];
export const validaciones: Validacion[] = [];
export const flujoHorario: PuntoFlujo[] = [];
export const distribucionNacionalidad: SliceNacionalidad[] = [];
