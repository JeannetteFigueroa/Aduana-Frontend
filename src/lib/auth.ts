/**
 * ============================================================================
 *  Autenticación — Sistema Los Libertadores
 * ============================================================================
 *  Esta capa expone una API estable (`login`, `registerViajero`, `getSession`,
 *  `logout`) que la UI consume.
 *
 *  >>> ENDPOINTS ESPERADOS (Java + MySQL/XAMPP) <<<
 *    POST  /api/auth/login       { usuario, clave }    → { token, session }
 *    POST  /api/auth/registro    { ...datosViajero }   → { token, session }
 *    GET   /api/auth/sesion      (Bearer JWT)          → Session
 *    POST  /api/auth/logout      (Bearer JWT)
 *
 *  >>> USUARIOS DEMO (eliminar al conectar microservicio) <<<
 *    Mientras no exista el backend, esta capa acepta dos credenciales locales
 *    para poder probar la UI:
 *       Admin    →  admin@aduana.cl          /  admin1234
 *       Viajero  →  viajero@correo.cl        /  viajero1234
 *    Al eliminar el bloque `DEMO_USERS` + el `if (demo) { ... }`, solo quedará
 *    la llamada real a `apiFetch("/api/auth/login", ...)`.
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

/* ===================== INICIO: usuarios DEMO (BORRAR luego) ================= */
type DemoUser = Session & { clave: string };
const DEMO_USERS: DemoUser[] = [
  {
    id: "ADM-001",
    email: "admin@aduana.cl",
    rol: "admin",
    nombre: "Operador Demo",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=Operador%20Demo&backgroundColor=1e40af",
    cargo: "Operador de turno",
    turno: "Mañana",
    clave: "admin1234",
  },
  {
    id: "VIA-001",
    email: "viajero@correo.cl",
    rol: "viajero",
    nombre: "Viajero Demo",
    avatar:
      "https://api.dicebear.com/7.x/initials/svg?seed=Viajero%20Demo&backgroundColor=0ea5e9",
    rut: "11.111.111-1",
    clave: "viajero1234",
  },
];

/** Devuelve el demo user si las credenciales calzan, o null. */
function matchDemo(identificador: string, clave: string): Session | null {
  const id = identificador.trim().toLowerCase();
  const u = DEMO_USERS.find(
    (x) =>
      x.clave === clave && (x.email.toLowerCase() === id || x.rut?.toLowerCase() === id),
  );
  if (!u) return null;
  const { clave: _c, ...session } = u;
  return session;
}
/* ===================== FIN: usuarios DEMO (BORRAR luego) =================== */

/**
 * Inicia sesión.
 *  - Admins: usar correo @aduana.cl
 *  - Viajeros: RUT o correo electrónico
 */
export async function login(identificador: string, clave: string): Promise<Session> {
  // 1) Intento con usuarios DEMO — quitar este bloque al conectar backend.
  const demo = matchDemo(identificador, clave);
  if (demo) {
    setToken(`demo-${demo.id}`);
    persist(demo);
    return demo;
  }

  // 2) INTEGRACIÓN REAL — descomenta al conectar el microservicio Java.
  // const { token, session } = await apiFetch<{ token: string; session: Session }>(
  //   "/api/auth/login",
  //   { method: "POST", body: JSON.stringify({ usuario: identificador, clave }) },
  // );
  // setToken(token);
  // persist(session);
  // return session;

  void apiFetch;
  throw new Error("Credenciales inválidas. Revisa el correo/RUT y la contraseña.");
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

  // STUB local — crea sesión "viajero" sin persistir realmente en BD.
  const session: Session = {
    id: `VIA-${Date.now().toString().slice(-4)}`,
    email: data.email,
    rol: "viajero",
    nombre: data.nombre,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.nombre)}&backgroundColor=0ea5e9`,
    rut: data.rut,
  };
  setToken(`demo-${session.id}`);
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
  // @backend: avisar al servidor con POST /api/auth/logout para invalidar el JWT.
}
