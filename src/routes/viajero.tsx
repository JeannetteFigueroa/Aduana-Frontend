import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode, type ComponentType } from "react";
import { toast } from "sonner";
import {
  Mountain, Bell, FileText, MapPin, QrCode, CheckCircle2,
  Clock, ChevronRight, User, ArrowRight, Home as HomeIcon, ScanLine,
  Upload, FileUp, Baby, Car, Plus, X, AlertTriangle, Trash2,
  Menu, LogOut, ShieldCheck, Calendar, Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/viajero")({
  head: () => ({ meta: [{ title: "Portal Viajero — Aduanas Chile" }] }),
  component: AppViajero,
});

type Tab = "home" | "declarar" | "documentos" | "menores" | "vehiculo" | "permiso" | "perfil";

const navItems: { id: Tab; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Inicio", icon: HomeIcon },
  { id: "declarar", label: "Declaración SAG", icon: FileText },
  { id: "documentos", label: "Documentos", icon: FileUp },
  { id: "vehiculo", label: "Vehículo", icon: Car },
  { id: "menores", label: "Menores de edad", icon: Baby },
  { id: "permiso", label: "Mi permiso", icon: QrCode },
  { id: "perfil", label: "Perfil", icon: User },
];

function AppViajero() {
  const [tab, setTab] = useState<Tab>("home");
  const [open, setOpen] = useState(false);

  const go = (t: Tab) => { setTab(t); setOpen(false); };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar (desktop) / drawer (mobile) */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Mountain className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">Portal Viajero</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">Los Libertadores</div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => go(id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                )}>
                <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent">
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </Link>
        </div>
      </aside>
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b bg-card px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="rounded-md p-2 hover:bg-muted lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold sm:text-lg">{navItems.find(n => n.id === tab)?.label}</h1>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">Portal de autoatención del viajero</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative rounded-md p-2 hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1">
              <img src="https://i.pravatar.cc/60?img=12" className="h-7 w-7 rounded-full" alt="" />
              <div className="hidden text-xs sm:block">
                <div className="font-medium leading-tight">Juan Pérez</div>
                <div className="text-muted-foreground">Viajero</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {tab === "home" && <HomePanel go={go} />}
          {tab === "declarar" && <DeclararPanel />}
          {tab === "documentos" && <DocumentosPanel />}
          {tab === "menores" && <MenoresPanel />}
          {tab === "vehiculo" && <VehiculoPanel />}
          {tab === "permiso" && <PermisoPanel />}
          {tab === "perfil" && <PerfilPanel />}
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-card/95 backdrop-blur lg:hidden">
        {([
          ["home", HomeIcon, "Inicio"],
          ["declarar", FileText, "Declarar"],
          ["documentos", FileUp, "Docs"],
          ["permiso", QrCode, "Permiso"],
          ["perfil", User, "Perfil"],
        ] as const).map(([id, Icon, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={cn("flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium",
              tab === id ? "text-primary" : "text-muted-foreground")}>
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ---------- Reusable ---------- */
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

/* ---------- Home ---------- */
function HomePanel({ go }: { go: (t: Tab) => void }) {
  return (
    <div className="space-y-6">
      <div className="gradient-hero relative overflow-hidden rounded-2xl p-6 text-white sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-white/70">Bienvenido</div>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Juan Pérez González</h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            Prepara tu cruce fronterizo en minutos. Declara, sube documentos y obtén tu permiso QR.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Mendoza, AR</span>
            <ArrowRight className="h-4 w-4" />
            <span className="text-sm font-semibold">Santiago, CL</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ActionCard onClick={() => go("declarar")} icon={FileText} title="Declaración SAG" desc="Productos vegetales / animales" color="bg-primary/10 text-primary" />
        <ActionCard onClick={() => go("documentos")} icon={FileUp} title="Subir documentos" desc="Pasaporte, RUT, seguro" color="bg-info/10 text-info" />
        <ActionCard onClick={() => go("vehiculo")} icon={Car} title="Vehículo" desc="Patente y permiso circulación" color="bg-warning/20 text-warning-foreground" />
        <ActionCard onClick={() => go("menores")} icon={Baby} title="Menores de edad" desc="Autorización notarial" color="bg-success/10 text-success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Estado del trámite</h3>
            <span className="rounded-full bg-warning/20 px-2.5 py-0.5 text-xs font-semibold text-warning-foreground">En preparación</span>
          </div>
          <ol className="mt-4 space-y-3">
            {[
              ["Datos personales", true],
              ["Documentos cargados", true],
              ["Declaración SAG", false],
              ["Datos vehículo", false],
              ["Permiso emitido", false],
            ].map(([label, done], i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                  done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground")}>
                  {done ? "✓" : i + 1}
                </span>
                <span className={cn("text-sm", done ? "font-medium" : "text-muted-foreground")}>{label}</span>
                {!done && i === 2 && (
                  <button onClick={() => go("declarar")} className="ml-auto text-xs font-semibold text-primary hover:underline">Completar →</button>
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
          <dl className="mt-3 space-y-2 text-sm">
            <Row k="Tiempo espera" v="~12 min" />
            <Row k="Cabinas activas" v="6 / 6" />
            <Row k="Clima" v="7°C · Despejado" />
            <Row k="Horario" v="24 hrs" />
          </dl>
        </Card>
      </div>
    </div>
  );
}
function ActionCard({ onClick, icon: Icon, title, desc, color }: any) {
  return (
    <button onClick={onClick} className="group flex items-start gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
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
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>;
}

/* ---------- Declaración SAG ---------- */
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

function DeclararPanel() {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<string[]>([]);
  const [items, setItems] = useState<{ id: number; nombre: string; cantidad: string; origen: string }[]>([]);

  const toggle = (id: string) => {
    if (id === "ninguno") { setSel(["ninguno"]); setItems([]); return; }
    setSel(s => {
      const next = s.filter(x => x !== "ninguno");
      return next.includes(id) ? next.filter(x => x !== id) : [...next, id];
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
      <SectionTitle title="Declaración SAG digital" sub="Servicio Agrícola y Ganadero · Obligatorio según Ley 18.755" />

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {["Categorías", "Detalle productos", "Confirmación"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold",
              step > i + 1 ? "bg-success text-success-foreground" : step === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {step > i + 1 ? "✓" : i + 1}
            </div>
            <span className={cn("whitespace-nowrap text-sm", step === i + 1 ? "font-semibold" : "text-muted-foreground")}>{s}</span>
            {i < 2 && <div className="hidden h-px w-12 bg-border sm:block" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <h3 className="font-semibold">¿Qué productos transportas?</h3>
          <p className="text-sm text-muted-foreground">Selecciona todas las categorías aplicables.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categorias.map(c => {
              const on = sel.includes(c.id);
              return (
                <button key={c.id} onClick={() => toggle(c.id)}
                  className={cn("flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                    on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40")}>
                  <span className="text-3xl">{c.emoji}</span>
                  <span className="text-center text-sm font-medium">{c.label}</span>
                  {on && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">SELECCIONADO</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex justify-end">
            <button disabled={sel.length === 0}
              onClick={() => {
                if (sel.includes("ninguno")) { enviar(); return; }
                setStep(2);
              }}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
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
                <p className="text-sm text-muted-foreground">Agrega cada producto con cantidad aproximada.</p>
              </div>
              <button onClick={() => setItems([...items, { id: Date.now(), nombre: "", cantidad: "", origen: "" }])}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {items.length === 0 && (
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Sin productos agregados. Pulsa <span className="font-medium text-foreground">"Agregar"</span> para comenzar.
                </div>
              )}
              {items.map(it => (
                <div key={it.id} className="grid grid-cols-1 gap-2 rounded-md border bg-background p-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
                  <input defaultValue={it.nombre} placeholder="Ej: Manzanas Gala"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
                  <input defaultValue={it.cantidad} placeholder="Cantidad (kg / un)"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
                  <input defaultValue={it.origen} placeholder="País origen"
                    className="h-9 rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
                  <button onClick={() => setItems(items.filter(x => x.id !== it.id))}
                    className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive">
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
                La no declaración o declaración falsa constituye infracción sancionada con multas hasta <strong>50 UTM</strong> y decomiso de productos.
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <button onClick={() => setStep(1)} className="rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted">← Volver</button>
            <button onClick={enviar} className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
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
          <p className="mt-1 text-sm text-muted-foreground">Folio <span className="font-mono font-semibold text-foreground">SAG-2026-08841</span></p>
          <div className="mx-auto mt-5 max-w-md rounded-md border bg-success/5 p-4 text-left text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><span className="font-semibold text-success">Aprobada</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Productos</span><span className="font-medium">{items.length || "Sin productos"}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Inspector</span><span className="font-medium">M. Sánchez</span></div>
          </div>
          <button onClick={() => { setStep(1); setSel([]); setItems([]); }}
            className="mt-5 rounded-md border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted">
            Nueva declaración
          </button>
        </Card>
      )}
    </div>
  );
}

/* ---------- Documentos ---------- */
type Doc = { id: string; nombre: string; tipo: string; estado: "pendiente" | "subido" | "validado" | "rechazado"; size?: string };
function DocumentosPanel() {
  const [docs, setDocs] = useState<Doc[]>([
    { id: "d1", nombre: "Pasaporte", tipo: "PDF/IMG", estado: "validado", size: "1.2 MB" },
    { id: "d2", nombre: "Cédula de identidad", tipo: "PDF/IMG", estado: "subido", size: "820 KB" },
    { id: "d3", nombre: "Seguro internacional", tipo: "PDF", estado: "pendiente" },
    { id: "d4", nombre: "Permiso de circulación", tipo: "PDF", estado: "pendiente" },
  ]);

  const subir = (id: string) => {
    toast.loading("Subiendo documento...", { id });
    setTimeout(() => {
      setDocs(d => d.map(x => x.id === id ? { ...x, estado: "subido", size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB` } : x));
      toast.success("Documento cargado", { id, description: "En revisión por el operador." });
    }, 1200);
  };

  return (
    <div>
      <SectionTitle title="Documentos del viajero" sub="Sube tus documentos en PDF, JPG o PNG. Máx. 10 MB por archivo." />
      <div className="grid gap-3">
        {docs.map(d => (
          <Card key={d.id} className="!p-4">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
              <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-lg",
                d.estado === "validado" ? "bg-success/15 text-success" :
                d.estado === "subido" ? "bg-info/15 text-info" :
                d.estado === "rechazado" ? "bg-destructive/15 text-destructive" :
                "bg-muted text-muted-foreground")}>
                <FileText className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{d.nombre}</span>
                  <Badge estado={d.estado} />
                </div>
                <div className="text-xs text-muted-foreground">{d.tipo} {d.size && `· ${d.size}`}</div>
              </div>
              <div className="flex gap-2">
                {d.estado === "pendiente" ? (
                  <button onClick={() => subir(d.id)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                    <Upload className="h-3.5 w-3.5" /> Subir
                  </button>
                ) : (
                  <button onClick={() => setDocs(docs.map(x => x.id === d.id ? { ...x, estado: "pendiente", size: undefined } : x))}
                    className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 border-dashed">
        <div className="flex flex-col items-center justify-center py-6 text-center sm:py-10">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Upload className="h-7 w-7" />
          </div>
          <h4 className="mt-3 font-semibold">Subir otro documento</h4>
          <p className="text-sm text-muted-foreground">Arrastra el archivo aquí o haz click para seleccionar.</p>
          <button onClick={() => {
            const id = `d${Date.now()}`;
            setDocs([...docs, { id, nombre: "Documento adicional", tipo: "PDF", estado: "pendiente" }]);
            toast.info("Documento agregado a la lista");
          }} className="mt-4 inline-flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
            <Plus className="h-4 w-4" /> Agregar documento
          </button>
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
  return <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize", map[estado])}>{estado}</span>;
}

/* ---------- Menores ---------- */
function MenoresPanel() {
  const [menores, setMenores] = useState<{ id: number; nombre: string; rut: string; fecha: string; parentesco: string; autorizado: boolean }[]>([
    { id: 1, nombre: "Sofía Pérez Soto", rut: "25.114.882-3", fecha: "14-08-2014", parentesco: "Hija", autorizado: true },
  ]);
  const [form, setForm] = useState({ nombre: "", rut: "", fecha: "", parentesco: "Hijo/a" });

  const agregar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.rut) return toast.error("Completa los campos obligatorios");
    setMenores([...menores, { id: Date.now(), ...form, autorizado: false }]);
    toast.success("Menor agregado", { description: "Sube el permiso notarial para autorizar el cruce." });
    setForm({ nombre: "", rut: "", fecha: "", parentesco: "Hijo/a" });
  };

  const autorizar = (id: number) => {
    toast.loading("Validando autorización notarial...", { id: `m${id}` });
    setTimeout(() => {
      setMenores(m => m.map(x => x.id === id ? { ...x, autorizado: true } : x));
      toast.success("Permiso de menor validado", { id: `m${id}`, description: "Notaría verificada con éxito." });
    }, 1400);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div>
        <SectionTitle title="Menores de edad acompañantes" sub="Todo menor que cruce la frontera requiere autorización notarial vigente." />

        <div className="space-y-3">
          {menores.map(m => (
            <Card key={m.id} className="!p-4">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Baby className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{m.nombre}</span>
                    {m.autorizado
                      ? <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success"><CheckCircle2 className="h-3 w-3" /> Autorizado</span>
                      : <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[11px] font-semibold text-warning-foreground">Falta autorización</span>}
                  </div>
                  <div className="mt-0.5 grid gap-x-4 text-xs text-muted-foreground sm:grid-cols-3">
                    <span>RUT: {m.rut}</span>
                    <span>Nac: {m.fecha || "—"}</span>
                    <span>{m.parentesco}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!m.autorizado && (
                    <button onClick={() => autorizar(m.id)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                      <Upload className="h-3.5 w-3.5" /> Subir permiso
                    </button>
                  )}
                  <button onClick={() => setMenores(menores.filter(x => x.id !== m.id))}
                    className="grid h-9 w-9 place-items-center rounded-md border hover:bg-destructive/10 hover:text-destructive">
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
            <Field label="Nombre completo *" value={form.nombre} onChange={v => setForm({ ...form, nombre: v })} />
            <Field label="RUT / Doc. identidad *" value={form.rut} onChange={v => setForm({ ...form, rut: v })} />
            <Field label="Fecha de nacimiento" type="date" value={form.fecha} onChange={v => setForm({ ...form, fecha: v })} />
            <div>
              <label className="block text-sm font-medium">Parentesco</label>
              <select value={form.parentesco} onChange={e => setForm({ ...form, parentesco: e.target.value })}
                className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50">
                <option>Hijo/a</option><option>Sobrino/a</option><option>Nieto/a</option><option>Otro</option>
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
function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
    </label>
  );
}

/* ---------- Vehículo ---------- */
function VehiculoPanel() {
  const [form, setForm] = useState({
    patente: "JKLM-23", marca: "Toyota", modelo: "Hilux 2023",
    color: "Blanco", chasis: "AHTBB3CD500123456", seguro: "Mapfre Internacional",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Verificando datos del vehículo...", { id: "veh" });
    setTimeout(() => {
      toast.success("Vehículo registrado", { id: "veh", description: `Patente ${form.patente} validada con Registro Civil.` });
    }, 1400);
  };

  const aprobar = () => toast.success("Cruce APROBADO ✓", { description: "Permiso emitido. Diríjase a cabina 2.", duration: 6000 });
  const rechazar = () => toast.error("Cruce RECHAZADO", { description: "Documentación incompleta. Acuda a oficina de atención.", duration: 6000 });

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <SectionTitle title="Datos del vehículo" sub="Información necesaria para autorizar el cruce vehicular." />
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <Field label="Patente *" value={form.patente} onChange={v => setForm({ ...form, patente: v })} />
          <Field label="Marca" value={form.marca} onChange={v => setForm({ ...form, marca: v })} />
          <Field label="Modelo" value={form.modelo} onChange={v => setForm({ ...form, modelo: v })} />
          <Field label="Color" value={form.color} onChange={v => setForm({ ...form, color: v })} />
          <Field label="N° Chasis / VIN" value={form.chasis} onChange={v => setForm({ ...form, chasis: v })} />
          <Field label="Compañía de seguro" value={form.seguro} onChange={v => setForm({ ...form, seguro: v })} />

          <div className="sm:col-span-2 rounded-lg border border-dashed bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">Foto de la patente</div>
                <div className="text-xs text-muted-foreground">JPG o PNG, hasta 5 MB</div>
              </div>
              <button type="button" onClick={() => toast.success("Foto cargada")}
                className="rounded-md border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">Adjuntar</button>
            </div>
          </div>

          <div className="sm:col-span-2 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={rechazar} className="rounded-md border border-destructive/30 bg-destructive/5 px-5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10">
              Simular rechazo
            </button>
            <button type="button" onClick={aprobar} className="rounded-md border border-success/30 bg-success/10 px-5 py-2.5 text-sm font-medium text-success hover:bg-success/15">
              Simular aprobación
            </button>
            <button type="submit" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Guardar y validar
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <h4 className="font-semibold">Resumen</h4>
        <dl className="mt-3 space-y-2 text-sm">
          <Row k="Patente" v={form.patente} />
          <Row k="Vehículo" v={`${form.marca} ${form.modelo}`} />
          <Row k="Color" v={form.color} />
          <Row k="Seguro" v="Vigente ✓" />
          <Row k="Permiso circulación" v="Vigente al 31-12-2026" />
        </dl>
        <div className="mt-4 rounded-md bg-success/10 p-3 text-xs text-success">
          ✓ Patente sin alertas en lista nacional.
        </div>
      </Card>
    </div>
  );
}

/* ---------- Permiso ---------- */
function PermisoPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Permiso de cruce</div>
              <div className="font-mono text-lg font-bold">PRM-2026-00451</div>
            </div>
            <span className="rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground">AUTORIZADO</span>
          </div>
          <div className="my-5 grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div className="mx-auto grid h-44 w-44 place-items-center rounded-lg bg-white sm:mx-0">
              <QrCode className="h-40 w-40 text-foreground" strokeWidth={1} />
            </div>
            <dl className="grid gap-y-1.5 text-sm">
              <div><dt className="text-xs text-muted-foreground">Viajero</dt><dd className="font-semibold">Juan Pérez González</dd></div>
              <div><dt className="text-xs text-muted-foreground">RUT</dt><dd className="font-medium">12.345.678-9</dd></div>
              <div><dt className="text-xs text-muted-foreground">Vehículo</dt><dd className="font-medium">JKLM-23 · Toyota Hilux</dd></div>
              <div><dt className="text-xs text-muted-foreground">Paso</dt><dd className="font-medium">Los Libertadores</dd></div>
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-primary/20 pt-4 text-sm">
            <div><div className="text-xs text-muted-foreground">Emitido</div><div className="font-medium">11-06-2026 08:45</div></div>
            <div><div className="text-xs text-muted-foreground">Vence</div><div className="font-medium">11-06-2026 23:59</div></div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Upload className="h-4 w-4 rotate-180" /> Descargar PDF
          </button>
          <button onClick={() => toast.info("Mostrando QR para escaneo en cabina")}
            className="flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-muted">
            <ScanLine className="h-4 w-4" /> Escanear en cabina
          </button>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <h4 className="font-semibold">Validaciones</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {[["SAG", "Sin restricciones"], ["PDI", "Identidad verificada"], ["Aduanas", "Declaración OK"], ["Carabineros", "Vehículo en regla"]].map(([k, v]) => (
              <li key={k} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="flex-1"><strong>{k}</strong> — {v}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="bg-warning/10">
          <div className="flex items-center gap-2 text-warning-foreground">
            <Calendar className="h-4 w-4" />
            <h4 className="font-semibold">Recuerda</h4>
          </div>
          <p className="mt-2 text-sm">Tu permiso es válido solo durante la fecha indicada. Después deberás generar uno nuevo.</p>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Perfil ---------- */
function PerfilPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <Card className="text-center">
        <img src="https://i.pravatar.cc/160?img=12" alt="" className="mx-auto h-24 w-24 rounded-full border-4 border-primary/20" />
        <h3 className="mt-3 text-lg font-bold">Juan Pérez González</h3>
        <p className="text-sm text-muted-foreground">12.345.678-9 · Chile</p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
          <CheckCircle2 className="h-3.5 w-3.5" /> Identidad verificada
        </div>
      </Card>
      <Card>
        <h4 className="font-semibold">Mi cuenta</h4>
        <div className="mt-3 divide-y">
          {["Datos personales", "Mis vehículos", "Historial de cruces", "Notificaciones", "Idioma y región", "Ayuda y soporte"].map(t => (
            <button key={t} className="flex w-full items-center justify-between py-3 text-sm font-medium hover:bg-muted/30">
              {t} <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
