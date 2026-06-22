import { apiFetch } from "./api";

export interface Vehiculo {
  id: number;
  patente: string;
  marca: string;
  modelo: string;
  color: string;
  anio: number;
  rutDuenio: string;
  nombreDuenio: string;
  estado: "PENDIENTE" | "AUTORIZADO" | "DENEGADO";
}

export async function crearVehiculo(data: {
  patente: string;
  marca: string;
  modelo: string;
  color: string;
  anio: number;
  rutDuenio: string;
  nombreDuenio: string;
}): Promise<Vehiculo> {
  return apiFetch<Vehiculo>("/api/vehiculos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function buscarVehiculo(id: number): Promise<Vehiculo> {
  return apiFetch<Vehiculo>(`/api/vehiculos/${id}`);
}

export async function buscarVehiculoPorPatente(patente: string): Promise<Vehiculo> {
  return apiFetch<Vehiculo>(`/api/vehiculos/patente/${patente}`);
}

export async function listarVehiculos(): Promise<Vehiculo[]> {
  return apiFetch<Vehiculo[]>("/api/vehiculos");
}

export async function autorizarPasoVehiculo(id: number, autorizar: boolean): Promise<Vehiculo> {
  return apiFetch<Vehiculo>(`/api/vehiculos/${id}/autorizar?autorizar=${autorizar}`, {
    method: "POST",
  });
}