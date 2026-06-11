import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mountain, Bell, FileText, MapPin, QrCode, CheckCircle2,
  Clock, ChevronRight, User, Plane, ArrowRight, Home, ScanLine,
} from "lucide-react";

export const Route = createFileRoute("/viajero")({
  head: () => ({ meta: [{ title: "App Viajero — Aduanas Chile" }] }),
  component: AppViajero,
});

type Tab = "home" | "declarar" | "permiso" | "perfil";

function AppViajero() {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen bg-muted/30 py-6">
      <div className="mx-auto max-w-md overflow-hidden rounded-[2.5rem] border-8 border-foreground/90 bg-background shadow-2xl">
        <div className="relative h-[720px] overflow-y-auto">
          {/* Status bar */}
          <div className="flex items-center justify-between bg-foreground px-6 py-2 text-xs text-background">
            <span>9:41</span>
            <span className="flex gap-1">●●● 5G ▮</span>
          </div>

          {tab === "home" && <HomeTab onNav={setTab} />}
          {tab === "declarar" && <DeclararTab />}
          {tab === "permiso" && <PermisoTab />}
          {tab === "perfil" && <PerfilTab />}

          {/* Bottom nav */}
          <nav className="sticky bottom-0 grid grid-cols-4 border-t bg-card/95 backdrop-blur">
            {([
              ["home", Home, "Inicio"],
              ["declarar", FileText, "Declarar"],
              ["permiso", QrCode, "Permiso"],
              ["perfil", User, "Perfil"],
            ] as const).map(([id, Icon, label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ${tab === id ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-md text-center">
        <Link to="/" className="text-sm text-muted-foreground hover:underline">← Volver al login</Link>
      </div>
    </div>
  );
}

function HomeTab({ onNav }: { onNav: (t: Tab) => void }) {
  return (
    <div>
      <div className="gradient-hero px-6 pb-8 pt-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5" />
            <span className="text-sm font-semibold">Aduanas Chile</span>
          </div>
          <Bell className="h-5 w-5" />
        </div>
        <div className="mt-5">
          <div className="text-xs text-white/70">Hola,</div>
          <div className="text-2xl font-bold">Juan Pérez</div>
        </div>
        <div className="mt-4 rounded-xl bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <MapPin className="h-3.5 w-3.5" /> Próximo cruce
          </div>
          <div className="mt-1 flex items-center gap-2 font-semibold">
            Mendoza, AR <ArrowRight className="h-4 w-4" /> Santiago, CL
          </div>
          <div className="mt-1 text-xs text-white/70">Paso Los Libertadores · 11 jun 2026</div>
        </div>
      </div>

      <div className="-mt-5 space-y-3 px-5">
        <button onClick={() => onNav("declarar")}
          className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left shadow-sm hover:bg-muted/50">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold">Iniciar declaración SAG</div>
            <div className="text-xs text-muted-foreground">Productos vegetales / animales</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <button onClick={() => onNav("permiso")}
          className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-left shadow-sm hover:bg-muted/50">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-success/10 text-success">
            <QrCode className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold">Mi permiso de cruce</div>
            <div className="text-xs text-muted-foreground">QR de autorización vigente</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="px-5 py-5">
        <h3 className="mb-2 text-sm font-semibold">Información del cruce</h3>
        <div className="grid grid-cols-2 gap-3">
          <Stat icon={Clock} v="~12 min" l="Tiempo espera" />
          <Stat icon={Plane} v="6 / 6" l="Cabinas activas" />
        </div>
      </div>

      <div className="mx-5 mb-5 rounded-xl border bg-info/5 p-4">
        <div className="text-xs font-semibold text-info">Tip del día</div>
        <p className="mt-1 text-sm">Declara siempre frutas, carnes y productos lácteos. Evita multas hasta 50 UTM.</p>
      </div>
    </div>
  );
}

function DeclararTab() {
  return (
    <div className="px-5 py-5">
      <h2 className="text-xl font-bold">Declaración SAG</h2>
      <p className="text-sm text-muted-foreground">¿Llevas alguno de estos productos?</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { l: "Frutas", e: "🍎" },
          { l: "Carnes", e: "🥩" },
          { l: "Vegetales", e: "🥬" },
          { l: "Lácteos", e: "🥛" },
          { l: "Semillas", e: "🌱" },
          { l: "Miel", e: "🍯" },
        ].map(c => (
          <button key={c.l} className="flex flex-col items-center gap-2 rounded-xl border-2 border-border bg-card p-4 hover:border-primary/40">
            <span className="text-3xl">{c.e}</span>
            <span className="text-sm font-medium">{c.l}</span>
          </button>
        ))}
      </div>
      <button className="mt-5 w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground">Continuar</button>
      <div className="mt-5 rounded-lg bg-warning/15 p-3 text-xs text-warning-foreground">
        ⚠ La no declaración es sancionada con multas según Ley 18.755.
      </div>
    </div>
  );
}

function PermisoTab() {
  return (
    <div className="px-5 py-6 text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
        <CheckCircle2 className="h-3.5 w-3.5" /> AUTORIZADO
      </div>
      <h2 className="mt-3 text-lg font-bold">Permiso vigente</h2>
      <div className="mx-auto mt-4 grid h-56 w-56 place-items-center rounded-xl border-2 bg-white">
        <QrCode className="h-48 w-48 text-foreground" strokeWidth={1} />
      </div>
      <div className="mt-4 font-mono text-sm font-semibold">PRM-2026-00451</div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-left text-sm">
        <Info l="Viajero" v="Juan Pérez" />
        <Info l="Vehículo" v="JKLM-23" />
        <Info l="Emitido" v="08:45" />
        <Info l="Vence" v="23:59" />
      </div>
      <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border py-3 text-sm font-medium">
        <ScanLine className="h-4 w-4" /> Escanear en cabina
      </button>
    </div>
  );
}

function PerfilTab() {
  return (
    <div className="px-5 py-5">
      <div className="flex items-center gap-3">
        <img src="https://i.pravatar.cc/120?img=12" className="h-16 w-16 rounded-full" alt="" />
        <div className="min-w-0">
          <div className="truncate text-lg font-bold">Juan Pérez González</div>
          <div className="text-sm text-muted-foreground">12.345.678-9 · Chile</div>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {["Mis vehículos", "Historial de cruces", "Documentos", "Notificaciones", "Idioma y región", "Ayuda y soporte"].map(t => (
          <button key={t} className="flex w-full items-center justify-between rounded-lg border bg-card p-3.5 text-sm font-medium hover:bg-muted/50">
            {t} <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, v, l }: any) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <Icon className="h-4 w-4 text-primary" />
      <div className="mt-2 text-xl font-bold">{v}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </div>
  );
}
function Info({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-md border bg-card p-2.5">
      <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
      <div className="text-sm font-semibold">{v}</div>
    </div>
  );
}
