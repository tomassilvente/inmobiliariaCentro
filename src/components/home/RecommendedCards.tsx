import Image from "next/image";
import Link from "next/link";

type CardProps={
    id:number,
    image: string,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    banos: number,
    cochera: boolean
}

export default function RecommendedCard({id, image, ubicacion,valor, dormitorios, ambientes, banos, cochera}: CardProps){
    return(
        <Link href={`/casa/${id}`}>
            <div className="h-[350px] w-[200px] mx-[15px] border border-gray-200 hover:cursor-pointer shadow-lg rounded-xl bg-[#f7f2c7] hover:scale-105 ease-out duration-300">
                <Image className="ml-[9px] mt-[10px] h-[180px] w-[180px] rounded-lg" src={image} height={180} width={180} alt={ubicacion}/>
                <h1 className="text-3xl text-center mt-3">{ubicacion}</h1>
                <h1 className="text-xl text-center mt-2 text-green-600">{valor}</h1>
                <div className={`flex mt-3 ${cochera ? 'mx-6' : 'mx-12'}`}>
                    <p className="text-xl ">🚽</p>
                    <p className="text-xl ml-2">{banos}</p>
                    <p className="text-xl ml-5">🛏️</p>
                    <p className="text-xl ml-2">{dormitorios}</p>
                    {
                        cochera
                        ? <p className="ml-5">🚗</p>
                        : ''
                    }
                </div>
            </div>
        </Link>
    )
}