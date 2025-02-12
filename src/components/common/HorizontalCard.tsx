import Image from "next/image";
import Link from "next/link";

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
    pago,
    comprobanteUltimo,
    inquilino
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
            <div className="flex flex-col flex-grow p-4 md:p-6 w-[50%]">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg md:text-2xl font-semibold">{ubicacion}</h1>
                   
                </div>

                {/* Precio y edición */}
                <div className="flex items-center justify-between mt-2 md:mt-4">
                    <h2 className="text-md md:text-xl text-green-600 font-medium">{valor}</h2>
                   
                </div>

                {/* Descripción del inmueble */}
                <div className="mt-3 text-sm md:text-md">
                    <p>
                        Este inmueble es un(@) {tipo} de {m2} m², cuenta con {ambientes} ambientes: {dormitorios} {dormitorios > 1 ? 'dormitorios' : 'dormitorio'} y {banos} {banos > 1 ? 'baños' : 'baño'}. {cochera ? 'Tiene' : 'No tiene'} cochera.
                    </p>
                </div>

                {/* Información del contrato */}
            </div>
            <div className="mt-3 text-sm md:text-md w-[20%]">
                   
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
