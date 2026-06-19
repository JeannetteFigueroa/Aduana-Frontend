import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { viajeros, type Viajero } from "@/lib/mock-data";
import {
  Search,
  Camera,
  Fingerprint,
  FileText,
  Car,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/admin/viajero")({
  head: () => ({ meta: [{ title: "Procesamiento de viajero" }] }),
  component: ProcesamientoViajero,
});

function ProcesamientoViajero() {
  const [selected, setSelected] = useState<Viajero>(viajeros[0]);

  return (
    <AdminLayout
      title="Procesamiento del viajero"
      subtitle="Verificación de identidad, documentación y vehículo"
    >
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar viajero o patente"
                className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
              />
            </div>
          </div>
          <ul className="max-h-[70vh] divide-y overflow-y-auto">
            {viajeros.map((v) => (
              <li key={v.id}>
                <button
                  onClick={() => setSelected(v)}
                  className={`flex w-full items-center gap-3 p-3 text-left hover:bg-muted/40 ${selected.id === v.id ? "bg-primary/5" : ""}`}
                >
                  <img
                    src={v.foto}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                    alt=""
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">{v.nombre}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{v.hora}</span>
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {v.documento} · {v.patente}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="space-y-4">
          {/* Header info */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="grid gap-5 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center">
              <img
                src={selected.foto}
                alt=""
                className="h-28 w-28 rounded-lg border object-cover"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold">{selected.nombre}</h2>
                  <StatusBadge status={selected.estado} />
                  <StatusBadge status={selected.riesgo} />
                </div>
                <div className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground">Documento:</span>{" "}
                    <span className="font-medium">{selected.documento}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Nacionalidad:</span>{" "}
                    <span className="font-medium">{selected.nacionalidad}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Origen:</span>{" "}
                    <span className="font-medium">{selected.origen}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Destino:</span>{" "}
                    <span className="font-medium">{selected.destino}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 md:flex-col">
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-success-foreground hover:bg-success/90">
                  <CheckCircle2 className="h-4 w-4" /> Autorizar
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90">
                  <XCircle className="h-4 w-4" /> Rechazar
                </button>
              </div>
            </div>
          </div>

          {/* Verifications grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <VerifCard icon={FileText} title="Documentación">
              <Row k="Pasaporte" v="P-7821934" ok />
              <Row k="Vigencia" v="11-mar-2029" ok />
              <Row k="Visa" v="No requerida" ok />
              <Row k="PDI Interpol" v="Sin coincidencias" ok />
            </VerifCard>
            <VerifCard icon={Camera} title="Verificación biométrica">
              <Row k="Reconocimiento facial" v="98.4% match" ok />
              <Row k="Captura en vivo" v="OK" ok />
              <Row k="Comparación documento" v="Coincide" ok />
            </VerifCard>
            <VerifCard icon={Car} title="Vehículo">
              <Row k="Patente" v={selected.patente} ok />
              <Row k="Modelo" v={selected.vehiculo} ok />
              <Row k="Permiso circulación" v="Vigente al 31-12-2026" ok />
              <Row k="Seguro" v="Cobertura internacional" ok />
            </VerifCard>
            <VerifCard icon={Fingerprint} title="Antecedentes">
              <Row k="Carabineros" v="Sin registros" ok />
              <Row k="Aduana" v="Sin sanciones previas" ok />
              <Row k="SAG" v="Sin infracciones" ok />
            </VerifCard>
          </div>

          {/* Process steps */}
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 font-semibold">Etapas del proceso</h3>
            <ol className="grid gap-3 sm:grid-cols-5">
              {["Identidad", "Documentos", "Vehículo", "Declaración", "Cruce"].map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${i < 3 ? "bg-success text-success-foreground" : i === 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {i < 3 ? "✓" : i + 1}
                  </span>
                  <span className={`text-sm ${i <= 3 ? "font-medium" : "text-muted-foreground"}`}>
                    {s}
                  </span>
                  {i < 4 && (
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground sm:hidden" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function VerifCard({ icon: Icon, title, children }: any) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Row({ k, v, ok }: { k: string; v: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="flex items-center gap-1.5 font-medium">
        {ok && <CheckCircle2 className="h-3.5 w-3.5 text-success" />} {v}
      </span>
    </div>
  );
}
