'use client'
import Link from "next/link";
import { Casa } from "@/types/casa.interface";
import { useEffect, useState } from "react";
import HorizontalCardAdmin from "./components/HorizontalCardAdmin";
import { CasaCliente } from "@/types/casacliente.interface";
import { User } from "@/types/user.interface";

export default function Casas() {
    const [casas, setCasas] = useState<Array<Casa>>([]);
    const [casasClientes, setCasasClientes] = useState<Array<CasaCliente>>([]);
    const [usuarios, setUsuarios] = useState<Array<User>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [ubicacionFiltro, setUbicacionFiltro] = useState<string>("");
    const [ordenarPor, setOrdenarPor] = useState<string>("alfabetico");

    // Cargar Casas
    const getCasas = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/casas/`);
            if (response.ok) {
                const data = await response.json();
                setCasas(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getCasasClientes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/casacliente/`);
            if (response.ok) {
                const data = await response.json();
                setCasasClientes(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const getUsuarios = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/`);
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(() => {
        getCasas();
        getCasasClientes();
        getUsuarios();
    }, []);

    const obtenerDueno = (casaId: number) => {
        if (!casasClientes.length || !usuarios.length) return "Cargando...";
        const relacion = casasClientes.find((rel) => rel.casa_id === casaId);
        if (!relacion) return "Sin dueño";
        const dueno = usuarios.find((user) => user.documento === relacion.user_id);
        return dueno ? dueno.nombre : "Desconocido";
    };
    
    const obtenerInquilino = (inquilinoId: number | undefined) => {
        if (!usuarios.length) return "Cargando...";
        if (!inquilinoId) return "Sin inquilino";
        const inquilino = usuarios.find((user) => user.documento === inquilinoId);
        return inquilino ? inquilino.nombre : "Desconocido";
    };

    // Filtrar por ubicación
    const casasFiltradas = casas.filter(casa =>
        casa.ubicacion.toLowerCase().includes(ubicacionFiltro.toLowerCase())
    );

    // Ordenar casas
    const ordenarCasas = (casas: Array<Casa>) => {
        if (ordenarPor === "alfabetico") {
            return casas.sort((a, b) => a.ubicacion.localeCompare(b.ubicacion));
        } else if (ordenarPor === "inquilino") {
            return casas.sort((a, b) => {
                const aTieneInquilino = a.inquilino ? 1 : 0;
                const bTieneInquilino = b.inquilino ? 1 : 0;
                return bTieneInquilino - aTieneInquilino;
            });
        }
        return casas;
    };

    return (
        <div className="py-5 m-5 bg-[#fffce0]">
            <Link className="ml-5" href={'/admin'}>
                Volver
            </Link>
            <p className="text-4xl text-center font-semibold mb-[30px] text-[#a49271]">INMUEBLES</p>
            
           <div className="grid grid-cols-2 items-center text-center">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filtrar por ubicación"
                        value={ubicacionFiltro}
                        onChange={(e) => setUbicacionFiltro(e.target.value)}
                        className="px-4 py-2 border rounded-lg md:w-[50%]"
                        />
                </div>
                
                {/* Selector de Orden */}
                <div className="mb-4">
                    <select
                        value={ordenarPor}
                        onChange={(e) => setOrdenarPor(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                        >
                        <option value="alfabetico">Orden Alfabético</option>
                        <option value="inquilino">Primero con Inquilino</option>
                    </select>
                </div>
            </div>
            
            {
                loading
                    ? <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
                    :
                    <div className="items-center flex flex-col">
                        {ordenarCasas(casasFiltradas)
                            .map((casa) => (
                                <HorizontalCardAdmin
                                    key={casa.id}
                                    image={casa.imagen}
                                    ubicacion={casa.ubicacion}
                                    valor={casa.valor}
                                    dormitorios={casa.dormitorios}
                                    ambientes={casa.ambientes}
                                    banos={casa.banos}
                                    cochera={casa.cochera}
                                    tipo={casa.tipo}
                                    contrato={casa.contrato}
                                    inquilino={obtenerInquilino(casa.inquilino)}
                                    pago={casa.pago}
                                    m2={casa.m2}
                                    id={casa.id}
                                    dueno={obtenerDueno(casa.id)}
                                    comprobanteUltimo={casa.comprobanteUltimo}
                                />
                            ))}
                    </div>
            }
        </div>
    );
}
