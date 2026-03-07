'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

/* =======================
   Helpers
======================= */
const getParamValue = (value: any): string | null => {
  if (!value) return null;
  return Array.isArray(value) ? value[0] : value;
};

type Casa = {
  id: number;
  ubicacion: string;
  duenio: string | null;
};

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams();

  const clienteId = getParamValue((params as any)?.clienteId);

  /* =======================
     States
  ======================= */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    documento: "",
    email: "",
    password: "",
  });

  const [casas, setCasas] = useState<Casa[]>([]);

  const casasDelCliente = casas.filter(
    c => c.duenio === form.documento
  );
  
  const casasDisponibles = casas.filter(
    c => !c.duenio
  );

  const [loadingCasas, setLoadingCasas] = useState(true);

  /* =======================
     Fetch cliente
  ======================= */
  useEffect(() => {
    if (!clienteId) return;

    setLoading(true);

    fetch(`/api/users/${clienteId}`)
      .then(r => r.json())
      .then(data => {
        const u = data.user ?? data;

        setForm({
          nombre: u.nombre || "",
          documento: u.documento || "",
          email: u.email || "",
          password: "",
        });
      })
      .catch(() => setError("No se pudo cargar el cliente"))
      .finally(() => setLoading(false));
  }, [clienteId]);

  /* =======================
     Fetch casas (dueño)
  ======================= */
  const fetchCasas = () => {
    if (!form.documento) return;

    setLoadingCasas(true);

    fetch(`/api/users/${form.documento}/properties`)
      .then(r => r.json())
      .then(r => {
        console.log(r)
        if (Array.isArray(r)) {
          setCasas(r);
        } else {
          console.error("Respuesta inválida de properties:", r);
          setCasas([]);
        }
      })
      
      .finally(() => setLoadingCasas(false));
  };

  useEffect(() => {
    fetchCasas();
  }, [form.documento]);

  /* =======================
     Handlers
  ======================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!clienteId) {
      setError("ID de cliente inválido");
      return;
    }

    const res = await fetch(`/api/users/${clienteId}`, {
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

  const vincularCasa = async (casaId: number) => {
    await fetch(`/api/users/${form.documento}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ casaId }),
    });

    fetchCasas();
  };

  const desvincularCasa = async (casaId: number) => {
    await fetch(`/api/users/${form.documento}/properties`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ casaId }),
    });

    fetchCasas();
  };

  /* =======================
     Guards
  ======================= */
  if (!clienteId) {
    return (
      <p className="text-red-600 text-center">
        Ruta inválida: no se encontró el ID del cliente.
      </p>
    );
  }

  if (loading) {
    return <p className="text-gray-500">Cargando cliente…</p>;
  }

  /* =======================
     Render
  ======================= */
  return (
    <div className="max-w-xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Editar cliente</h1>
        <p className="text-gray-500">Modificar datos del cliente</p>
      </div>

      {/* FORM */}
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
          placeholder="Documento"
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

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Propiedades del cliente
          </h2>

          {casasDelCliente.length === 0 && (
            <p className="text-gray-500 text-sm">
              Este cliente no tiene propiedades asignadas.
            </p>
          )}

          <ul className="space-y-3">
            {casasDelCliente.map(casa => (
              <li
                key={casa.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <p className="font-medium">{casa.ubicacion}</p>

                <button
                  onClick={() => desvincularCasa(casa.id)}
                  className="px-4 py-2 text-sm rounded-lg
                            bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Desvincular
                </button>
              </li>
            ))}
          </ul>
        </div>


        {/* PROPIEDADES DISPONIBLES */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Propiedades disponibles
          </h2>

          {casasDisponibles.length === 0 && (
            <p className="text-gray-500 text-sm">
              No hay propiedades disponibles.
            </p>
          )}

          <ul className="space-y-3">
            {casasDisponibles.map(casa => (
              <li
                key={casa.id}
                className="border rounded-xl p-4 flex justify-between items-center"
              >
                <p className="font-medium">{casa.ubicacion}</p>

                <button
                  onClick={() => vincularCasa(casa.id)}
                  className="px-4 py-2 text-sm rounded-lg
                            bg-green-600 text-white hover:bg-green-700"
                >
                  Vincular como dueño
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
