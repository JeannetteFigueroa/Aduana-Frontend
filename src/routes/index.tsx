import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Cloud, Lock, User, Mountain, Smartphone, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sistema Integrado Los Libertadores — Aduanas Chile" },
      { name: "description", content: "Plataforma de gestión integrada del paso fronterizo Los Libertadores." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/admin" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Left visual panel */}
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

      {/* Right form */}
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
          <p className="mt-1 text-sm text-muted-foreground">Acceda a su panel institucional.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Usuario / RUT</span>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={usuario} onChange={(e) => setUsuario(e.target.value)}
                  placeholder="operador@aduana.cl"
                  className="h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium">Contraseña</span>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={clave} onChange={(e) => setClave(e.target.value)} type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Recordarme</label>
              <a href="#" className="font-medium text-primary hover:underline">¿Olvidó su clave?</a>
            </div>
            <button type="submit" className="h-11 w-full rounded-md bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Ingresar al panel
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> Acceso alternativo <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link to="/admin" className="flex items-center justify-center gap-2 rounded-md border bg-card px-3 py-2.5 text-sm font-medium hover:bg-muted">
              <ShieldCheck className="h-4 w-4 text-primary" /> Operador
            </Link>
            <Link to="/viajero" className="flex items-center justify-center gap-2 rounded-md border bg-card px-3 py-2.5 text-sm font-medium hover:bg-muted">
              <Smartphone className="h-4 w-4 text-primary" /> Viajero
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © 2026 Servicio Nacional de Aduanas · Demo frontend
          </p>
        </div>
      </div>
    </div>
  );
}
