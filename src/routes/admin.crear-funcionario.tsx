import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin-layout";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/crear-funcionario")({
  head: () => ({ meta: [{ title: "Crear Funcionario" }] }),
  component: CrearFuncionario,
});

function CrearFuncionario() {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    rut: "",
    email: "",
    cargo: "",
    rol: "FUNCIONARIO",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombres || !form.apellidos || !form.rut || !form.email) {
      return toast.error("Completa los campos obligatorios");
    }
    setLoading(true);
    try {
      await apiFetch("/api/usuarios", {
        method: "POST",
        body: JSON.stringify({
          rut: form.rut,
          nombres: form.nombres,
          apellidos: form.apellidos,
          correoInstitucional: form.email,
          cargo: form.cargo,
          rol: form.rol,
        }),
      });
      toast.success("Funcionario creado", {
        description: `${form.nombres} ${form.apellidos} agregado al sistema.`,
      });
      setForm({ ...form, nombres: "", apellidos: "", rut: "", email: "", cargo: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo crear el funcionario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Crear Funcionario" subtitle="Registro de nuevos operadores">
      <div className="max-w-2xl">
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nombres *"
            value={form.nombres}
            onChange={(v) => set("nombres", v)}
          />
          <Field
            label="Apellidos *"
            value={form.apellidos}
            onChange={(v) => set("apellidos", v)}
          />
          <Field label="RUT *" value={form.rut} onChange={(v) => set("rut", v)} />
          <Field label="Email *" type="email" value={form.email} onChange={(v) => set("email", v)} />
          <Field label="Cargo" value={form.cargo} onChange={(v) => set("cargo", v)} />

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear funcionario"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50"
      />
    </label>
  );
}