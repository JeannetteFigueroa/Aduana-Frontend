/**
 * ============================================================================
 *  Autenticación — Sistema Los Libertadores
 * ============================================================================
 *  Esta capa expone una API estable (`login`, `registerViajero`, `getSession`,
 *  `logout`) que la UI consume. Internamente NO hay usuarios "seed": todo se
 *  delega al microservicio de autenticación.
 *
 *  >>> ENDPOINTS ESPERADOS (Java + MySQL/XAMPP) <<<
 *    POST  /api/auth/login       { usuario, clave }    → { token, session }
 *    POST  /api/auth/registro    { ...datosViajero }   → { token, session }
 *    GET   /api/auth/sesion      (Bearer JWT)          → Session
 *    POST  /api/auth/logout      (Bearer JWT)
 *
 *  La sesión + JWT se guardan en localStorage. Para producción se recomienda
 *  cookie HttpOnly emitida por el backend.
 * ============================================================================
 */

import { apiFetch, setToken } from "./api";

export type Rol = "admin" | "viajero";

export interface Session {
  id: string;
  email: string;
  rol: Rol;
  nombre: string;
  avatar: string;
  rut?: string;
  cargo?: string;
  turno?: string;
}

const STORAGE_KEY = "los_libertadores_session";

function persist(session: Session) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

/**
 * Inicia sesión.
 *  - Admins: usar correo @aduana.cl
 *  - Viajeros: RUT o correo electrónico
 *
 *  Por ahora lanza error indicando que el backend aún no está conectado.
 *  Cuando exista el microservicio, reemplazar el `throw` por la llamada real.
 */
export async function login(identificador: string, clave: string): Promise<Session> {
  // ====== INTEGRACIÓN REAL (descomentar al conectar microservicio) ======
  // const { token, session } = await apiFetch<{ token: string; session: Session }>(
  //   "/api/auth/login",
  //   { method: "POST", body: JSON.stringify({ usuario: identificador, clave }) },
  // );
  // setToken(token);
  // persist(session);
  // return session;

  // STUB temporal — evita romper la UI mientras no hay backend.
  void identificador;
  void clave;
  void apiFetch;
  void setToken;
  throw new Error(
    "Servicio de autenticación no disponible. Inicia el microservicio Java en " +
      (import.meta.env.VITE_API_URL ?? "http://localhost:8080") +
      "/api/auth/login",
  );
}

/**
 * Registra un nuevo viajero.
 */
export async function registerViajero(data: {
  nombre: string;
  email: string;
  rut: string;
  clave: string;
  telefono?: string;
  nacionalidad?: string;
  fechaNacimiento?: string;
}): Promise<Session> {
  // ====== INTEGRACIÓN REAL ======
  // const { token, session } = await apiFetch<{ token: string; session: Session }>(
  //   "/api/auth/registro",
  //   { method: "POST", body: JSON.stringify(data) },
  // );
  // setToken(token);
  // persist(session);
  // return session;

  void data;
  void persist;
  throw new Error("Registro no disponible: el microservicio de auth aún no está conectado.");
}

/** Lee la sesión local. El componente decide si redirigir al /login. */
export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

/** Cierra sesión y limpia tokens locales. */
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  setToken(null);
  // @backend: avisar al servidor con POST /api/auth/logout para invalidar el JWT.
}
