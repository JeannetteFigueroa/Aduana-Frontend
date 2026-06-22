import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { Bell, Lock, User, Globe, Monitor, Save, LogOut } from "lucide-react";
import { toast } from "sonner";
import { changePassword, type Session } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin/configuracion")({
  head: () => ({ meta: [{ title: "Configuración de la cuenta" }] }),
  component: Configuracion,
});

/**
 * Configuración del operador (perfil, seguridad, preferencias).
 *
 * @backend  Los `toast.success(...)` y el cambio de estado local se reemplazan por:
 *           PUT  /api/usuarios/{id}            (datos del perfil)
 *           POST /api/auth/cambio-clave        (cambio de contraseña)
 *           PUT  /api/usuarios/{id}/preferencias  (notificaciones, idioma, tema)
 */
function Configuracion() {
  const navigate = useNavigate();
  const { session, logout: logoutAuth } = useAuth();
  const [tab, setTab] = useState<"perfil" | "seguridad" | "notif" | "preferencias">("perfil");

  if (!session) return null;

  const cerrarSesion = () => {
    logoutAuth();
    toast.success("Sesión cerrada");
    navigate({ to: "/" });
  };

  return (
    <AdminLayout
      title="Configuración de la cuenta"
      subtitle="Gestiona tu perfil, seguridad y preferencias del sistema"
    >
      <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Menú lateral */}
        <aside className="rounded-xl border bg-card p-3 shadow-sm">
          {[
            { id: "perfil", label: "Mi perfil", icon: User },
            { id: "seguridad", label: "Seguridad", icon: Lock },
            { id: "notif", label: "Notificaciones", icon: Bell },
            { id: "preferencias", label: "Preferencias", icon: Monitor },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                tab === id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
          <div className="my-2 border-t" />
          <button
            onClick={cerrarSesion}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </aside>

        {/* Contenido */}
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          {tab === "perfil" && <PerfilTab session={session} />}
          {tab === "seguridad" && <SeguridadTab />}
          {tab === "notif" && <NotificacionesTab />}
          {tab === "preferencias" && <PreferenciasTab />}
        </section>
      </div>
    </AdminLayout>
  );
}

function PerfilTab({ session }: { session: Session }) {
  const rolACargo = (rol: string) => {
    const map: Record<string, string> = {
      ADMIN: "Administrador",
      FUNCIONARIO: "Funcionario",
      VIAJERO: "Viajero",
    };
    return map[rol] ?? rol;
  };

  const [form, setForm] = useState({
    nombre: session.nombre,
    email: session.email,
    cargo: session.cargo ?? rolACargo(session.rol),
    turno: session.turno ?? "",
    telefono: "+56 2 2345 6789",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Perfil actualizado", { description: "Cambios guardados correctamente." });
      }}
    >
      <div className="flex flex-wrap items-center gap-4 border-b pb-5">
        <img
          src={session.avatar}
          alt=""
          className="h-20 w-20 rounded-full border-4 border-primary/20"
        />
        <div>
          <h3 className="text-lg font-bold">{session.nombre}</h3>
          <p className="text-sm text-muted-foreground">
            {session.cargo ?? rolACargo(session.rol)} · {form.turno}
          </p>
          <button type="button" className="mt-2 text-xs font-medium text-primary hover:underline">
            Cambiar foto
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          value={form.nombre}
          onChange={(v) => setForm({ ...form, nombre: v })}
        />
        <Field label="Correo institucional" value={form.email} disabled />
        <Field label="Cargo" value={form.cargo} onChange={(v) => setForm({ ...form, cargo: v })} />
        <Field label="Turno" value={form.turno} onChange={(v) => setForm({ ...form, turno: v })} />
        <Field
          label="Teléfono"
          value={form.telefono}
          onChange={(v) => setForm({ ...form, telefono: v })}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Save className="h-4 w-4" /> Guardar cambios
        </button>
      </div>
    </form>
  );
}

