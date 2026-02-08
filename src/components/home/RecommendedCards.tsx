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
      <Link href={`/casa/${id}`}>
        <article className="
          w-[300px]
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-md
          hover:shadow-xl
          transition
          hover:-translate-y-1
        ">
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
              <span>🛏 {dormitorios}</span>
              <span>🚽 {banos}</span>
              <span>🚗 {cochera ? "Sí" : "No"}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }