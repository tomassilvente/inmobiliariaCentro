import Image from "next/image";
import Link from "next/link";
import SvgTrashcan from "../../../../../public/assets/trashcan";
import SvgPen from "../../../../../public/assets/pen";

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

export default function HorizontalCardAdmin({image, ubicacion,valor, dormitorios, ambientes, banos, cochera, tipo, m2, id}: CardProps){
    return(
                   <div className="flex h-[200px] max-w-[900px] bg-white my-[15px] text-black border border-gray-200 shadow-lg rounded-xl">
                <Image className="ml-[9px] mt-[9px] h-[180px] w-[220px] rounded-lg" src={image} height={180} width={220} alt={ubicacion}/>
                <div>
                    <div className="grid grid-cols-6">
                        <h1 className="md:text-4xl text-xl ml-[20px] mt-3 col-start-1 col-end-5">{ubicacion}</h1>
                        <Link className="w-[25px] h-[25px] md:h-[35px] md:w-[35px]" href={'/'}>
                            <SvgTrashcan className="mt-3  ml-[40px] w-[25px] h-[25px] md:h-[35px] md:w-[35px]" height={35} width={35}/>
                        </Link>
                    </div>
                    <div className="grid grid-cols-6">
                        <h1 className="md:text-2xl text-lg ml-[20px] md:mt-2 text-green-600 col-start-1 col-end-5">{valor}</h1>
                        <Link className="w-[25px] h-[25px] md:h-[35px] md:w-[35px]" href={'/'}>
                            <SvgPen className="ml-[40px] w-[25px] h-[25px] md:h-[35px] md:w-[35px]" height={35} width={35}/>
                        </Link>
                    </div>
                    <div className={`flex md:mt-3 mt-1 ml-[20px] md:w-[80%] w-[90%]`}>
                        <p className="md:text-lg">Este inmueble se trata de {tipo === 'casa' ? 'una casa' : 'un departamento'} de {m2} metros cuadrados, la cual cuenta con {ambientes} ambientes, de los cuales son {dormitorios} {dormitorios>1 ? 'dormitorios' : 'dormitorio'} y {banos} {banos>1 ? 'baños' : 'baño'}. {cochera ? 'No cuenta' : 'Cuenta'} con cochera.</p>
                    </div>
                </div>
            </div>
    )
}