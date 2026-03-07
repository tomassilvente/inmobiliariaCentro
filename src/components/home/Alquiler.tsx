import Link from "next/link";
import RecommendedCard from "./RecommendedCards";
import { Casa } from "@/types/casa.interface";

async function getCasas(): Promise<Casa[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/casas`, {
    cache: "no-store", // o revalidate si te sirve
  });

  if (!res.ok) return [];
  const result = await res.json();
  return Array.isArray(result) ? result : (Array.isArray(result?.casas) ? result.casas : []);
}

export default async function Alquiler() {
  const data = await getCasas();

  const casasFiltradas = data
    .filter((c) => c.operacion === "alquiler" && !c.contrato_id)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <section className="mb-20">
      <Link href="/alquileres">
        <h2 className="section-title hover:text-[#8a7b5e] transition text-center">
          Últimos inmuebles en alquiler
        </h2>
      </Link>

      <p className="section-subtitle text-center">Propiedades disponibles para alquilar</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
        {casasFiltradas.map((alquiler) => (
          <RecommendedCard
            key={alquiler.id}
            id={alquiler.id}
            image={alquiler.imagen}
            ubicacion={alquiler.ubicacion}
            valor={alquiler.valor}
            dormitorios={alquiler.dormitorios}
            ambientes={alquiler.ambientes}
            banos={alquiler.banos}
            cochera={alquiler.cochera}
          />
        ))}
      </div>
    </section>
  );
}