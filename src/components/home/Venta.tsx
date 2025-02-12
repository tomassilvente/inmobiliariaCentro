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
                next: { revalidate: 5000 }
            });
            if (response) { 
                const data = await response.json();
                if (data) setData(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCasas();
    }, []);

    // Filtrar las casas en venta que no tienen contrato y ordenar por id descendente
    const filteredData = data
        .filter((casa: Casa) => casa.contrato == null) // Solo casas sin contrato
        .sort((a, b) => b.id - a.id) // Ordenar por id descendente (últimas casas primero)
        .slice(0, 3); // Tomar solo las 3 últimas casas

    return (
        <div className="mt-5 py-8 px-4 bg-[#fffbdc] rounded-lg border shadow-lg max-w-6xl mx-auto">
            <Link href='/venta' >
                <h1 className="text-center text-3xl font-bold text-gray-800 hover:text-gray-400">Últimos inmuebles en venta</h1>
            </Link>

            {Loading ? (
                <h1 className="text-center mt-[150px] mb-[150px] text-2xl font-medium text-gray-600">Cargando Casas...</h1>
            ) : (
                <>
                    {/* Versión de escritorio */}
                    <div className="hidden md:flex flex-wrap justify-center gap-6 mt-8">
                        {filteredData.map((venta: Casa) => (
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

                    {/* Versión móvil */}
                    <div className="flex md:hidden flex-wrap justify-center gap-6 mt-8">
                        {filteredData.slice(0, 2).map((venta: Casa) => (
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
                </>
            )}
        </div>
    );
}
