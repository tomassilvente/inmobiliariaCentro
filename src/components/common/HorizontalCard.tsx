import Image from "next/image";
import Link from "next/link";

type CardProps={
    image: string,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    banos: number,
    m2:number,
    cochera: boolean,
    tipo:string,
    id:number
}

export default function HorizontalCard({image, ubicacion,valor, dormitorios, ambientes, banos, cochera, tipo, m2, id}: CardProps){
    return(
        <Link href={`/casa/${id}`}>
            <div className="flex h-[200px] bg-white my-[15px] text-black border border-gray-200 hover:cursor-pointer shadow-lg rounded-xl hover:scale-105 ease-out duration-300">
                <Image className="ml-[9px] mt-[9px] h-[180px] w-[220px] rounded-lg" src={image} height={180} width={220} alt={ubicacion}/>
                <div>
                    <h1 className="md:text-4xl text-xl ml-[20px] mt-3">{ubicacion}</h1>
                    <h1 className="md:text-2xl text-lg ml-[20px] md:mt-2 text-green-600">{valor}</h1>
                    <div className={`flex md:mt-3 mt-1 ml-[20px] w-[80%]`}>
                        <p className="md:text-lg">Este inmueble se trata de {tipo === 'casa' ? 'una casa' : 'un departamento'} de {m2} metros cuadrados, la cual cuenta con {ambientes} ambientes, de los cuales son {dormitorios} {dormitorios>1 ? 'dormitorios' : 'dormitorio'} y {banos} {banos>1 ? 'baños' : 'baño'}. {cochera ? 'No cuenta' : 'Cuenta'} con cochera.</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}