/**
 * ============================================================================
 *  Autenticación — Sistema Los Libertadores
 * ============================================================================
 *  Esta capa expone una API estable (`login`, `registerViajero`, `getSession`,
 *  `logout`) que la UI consume.
 *
 *  >>> ENDPOINTS ESPERADOS (Java + Spring Boot) <<<
 *    POST  /api/auth/login       { email, password }  → { token, email, rol }
 *    POST  /api/auth/register    { rut, nombres, apellidos, email, password }
 *                               → { token, email, rol }
 *    GET   /api/auth/me          (Bearer JWT)         → { email, rol, nombres, apellidos }
 *    POST  /api/auth/change-password (Bearer JWT)
 *    GET   /api/auth/validate    (Bearer JWT)         → { valid, email }
 * ============================================================================
 */

import { apiFetch, setToken } from "./api";

export type Rol = "ADMIN" | "FUNCIONARIO" | "VIAJERO";

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

interface LoginResponse {
  token: string;
  email: string;
  rol: string;
}

interface UserProfile {
  email: string;
  rol: string;
  nombres: string;
  apellidos: string;
}

interface RegisterResponse {
  token: string;
  email: string;
  rol: string;
}

/**
 * Inicia sesión contra el backend real.
 *  - Admins/Funcionarios: usar correo @aduana.cl
 *  - Viajeros: correo electrónico
 */
export async function login(identificador: string, clave: string): Promise<Session> {
  const response = await apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: identificador,
      password: clave,
    }),
  });

  setToken(response.token);

  const profile = await apiFetch<UserProfile>("/api/auth/me");

  const session: Session = {
    id: profile.email,
    email: profile.email,
    rol: profile.rol as Rol,
    nombre: `${profile.nombres} ${profile.apellidos}`,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(profile.nombres),
  };

  persist(session);

  return session;
}

/**
 * Registra un nuevo viajero contra el backend real.
 */
export async function registerViajero(data: {
  rut: string;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  nacionalidad?: string;
}): Promise<Session> {
  const response = await apiFetch<RegisterResponse>(
    "/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify({
        rut: data.rut,
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        password: data.password,
      }),
    },
  );

  setToken(response.token);

  const profile = await apiFetch<UserProfile>("/api/auth/me");

  const session: Session = {
    id: profile.email,
    email: profile.email,
    rol: profile.rol as Rol,
    nombre: `${profile.nombres} ${profile.apellidos}`,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=" + encodeURIComponent(profile.nombres),
    rut: data.rut,
  };

  persist(session);

  return session;
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
}
