'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NuevoClientePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    documento: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Error creando cliente");
      return;
    }

    // 👉 redirigimos al listado
    router.push("/admin/clientes");
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nuevo cliente</h1>
        <p className="text-gray-500">
          Registrar un nuevo dueño o inquilino
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            name="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            DNI
          </label>
          <input
            type="number"
            name="documento"
            required
            value={form.documento}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex justify-between items-center pt-4">
          <Link
            href="/admin/clientes"
            className="text-sm text-gray-500 hover:underline"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8a7b5e] text-white px-6 py-2 rounded-xl hover:bg-[#766851] disabled:opacity-50"
          >
            {loading ? "Guardando…" : "Crear cliente"}
          </button>
        </div>
      </form>
    </div>
  );
}
