'use client';

import { useEffect, useState } from "react";
import HorizontalCardAdmin from "./components/HorizontalCardAdmin";
import IniciarAlquilerModal from "./components/IniciarAlquilerModal";
import { User } from "@/types/user.interface";


type Casa = {
  id: number;
  ubicacion: string;
  direccion?: string;
  valor: string;
  dormitorios: number;
  ambientes: number;
  banos: number;
  cochera: boolean;
  tipo: string;
  m2: number;
  imagen: string;
  dueno: string | null;

  contrato_id: number | null;
  inquilino_nombre: string | null;
};

export default function CasasPage() {
  const [casas, setCasas] = useState<Casa[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalCasa, setModalCasa] = useState(null);

  const [ubicacionFiltro, setUbicacionFiltro] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("alfabetico");

  const [estadoFiltro, setEstadoFiltro] = useState("todas");

  // 🔄 cargar casas
  const cargarCasas = async () => {
    try {
      const res = await fetch("/api/casas");
      const data = await res.json();

      setCasas(data);
    } catch (error) {
      console.error("Error cargando casas:", error);
    } finally {
      setLoading(false);
    }
  };

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
    cargarCasas();
    cargarUsuarios();
  }, []);


  const casasFiltradas = casas
  .filter((c) =>
    c.ubicacion.toLowerCase().includes(ubicacionFiltro.toLowerCase())
  )
  .filter((c) => {
    const operacion = (c.operacion || "").toLowerCase();

    console.log(casas);

    if (estadoFiltro === "venta") {
      return operacion.includes("venta");
    }

    if (estadoFiltro === "alquiler") {
      return operacion.includes("alquiler") && !c.contrato_id;
    }

    if (estadoFiltro === "alquiladas") {
      return operacion.includes("alquiler") && !!c.contrato_id;
    }

    return true;
  })
  .sort((a, b) => {
    if (ordenarPor === "inquilino") {
      return Number(!!b.contrato_id) - Number(!!a.contrato_id);
    }

    return a.ubicacion.localeCompare(b.ubicacion);
  });

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#212121]">
          Inmuebles
        </h1>
        <p className="text-gray-500 mt-1">
          Gestión completa de propiedades
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm mb-8 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Filtrar por ubicación"
          value={ubicacionFiltro}
          onChange={(e) => setUbicacionFiltro(e.target.value)}
          className="input-admin"
        />

        <select
          value={ordenarPor}
          onChange={(e) => setOrdenarPor(e.target.value)}
          className="input-admin"
        >
          <option value="alfabetico">Orden alfabético</option>
          <option value="inquilino">Primero alquiladas</option>
        </select>

        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
          className="input-admin"
        >
          <option value="todas">Todas</option>
          <option value="venta">En venta</option>
          <option value="alquiler">En alquiler</option>
          <option value="alquiladas">Alquiladas</option>
        </select>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Cargando inmuebles...</p>
      ) : (
        <div className="flex flex-col gap-4">

          {casasFiltradas.map((casa) => (
            <HorizontalCardAdmin
            key={casa.id}
            casa={casa}
            setModalCasa={setModalCasa}
          />
          ))}

        </div>
      )}

        {modalCasa && (
        <IniciarAlquilerModal
            casa={modalCasa}
            usuarios={users}
            onClose={() => setModalCasa(null)}
            onSuccess={cargarCasas}
        />
        )}
    </div>
  );
}