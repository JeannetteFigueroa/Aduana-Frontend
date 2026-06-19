import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AdminLayout } from "@/components/admin-layout";
import { ScanLine, CheckCircle2, Camera, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import jsQR from "jsqr";

export const Route = createFileRoute("/admin/scan")({
  head: () => ({ meta: [{ title: "Escanear QR del viajero" }] }),
  component: ScanQR,
});

/**
 * Escáner real de QR para el operador.
 *
 * - Pide permiso de cámara con `getUserMedia({ video: { facingMode: 'environment' } })`
 *   para usar la cámara trasera en móvil. En desktop usa la disponible.
 * - Decodifica frames con `jsQR`.
 * - Al detectar un código, lo expone como `qrCode` (string) y detiene la cámara.
 *
 * @backend  Al obtener `qrCode`, llamar:
 *   GET /api/permisos/{qrCode}
 *   → { permiso, viajero, validaciones }
 *   Las acciones "Autorizar / Rechazar" deben llamar:
 *   POST /api/permisos/{qrCode}/autorizar
 *   POST /api/permisos/{qrCode}/rechazar
 */
function ScanQR() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [scanning, setScanning] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setScanning(false);
  };

  const start = async () => {
    setError(null);
    setQrCode(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      loop();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "No fue posible acceder a la cámara del dispositivo.";
      setError(msg);
      toast.error("Cámara no disponible", { description: msg });
    }
  };

  const loop = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
    if (code?.data) {
      setQrCode(code.data);
      toast.success("QR detectado", { description: code.data });
      stop();
      // @backend: GET /api/permisos/{code.data}
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => stop, []);

  const scanManual = () => {
    if (!manualCode.trim()) return toast.error("Ingresa un código de permiso");
    setQrCode(manualCode.trim());
    setManualCode("");
    // @backend: GET /api/permisos/{manualCode}
  };

  return (
    <AdminLayout
      title="Escáner de permiso QR"
      subtitle="Lectura del código del viajero · cámara trasera"
    >
      <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-3 font-semibold">Cámara de cabina</h3>

          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-900">
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 h-full w-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            <div className="pointer-events-none absolute inset-6 rounded-lg border-2 border-dashed border-white/40" />
            <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l-4 border-t-4 border-primary" />
            <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r-4 border-t-4 border-primary" />
            <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b-4 border-l-4 border-primary" />
            <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b-4 border-r-4 border-primary" />

            {!scanning && !qrCode && (
              <div className="absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white/70">
                <div>
                  <Camera className="mx-auto h-12 w-12" />
                  <p className="mt-2 text-sm">Pulsa "Iniciar escaneo" para activar la cámara</p>
                </div>
              </div>
            )}
            {qrCode && (
              <div className="absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white">
                <div>
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <p className="mt-2 text-sm font-medium">QR detectado</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {!scanning ? (
              <button
                onClick={start}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <ScanLine className="h-4 w-4" /> Iniciar escaneo
              </button>
            ) : (
              <button
                onClick={stop}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border bg-card py-2.5 text-sm font-medium hover:bg-muted"
              >
                <X className="h-4 w-4" /> Detener cámara
              </button>
            )}
          </div>

          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-4 border-t pt-4">
            <label className="block text-xs font-medium text-muted-foreground">
              O ingresa el código manualmente
            </label>
            <div className="mt-1.5 flex gap-2">
              <input
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="PRM-2026-00451"
                className="h-9 flex-1 rounded-md border bg-background px-3 text-sm font-mono outline-none focus:ring-2 focus:ring-ring/50"
              />
              <button
                onClick={scanManual}
                className="rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          {!qrCode ? (
            <div className="grid h-full place-items-center py-20 text-center text-muted-foreground">
              <div>
                <ScanLine className="mx-auto h-12 w-12 opacity-30" />
                <p className="mt-3 text-sm">Esperando lectura de código QR...</p>
                <p className="text-xs">La información del permiso aparecerá aquí.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Código leído
                </div>
                <div className="mt-1 break-all rounded-md border bg-muted/30 p-3 font-mono text-sm">
                  {qrCode}
                </div>
              </div>

              <div className="rounded-lg border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground">
                Los datos del viajero y validaciones se cargarán desde{" "}
                <span className="font-mono">GET /api/permisos/{qrCode}</span>
              </div>

              <div className="flex flex-wrap gap-2 border-t pt-4">
                <button
                  onClick={() => toast.success("Cruce autorizado")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:bg-success/90"
                >
                  <CheckCircle2 className="h-4 w-4" /> Autorizar cruce
                </button>
                <button
                  onClick={() => toast.error("Cruce rechazado")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90"
                >
                  <X className="h-4 w-4" /> Rechazar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
