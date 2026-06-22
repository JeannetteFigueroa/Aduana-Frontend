import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mountain, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { registerViajero } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Registro de viajero — Los Libertadores" }] }),
  component: RegistroPage,
});

/**
 * Registro de nuevas cuentas de viajero.
 *
 * @backend  reemplazar el `try { registerViajero(...) }` por:
 *           await fetch('http://localhost:8081/api/auth/registro', { method: 'POST', body: JSON.stringify(form) })
 *           El microservicio debe validar unicidad de email/RUT y devolver JWT.
 */
function RegistroPage() {
  const navigate = useNavigate();
  const { setSession, logout } = useAuth();
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    rut: "",
    clave: "",
    claveConf: "",
    acepta: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.clave.length < 8) return setError("La contraseña debe tener al menos 8 caracteres");
    if (form.clave !== form.claveConf) return setError("Las contraseñas no coinciden");
    if (!form.acepta) return setError("Debes aceptar los términos y condiciones");

    try {
      const session = await registerViajero({
        nombres: form.nombres,
        apellidos: form.apellidos,
        email: form.email,
        rut: form.rut,
        clave: form.clave,
      });
      setSession(session);
      setOk(true);
      navigate({ to: "/viajero" });
    } catch (err) {
      logout();
      setError(err instanceof Error ? err.message : "Error al crear cuenta");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="gradient-hero p-6 text-white sm:p-8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-white/15 backdrop-blur">
                <Mountain className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold sm:text-2xl">Crear cuenta de viajero</h1>
                <p className="text-sm text-white/80">Registro gratuito — Los Libertadores</p>
              </div>
            </div>
          </div>

          {ok ? (
            <div className="p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-xl font-bold">¡Cuenta creada exitosamente!</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Redirigiendo al portal del viajero...
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5 p-6 sm:p-8">
              <div>
                <h3 className="font-semibold">Datos personales</h3>
                <p className="text-xs text-muted-foreground">
                  Información necesaria para validar tu identidad.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nombres *"
                  value={form.nombres}
                  onChange={(v) => set("nombres", v)}
                  required
                />
                <Field
                  label="Apellidos *"
                  value={form.apellidos}
                  onChange={(v) => set("apellidos", v)}
                  required
                />
                <Field
                  label="RUT / DNI *"
                  value={form.rut}
                  onChange={(v) => set("rut", v)}
                  placeholder="12.345.678-9"
                  required
                />
                <Field
                  label="Correo electrónico *"
                  type="email"
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  placeholder="tucorreo@mail.com"
                  required
                />
              </div>

              <div className="border-t pt-5">
                <h3 className="font-semibold">Seguridad</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Contraseña *"
                    type="password"
                    value={form.clave}
                    onChange={(v) => set("clave", v)}
                    required
                  />
                  <Field
                    label="Repetir contraseña *"
                    type="password"
                    value={form.claveConf}
                    onChange={(v) => set("claveConf", v)}
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Mínimo 8 caracteres. Usa letras, números y símbolos.
                </p>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.acepta}
                  onChange={(e) => set("acepta", e.target.checked)}
                  className="mt-1 rounded"
                />
                <span className="text-muted-foreground">
                  Acepto los{" "}
                  <a href="#" className="font-medium text-primary hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="#" className="font-medium text-primary hover:underline">
                    política de tratamiento de datos
                  </a>{" "}
                  del Servicio Nacional de Aduanas.
                </span>
              </label>

              {error && (
                <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <Link
                  to="/"
                  className="rounded-md border bg-card px-5 py-2.5 text-center text-sm font-medium hover:bg-muted"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Crear cuenta
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
      />
    </label>
  );
}
