import Image from "next/image";
import Link from "next/link";
import SvgTrashcan from "../../../../../public/assets/trashcan";
import SvgPen from "../../../../../public/assets/pen";

type CardProps = {
    image: string;
    ubicacion: string;
    valor: string;
    dormitorios: number;
    ambientes: number;
    banos: number;
    m2: number;
    cochera: boolean;
    tipo: string;
    id: number;
    contrato?: string;
    inquilino?: string | null;
    pago?: string;  // Aquí guardamos la fecha del pago
    comprobanteUltimo?: string;  // Nueva propiedad para la imagen del comprobante
    dueno: string;
};

const deleteCasa = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:3000/api/casas/${id}`, {
            method: 'DELETE',
            next: { revalidate: 5000 }
        });
        if (response.ok) { 
            console.log(`Casa con ID ${id} eliminada correctamente.`);
        }
    } catch (error) { 
        console.log(error);
    }
};

export default function HorizontalCardAdmin({
    image,
    ubicacion,
    valor,
    dormitorios,
    ambientes,
    banos,
    cochera,
    tipo,
    m2,
    id,
    contrato,
    inquilino,
    pago,
    comprobanteUltimo,
    dueno
}: CardProps) {
    return (
        <div className="flex flex-col md:flex-row max-w-[900px] w-[70%] md:w-auto min-h-[200px] bg-white my-4 text-black border border-gray-200 shadow-lg rounded-xl">
            <Image 
                className="m-4 md:m-6 rounded-lg md:object-cover w-[150px] h-[150px] place-self-center" 
                src={image} 
                height={150} 
                width={150} 
                alt={ubicacion}
            />
            <div className="flex flex-col flex-grow p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg md:text-2xl font-semibold">{ubicacion}</h1>
                    <div onClick={() => deleteCasa(id)} className="cursor-pointer">
                        <SvgTrashcan className="w-6 h-6 md:w-8 md:h-8 text-red-600"/>
                    </div>
                </div>

                {/* Precio y edición */}
                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <h2 className="text-md md:text-xl text-green-600 font-medium">{valor}</h2>
                    <Link href={`/admin/casas/${id}`} className="cursor-pointer">
                        <SvgPen className="w-6 h-6 md:w-8 md:h-8 text-blue-500"/>
                    </Link>
                </div>

                {/* Descripción del inmueble */}
                <div className="mt-3 text-sm md:text-md">
                    <p>
                        Este inmueble es {tipo === 'casa' ? 'una casa' : 'un departamento'} de {m2} m², cuenta con {ambientes} ambientes: {dormitorios} {dormitorios > 1 ? 'dormitorios' : 'dormitorio'} y {banos} {banos > 1 ? 'baños' : 'baño'}. {cochera ? 'Tiene' : 'No tiene'} cochera.
                    </p>
                </div>
            </div>
            <div className="mt-3 text-sm md:text-md w-[20%]">
                    <p><strong>Dueño:</strong> {dueno ? dueno : "No registrado"}</p>
                    {contrato ? (
                        <>
                            <p><strong>Inquilino:</strong> {inquilino ? inquilino : "No registrado"}</p>

                            {/* Sección de pago */}
                            <div className="mt-2">
                                <p><strong>Último pago:</strong> <span className="text-green-700">{pago ? pago : "No registrado"}</span></p>

                                {/* Mostrar el comprobante si existe */}
                                {comprobanteUltimo ? (
                                    <Link
                                        href={comprobanteUltimo}>
                                        <Image 
                                            src={comprobanteUltimo} 
                                            alt="Comprobante de pago" 
                                            width={150} 
                                            height={150} 
                                            className="rounded-md border border-gray-300 max-h-[150px] max-w-[150px]"
                                            />
                                    </Link>
                                ) : (
                                    <p className="text-gray-600">Pago realizado en efectivo</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p><strong>Estado:</strong> Disponible</p>
                    )}
                </div>
        </div>   
    );
}
