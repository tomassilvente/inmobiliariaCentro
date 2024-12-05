"use client"
import { useEffect, useState } from 'react';
import RecommendedCard from './RecommendedCards';
import { Casa } from '@/types/casa.interface';

export default function Alquiler() {
    const [data, setData] = useState<Array<Casa>>([]);
    const [Loading, setLoading] = useState<boolean>(true);

    const getCasas = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/casas/`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
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

    return (
        <div className="mt-5 py-8 px-4 bg-[#fffbdc] rounded-lg border shadow-lg max-w-6xl mx-auto">
            <h1 className="text-center text-3xl font-bold text-gray-800">Últimos inmuebles en alquiler</h1>

            {Loading ? (
                <h1 className="text-center mt-[150px] mb-[150px] text-2xl font-medium text-gray-600">Cargando Casas...</h1>
            ) : (
                <>
                    {/* Versión de escritorio */}
                    <div className="hidden md:flex flex-wrap justify-center gap-6 mt-8">
                        {data.filter((x: Casa) => x.contrato).map((alquiler: Casa) => (
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
                        {data.filter((x: Casa) => x.contrato).slice(0, 2).map((alquiler: Casa) => (
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
