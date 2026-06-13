import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout, StatusBadge } from "@/components/admin-layout";
import { ScanLine, CheckCircle2, XCircle, Camera, User, Car, FileText, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";
import { viajeros, type Viajero } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/scan")({
  head: () => ({ meta: [{ title: "Escanear QR del viajero" }] }),
  component: ScanQR,
});

/**
 * Escáner de QR del operador.
 *
 * @backend  La función `simulateScan` debe reemplazarse por:
 *           1) Una librería real de escaneo (ej: html5-qrcode o jsqr) que use la cámara.
 *           2) Una llamada al microservicio de permisos:
 *              GET http://localhost:8082/api/permisos/{codigoQR}
 *              que devuelva los datos del viajero + estado de validaciones.
 */
function ScanQR() {
  const [scanned, setScanned] = useState<Viajero | null>(null);
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");

  // 🎬 SIMULACIÓN — al apretar "Iniciar escaneo" elige un viajero aleatorio
  const simulateScan = () => {
    setScanning(true);
    setScanned(null);
    toast.loading("Escaneando código QR...", { id: "scan" });
    setTimeout(() => {
      const v = viajeros[Math.floor(Math.random() * viajeros.length)];
      setScanned(v);
      setScanning(false);
      toast.success(`QR válido — ${v.nombre}`, { id: "scan", description: `Permiso PRM-2026-${v.id.slice(3)} cargado.` });
    }, 1800);
  };

  const scanManual = () => {
    if (!manualCode.trim()) return toast.error("Ingresa un código de permiso");
    simulateScan();
    setManualCode("");
  };

  const aprobar = () => toast.success("Cruce autorizado ✓", { description: `${scanned?.nombre} puede continuar a la cabina.` });
  const rechazar = () => toast.error("Cruce rechazado", { description: "Se generó alerta para inspección secundaria." });

  return (
    <AdminLayout title="Escáner de permiso QR" subtitle="Lectura del código del viajero en cabina o inspección">
      <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)]">
        {/* Visor de cámara simulado */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-semibold">Cámara de cabina</h3>
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Esquinas del visor */}
            <div className="absolute inset-6 rounded-lg border-2 border-dashed border-white/30" />
            <div className="absolute left-6 top-6 h-8 w-8 border-l-4 border-t-4 border-primary" />
            <div className="absolute right-6 top-6 h-8 w-8 border-r-4 border-t-4 border-primary" />
            <div className="absolute bottom-6 left-6 h-8 w-8 border-b-4 border-l-4 border-primary" />
            <div className="absolute bottom-6 right-6 h-8 w-8 border-b-4 border-r-4 border-primary" />

            {scanning && (
              <div className="absolute inset-x-6 top-6 h-1 animate-pulse bg-primary shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                style={{ animation: "scanline 1.8s ease-in-out infinite" }} />
            )}

            <div className="absolute inset-0 grid place-items-center">
              {scanning ? (
                <div className="text-center text-white/80">
                  <ScanLine className="mx-auto h-10 w-10 animate-pulse" />
                  <div className="mt-2 text-sm font-medium">Escaneando...</div>
                </div>
              ) : scanned ? (
                <div className="text-center text-white">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <div className="mt-2 text-sm font-medium">QR detectado</div>
                </div>
              ) : (
                <div className="text-center text-white/60">
                  <Camera className="mx-auto h-12 w-12" />
                  <div className="mt-2 text-sm">Apunta al código QR del viajero</div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={simulateScan}
            disabled={scanning}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <ScanLine className="h-4 w-4" /> {scanning ? "Escaneando..." : "Iniciar escaneo"}
          </button>

          <div className="mt-4 border-t pt-4">
            <label className="block text-xs font-medium text-muted-foreground">O ingresa el código manualmente</label>
            <div className="mt-1.5 flex gap-2">
              <input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="PRM-2026-00451"
                className="h-9 flex-1 rounded-md border bg-background px-3 text-sm font-mono outline-none focus:ring-2 focus:ring-ring/50"
              />
              <button onClick={scanManual} className="rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted">
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Resultado del escaneo */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          {!scanned ? (
            <div className="grid h-full place-items-center py-20 text-center text-muted-foreground">
              <div>
                <ScanLine className="mx-auto h-12 w-12 opacity-30" />
                <p className="mt-3 text-sm">Esperando lectura de código QR...</p>
                <p className="text-xs">La información del viajero aparecerá aquí.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-start gap-4">
                <img src={scanned.foto} alt="" className="h-24 w-24 rounded-lg border object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold">{scanned.nombre}</h2>
                    <StatusBadge status={scanned.estado} />
                    <StatusBadge status={scanned.riesgo} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Permiso <span className="font-mono font-semibold text-foreground">PRM-2026-{scanned.id.slice(3)}</span> · emitido hoy 08:45
                  </p>
                  <div className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    <Info icon={User} label="Documento" value={scanned.documento} />
                    <Info icon={User} label="Nacionalidad" value={scanned.nacionalidad} />
                    <Info icon={Car} label="Vehículo" value={`${scanned.patente} · ${scanned.vehiculo}`} />
                    <Info icon={Clock} label="Hora de llegada" value={scanned.hora} />
                  </div>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <ValidationRow icon={ShieldCheck} entidad="PDI" detalle="Identidad verificada — sin antecedentes" />
                <ValidationRow icon={FileText} entidad="SAG" detalle="Declaración aprobada" />
                <ValidationRow icon={FileText} entidad="Aduanas" detalle="Sin productos restringidos" />
                <ValidationRow icon={Car} entidad="Carabineros" detalle="Vehículo en regla" />
              </div>

              <div className="flex flex-wrap gap-2 border-t pt-4">
                <button onClick={aprobar} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:bg-success/90">
                  <CheckCircle2 className="h-4 w-4" /> Autorizar cruce
                </button>
                <button onClick={rechazar} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90">
                  <XCircle className="h-4 w-4" /> Rechazar y derivar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          0%   { transform: translateY(0); opacity: 1; }
          50%  { transform: translateY(220px); opacity: 0.8; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </AdminLayout>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ValidationRow({ icon: Icon, entidad, detalle }: { icon: React.ComponentType<{ className?: string }>; entidad: string; detalle: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-success/5 p-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-success/10 text-success">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-semibold">
          {entidad} <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        </div>
        <div className="truncate text-xs text-muted-foreground">{detalle}</div>
      </div>
    </div>
  );
}
