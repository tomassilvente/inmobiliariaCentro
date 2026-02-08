'use client';
import { useEffect, useState } from 'react';
import RecommendedCard from './RecommendedCards';
import { Casa } from '@/types/casa.interface';
import Link from 'next/link';

export default function Alquiler() {
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
            console.log(result)
    
            // Verificamos si la API devuelve un array directamente o dentro de un objeto
            if (Array.isArray(result)) {
                setData(result);
            } else if (result && Array.isArray(result.casas)) {
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
        console.log(data)
    }, []);

    // Filtrar casas que tienen contrato, no tienen inquilino y ordenar por ID (mayor primero)
    const casasFiltradas = data
    .filter(
      (casa) =>
        casa.operacion === "alquiler" &&
        casa.contrato_id_activo === null
    )
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

    return (  
        <section className="mb-20">
        <Link href="/alquileres">
          <h2 className="section-title hover:text-[#8a7b5e] transition text-center">
            Últimos inmuebles en alquiler
          </h2>
        </Link>
      
        <p className="section-subtitle text-center">
          Propiedades disponibles para alquilar
        </p>
      
        {Loading ? (
          <p className="text-center mt-20 text-gray-500">
            Cargando propiedades...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
            {casasFiltradas.slice(0, 3).map((alquiler: Casa) => (
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
        )}
      </section>
    );
}
