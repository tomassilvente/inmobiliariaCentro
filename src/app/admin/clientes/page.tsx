'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ClientesAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [casasCliente, setCasasCliente] = useState<any[]>([]);
  const [contratos, setContratos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando casas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/users").then(r => r.json()),
      fetch("/api/casacliente").then(r => r.json()),
      fetch("/api/contratos").then(r => r.json()),
    ])
      .then(([users, casasCliente, contratos]) => {
        setUsers(users);
        setCasasCliente(casasCliente);
        setContratos(contratos);
      })
      .finally(() => setLoading(false));
  }, []);

  const obtenerCasasComoDueno = (userId: number) => {
    return casasCliente.filter(
      c => c.user_id === userId && c.rol === 'DUENO' && c.activo === 1
    );
  };
  
  const obtenerContratosComoInquilino = (userId: number) => {
    return contratos.filter(
      c => Number(c.inquilino_id) === userId && Number(c.activo) === 1
    );
  };
  
  

  if (loading) {
    return <p className="text-gray-500">Cargando clientes…</p>;
  }

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#212121]">Clientes</h1>
        <p className="text-gray-500">
          Dueños e inquilinos del sistema
        </p>
      </div>

      <div className="flex flex-col gap-4">

      {users.map(user => {
        const casasDueno = obtenerCasasComoDueno(user.id);
        const contratosInquilino = obtenerContratosComoInquilino(user.id);

        console.log("USER ID:", user.id);

        contratos.forEach(c => {
          console.log({
            contrato_id: c.id,
            inquilino_id: c.inquilino_id,
            inquilino_id_type: typeof c.inquilino_id,
            activo: c.activo,
            activo_type: typeof c.activo,
          });
        });



          return (
            <div
              key={user.id}
              className="bg-white rounded-2xl border shadow-sm p-5"
            >
              <div className="flex justify-between">

                <div>
                  <h3 className="font-semibold text-lg">{user.nombre}</h3>
                  <p className="text-sm text-gray-500">
                    DNI {user.documento} · {user.email}
                  </p>
                </div>

                <Link href={`/admin/clientes/${user.documento}`}
                  className="text-sm text-[#8a7b5e] hover:underline"
                >
                  Editar
                </Link>
              </div>

              {/* DUEÑO */}
              <div className="mt-4">
                <p className="font-medium text-sm text-gray-700">
                  Propiedades como dueño:
                </p>

                {casasDueno.length === 0 && (
                  <p className="text-sm text-gray-400">— Ninguna</p>
                )}

                {casasDueno.map(c => (
                  <p key={c.id} className="text-sm text-green-700">
                    🏠 Casa #{c.casa_id}
                  </p>
                ))}
              </div>

              {/* INQUILINO */}
              <div className="mt-3">
                <p className="font-medium text-sm text-gray-700">
                  Alquileres activos:
                </p>

                {contratosInquilino.length === 0 && (
                  <p className="text-sm text-gray-400">— Ninguno</p>
                )}

                {contratosInquilino.map(c => (
                  <p key={c.id} className="text-sm text-blue-700">
                    🔑 Casa #{c.casa_id} · ${c.monto}
                  </p>
                ))}
              </div>

            </div>
          );
        })}

      </div>

      {/* NUEVO */}
      <div className="mt-10 text-center">
        <Link
          href="/admin/clientes/nuevo-cliente"
          className="inline-block bg-[#8a7b5e] text-white px-6 py-3 rounded-xl hover:bg-[#766851]"
        >
          + Nuevo cliente
        </Link>
      </div>

    </div>
  );
}