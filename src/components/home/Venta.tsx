import Link from "next/link";
import RecommendedCard from "./RecommendedCards";
import { Casa } from "@/types/casa.interface";

async function getCasas(): Promise<Casa[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/casas`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const result = await res.json();

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.casas)) return result.casas;

  return [];
}

export default async function Venta() {
  const data = await getCasas();

  const casasFiltradas = data
    .filter((c) => c.operacion === "venta")
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <section className="mb-20">
      <Link href="/ventas">
        <h2 className="section-title hover:text-[#8a7b5e] transition text-center">
          Últimos inmuebles en venta
        </h2>
      </Link>

      <p className="section-subtitle text-center">
        Propiedades disponibles para comprar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
        {casasFiltradas.map((venta) => (
          <RecommendedCard
            key={venta.id}
            id={venta.id}
            image={venta.imagen}
            ubicacion={venta.ubicacion}
            valor={venta.valor}
            dormitorios={venta.dormitorios}
            ambientes={venta.ambientes}
            banos={venta.banos}
            cochera={venta.cochera}
          />
        ))}
      </div>
    </section>
  );
}