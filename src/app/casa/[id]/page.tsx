'use client'
import { Casa } from "@/types/casa.interface"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Casas({ params }: any) {
    const [data, setData] = useState<Array<Casa>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getCasa = async () => {
            try {
                const response = await fetch(`/api/casas/${params.id}`)
                if (!response.ok) throw new Error("Error al obtener la propiedad")
    
                    const { casa } = await response.json()
                    if (casa) setData(Array.isArray(casa) ? casa : [casa]) // ← Ahora siempre será un array
                    
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getCasa()
    }, [params.id]) // ← Ahora se ejecuta cada vez que cambia el ID
    

    return (
        <div className="m-5 p-6 bg-gray-50 border border-gray-200 shadow-lg rounded-2xl">
            {
                loading ? (
                    <p className="text-2xl md:text-3xl text-center text-gray-600 my-20">Cargando...</p>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6">
                            <Image 
                                className="w-full md:w-[40%] lg:w-[50%] rounded-lg shadow-md object-cover" 
                                src={data[0]?.imagen} 
                                alt="Imagen de la propiedad" 
                                width={500} 
                                height={500} 
                                style={{ maxHeight: '500px' }} 
                            />
                        <div className="flex flex-col md:flex-row gap-8 md:w-[60%]">
                        <div className="w-full md:w-3/5">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">{data[0]?.ubicacion}</h2>

                            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-center gap-3">
                                        <span className="text-lg">🏡</span>
                                        <span className="text-base md:text-lg">{data[0]?.tipo === 'casa' ? 'Casa' : 'Departamento'} de <b>{data[0]?.m2} m²</b></span>
                                    </li>

                                    <li className="flex items-center gap-3">
                                        <span className="text-lg">🛋️</span>
                                        <span className="text-base md:text-lg"><b>{data[0]?.ambientes}</b> ambientes</span>
                                    </li>

                                    <li className="flex items-center gap-3">
                                        <span className="text-lg">🛏️</span>
                                        <span className="text-base md:text-lg"><b>{data[0]?.dormitorios}</b> {data[0]?.dormitorios > 1 ? 'dormitorios' : 'dormitorio'}</span>
                                    </li>

                                    <li className="flex items-center gap-3">
                                        <span className="text-lg">🛁</span>
                                        <span className="text-base md:text-lg"><b>{data[0]?.banos}</b> {data[0]?.banos > 1 ? 'baños' : 'baño'}</span>
                                    </li>

                                    <li className="flex items-center gap-3">
                                        <span className="text-lg">🚗</span>
                                        <span className="text-base md:text-lg">{data[0]?.cochera ? 'Incluye cochera' : 'No incluye cochera'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                            <div className="flex flex-col items-center w-full md:w-2/5 bg-green-50 p-5 rounded-xl shadow-md">
                                <p className="text-sm md:text-lg text-green-700 font-medium mb-4 text-center">
                                    ¡ Disponible para alquiler !
                                </p>
                                <p className="text-sm md:text-lg text-green-700 font-medium mb-4 text-center">
                                    Si se encuentra interesado, por favor presentarse cuanto antes con :   
                                </p>
                                <ul className=" text-green-700 font-medium mb-4 text-center">
                                    <li>
                                        - Documento de Identidad 
                                    </li>
                                    <li>
                                        - Último recibo de sueldo 
                                    </li>
                                    <li>
                                        - Referencia laboral y familiar
                                    </li>
                                </ul>
                                <p className="text-sm md:text-lg text-green-700 font-medium mb-4 text-center">
                                    Y tener en cuenta que debe contar con:   
                                </p>
                                <ul className=" text-green-700 font-medium mb-4 text-center">
                                    <li>
                                        - Depósito de seguridad (Valor de un alquiler y medio)
                                    </li>
                                    <li>
                                        - Formulario de solicitud de alquiler
                                    </li>
                                    <li>
                                        - Garante de poseción para un mínimo de alquiler de 3 meses
                                    </li>
                                </ul>
                                <p className="text-sm md:text-lg text-green-700 font-medium mb-4 text-center ">
                                    Te esperamos en 25 de mayo 482 de Lunes a Viernes de 09:00 a 15:00
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
