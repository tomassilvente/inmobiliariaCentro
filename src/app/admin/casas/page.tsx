'use client'
import Link from "next/link";
import { Casa } from "@/types/casa.interface";
import { useEffect, useState } from "react";
import HorizontalCardAdmin from "./components/HorizontalCardAdmin";

export default function Casas() {

    const [data, setData] = useState<Array<Casa>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getCasas = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/casas/`, {
                method: 'GET',
                next: {
                    revalidate: 5000
                }
            });
            if (response) { 
                const data = await response.json();
                console.log(data);
                if (data) setData(data);
            }
        } catch (error) { 
            console.log(error);
        } finally { 
            setLoading(false);
        }
    };

    useEffect(() => {
        getCasas();
    }, []); 

    return (
        <div className="py-5 m-5 bg-[#fffce0]">
            <Link className="ml-5" href={'/admin'}>
                Volver
            </Link>
            <p className="text-4xl text-center font-semibold mb-[30px] text-[#a49271]">INMUEBLES</p>
            {
                loading
                ? <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
                :
                <div className="items-center flex flex-col">
                    {data && data.sort((a: Casa, b: Casa) => a.ubicacion.localeCompare(b.ubicacion))
                        .map((casa) => (
                            <HorizontalCardAdmin
                                key={casa.id}
                                image={casa.imagen}          ubicacion={casa.ubicacion} 
                                valor={casa.valor}           dormitorios={casa.dormitorios} 
                                ambientes={casa.ambientes}   banos={casa.banos} 
                                cochera={casa.cochera}       tipo={casa.tipo}
                                m2={casa.m2}                 id={casa.id}
                            />   
                        ))}
                </div>
            }
        </div>
    );
}
