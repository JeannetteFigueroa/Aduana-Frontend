export type EstadoCruce = "aprobado" | "pendiente" | "revision" | "rechazado";

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
  riesgo: "bajo" | "medio" | "alto";
  hora: string;
  foto: string;
}

export const viajeros: Viajero[] = [
  { id: "VJ-001", nombre: "Juan Pérez González", documento: "12.345.678-9", nacionalidad: "Chile", vehiculo: "Toyota Hilux", patente: "JKLM-23", origen: "Mendoza, AR", destino: "Santiago, CL", estado: "aprobado", riesgo: "bajo", hora: "08:42", foto: "https://i.pravatar.cc/120?img=12" },
  { id: "VJ-002", nombre: "María Fernanda Soto", documento: "15.789.012-3", nacionalidad: "Argentina", vehiculo: "Bus de pasajeros", patente: "AB-3421", origen: "Mendoza, AR", destino: "Valparaíso, CL", estado: "revision", riesgo: "medio", hora: "08:55", foto: "https://i.pravatar.cc/120?img=47" },
  { id: "VJ-003", nombre: "Carlos Mendoza", documento: "P-7821934", nacionalidad: "Perú", vehiculo: "Camión carga", patente: "TR-9981", origen: "Mendoza, AR", destino: "Rancagua, CL", estado: "pendiente", riesgo: "alto", hora: "09:01", foto: "https://i.pravatar.cc/120?img=33" },
  { id: "VJ-004", nombre: "Ana Lucía Torres", documento: "18.221.554-K", nacionalidad: "Chile", vehiculo: "Auto particular", patente: "FXKL-09", origen: "Mendoza, AR", destino: "Santiago, CL", estado: "aprobado", riesgo: "bajo", hora: "09:12", foto: "https://i.pravatar.cc/120?img=45" },
  { id: "VJ-005", nombre: "Roberto Silva Núñez", documento: "9.998.123-4", nacionalidad: "Chile", vehiculo: "Moto", patente: "MOT-441", origen: "Mendoza, AR", destino: "Los Andes, CL", estado: "rechazado", riesgo: "alto", hora: "09:24", foto: "https://i.pravatar.cc/120?img=68" },
];

export const flujoHorario = [
  { hora: "06:00", entradas: 120, salidas: 80 },
  { hora: "08:00", entradas: 340, salidas: 210 },
  { hora: "10:00", entradas: 580, salidas: 410 },
  { hora: "12:00", entradas: 720, salidas: 540 },
  { hora: "14:00", entradas: 690, salidas: 600 },
  { hora: "16:00", entradas: 510, salidas: 670 },
  { hora: "18:00", entradas: 380, salidas: 520 },
  { hora: "20:00", entradas: 220, salidas: 310 },
];

export const distribucionNacionalidad = [
  { name: "Chile", value: 1840 },
  { name: "Argentina", value: 1320 },
  { name: "Perú", value: 280 },
  { name: "Bolivia", value: 160 },
  { name: "Otros", value: 95 },
];

export const alertas = [
  { id: "AL-001", tipo: "Producto restringido", desc: "Frutas frescas no declaradas — Vehículo FXKL-09", severidad: "alta", hora: "hace 2 min" },
  { id: "AL-002", tipo: "Documento vencido", desc: "Pasaporte caducado — Carlos Mendoza", severidad: "media", hora: "hace 8 min" },
  { id: "AL-003", tipo: "Coincidencia lista", desc: "Patente coincide con alerta INTERPOL", severidad: "alta", hora: "hace 14 min" },
  { id: "AL-004", tipo: "Tiempo excedido", desc: "Vehículo TR-9981 supera 45 min en zona inspección", severidad: "baja", hora: "hace 22 min" },
  { id: "AL-005", tipo: "Sensor", desc: "Cámara cabina 3 sin señal", severidad: "media", hora: "hace 31 min" },
];

export const permisos = [
  { id: "PRM-2026-00451", viajero: "Juan Pérez González", emitido: "11-06-2026 08:45", vence: "11-06-2026 23:59", estado: "vigente" },
  { id: "PRM-2026-00450", viajero: "Ana Lucía Torres", emitido: "11-06-2026 09:15", vence: "11-06-2026 23:59", estado: "vigente" },
  { id: "PRM-2026-00449", viajero: "Roberto Silva Núñez", emitido: "11-06-2026 09:28", vence: "11-06-2026 09:28", estado: "anulado" },
];

export const validaciones = [
  { entidad: "SAG", desc: "Servicio Agrícola y Ganadero", estado: "aprobado", detalle: "Sin productos restringidos declarados" },
  { entidad: "PDI", desc: "Policía de Investigaciones", estado: "aprobado", detalle: "Identidad verificada — sin antecedentes" },
  { entidad: "Aduanas", desc: "Servicio Nacional de Aduanas", estado: "aprobado", detalle: "Declaración de valores conforme" },
  { entidad: "Carabineros", desc: "Verificación vehicular", estado: "aprobado", detalle: "Patente y permiso de circulación al día" },
];
