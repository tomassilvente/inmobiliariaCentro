"use client"
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
    }, []);

    // Filtrar casas que tienen contrato, no tienen inquilino y ordenar por ID (mayor primero)
    const casasFiltradas = data
        .filter((x: Casa) => x.contrato && !x.inquilino)  // Filtrar casas en alquiler y sin inquilino
        .sort((a: Casa, b: Casa) => b.id - a.id) // Ordenar por ID (descendente, mayor ID primero)
        .slice(0, 3); // Tomar solo las 3 últimas casas

    return (
        <div className="mt-5 py-8 px-4 bg-[#fffbdc] rounded-lg border shadow-lg max-w-6xl mx-auto">
            <Link href='/alquileres' >
                <h1 className="text-center text-3xl font-bold text-gray-800 hover:text-gray-400">Últimos inmuebles en alquiler</h1>
            </Link>

            {Loading ? (
                <h1 className="text-center mt-[150px] mb-[150px] text-2xl font-medium text-gray-600">Cargando Casas...</h1>
            ) : (
                <>
                    {/* Versión de escritorio */}
                    <div className="hidden md:flex flex-wrap justify-center gap-6 mt-8">
                        {casasFiltradas.map((alquiler: Casa) => (
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

                    {/* Versión móvil */}
                    <div className="flex md:hidden flex-wrap justify-center gap-6 mt-8">
                        {casasFiltradas.map((alquiler: Casa) => (
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
                </>
            )}
        </div>
    );
}
