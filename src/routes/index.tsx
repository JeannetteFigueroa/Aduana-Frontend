import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Cloud, Lock, User, Mountain, ShieldCheck, Smartphone, Eye, EyeOff, AlertCircle } from "lucide-react";
import { login, DEMO_CREDENTIALS, getSession } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sistema Integrado Los Libertadores — Aduanas Chile" },
      { name: "description", content: "Plataforma de gestión integrada del paso fronterizo Los Libertadores." },
    ],
  }),
  component: LoginPage,
});

/**
 * Pantalla de login con dos pestañas (Operador / Viajero).
 *
 * @backend  el handler `submit` debe reemplazarse por una llamada al microservicio
 *           de autenticación. El resto de la UI no cambia.
 */
function LoginPage() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<"admin" | "viajero">("viajero");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [showClave, setShowClave] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión activa, redirige automáticamente
  useEffect(() => {
    const s = getSession();
    if (s) navigate({ to: s.rol === "admin" ? "/admin" : "/viajero" });
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación de dominio según el rol seleccionado (regla de negocio)
    if (tipo === "admin" && !usuario.toLowerCase().endsWith("@aduana.cl")) {
      setError("Los operadores deben ingresar con un correo @aduana.cl");
      return;
    }

    setLoading(true);
    // ⏱️ Simulación de latencia de red — quitar al conectar API
    setTimeout(() => {
      try {
        const session = login(usuario, clave);
        if (tipo === "admin" && session.rol !== "admin") {
          setError("Esta cuenta no tiene permisos de operador");
          setLoading(false);
          return;
        }
        navigate({ to: session.rol === "admin" ? "/admin" : "/viajero" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al iniciar sesión");
        setLoading(false);
      }
    }, 600);
  };

  const fillDemo = (email: string, c: string) => {
    setUsuario(email);
    setClave(c);
    setError(null);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Panel izquierdo institucional */}
      <div className="relative hidden gradient-hero text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-white/15 backdrop-blur">
            <Mountain className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/70">Gobierno de Chile</div>
            <div className="text-sm font-semibold">Aduanas · SAG · PDI</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Sistema operativo
          </div>
          <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
            Sistema Integrado<br />
            <span className="text-white/80">Los Libertadores</span>
          </h2>
          <p className="max-w-md text-white/80">
            Control fronterizo Chile · Argentina. Gestión unificada de viajeros,
            declaraciones y validaciones interinstitucionales.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { k: "12.8K", v: "Cruces hoy" },
              { k: "98.2%", v: "Validación OK" },
              { k: "6", v: "Cabinas activas" },
            ].map((s) => (
              <div key={s.v} className="rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur">
                <div className="text-2xl font-bold">{s.k}</div>
                <div className="text-xs text-white/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-2"><Cloud className="h-4 w-4" /> 7°C · Despejado · Andes</div>
          <div>v3.2.1 · 11 Jun 2026</div>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Mountain className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Sistema Integrado</div>
              <div className="text-xs text-muted-foreground">Los Libertadores</div>
            </div>
          </div>

          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-muted-foreground">Selecciona tu tipo de cuenta para continuar.</p>

          {/* Selector tipo de cuenta */}
          <div className="mt-6 grid grid-cols-2 rounded-lg border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => { setTipo("viajero"); setError(null); }}
              className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors ${
                tipo === "viajero" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="h-4 w-4" /> Viajero
            </button>
            <button
              type="button"
              onClick={() => { setTipo("admin"); setError(null); }}
              className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors ${
                tipo === "admin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Operador
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">
                {tipo === "admin" ? "Correo institucional" : "RUT o correo electrónico"}
              </span>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder={tipo === "admin" ? "operador@aduana.cl" : "12.345.678-9 o tucorreo@mail.com"}
                  className="h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium">Contraseña</span>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  type={showClave ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-md border bg-background pl-9 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowClave((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:bg-muted"
                  aria-label={showClave ? "Ocultar" : "Mostrar"}
                >
                  {showClave ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Recordarme</label>
              <a href="#" className="font-medium text-primary hover:underline">¿Olvidó su clave?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar al panel"}
            </button>
          </form>

          {tipo === "viajero" && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="font-semibold text-primary hover:underline">
                Regístrate aquí
              </Link>
            </p>
          )}

          {/* Credenciales demo — eliminar al conectar backend real */}
          <div className="mt-6 rounded-lg border border-dashed bg-muted/30 p-3 text-xs">
            <div className="mb-2 font-semibold text-muted-foreground">
              🧪 Credenciales de prueba ({tipo === "admin" ? "Operador" : "Viajero"})
            </div>
            <div className="space-y-1.5">
              {(tipo === "admin" ? DEMO_CREDENTIALS.admin : DEMO_CREDENTIALS.viajero).map((c) => (
                <button
                  key={c.email}
                  type="button"
                  onClick={() => fillDemo(c.email, c.clave)}
                  className="flex w-full items-center justify-between rounded border bg-card px-2.5 py-1.5 text-left hover:border-primary hover:bg-primary/5"
                >
                  <span className="truncate font-mono">{c.email}</span>
                  <span className="ml-2 shrink-0 text-muted-foreground">{c.clave}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © 2026 Servicio Nacional de Aduanas · Demo frontend por Marco Carrasco y Jeannette Figueroa
          </p>
        </div>
      </div>
    </div>
  );
}
