import Image from "next/image";
import Link from "next/link";
import SvgTrashcan from "../../../../../public/assets/trashcan";
import SvgPen from "../../../../../public/assets/pen";

export default function HorizontalCardAdmin({
  casa,
  setModalCasa,
}: any) {

  const {
    id,
    imagen,
    ubicacion,
    valor,
    ambientes,
    dormitorios,
    m2,
    tipo,
    dueno,
    contrato_id,
    inquilino_nombre,
    operacion
  } = casa;

  const esVenta = operacion === "venta";
  const esAlquiler = operacion === "alquiler";
  const estaAlquilada = esAlquiler && contrato_id;
  const disponibleAlquiler = esAlquiler && !contrato_id;

  return (

    
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex gap-6">

    <div className="flex gap-2 mb-1">

      {esVenta && (
        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700">
          En venta
        </span>
      )}

      {disponibleAlquiler && (
        <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700">
          Disponible
        </span>
      )}

      {estaAlquilada && (
        <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
          Alquilada
        </span>
      )}

    </div>

      {/* IMAGE */}
      <div className="relative w-[160px] h-[120px] rounded-xl overflow-hidden">
        <Image src={imagen} alt={ubicacion} fill className="object-cover" />
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
          <span><strong>Dueño:</strong> {dueno ?? "Sin dueño"}</span>

          {estaAlquilada && (
            <span className="text-green-700">
              Alquilado · {inquilino_nombre}
            </span>
          )}

          {disponibleAlquiler && (
            <button
              onClick={() => setModalCasa(casa)}
              className="text-sm text-[#8a7b5e] hover:underline"
            >
              Iniciar alquiler
            </button>
          )}

          {esVenta && (
            <span className="text-gray-500 text-sm">
              Propiedad en venta
            </span>
          )}
        </div>

      </div>
    </div>
  );
}