function SeguridadTab() {
  const [form, setForm] = useState({ actual: "", nueva: "", conf: "" });
  const [saving, setSaving] = useState(false);

  const cambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.nueva.length < 8) {
      return toast.error("La nueva contraseña debe tener al menos 8 caracteres");
    }
    if (form.nueva !== form.conf) return toast.error("Las contraseñas no coinciden");

    setSaving(true);

    try {
      await changePassword(form.actual, form.nueva);
      toast.success("Contraseña actualizada");
      setForm({ actual: "", nueva: "", conf: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo actualizar la contraseña");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={cambiarPassword}>
      <h3 className="font-semibold">Cambiar contraseña</h3>
      <p className="text-sm text-muted-foreground">
        Tu sesión se mantendrá activa luego del cambio.
      </p>
      <div className="mt-4 grid max-w-md gap-4">
        <Field
          label="Contraseña actual"
          type="password"
          value={form.actual}
          onChange={(v) => setForm({ ...form, actual: v })}
        />
        <Field
          label="Nueva contraseña"
          type="password"
          value={form.nueva}
          onChange={(v) => setForm({ ...form, nueva: v })}
        />
        <Field
          label="Repetir nueva contraseña"
          type="password"
          value={form.conf}
          onChange={(v) => setForm({ ...form, conf: v })}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Actualizando..." : "Actualizar contraseña"}
        </button>
      </div>
    </form>
  );
}

function NotificacionesTab() {
  const [pref, setPref] = useState({
    alertas: true,
    turnos: true,
    reportes: false,
    email: true,
    push: true,
  });
  return (
    <div>
      <h3 className="font-semibold">Notificaciones</h3>
      <p className="text-sm text-muted-foreground">
        Elige qué eventos quieres recibir y por qué medio.
      </p>
      <div className="mt-4 divide-y">
        {[
          ["alertas", "Alertas operacionales en tiempo real"],
          ["turnos", "Cambios o asignaciones de turno"],
          ["reportes", "Reportes diarios automáticos"],
          ["email", "Recibir por correo electrónico"],
          ["push", "Notificaciones del navegador"],
        ].map(([key, label]) => (
          <Toggle
            key={key}
            label={label}
            value={pref[key as keyof typeof pref]}
            onChange={(v) => setPref({ ...pref, [key]: v })}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => toast.success("Preferencias guardadas")}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Guardar preferencias
        </button>
      </div>
    </div>
  );
}

function PreferenciasTab() {
  const savedPref = localStorage.getItem("preferencias-sistema");
  const [pref, setPref] = useState(() =>
    savedPref
      ? JSON.parse(savedPref)
      : { idioma: "Español (Chile)", tema: "claro", densidad: "cómoda" },
  );

  useEffect(() => {
    if (pref.tema === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [pref.tema]);

  const aplicar = () => {
    localStorage.setItem("preferencias-sistema", JSON.stringify(pref));
    if (pref.tema === "oscuro") {
      document.documentElement.classList.add("dark");
    } else if (pref.tema === "claro") {
      document.documentElement.classList.remove("dark");
    } else if (pref.tema === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    }
    toast.success("Preferencias aplicadas");
  };
  return (
    <div>
      <h3 className="font-semibold">Preferencias del sistema</h3>
      <div className="mt-4 grid max-w-md gap-4">
        <div>
          <label className="text-sm font-medium">
            <Globe className="mr-1.5 inline h-3.5 w-3.5" /> Idioma
          </label>
          <select
            value={pref.idioma}
            onChange={(e) => setPref({ ...pref, idioma: e.target.value })}
            className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
          >
            <option>Español (Chile)</option>
            <option>English</option>
            <option>Português</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Tema</label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {["claro", "oscuro", "auto"].map((t) => (
              <button
                key={t}
                onClick={() => setPref({ ...pref, tema: t })}
                className={`rounded-md border px-3 py-2 text-sm capitalize ${pref.tema === t ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Densidad de visualización</label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {["compacta", "cómoda", "amplia"].map((t) => (
              <button
                key={t}
                onClick={() => setPref({ ...pref, densidad: t })}
                className={`rounded-md border px-3 py-2 text-sm capitalize ${pref.densidad === t ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={aplicar}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 disabled:bg-muted disabled:text-muted-foreground"
      />
    </label>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-primary" : "bg-muted"}`}
        aria-pressed={value}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}
