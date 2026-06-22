import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./admin-layout-BQCbxGQe.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as jsQR } from "../_libs/jsqr.mjs";
import { m as Camera, h as CircleCheck, n as ScanLine, X, u as CircleAlert } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./theme-toggle-CTDfpuLp.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./router-T_YAFGjX.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function ScanQR() {
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [scanning, setScanning] = reactExports.useState(false);
  const [qrCode, setQrCode] = reactExports.useState(null);
  const [manualCode, setManualCode] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
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
        video: {
          facingMode: {
            ideal: "environment"
          }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      loop();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No fue posible acceder a la cámara del dispositivo.";
      setError(msg);
      toast.error("Cámara no disponible", {
        description: msg
      });
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
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true
    });
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(img.data, img.width, img.height, {
      inversionAttempts: "dontInvert"
    });
    if (code?.data) {
      setQrCode(code.data);
      toast.success("QR detectado", {
        description: code.data
      });
      stop();
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  };
  reactExports.useEffect(() => stop, []);
  const scanManual = () => {
    if (!manualCode.trim()) return toast.error("Ingresa un código de permiso");
    setQrCode(manualCode.trim());
    setManualCode("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Escáner de permiso QR", subtitle: "Lectura del código del viajero · cámara trasera", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-semibold", children: "Cámara de cabina" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-xl bg-slate-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, playsInline: true, muted: true, className: "absolute inset-0 h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-6 rounded-lg border-2 border-dashed border-white/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-6 top-6 h-8 w-8 border-l-4 border-t-4 border-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-6 top-6 h-8 w-8 border-r-4 border-t-4 border-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b-4 border-l-4 border-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b-4 border-r-4 border-primary" }),
        !scanning && !qrCode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "mx-auto h-12 w-12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", children: 'Pulsa "Iniciar escaneo" para activar la cámara' })
        ] }) }),
        qrCode && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-slate-900/80 text-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-medium", children: "QR detectado" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2", children: !scanning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: start, className: "flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4" }),
        " Iniciar escaneo"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: stop, className: "flex flex-1 items-center justify-center gap-2 rounded-md border bg-card py-2.5 text-sm font-medium hover:bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
        " Detener cámara"
      ] }) }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-medium text-muted-foreground", children: "O ingresa el código manualmente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: manualCode, onChange: (e) => setManualCode(e.target.value), placeholder: "PRM-2026-00451", className: "h-9 flex-1 rounded-md border bg-background px-3 text-sm font-mono outline-none focus:ring-2 focus:ring-ring/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: scanManual, className: "rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted", children: "Buscar" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border bg-card p-5 shadow-sm", children: !qrCode ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full place-items-center py-20 text-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "mx-auto h-12 w-12 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", children: "Esperando lectura de código QR..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "La información del permiso aparecerá aquí." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Código leído" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 break-all rounded-md border bg-muted/30 p-3 font-mono text-sm", children: qrCode })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-dashed bg-muted/20 p-4 text-sm text-muted-foreground", children: [
        "Los datos del viajero y validaciones se cargarán desde",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
          "GET /api/permisos/",
          qrCode
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 border-t pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.success("Cruce autorizado"), className: "flex flex-1 items-center justify-center gap-2 rounded-md bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:bg-success/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          " Autorizar cruce"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.error("Cruce rechazado"), className: "flex flex-1 items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          " Rechazar"
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  ScanQR as component
};
