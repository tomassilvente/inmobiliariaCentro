'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    nombre: "",
    documento: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm({
          nombre: data.nombre,
          documento: data.documento,
          email: data.email,
          password: "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Error actualizando cliente");
      return;
    }

    router.push("/admin/clientes");
  };

  if (loading) {
    return <p className="text-gray-500">Cargando cliente…</p>;
  }

  return (
    <div className="max-w-xl mx-auto">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Editar cliente</h1>
        <p className="text-gray-500">
          Modificar datos del cliente
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm space-y-4"
      >
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Nombre"
        />

        <input
          name="documento"
          value={form.documento}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="DNI"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Email"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Nueva contraseña (opcional)"
          type="password"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-between pt-4">
          <Link href="/admin/clientes" className="text-sm text-gray-500">
            Cancelar
          </Link>

          <button
            type="submit"
            className="bg-[#8a7b5e] text-white px-6 py-2 rounded-xl"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
