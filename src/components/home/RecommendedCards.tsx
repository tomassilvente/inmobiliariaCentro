import Image from "next/image";
import Link from "next/link";

type CardProps = {
    id: number,
    image: string,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    banos: number,
    cochera: boolean
}

export default function RecommendedCard({ id, image, ubicacion, valor, dormitorios, ambientes, banos, cochera }: CardProps) {
    return (
        <Link href={`/casa/${id}`}>
            <div className="h-[370px] w-[220px] mx-[15px] border border-gray-300 hover:cursor-pointer shadow-md rounded-lg bg-white hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="relative h-[200px] w-full">
                    <Image 
                        className="rounded-t-lg object-cover" 
                        src={image} 
                        layout="fill" 
                        alt={ubicacion} 
                    />
                </div>
                <div className="px-4 py-3">
                    <h1 className="text-lg font-semibold text-gray-800 text-center">{ubicacion}</h1>
                    <h2 className="text-lg text-center mt-1 text-gray-700 font-medium">{valor}</h2>
                    <div className="flex justify-center gap-4 mt-3 text-gray-600">
                        <div className="flex items-center gap-1">
                            <p className="text-lg">🚽</p>
                            <p>{banos}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <p className="text-lg">🛏️</p>
                            <p>{dormitorios}</p>
                        </div>
                    
                    </div>
                </div>
            </div>
        </Link>
    );
}
