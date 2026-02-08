"use client"
import { useEffect, useState } from 'react';
import RecommendedCard from './RecommendedCards';
import { Casa } from '@/types/casa.interface';
import Link from 'next/link';

export default function Venta() {
    const [data, setData] = useState<Array<Casa>>([]);
    const [Loading, setLoading] = useState<boolean>(true);

    const getCasas = async () => {
      try {
          const response = await fetch(`http://localhost:3000/api/casas/`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
          });
  
          if (!response.ok) {
              throw new Error(`Error HTTP: ${response.status}`);
          }
  
          const result = await response.json();
  
          // Verificamos si la API devuelve un array directamente o dentro de un objeto
          if (Array.isArray(result)) {
              setData(result);
          } else if (result && Array.isArray(result.casas)) {
              console.log(result.casas)
              setData(result.casas);
          } else {
              console.error("La respuesta de la API no contiene un array válido:", result);
              setData([]); // Aseguramos que data sea siempre un array
          }
      } catch (error) {
          console.error("Error en la petición:", error);
          setData([]); // Evitamos que data sea undefined
      } finally {
          setLoading(false);
      }
  };

    useEffect(() => {
        getCasas();
    }, []);

    // Filtrar las casas en venta que no tienen contrato y ordenar por id descendente
    const filteredData = data
      .filter((casa) => casa.operacion === "venta" )
      .sort((a, b) => b.id - a.id)
      .slice(0, 3);

      console.log(data)
    return (
        <section className="mb-20">
        <Link href="/venta">
          <h2 className="section-title hover:text-[#8a7b5e] transition text-center">
            Últimos inmuebles en Venta
          </h2>
        </Link>
      
        <p className="section-subtitle text-center">
          Propiedades disponibles para comprar
        </p>
      
        {Loading ? (
          <p className="text-center mt-20 text-gray-500 ">
            Cargando propiedades...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
            {filteredData.slice(0, 3).map((venta: Casa) => (
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
        )}
      </section>
    );
}
