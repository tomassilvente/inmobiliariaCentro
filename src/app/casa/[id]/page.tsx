'use client'
import { Casa } from "@/types/casa.interface"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Casas({ params }: any) {
    const [data, setData] = useState<Array<Casa>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getCasa = async () => {
            try {
                const response = await fetch(`/api/casas/${params.id}`, {
                    method: 'GET',
                    next: { revalidate: 5000 }
                })
                if (response) {
                    const { casa } = await response.json()
                    if (casa) setData(casa)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getCasa()
    }, [params.id])

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
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2">{data[0]?.ubicacion}</h2>
                                <p className="text-base md:text-lg text-gray-600">{data[0].tipo === 'casa' ? 'Casa' : 'Departamento'} de {data[0].m2} m²</p>
                                <p className="mt-4 text-gray-600 text-sm md:text-base">
                                    {data[0].ambientes} ambientes, {data[0].dormitorios} {data[0].dormitorios > 1 ? 'dormitorios' : 'dormitorio'}, y {data[0].banos} {data[0].banos > 1 ? 'baños' : 'baño'}.
                                </p>
                                <p className="text-gray-600 mt-2 text-sm md:text-base">
                                    {data[0].cochera ? 'Incluye cochera.' : 'No incluye cochera.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-center w-full md:w-2/5 bg-green-50 p-5 rounded-xl shadow-md">
                                <p className="text-sm md:text-lg text-green-700 font-medium mb-4 text-center">
                                    Disponible para alquiler, ¡contáctanos para más información!
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
