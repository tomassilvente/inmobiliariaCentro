'use client';

import { useEffect, useState } from "react";

export default function AdminPage() {

  const [stats, setStats] = useState({
    inmuebles: 0,
    alquileres: 0,
    pagosMes: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [casasRes, contratosRes, pagosRes] = await Promise.all([
          fetch("/api/casas"),
          fetch("/api/contratos"),
          fetch("/api/pagos"),
        ]);

        const casas = await casasRes.json();
        const contratos = await contratosRes.json();
        const pagos = await pagosRes.json();

        // 🏠 inmuebles
        const inmuebles = Array.isArray(casas) ? casas.length : 0;

        // 📄 alquileres activos
        const alquileres = Array.isArray(contratos)
          ? contratos.filter((c: any) => c.activo === 1).length
          : 0;

        // 💰 pagos del mes actual
        const now = new Date();
        const mes = now.getMonth();
        const anio = now.getFullYear();

        const pagosMes = Array.isArray(pagos)
          ? pagos
              .filter((p: any) => {
                const f = new Date(p.fecha_pago);
                return (
                  f.getMonth() === mes &&
                  f.getFullYear() === anio
                );
              })
              .reduce(
                (acc: number, p: any) => acc + Number(p.monto || 0),
                0
              )
          : 0;

        setStats({
          inmuebles,
          alquileres,
          pagosMes,
        });

      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const formatARS = (n: number) =>
    n.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

  return (
    <div>

      <h1 className="text-3xl font-bold text-[#212121] mb-2">
        Dashboard
      </h1>

      <p className="text-gray-500 mb-10">
        Panel de administración general
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <Stat
          title="Inmuebles"
          value={loading ? "—" : stats.inmuebles}
        />

        <Stat
          title="Alquileres activos"
          value={loading ? "—" : stats.alquileres}
        />

        <Stat
          title="Pagos del mes"
          value={loading ? "—" : formatARS(stats.pagosMes)}
        />

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Action
          title="Crear inmueble"
          href="/admin/crear-casa"
        />

        <Action
          title="Ver propiedades"
          href="/admin/casas"
        />

      </div>

    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-[#212121] mt-2">
        {value}
      </p>
    </div>
  );
}

function Action({ title, href }: any) {
  return (
    <a
      href={href}
      className="
        bg-white
        p-6
        rounded-2xl
        border
        shadow-sm
        hover:shadow-md
        transition
        flex
        justify-between
        items-center
      "
    >
      <span className="text-lg font-medium">
        {title}
      </span>

      <span className="text-[#8a7b5e] font-bold text-xl">
        →
      </span>
    </a>
  );
}
