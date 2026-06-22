import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type ComponentType } from "react";
import { toast } from "sonner";
import {
  Mountain,
  Bell,
  FileText,
  MapPin,
  QrCode,
  CheckCircle2,
  Clock,
  ChevronRight,
  User,
  ArrowRight,
  Home as HomeIcon,
  ScanLine,
  Upload,
  FileUp,
  Baby,
  Car,
  Plus,
  X,
  AlertTriangle,
  Trash2,
  Menu,
  LogOut,
  ShieldCheck,
  Calendar,
  Camera,
  Settings,
  Lock,
  Bell as BellIcon,
  Globe,
  IdCard,
  FileCheck,
  ScanFace,
  Save,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/api";
import { changePassword, type Session } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";
import { crearVehiculo, type Vehiculo, autorizarPasoVehiculo, listarVehiculos, buscarVehiculoPorPatente } from "@/lib/vehiculos";
import { ProtectedRoute } from "@/components/protected-route";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/viajero")({
  head: () => ({ meta: [{ title: "Portal Viajero — Aduanas Chile" }] }),
  component: () => (
    <ProtectedRoute requiredRole="VIAJERO">
      <AppViajero />
    </ProtectedRoute>
  ),
});

type Tab =
  | "home"
  | "datos"
  | "declarar"
  | "documentos"
  | "biometria"
  | "menores"
  | "vehiculo"
  | "permiso"
  | "perfil";

const navItems: { id: Tab; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Inicio", icon: HomeIcon },
  { id: "datos", label: "Datos personales", icon: User },
  { id: "declarar", label: "Declaración SAG", icon: FileText },
  { id: "documentos", label: "Documentos", icon: FileUp },
  { id: "biometria", label: "Validación facial", icon: ScanFace },
  { id: "vehiculo", label: "Vehículo", icon: Car },
  { id: "menores", label: "Menores de edad", icon: Baby },
  { id: "permiso", label: "Mi permiso", icon: QrCode },
  { id: "perfil", label: "Mi cuenta", icon: Settings },
];

/**
 * Portal del viajero — flujo completo: datos → documentos → biometría → declaración → vehículo → permiso.
 *
 * @backend  Cada panel marca con un comentario @backend dónde reemplazar la simulación
 *           por llamadas a los microservicios. El layout/navegación se queda igual.
 */
