"use client";

import { useEffect, useState } from "react";
import { Casa } from "@/types/casa.interface";
import { CasaCliente } from "@/types/casacliente.interface";
import { User } from "@/types/user.interface";
import HorizontalCard from "../../components/common/HorizontalCard";

export default function MisPropiedades() {
    const [casas, setCasas] = useState<Array<Casa>>([]);
    const [casasClientes, setCasasClientes] = useState<Array<CasaCliente>>([]);
    const [usuarios, setUsuarios] = useState<Array<User>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const storedNombre = typeof window !== "undefined" ? localStorage.getItem("nombre") : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [casasRes, casasClientesRes, usuariosRes] = await Promise.all([
                    fetch("http://localhost:3000/api/casas/").then(res => res.json()),
                    fetch("http://localhost:3000/api/casacliente/").then(res => res.json()),
                    fetch("http://localhost:3000/api/users/").then(res => res.json()),
                ]);
                
                setCasas(casasRes);
                setCasasClientes(casasClientesRes);
                setUsuarios(usuariosRes);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Obtener el documento del usuario logueado
    const usuarioActual = usuarios.find(user => user.nombre === storedNombre);
    const documentoUsuario = usuarioActual?.documento;

    // Filtrar las casas que pertenecen al usuario actual
    const misCasas = casas.filter(casa =>
        casasClientes.some(rel => rel.casa_id === casa.id && rel.user_id === documentoUsuario)
    );

    // Separar casas en venta y en alquiler
    const casasVenta = misCasas.filter(casa => !casa.inquilino);
    const casasAlquiler = misCasas.filter(casa => casa.inquilino);

    // Obtener el nombre del inquilino si hay contrato
    const obtenerInquilino = (inquilinoId: number | undefined) => {
        if (!inquilinoId) return "Sin inquilino";
        const inquilino = usuarios.find(user => user.documento === inquilinoId);
        return inquilino ? inquilino.nombre : "Desconocido";
    };

    return (
        <div className="py-5 m-5 bg-[#fffce0]">
            <h1 className="text-4xl text-center font-semibold mb-[30px] text-[#a49271]">MIS PROPIEDADES</h1>
            {loading ? (
                <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
            ) : (
                <>
                    {casasVenta.length > 0 && (
                        <>
                            <h2 className="text-3xl text-center font-semibold my-4 text-[#a49271]">Casas a la venta</h2>
                            <div className="items-center flex flex-col">
                                {casasVenta.map((casa) => (
                                    <HorizontalCard
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
                                        comprobanteUltimo={casa.comprobanteUltimo}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {casasAlquiler.length > 0 && (
                        <>
                            <h2 className="text-3xl text-center font-semibold my-4 text-[#a49271]">Casas en Alquiler</h2>
                            <div className="items-center flex flex-col">
                                {casasAlquiler.map((casa) => (
                                    <HorizontalCard
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
                                        comprobanteUltimo={casa.comprobanteUltimo}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {casasVenta.length === 0 && casasAlquiler.length === 0 && (
                        <p className="text-center text-xl text-gray-600">No tienes propiedades registradas.</p>
                    )}
                </>
            )}
        </div>
    );
}
