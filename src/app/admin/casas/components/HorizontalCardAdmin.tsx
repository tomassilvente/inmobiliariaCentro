import Image from "next/image";
import Link from "next/link";
import SvgTrashcan from "../../../../../public/assets/trashcan";
import SvgPen from "../../../../../public/assets/pen";


export default function HorizontalCardAdmin({
  casa,            
  image,
  ubicacion,
  valor,
  ambientes,
  dormitorios,
  m2,
  tipo,
  id,
  contratoActivo,
  setModalCasa,
  dueno,
}: any) {

    
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex gap-6">

      {/* IMAGE */}
      <div className="relative w-[160px] h-[120px] rounded-xl overflow-hidden">
        <Image src={image} alt={ubicacion} fill className="object-cover" />
      </div>

      {/* INFO */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{ubicacion}</h3>
            <p className="text-sm text-gray-500">
              {tipo} · {m2} m² · {ambientes} amb · {dormitorios} dorm
            </p>
          </div>

          <div className="flex gap-3">
            <Link href={`/admin/casas/${id}`}>
              <SvgPen className="w-5 h-5 text-gray-500 hover:text-[#8a7b5e]" />
            </Link>
            <SvgTrashcan className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-6 text-sm">
          <span><strong>Precio:</strong> {valor}</span>
          <span><strong>Dueño:</strong> {dueno}</span>
          {contratoActivo ? (
            <span className="text-green-700">
                Alquilado · {contratoActivo.inquilino.nombre}
            </span>
            ) : (
                <button
                    onClick={() => setModalCasa(casa)}
                >
                    Iniciar alquiler
                 </button>
          )}
        </div>
      </div>
    </div>
  );
}