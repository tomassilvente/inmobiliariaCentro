'use client'
import { useEffect, useState } from 'react';
import HorizontalCard from '../../components/common/HorizontalCard';
import { Casa } from '@/types/casa.interface';
import Link from 'next/link';

export default function Venta(){

    const [data, setData] = useState<Array<Casa>>([])
    const [loading, setLoading] = useState<boolean>(true) // <-- Corregido: "Loading" con minúscula
    const [direccionFilter, setDireccionFilter] = useState<string>('');

    useEffect(() => {
        const getCasas = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/casas/`, {
                    method: 'GET',
                    next: { revalidate: 5000 }
                });

                if (response.ok) { // Verifica que la respuesta sea exitosa
                    const casas = await response.json();
                    setData(casas);
                } else {
                    console.error("Error al obtener casas:", response.status);
                }
            } catch (error) {
                console.error("Error en la petición:", error);
            } finally {
                setLoading(false);
            }
        };

        getCasas();
    }, []); // <-- Se ejecuta solo una vez al montar el componente

    // Filtrar casas basadas en la dirección ingresada
    const filteredData = data.filter(casa => {
        const matchesDireccion = direccionFilter ? casa.ubicacion.toLowerCase().includes(direccionFilter.toLowerCase()) : true;
        return !casa.contrato && matchesDireccion;
    });

    return (
        <div className="mt-5 py-5 flex flex-col items-center">
            
            <p className="text-4xl text-center font-semibold mb-[50px] text-[#8a7b5e]">Ventas</p>
            
            {/* Filtro por dirección */}
            <div className="mb-6">
                <input
                    type="text"
                    className="border p-2 rounded"
                    placeholder="Filtrar por dirección"
                    value={direccionFilter}
                    onChange={(e) => setDireccionFilter(e.target.value)}
                />
            </div>

            {loading ? (
                <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
            ) : (
                filteredData.map((venta) => (
                    <Link key={venta.id}       href={`/casa/${venta.id}`}>
                        <HorizontalCard
                          
                            image={venta.imagen}          ubicacion={venta.ubicacion} 
                            valor={venta.valor}           dormitorios={venta.dormitorios} 
                            ambientes={venta.ambientes}   banos={venta.banos} 
                            cochera={venta.cochera}       tipo={venta.tipo}
                            m2={venta.m2}                 id={venta.id}
                            />    
                    </Link>
                ))
            )}
        </div>
    );
}
