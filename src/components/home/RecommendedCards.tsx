import Image from "next/image";
import Link from "next/link";
import SvgSofa from "../../../public/assets/sofa";
import SvgBed from "../../../public/assets/bed";
import SvgBath from "../../../public/assets/bath";

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

export default function RecommendedCard({
    id,
    image,
    ubicacion,
    valor,
    dormitorios,
    ambientes,
    banos,
    cochera,
  }: CardProps) {
    return (
      <Link  
        className="
          w-[100%]
          max-w-[375px]
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-md
          hover:shadow-xl
          transition
          hover:-translate-y-1
        " 
        href={`/casa/${id}`}>
        <article>
          {/* imagen */}
          <div className="relative h-[200px] w-full">
            <Image
              src={image}
              alt={ubicacion}
              fill
              className="object-cover"
            />
          </div>
  
          {/* contenido */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {ubicacion}
            </h3>
  
            <p className="text-[#8a7b5e] font-bold text-xl mb-3">
              ${valor}
            </p>
  
            <div className="flex justify-between text-sm text-gray-600">
              <li className="flex items-center gap-2"> <SvgSofa  width={35} height={35}/> {ambientes} ambientes</li>
              <li className="flex items-center gap-2"> <SvgBed  width={35} height={35}/> {dormitorios} dormitorios</li>
              <li className="flex items-center gap-2"> <SvgBath  width={35} height={35}/> {banos} baños</li>
            </div>
          </div>
        </article>
      </Link>
    );
  }