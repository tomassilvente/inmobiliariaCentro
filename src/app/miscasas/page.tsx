"use client";

import { useEffect, useState } from "react";
import { Casa } from "@/types/casa.interface";
import HorizontalCard from "@/components/common/HorizontalCard";

interface MisCasasResponse {
  venta: Casa[];
  alquiler: Casa[];
}

export default function MisPropiedades() {
  const [data, setData] = useState<MisCasasResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMisCasas = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        const res = await fetch("/api/me/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("No autorizado");

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMisCasas();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Cargando propiedades...</p>;
  }

  if (!data || (data.venta.length === 0 && data.alquiler.length === 0)) {
    return (
      <p className="text-center mt-20 text-gray-600">
        No tienes propiedades registradas
      </p>
    );
  }

  console.log(data)
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-4xl text-center mb-10 text-[#a49271] font-semibold">
        Mis Propiedades
      </h1>

      {data.alquiler.length > 0 && (
        <>
          <h2 className="text-2xl mb-4 text-[#a49271]">En alquiler</h2>
          <div className="space-y-6">
            {data.alquiler.map((casa) => (
              <HorizontalCard key={casa.id} {...casa} />
            ))}
          </div>
        </>
      )}

      {data.venta.length > 0 && (
        <>
          <h2 className="text-2xl mt-10 mb-4 text-[#a49271]">En venta</h2>
          <div className="space-y-6">
            {data.venta.map((casa) => (
              <HorizontalCard key={casa.id} {...casa} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
