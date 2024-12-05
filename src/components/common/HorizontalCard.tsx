import Image from "next/image";
import Link from "next/link";

type CardProps = {
    image: string,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    banos: number,
    m2: number,
    cochera: boolean,
    tipo: string,
    id: number
}

export default function HorizontalCard({ image, ubicacion, valor, dormitorios, ambientes, banos, cochera, tipo, m2, id }: CardProps) {
    return (
        <Link href={`/casa/${id}`}>
            <div className="flex h-[200px] max-w-[800px] mx-auto bg-white my-[15px] text-black border border-gray-200 hover:cursor-pointer shadow-lg rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="flex-shrink-0">
                    <Image 
                        className="h-[180px] w-[220px] rounded-lg object-cover ml-[9px] mt-[9px]" 
                        src={image} 
                        height={180} 
                        width={220} 
                        alt={ubicacion} 
                    />
                </div>
                <div className="flex flex-col justify-center ml-5">
                    <h1 className="md:text-2xl text-lg font-semibold">{ubicacion}</h1>
                    <h2 className="md:text-xl text-base text-green-600 font-medium mt-1">{valor}</h2>
                    <p className="text-sm md:text-base mt-2 max-w-full md:max-w-[90%]">
                        Este inmueble es {tipo === 'casa' ? 'una casa' : 'un departamento'} de {m2} m², con {ambientes} ambientes, {dormitorios} {dormitorios > 1 ? 'dormitorios' : 'dormitorio'}, y {banos} {banos > 1 ? 'baños' : 'baño'}. {cochera ? 'No cuenta' : 'Cuenta'} con cochera.
                    </p>
                </div>
            </div>
        </Link>
    );
}
