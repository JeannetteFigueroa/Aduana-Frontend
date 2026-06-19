/**
 * ============================================================================
 *  Cliente HTTP — Sistema Los Libertadores
 * ============================================================================
 *  Apunta a los microservicios Java/Spring que correrán en XAMPP + MySQL.
 *  Para producción cambia VITE_API_URL en `.env` (ej: https://api.aduana.cl).
 *
 *  Mapa propuesto de microservicios:
 *    8081  → auth-service       (login, registro, JWT, recuperación)
 *    8082  → viajero-service    (datos personales, documentos, menores)
 *    8083  → declaracion-service (SAG, Aduanas)
 *    8084  → permiso-service    (emisión, QR, validaciones)
 *    8085  → operador-service   (panel admin, reportes, alertas)
 *
 *  Usar SIEMPRE este helper para no duplicar lógica de errores/JWT.
 * ============================================================================
 */

export const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const TOKEN_KEY = "los_libertadores_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export interface ApiError extends Error {
  status: number;
  payload?: unknown;
}

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : undefined;

  if (!res.ok) {
    const err = new Error(
      (data as { message?: string })?.message ?? `Error ${res.status}`,
    ) as ApiError;
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data as T;
}
