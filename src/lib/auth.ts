/**
 * ============================================================================
 *  AUTENTICACIÓN SIMULADA — Sistema Los Libertadores
 * ============================================================================
 *  Este módulo simula el inicio de sesión con localStorage y usuarios "seed".
 *
 *  >>> CUANDO SE INTEGRE EL BACKEND (Java microservicios + MySQL/XAMPP) <<<
 *  ──────────────────────────────────────────────────────────────────────
 *  Reemplazar las funciones `login`, `register`, `getSession`, `logout`
 *  por llamadas HTTP al microservicio de autenticación. Por ejemplo:
 *
 *      POST  http://localhost:8081/api/auth/login       { usuario, clave }
 *      POST  http://localhost:8081/api/auth/registro    { ...datos }
 *      GET   http://localhost:8081/api/auth/sesion      (con JWT en header)
 *      POST  http://localhost:8081/api/auth/logout
 *
 *  La forma del objeto `Session` debe mantenerse para no romper la UI.
 *  El token JWT se puede seguir guardando en localStorage o en cookie HttpOnly.
 * ============================================================================
 */

export type Rol = "admin" | "viajero";

export interface UsuarioBase {
  id: string;
  email: string;
  clave: string; // ⚠️ MOCK ONLY — el backend debe guardar HASH (bcrypt/argon2)
  rol: Rol;
  nombre: string;
  avatar: string;
  // Campos extra para viajeros
  rut?: string;
  nacionalidad?: string;
  telefono?: string;
  fechaNacimiento?: string;
  // Campos extra para admins
  cargo?: string;
  turno?: string;
}

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
const USERS_KEY = "los_libertadores_users";

/* -------------------------------------------------------------------------- */
/* USUARIOS DEMO (seed) — eliminar al conectar backend                        */
/* -------------------------------------------------------------------------- */
const SEED_USERS: UsuarioBase[] = [
  // ===== ADMINISTRADORES (correo corporativo @aduana.cl) =====
  {
    id: "ADM-001",
    email: "admin@aduana.cl",
    clave: "Admin123!",
    rol: "admin",
    nombre: "Carolina Rodríguez",
    avatar: "https://i.pravatar.cc/120?img=15",
    cargo: "Jefa de turno",
    turno: "Turno A · Mañana",
  },
  {
    id: "ADM-002",
    email: "inspector@aduana.cl",
    clave: "Inspector123!",
    rol: "admin",
    nombre: "Pedro Sánchez",
    avatar: "https://i.pravatar.cc/120?img=53",
    cargo: "Inspector SAG",
    turno: "Turno A · Mañana",
  },
  // ===== VIAJEROS (correo personal o RUT) =====
  {
    id: "VJ-001",
    email: "juan.perez@gmail.com",
    rut: "12.345.678-9",
    clave: "Viajero123!",
    rol: "viajero",
    nombre: "Juan Pérez González",
    avatar: "https://i.pravatar.cc/120?img=12",
    nacionalidad: "Chile",
    telefono: "+56 9 9876 5432",
    fechaNacimiento: "1988-05-12",
  },
  {
    id: "VJ-002",
    email: "maria.soto@hotmail.com",
    rut: "15.789.012-3",
    clave: "Viajero123!",
    rol: "viajero",
    nombre: "María Fernanda Soto",
    avatar: "https://i.pravatar.cc/120?img=47",
    nacionalidad: "Argentina",
    telefono: "+54 261 555 1234",
    fechaNacimiento: "1992-11-03",
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers de almacenamiento (mock — usar API real cuando exista backend)      */
/* -------------------------------------------------------------------------- */
function loadUsers(): UsuarioBase[] {
  if (typeof window === "undefined") return SEED_USERS;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw) as UsuarioBase[];
  } catch {
    return SEED_USERS;
  }
}

function saveUsers(users: UsuarioBase[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toSession(u: UsuarioBase): Session {
  return {
    id: u.id,
    email: u.email,
    rol: u.rol,
    nombre: u.nombre,
    avatar: u.avatar,
    rut: u.rut,
    cargo: u.cargo,
    turno: u.turno,
  };
}

/* -------------------------------------------------------------------------- */
/* API pública del módulo                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Inicia sesión validando contra los usuarios seed.
 * Admins: deben usar correo @aduana.cl
 * Viajeros: pueden usar RUT (con o sin puntos/guion) o correo electrónico
 *
 * @backend  reemplazar por POST /api/auth/login
 */
export function login(identificador: string, clave: string): Session {
  const users = loadUsers();
  const id = identificador.trim().toLowerCase();
  const rutNormalizado = id.replace(/\./g, "").replace(/-/g, "");

  const user = users.find((u) => {
    const emailMatch = u.email.toLowerCase() === id;
    const rutMatch =
      u.rut && u.rut.replace(/\./g, "").replace(/-/g, "").toLowerCase() === rutNormalizado;
    return emailMatch || rutMatch;
  });

  if (!user) throw new Error("Usuario no encontrado");
  if (user.clave !== clave) throw new Error("Contraseña incorrecta");

  const session = toSession(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

/**
 * Registra un nuevo viajero. Los admins se gestionan internamente, no se registran aquí.
 *
 * @backend  reemplazar por POST /api/auth/registro
 */
export function registerViajero(data: {
  nombre: string;
  email: string;
  rut: string;
  clave: string;
  telefono?: string;
  nacionalidad?: string;
  fechaNacimiento?: string;
}): Session {
  const users = loadUsers();
  const emailLow = data.email.trim().toLowerCase();

  // Validación: viajeros NO pueden usar dominio corporativo
  if (emailLow.endsWith("@aduana.cl")) {
    throw new Error("El dominio @aduana.cl está reservado para personal institucional");
  }
  if (users.some((u) => u.email.toLowerCase() === emailLow)) {
    throw new Error("Este correo ya está registrado");
  }
  if (users.some((u) => u.rut === data.rut)) {
    throw new Error("Este RUT ya está registrado");
  }

  const nuevo: UsuarioBase = {
    id: `VJ-${String(users.length + 1).padStart(3, "0")}`,
    email: emailLow,
    clave: data.clave,
    rol: "viajero",
    nombre: data.nombre,
    avatar: `https://i.pravatar.cc/120?u=${encodeURIComponent(emailLow)}`,
    rut: data.rut,
    telefono: data.telefono,
    nacionalidad: data.nacionalidad ?? "Chile",
    fechaNacimiento: data.fechaNacimiento,
  };

  saveUsers([...users, nuevo]);
  const session = toSession(nuevo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

/** @backend  reemplazar por GET /api/auth/sesion con JWT */
export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

/** @backend  reemplazar por POST /api/auth/logout */
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/** Credenciales demo expuestas para pintar en la pantalla de login */
export const DEMO_CREDENTIALS = {
  admin: [
    { email: "admin@aduana.cl", clave: "Admin123!" },
    { email: "inspector@aduana.cl", clave: "Inspector123!" },
  ],
  viajero: [
    { email: "juan.perez@gmail.com", rut: "12.345.678-9", clave: "Viajero123!" },
    { email: "maria.soto@hotmail.com", rut: "15.789.012-3", clave: "Viajero123!" },
  ],
};