function AppViajero() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("home");
  const [open, setOpen] = useState(false);

  if (!session) return null;

  const go = (t: Tab) => {
    setTab(t);
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar desktop / drawer mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Mountain className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Portal Viajero</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">Los Libertadores</div>
          </div>
          <ThemeToggle className="text-sidebar-foreground hover:bg-sidebar-accent" />
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />
      )}

      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-card px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="rounded-md p-2 hover:bg-muted lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">
              {navItems.find((n) => n.id === tab)?.label}
            </h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              Portal de autoatención del viajero
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="relative rounded-md p-2 hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <button
              onClick={() => go("perfil")}
              className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 hover:bg-muted"
            >
              <img src={session.avatar} className="h-7 w-7 rounded-full" alt="" />
              <div className="hidden text-xs sm:block">
                <div className="font-medium leading-tight">{session.nombre}</div>
                <div className="text-muted-foreground">Viajero</div>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {tab === "home" && <HomePanel go={go} session={session} />}
          {tab === "datos" && <DatosPanel session={session} />}
          {tab === "declarar" && <DeclararPanel />}
          {tab === "documentos" && <DocumentosPanel />}
          {tab === "biometria" && <BiometriaPanel />}
          {tab === "menores" && <MenoresPanel />}
          {tab === "vehiculo" && <VehiculoPanel />}
          {tab === "permiso" && <PermisoPanel session={session} />}
          {tab === "perfil" && <PerfilPanel session={session} />}
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-card/95 backdrop-blur lg:hidden">
        {(
          [
            ["home", HomeIcon, "Inicio"],
            ["declarar", FileText, "Declarar"],
            ["documentos", FileUp, "Docs"],
            ["permiso", QrCode, "Permiso"],
            ["perfil", Settings, "Cuenta"],
          ] as const
        ).map(([id, Icon, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium",
              tab === id ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ====================== UI helpers ====================== */
function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>{children}</div>;
}
function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50 disabled:bg-muted disabled:text-muted-foreground"
      />
    </label>
  );
}

/* ====================== HOME ====================== */
function HomePanel({ go, session }: { go: (t: Tab) => void; session: Session }) {
  return (
    <div className="space-y-6">
      <div className="gradient-hero relative overflow-hidden rounded-2xl p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-white/70">Bienvenido</div>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{session.nombre}</h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            Prepara tu cruce fronterizo en minutos. Declara, sube documentos y obtén tu permiso QR.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Santiago, CL</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-semibold">Mendoza, AR</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ActionCard
          onClick={() => go("datos")}
          icon={User}
          title="Datos personales"
          desc="Información del viajero"
          color="bg-primary/10 text-primary"
        />
        <ActionCard
          onClick={() => go("documentos")}
          icon={FileUp}
          title="Subir documentos"
          desc="Pasaporte, licencia, seguro"
          color="bg-info/10 text-info"
        />
        <ActionCard
          onClick={() => go("biometria")}
          icon={ScanFace}
          title="Validación facial"
          desc="Verifica tu identidad"
          color="bg-success/10 text-success"
        />
        <ActionCard
          onClick={() => go("declarar")}
          icon={FileText}
          title="Declaración SAG"
          desc="Productos vegetales/animales"
          color="bg-warning/20 text-warning-foreground"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Estado del trámite</h3>
            <span className="rounded-full bg-warning/20 px-2.5 py-0.5 text-xs font-semibold text-warning-foreground">
              En preparación
            </span>
          </div>
          <ol className="mt-4 space-y-3">
            {/* @backend  GET /api/viajeros/{id}/tramite  → marcar como `done: true` cada paso completado. */}
            {[
              ["Datos personales", false, "datos"],
              ["Documentos cargados", false, "documentos"],
              ["Validación facial", false, "biometria"],
              ["Declaración SAG", false, "declarar"],
              ["Datos vehículo", false, "vehiculo"],
              ["Permiso emitido", false, "permiso"],
            ].map(([label, done, target], i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                    done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className={cn("text-sm", done ? "font-medium" : "text-muted-foreground")}>
                  {label as string}
                </span>
                {!done && (
                  <button
                    onClick={() => go(target as Tab)}
                    className="ml-auto text-xs font-semibold text-primary hover:underline"
                  >
                    Completar →
                  </button>
                )}
              </li>
            ))}
          </ol>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Información del paso</h3>
          </div>
          {/* @backend  GET /api/paso/estado  → tiempo de espera, cabinas activas, clima */}
          <dl className="mt-3 space-y-2 text-sm">
            <Row k="Tiempo espera" v="—" />
            <Row k="Cabinas activas" v="—" />
            <Row k="Clima" v="—" />
            <Row k="Horario" v="24 hrs" />
          </dl>
        </Card>
      </div>
    </div>
  );
}
function ActionCard({
  onClick,
  icon: Icon,
  title,
  desc,
  color,
}: {
  onClick: () => void;
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

/* ====================== DATOS PERSONALES (formulario completo) ====================== */
/**
 * @backend  PUT /api/viajeros/{id}  con todos los datos del formulario.
 */
function DatosPanel({ session }: { session: Session }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    rut: session.rut ?? "",
    email: session.email,
    telefono: "",
    nacionalidad: "Chile",
    fechaNacimiento: "",
    sexo: "Masculino",
    estadoCivil: "Soltero/a",
    direccion: "",
    ciudad: "",
    profesion: "",
    contactoEmergenciaNombre: "",
    contactoEmergenciaTel: "",
    motivoViaje: "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const guardarDatos = async () => {
    if (!form.rut.trim() || !form.nombres.trim() || !form.apellidos.trim()) {
      return toast.error("Completa RUT, nombres y apellidos");
    }

    setSaving(true);

    try {
      let viajero: { id?: number; rut?: string } | null = null;

      try {
        viajero = await apiFetch<{ id: number; rut: string }>(
          `/api/viajeros/rut/${encodeURIComponent(form.rut.trim())}`,
        );
      } catch {
        viajero = null;
      }

      const payload = {
        rut: form.rut.trim(),
        nombres: form.nombres.trim(),
        apellidos: form.apellidos.trim(),
        documento: form.rut.trim(),
        nacionalidad: form.nacionalidad,
        origen: "Santiago, CL",
        destino: "Mendoza, AR",
        estado: "ACTIVO",
        riesgo: "BAJO",
      };

      const saved = viajero?.id
        ? await apiFetch(`/api/viajeros/${viajero.id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
          })
        : await apiFetch("/api/viajeros", {
            method: "POST",
            body: JSON.stringify(payload),
          });

      toast.success("Datos guardados", {
        description: saved?.id
          ? `Viajero actualizado #${saved.id}`
          : "Viajero creado correctamente",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudieron guardar los datos");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <SectionTitle
        title="Datos personales"
        sub="Información del viajero — usada para validar tu identidad en frontera."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void guardarDatos();
        }}
        className="space-y-4"
      >
        <Card>
          <h3 className="font-semibold">Información básica</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Nombres *" value={form.nombres} onChange={(v) => set("nombres", v)} />
            <Field
              label="Apellidos *"
              value={form.apellidos}
              onChange={(v) => set("apellidos", v)}
            />
            <Field label="RUT / DNI *" value={form.rut} onChange={(v) => set("rut", v)} />
            <Field
              label="Fecha de nacimiento *"
              type="date"
              value={form.fechaNacimiento}
              onChange={(v) => set("fechaNacimiento", v)}
            />
            <div>
              <label className="text-sm font-medium">Sexo</label>
              <select
                value={form.sexo}
                onChange={(e) => set("sexo", e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              >
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
                <option>Prefiero no decir</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Nacionalidad</label>
              <select
                value={form.nacionalidad}
                onChange={(e) => set("nacionalidad", e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              >
                <option>Chile</option>
                <option>Argentina</option>
                <option>Perú</option>
                <option>Bolivia</option>
                <option>Brasil</option>
                <option>Otra</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Estado civil</label>
              <select
                value={form.estadoCivil}
                onChange={(e) => set("estadoCivil", e.target.value)}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              >
                <option>Soltero/a</option>
                <option>Casado/a</option>
                <option>Divorciado/a</option>
                <option>Viudo/a</option>
                <option>Conviviente civil</option>
              </select>
            </div>
            <Field
              label="Profesión / Oficio"
              value={form.profesion}
              onChange={(v) => set("profesion", v)}
            />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold">Contacto</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Correo electrónico" type="email" value={form.email} disabled />
            <Field label="Teléfono *" value={form.telefono} onChange={(v) => set("telefono", v)} />
            <Field label="Dirección" value={form.direccion} onChange={(v) => set("direccion", v)} />
            <Field label="Ciudad" value={form.ciudad} onChange={(v) => set("ciudad", v)} />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold">Contacto de emergencia</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Nombre"
              value={form.contactoEmergenciaNombre}
              onChange={(v) => set("contactoEmergenciaNombre", v)}
            />
            <Field
              label="Teléfono"
              value={form.contactoEmergenciaTel}
              onChange={(v) => set("contactoEmergenciaTel", v)}
            />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold">Motivo del viaje</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              "Turismo",
              "Trabajo",
              "Estudios",
              "Visita familiar",
              "Tránsito",
              "Negocios",
              "Salud",
              "Otro",
            ].map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => set("motivoViaje", m)}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm transition-colors",
                  form.motivoViaje === m
                    ? "border-primary bg-primary/5 font-semibold"
                    : "hover:bg-muted",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Guardando..." : "Guardar datos"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ====================== DECLARACIÓN SAG ====================== */
const categorias = [
  { id: "frutas", label: "Frutas frescas", emoji: "🍎" },
  { id: "carnes", label: "Carnes / embutidos", emoji: "🥩" },
  { id: "vegetales", label: "Vegetales", emoji: "🥬" },
  { id: "lacteos", label: "Lácteos / huevos", emoji: "🥛" },
  { id: "semillas", label: "Semillas / plantas", emoji: "🌱" },
  { id: "miel", label: "Miel y derivados", emoji: "🍯" },
  { id: "frutos", label: "Frutos secos", emoji: "🥜" },
  { id: "ninguno", label: "No transporto nada", emoji: "🚫" },
];

/**
 * @backend  POST /api/sag/declaracion  { categorias, items[] }
 *           → devuelve folio + estado (aprobada / requiere inspección / rechazada).
 */
function DeclararPanel() {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<string[]>([]);
  const [items, setItems] = useState<
    { id: number; nombre: string; cantidad: string; origen: string }[]
  >([]);

  const toggle = (id: string) => {
    if (id === "ninguno") {
      setSel(["ninguno"]);
      setItems([]);
      return;
    }
    setSel((s) => {
      const next = s.filter((x) => x !== "ninguno");
      return next.includes(id) ? next.filter((x) => x !== id) : [...next, id];
    });
  };

  const enviar = () => {
    toast.loading("Enviando declaración al SAG...", { id: "sag" });
    setTimeout(() => {
      toast.success("Declaración recibida — Folio SAG-2026-08841", {
        id: "sag",
        description: "Validada por inspector. Sin productos restringidos.",
      });
      setStep(3);
    }, 1600);
  };

  return (
    <div>
      <SectionTitle
        title="Declaración SAG digital"
        sub="Servicio Agrícola y Ganadero · Obligatorio según Ley 18.755"
      />

      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {["Categorías", "Detalle productos", "Confirmación"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                step > i + 1
                  ? "bg-success text-success-foreground"
                  : step === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "whitespace-nowrap text-sm",
                step === i + 1 ? "font-semibold" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
            {i < 2 && <div className="hidden h-px w-12 bg-border sm:block" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h3 className="font-semibold">¿Qué productos transportas?</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona todas las categorías aplicables.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categorias.map((c) => {
              const on = sel.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                  )}
                >
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-center text-sm font-medium">{c.label}</span>
                  {on && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      SELECCIONADO
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              disabled={sel.length === 0}
              onClick={() => {
                if (sel.includes("ninguno")) {
                  enviar();
                  return;
                }
                setStep(2);
              }}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Continuar →
            </button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Detalle de productos</h3>
                <p className="text-sm text-muted-foreground">
                  Agrega cada producto con cantidad aproximada.
                </p>
              </div>
              <button
                onClick={() =>
                  setItems([...items, { id: Date.now(), nombre: "", cantidad: "", origen: "" }])
                }
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {items.length === 0 && (
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Sin productos agregados. Pulsa{" "}
                  <span className="font-medium text-foreground">"Agregar"</span> para comenzar.
                </div>
              )}
              {items.map((it) => (
                <div
                  key={it.id}
                  className="grid grid-cols-1 gap-2 rounded-md border bg-background p-3 sm:grid-cols-[2fr_1fr_1fr_auto]"
                >
                  <input
                    defaultValue={it.nombre}
                    placeholder="Ej: Manzanas Gala"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  />
                  <input
                    defaultValue={it.cantidad}
                    placeholder="Cantidad (kg / un)"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  />
                  <input
                    defaultValue={it.origen}
                    placeholder="País origen"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
                  />
                  <button
                    onClick={() => setItems(items.filter((x) => x.id !== it.id))}
                    className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <div className="rounded-lg border bg-warning/10 p-4 text-sm text-warning-foreground">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                La no declaración o declaración falsa constituye infracción sancionada con multas
                hasta <strong>50 UTM</strong> y decomiso de productos.
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => setStep(1)}
              className="rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted"
            >
              ← Volver
            </button>
            <button
              onClick={enviar}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Enviar declaración
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-xl font-bold">Declaración enviada</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Folio <span className="font-mono font-semibold text-foreground">SAG-2026-08841</span>
          </p>
          <div className="mx-auto mt-5 max-w-md rounded-md border bg-success/5 p-4 text-left text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado</span>
              <span className="font-semibold text-success">Aprobada</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted-foreground">Productos</span>
              <span className="font-medium">{items.length || "Sin productos"}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted-foreground">Inspector</span>
              <span className="font-medium">M. Sánchez</span>
            </div>
          </div>
          <button
            onClick={() => {
              setStep(1);
              setSel([]);
              setItems([]);
            }}
            className="mt-5 rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted"
          >
            Nueva declaración
          </button>
        </Card>
      )}
    </div>
  );
}

/* ====================== DOCUMENTOS ====================== */
type DocId =
  | "carnet"
  | "pasaporte"
  | "antecedentes"
  | "licencia"
  | "padron"
  | "seguro"
  | "permisoCirc";
type Doc = {
  id: DocId;
  nombre: string;
  descripcion: string;
  obligatorio: boolean;
  icon: ComponentType<{ className?: string }>;
  aceptaTipos: string;
  estado: "pendiente" | "subido" | "validado" | "rechazado";
  file?: { nombre: string; tamano: number; preview?: string };
};

const DOCS_BASE: Doc[] = [
  {
    id: "carnet",
    nombre: "Cédula de identidad / DNI",
    descripcion: "Frontal y reverso",
    obligatorio: true,
    icon: IdCard,
    aceptaTipos: "image/*,.pdf",
    estado: "pendiente",
  },
  {
    id: "pasaporte",
    nombre: "Pasaporte",
    descripcion: "Página de datos personales",
    obligatorio: true,
    icon: IdCard,
    aceptaTipos: "image/*,.pdf",
    estado: "pendiente",
  },
  {
    id: "antecedentes",
    nombre: "Certificado de antecedentes",
    descripcion: "Vigencia máxima 30 días",
    obligatorio: true,
    icon: FileCheck,
    aceptaTipos: ".pdf",
    estado: "pendiente",
  },
  {
    id: "licencia",
    nombre: "Licencia de conducir",
    descripcion: "Vigente y clase apropiada",
    obligatorio: false,
    icon: IdCard,
    aceptaTipos: "image/*,.pdf",
    estado: "pendiente",
  },
  {
    id: "padron",
    nombre: "Padrón del vehículo",
    descripcion: "Documento de propiedad",
    obligatorio: false,
    icon: FileText,
    aceptaTipos: "image/*,.pdf",
    estado: "pendiente",
  },
  {
    id: "permisoCirc",
    nombre: "Permiso de circulación",
    descripcion: "Vigente al año en curso",
    obligatorio: false,
    icon: FileText,
    aceptaTipos: "image/*,.pdf",
    estado: "pendiente",
  },
  {
    id: "seguro",
    nombre: "Seguro responsabilidad civil internacional",
    descripcion: "Cobertura para Chile y Argentina",
    obligatorio: false,
    icon: ShieldCheck,
    aceptaTipos: ".pdf",
    estado: "pendiente",
  },
];

/**
 * Panel de carga de documentos.
 *
 * @backend  Cada `subirArchivo` debe convertirse en:
 *           POST /api/documentos  (multipart/form-data, field name="archivo", + viajeroId, tipoDoc)
 *           Luego un microservicio de OCR/validación marca el documento como "validado" o "rechazado"
 *           y se actualiza vía WebSocket o polling.
 */
function DocumentosPanel() {
  const [docs, setDocs] = useState<Doc[]>(DOCS_BASE);
  const inputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const triggerFile = (id: DocId) => inputsRef.current[id]?.click();

  const handleFile = (id: DocId, file: File) => {
    // Lectura local del archivo SOLO para mostrar preview en la UI (no se sube a ningún servidor todavía).
    // @backend: aquí se reemplaza por POST /api/documentos (multipart) usando el File real.
    const finish = (preview?: string) => {
      setDocs((d) =>
        d.map((x) =>
          x.id === id
            ? { ...x, estado: "subido", file: { nombre: file.name, tamano: file.size, preview } }
            : x,
        ),
      );
      toast.success(`"${file.name}" cargado`, { description: "En revisión por el operador." });

      // 🎬 Simulación de validación automática a los 2.5s
      setTimeout(() => {
        setDocs((d) => d.map((x) => (x.id === id ? { ...x, estado: "validado" } : x)));
        toast.success(`${DOCS_BASE.find((dd) => dd.id === id)?.nombre} validado`, {
          description: "Documento aprobado por el sistema.",
        });
      }, 2500);
    };

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => finish(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      finish();
    }
  };

  const eliminar = (id: DocId) => {
    setDocs((d) =>
      d.map((x) => (x.id === id ? { ...x, estado: "pendiente", file: undefined } : x)),
    );
    toast.info("Documento eliminado");
  };

  const obligatorios = docs.filter((d) => d.obligatorio);
  const completos = obligatorios.filter((d) => d.estado === "validado").length;

  return (
    <div>
      <SectionTitle
        title="Documentos del viajero"
        sub="Sube tus documentos en PDF o imagen (máx. 10 MB por archivo)."
      />

      <div className="mb-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold">Progreso de documentos obligatorios</div>
            <div className="text-xs text-muted-foreground">
              {completos} de {obligatorios.length} validados
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">
            {Math.round((completos / obligatorios.length) * 100)}%
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(completos / obligatorios.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {docs.map((d) => {
          const Icon = d.icon;
          return (
            <Card key={d.id} className="!p-4">
              {/* Input file oculto — se dispara al hacer click en "Subir" */}
              <input
                type="file"
                accept={d.aceptaTipos}
                className="hidden"
                ref={(el) => {
                  inputsRef.current[d.id] = el;
                }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(d.id, f);
                  e.target.value = ""; // permite re-subir el mismo archivo
                }}
              />
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
                <div
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-lg",
                    d.estado === "validado"
                      ? "bg-success/15 text-success"
                      : d.estado === "subido"
                        ? "bg-info/15 text-info"
                        : d.estado === "rechazado"
                          ? "bg-destructive/15 text-destructive"
                          : "bg-muted text-muted-foreground",
                  )}
                >
                  {d.file?.preview ? (
                    <img
                      src={d.file.preview}
                      alt=""
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{d.nombre}</span>
                    {d.obligatorio && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                        OBLIGATORIO
                      </span>
                    )}
                    <Badge estado={d.estado} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {d.descripcion}
                    {d.file && (
                      <span className="ml-2">
                        · {d.file.nombre} · {(d.file.tamano / 1024).toFixed(0)} KB
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {d.estado === "pendiente" || d.estado === "rechazado" ? (
                    <button
                      onClick={() => triggerFile(d.id)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <Upload className="h-3.5 w-3.5" /> Subir
                    </button>
                  ) : (
                    <>
                      {d.file?.preview && (
                        <button
                          onClick={() => window.open(d.file?.preview, "_blank")}
                          className="grid h-9 w-9 place-items-center rounded-md border hover:bg-muted"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => triggerFile(d.id)}
                        className="grid h-9 w-9 place-items-center rounded-md border hover:bg-muted"
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => eliminar(d.id)}
                        className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-4 bg-info/5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-info" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Privacidad de tus datos</p>
            <p className="mt-1">
              Tus documentos solo serán consultados por las autoridades correspondientes (PDI, SAG,
              Aduanas) durante el proceso de cruce. Se almacenan cifrados y se eliminan según la
              política de retención del servicio.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Badge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    validado: "bg-success/15 text-success",
    subido: "bg-info/15 text-info",
    pendiente: "bg-muted text-muted-foreground",
    rechazado: "bg-destructive/15 text-destructive",
  };
  return (
    <span
      className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", map[estado])}
    >
      {estado}
    </span>
  );
}

/* ====================== VALIDACIÓN FACIAL (cámara real + simulación de match) ====================== */
/**
 * Validación facial — única pantalla que mantiene la SIMULACIÓN del match
 * porque no usaremos un servicio real de biometría en este proyecto.
 *
 * - Cámara FRONTAL del dispositivo (`facingMode: 'user'`).
 * - Tras "analizar", el resultado (score) es simulado localmente.
 *
 * @backend  (Si en el futuro se integra biometría real:)
 *   POST /api/biometria/captura  { imagenBase64 }
 *   → { match: boolean, score: number, vivienciaOk: boolean }
 */
function BiometriaPanel() {
  type Estado = "inicial" | "camara" | "analizando" | "ok" | "fallo";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [estado, setEstado] = useState<Estado>("inicial");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const abrirCamara = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setEstado("camara");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No fue posible acceder a la cámara frontal.";
      setError(msg);
      toast.error("Cámara no disponible", { description: msg });
    }
  };

  const capturarYAnalizar = () => {
    setEstado("analizando");
    toast.loading("Analizando rostro...", { id: "bio" });
    // 🎬 SIMULACIÓN del match — se mantiene a propósito (no hay servicio biométrico real).
    setTimeout(() => {
      const s = Math.floor(95 + Math.random() * 5);
      setScore(s);
      setEstado("ok");
      stopCamera();
      toast.success(`Validación facial exitosa — ${s}% match`, {
        id: "bio",
        description: "Tu identidad ha sido confirmada (simulación).",
      });
    }, 1800);
  };

  const reintentar = () => {
    stopCamera();
    setEstado("inicial");
    setScore(null);
    setError(null);
  };

  useEffect(() => stopCamera, []);

  return (
    <div>
      <SectionTitle
        title="Validación facial"
        sub="Cámara frontal · el resultado del match es simulado en esta versión."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-slate-900">
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
            <div className="pointer-events-none absolute inset-8 rounded-full border-4 border-dashed border-white/30" />
            {estado === "analizando" && (
              <div className="pointer-events-none absolute inset-8 animate-pulse rounded-full border-4 border-primary shadow-[0_0_40px_rgba(59,130,246,0.5)]" />
            )}

            {estado === "inicial" && (
              <div className="absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white/70">
                <div>
                  <ScanFace className="mx-auto h-16 w-16" />
                  <p className="mt-3 text-sm">Pulsa "Iniciar" para activar la cámara frontal</p>
                </div>
              </div>
            )}
            {estado === "ok" && (
              <div className="absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white">
                <div>
                  <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
                  <p className="mt-3 text-lg font-bold">¡Verificación exitosa!</p>
                  <p className="text-sm opacity-80">Match: {score}% (simulado)</p>
                </div>
              </div>
            )}
            {estado === "fallo" && (
              <div className="absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white">
                <div>
                  <X className="mx-auto h-16 w-16 text-red-400" />
                  <p className="mt-3 text-lg font-bold">No fue posible verificar</p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              {error}
            </div>
          )}

          <div className="mt-5 flex justify-center gap-2">
            {estado === "inicial" && (
              <button
                onClick={abrirCamara}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Camera className="h-4 w-4" /> Iniciar validación
              </button>
            )}
            {estado === "camara" && (
              <button
                onClick={capturarYAnalizar}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <ScanFace className="h-4 w-4" /> Capturar y analizar
              </button>
            )}
            {(estado === "ok" || estado === "fallo" || estado === "camara") && (
              <button
                onClick={reintentar}
                className="rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Repetir
              </button>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <h4 className="font-semibold">Antes de empezar</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>· Asegúrate de estar en un lugar bien iluminado.</li>
              <li>· Retira lentes oscuros, gorros o accesorios.</li>
              <li>· Mira directamente a la cámara.</li>
              <li>· Permite el acceso a la cámara cuando el navegador lo solicite.</li>
            </ul>
          </Card>
          <Card className="bg-info/5">
            <div className="flex items-start gap-2 text-info">
              <ShieldCheck className="mt-0.5 h-4 w-4" />
              <div className="text-sm">
                <p className="font-semibold text-foreground">Tu rostro está seguro</p>
                <p className="mt-1 text-muted-foreground">
                  En esta versión la comparación es simulada y la imagen no se envía a ningún
                  servidor.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ====================== MENORES ====================== */
function MenoresPanel() {
  const [menores, setMenores] = useState<
    {
      id: number;
      nombre: string;
      rut: string;
      fecha: string;
      parentesco: string;
      autorizado: boolean;
    }[]
  >([]);
  // @backend  GET /api/viajeros/{id}/menores  → poblar la lista al montar el componente.
  const [form, setForm] = useState({ nombre: "", rut: "", fecha: "", parentesco: "Hijo/a" });

  const agregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.rut) return toast.error("Completa los campos obligatorios");
    setMenores([...menores, { id: Date.now(), ...form, autorizado: false }]);
    toast.success("Menor agregado", {
      description: "Sube el permiso notarial para autorizar el cruce.",
    });
    setForm({ nombre: "", rut: "", fecha: "", parentesco: "Hijo/a" });
  };

  const autorizar = (id: number) => {
    toast.loading("Validando autorización notarial...", { id: `m${id}` });
    setTimeout(() => {
      setMenores((m) => m.map((x) => (x.id === id ? { ...x, autorizado: true } : x)));
      toast.success("Permiso de menor validado", {
        id: `m${id}`,
        description: "Notaría verificada con éxito.",
      });
    }, 1400);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <SectionTitle
          title="Menores de edad acompañantes"
          sub="Todo menor que cruce la frontera requiere autorización notarial vigente."
        />

        <div className="space-y-3">
          {menores.map((m) => (
            <Card key={m.id} className="!p-4">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Baby className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{m.nombre}</span>
                    {m.autorizado ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                        <CheckCircle2 className="h-3 w-3" /> Autorizado
                      </span>
                    ) : (
                      <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[11px] font-semibold text-warning-foreground">
                        Falta autorización
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 grid gap-x-4 text-xs text-muted-foreground sm:grid-cols-3">
                    <span>RUT: {m.rut}</span>
                    <span>Nac: {m.fecha || "—"}</span>
                    <span>{m.parentesco}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!m.autorizado && (
                    <button
                      onClick={() => autorizar(m.id)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <Upload className="h-3.5 w-3.5" /> Subir permiso
                    </button>
                  )}
                  <button
                    onClick={() => setMenores(menores.filter((x) => x.id !== m.id))}
                    className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <h3 className="font-semibold">Agregar menor</h3>
          <form onSubmit={agregar} className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field
              label="Nombre completo *"
              value={form.nombre}
              onChange={(v) => setForm({ ...form, nombre: v })}
            />
            <Field
              label="RUT / Doc. identidad *"
              value={form.rut}
              onChange={(v) => setForm({ ...form, rut: v })}
            />
            <Field
              label="Fecha de nacimiento"
              type="date"
              value={form.fecha}
              onChange={(v) => setForm({ ...form, fecha: v })}
            />
            <div>
              <label className="block text-sm font-medium">Parentesco</label>
              <select
                value={form.parentesco}
                onChange={(e) => setForm({ ...form, parentesco: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              >
                <option>Hijo/a</option>
                <option>Sobrino/a</option>
                <option>Nieto/a</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Agregar menor
              </button>
            </div>
          </form>
        </Card>
      </div>

      <Card className="bg-info/5">
        <div className="flex items-center gap-2 text-info">
          <ShieldCheck className="h-4 w-4" />
          <h4 className="font-semibold">Requisitos para menores</h4>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· Cédula o pasaporte del menor vigente.</li>
          <li>· Permiso notarial firmado por ambos padres si viaja con un solo padre o tercero.</li>
          <li>· Resolución judicial en caso de tuición.</li>
          <li>· Acta de defunción si uno de los padres ha fallecido.</li>
          <li>· El permiso tiene una validez máxima de 30 días.</li>
        </ul>
      </Card>
    </div>
  );
}

/* ====================== VEHÍCULO ====================== */
function VehiculoPanel() {
  const [form, setForm] = useState({
    patente: "",
    marca: "",
    modelo: "",
    color: "",
    anio: 2020,
    rutDuenio: "",
    nombreDuenio: "",
  });
  const [loading, setLoading] = useState(false);
  const [vehiculoGuardado, setVehiculoGuardado] = useState<Vehiculo | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const v = await crearVehiculo(form);
      setVehiculoGuardado(v);
      toast.success("Vehículo registrado", {
        description: `Patente ${v.patente} guardada correctamente.`,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al registrar vehículo");
    } finally {
      setLoading(false);
    }
  };

  const buscar = async () => {
    if (!form.patente) return;
    try {
      const v = await buscarVehiculoPorPatente(form.patente);
      setVehiculoGuardado(v);
      setForm({
        ...form,
        patente: v.patente,
        marca: v.marca,
        modelo: v.modelo,
        color: v.color,
        anio: v.anio,
        rutDuenio: v.rutDuenio,
        nombreDuenio: v.nombreDuenio,
      });
      toast.success("Vehículo encontrado");
    } catch {
      toast.error("Vehículo no encontrado");
    }
  };

  const autorizar = async () => {
    if (!vehiculoGuardado) return;
    try {
      await autorizarPasoVehiculo(vehiculoGuardado.id, true);
      toast.success("Cruce APROBADO ✓", {
        description: "Permiso emitido. Diríjase a cabina 2.",
        duration: 6000,
      });
    } catch {
      toast.error("No se pudo autorizar el paso");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <SectionTitle
          title="Datos del vehículo"
          sub="Información necesaria para autorizar el cruce vehicular."
        />
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Patente *"
            value={form.patente}
            onChange={(v) => setForm({ ...form, patente: v })}
          />
          <Field label="Marca" value={form.marca} onChange={(v) => setForm({ ...form, marca: v })} />
          <Field
            label="Modelo"
            value={form.modelo}
            onChange={(v) => setForm({ ...form, modelo: v })}
          />
          <Field label="Color" value={form.color} onChange={(v) => setForm({ ...form, color: v })} />
          <Field
            label="Año"
            type="number"
            value={form.anio.toString()}
            onChange={(v) => setForm({ ...form, anio: parseInt(v) || 2020 })}
          />
          <Field
            label="RUT Dueño"
            value={form.rutDuenio}
            onChange={(v) => setForm({ ...form, rutDuenio: v })}
          />
          <Field
            label="Nombre Dueño"
            value={form.nombreDuenio}
            onChange={(v) => setForm({ ...form, nombreDuenio: v })}
          />
          <div className="sm:col-span-2 flex gap-2">
            <button
              type="button"
              onClick={buscar}
              className="rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Buscar por patente
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar vehículo"}
            </button>
          </div>
        </form>
        {vehiculoGuardado && (
          <div className="mt-4 rounded-lg border border-dashed bg-success/5 p-4">
            <div className="font-medium">Estado: {vehiculoGuardado.estado}</div>
            {vehiculoGuardado.estado === "PENDIENTE" && (
              <button
                onClick={autorizar}
                className="mt-2 rounded-md bg-success px-4 py-2 text-sm font-medium text-success-foreground hover:bg-success/90"
              >
                Autorizar paso
              </button>
            )}
          </div>
        )}
      </Card>

      <Card>
        <h4 className="font-semibold">Resumen</h4>
        <dl className="mt-3 space-y-2 text-sm">
          <Row k="Patente" v={form.patente} />
          <Row k="Vehículo" v={`${form.marca} ${form.modelo}`} />
          <Row k="Color" v={form.color || "—"} />
          <Row k="Estado" v={vehiculoGuardado?.estado || "—"} />
        </dl>
      </Card>
    </div>
  );
}

/* ====================== PERMISO ====================== */
/**
 * @backend  GET /api/viajeros/{id}/permiso  →
 *   { codigo, qr, estado, viajero, vehiculo, emitido, vence, validaciones }
 *   Si no hay permiso emitido todavía, mostrar el placeholder.
 */
function PermisoPanel({ session }: { session: Session }) {
  type Permiso = { codigo: string; vehiculo: string; emitido: string; vence: string };
  // Por ahora no se emite ningún permiso (no hay backend) — se muestra el estado vacío.
  // @backend  reemplazar por useQuery → GET /api/viajeros/{id}/permiso
  const [permiso] = useState<Permiso | null>(null);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        {!permiso ? (
          <div className="grid place-items-center rounded-xl border-2 border-dashed border-muted bg-muted/20 p-10 text-center text-muted-foreground">
            <QrCode className="h-12 w-12 opacity-40" />
            <p className="mt-3 text-sm font-medium text-foreground">
              Aún no tienes un permiso emitido
            </p>
            <p className="mt-1 text-xs">
              Completa todos los pasos del trámite para generar tu permiso QR de cruce.
            </p>
            <p className="mt-3 font-mono text-[11px] opacity-70">
              GET /api/viajeros/{session.id}/permiso
            </p>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Permiso de cruce
                </div>
                <div className="font-mono text-lg font-bold">{permiso.codigo}</div>
              </div>
              <span className="rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground">
                AUTORIZADO
              </span>
            </div>
            <div className="my-5 grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="mx-auto grid h-44 w-44 place-items-center rounded-lg bg-white sm:mx-0">
                <QrCode className="h-40 w-40 text-foreground" strokeWidth={1} />
              </div>
              <dl className="grid gap-y-1.5 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Viajero</dt>
                  <dd className="font-semibold">{session.nombre}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">RUT</dt>
                  <dd className="font-medium">{session.rut ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Vehículo</dt>
                  <dd className="font-medium">{permiso.vehiculo}</dd>
                </div>
              </dl>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-primary/20 pt-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Emitido</div>
                <div className="font-medium">{permiso.emitido}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Vence</div>
                <div className="font-medium">{permiso.vence}</div>
              </div>
            </div>
          </div>
        )}
        {permiso && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Upload className="h-4 w-4 rotate-180" /> Descargar PDF
            </button>
            <button
              onClick={() => toast.info("Mostrando QR para escaneo en cabina")}
              className="flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-muted"
            >
              <ScanLine className="h-4 w-4" /> Escanear en cabina
            </button>
          </div>
        )}
      </Card>

      <Card className="bg-warning/10">
        <div className="flex items-center gap-2 text-warning-foreground">
          <Calendar className="h-4 w-4" />
          <h4 className="font-semibold">Recuerda</h4>
        </div>
        <p className="mt-2 text-sm">
          Tu permiso es válido solo durante la fecha indicada. Después deberás generar uno nuevo.
        </p>
      </Card>
    </div>
  );
}

/* ====================== PERFIL / CONFIGURACIÓN DE CUENTA ====================== */
/**
 * @backend  PUT /api/viajeros/{id}             (datos perfil)
 *           POST /api/auth/cambio-clave        (seguridad)
 *           PUT /api/viajeros/{id}/preferencias
 */
function PerfilPanel({ session }: { session: Session }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sub, setSub] = useState<"perfil" | "seguridad" | "notif" | "preferencias">("perfil");

  const cerrar = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate({ to: "/" });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
      {/* Tarjeta usuario */}
      <div className="space-y-4">
        <Card className="text-center">
          <img
            src={session.avatar}
            alt=""
            className="mx-auto h-24 w-24 rounded-full border-4 border-primary/20"
          />
          <h3 className="mt-3 text-lg font-bold">{session.nombre}</h3>
          <p className="text-sm font-medium text-foreground">
            {session.rut ?? "RUT no registrado"}
          </p>
          <p className="text-sm text-muted-foreground">{session.email}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
            <CheckCircle2 className="h-3.5 w-3.5" /> Identidad verificada
          </div>
        </Card>

        <Card className="!p-2">
          {[
            { id: "perfil", label: "Mi perfil", icon: User },
            { id: "seguridad", label: "Seguridad", icon: Lock },
            { id: "notif", label: "Notificaciones", icon: BellIcon },
            { id: "preferencias", label: "Preferencias", icon: Globe },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSub(id as typeof sub)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                sub === id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
          <button
            onClick={cerrar}
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </Card>
      </div>

      <Card>
        {sub === "perfil" && <PerfilSub session={session} />}
        {sub === "seguridad" && <SeguridadSub />}
        {sub === "notif" && <NotifSub />}
        {sub === "preferencias" && <PrefSub />}
      </Card>
    </div>
  );
}

function PerfilSub({ session }: { session: Session }) {
  const [form, setForm] = useState({
    nombre: session.nombre,
    email: session.email,
    rut: session.rut ?? "",
    telefono: "",
    direccion: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Datos actualizados");
      }}
    >
      <h3 className="font-semibold">Información del perfil</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          value={form.nombre}
          onChange={(v) => setForm({ ...form, nombre: v })}
        />
        <Field label="RUT / DNI" value={form.rut || "No registrado"} disabled />
        <Field label="Correo electrónico" value={form.email} disabled />
        <Field
          label="Teléfono"
          value={form.telefono}
          onChange={(v) => setForm({ ...form, telefono: v })}
        />
        <div className="sm:col-span-2">
          <Field
            label="Dirección"
            value={form.direccion}
            onChange={(v) => setForm({ ...form, direccion: v })}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4" /> Guardar
        </button>
      </div>
    </form>
  );
}

function SeguridadSub() {
  const [form, setForm] = useState({ actual: "", nueva: "", conf: "" });
  const [saving, setSaving] = useState(false);

  const cambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.nueva.length < 8) return toast.error("Mínimo 8 caracteres");
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
      <div className="mt-5 flex justify-end">
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

function NotifSub() {
  const [p, setP] = useState({
    alertas: true,
    recordatorios: true,
    promos: false,
    email: true,
    push: true,
  });
  return (
    <div>
      <h3 className="font-semibold">Notificaciones</h3>
      <div className="mt-3 divide-y">
        {[
          ["alertas", "Alertas sobre el estado de mi cruce"],
          ["recordatorios", "Recordatorios de documentos por vencer"],
          ["promos", "Novedades y promociones"],
          ["email", "Recibir por correo electrónico"],
          ["push", "Notificaciones del navegador"],
        ].map(([k, l]) => (
          <Toggle
            key={k}
            label={l}
            value={p[k as keyof typeof p]}
            onChange={(v) => setP({ ...p, [k]: v })}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => toast.success("Preferencias guardadas")}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}

function PrefSub() {
  const [p, setP] = useState({ idioma: "Español (Chile)", tema: "claro" });
  return (
    <div>
      <h3 className="font-semibold">Preferencias</h3>
      <div className="mt-4 grid max-w-md gap-4">
        <div>
          <label className="text-sm font-medium">
            <Globe className="mr-1.5 inline h-3.5 w-3.5" /> Idioma
          </label>
          <select
            value={p.idioma}
            onChange={(e) => setP({ ...p, idioma: e.target.value })}
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
                onClick={() => setP({ ...p, tema: t })}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm capitalize",
                  p.tema === t ? "border-primary bg-primary/5 font-semibold" : "hover:bg-muted",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => toast.success("Preferencias aplicadas")}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Aplicar
        </button>
      </div>
    </div>
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
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          value ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            value ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
