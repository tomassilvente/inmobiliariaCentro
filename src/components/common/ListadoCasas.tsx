'use client';

import { useState } from 'react';
import HorizontalCard from '../../components/common/HorizontalCard';
import { Casa } from '@/types/casa.interface';
import Link from 'next/link';

interface Props {
  tipo: 'alquiler' | 'venta';
  casas: Casa[];
}

export default function ListadoCasas({ tipo, casas }: Props) {
  const [direccionFilter, setDireccionFilter] = useState('');
  const [casasSeleccionadas, setCasasSeleccionadas] = useState<Casa[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const filteredData = direccionFilter
    ? casas.filter((casa) =>
        casa.ubicacion
          .toLowerCase()
          .includes(direccionFilter.toLowerCase())
      )
    : casas;

  const toggleSeleccionCasa = (casa: Casa) => {
    setCasasSeleccionadas((prev) => {
      const existe = prev.some((c) => c.id === casa.id);

      if (existe) {
        return prev.filter((c) => c.id !== casa.id);
      }

      if (prev.length < 3) {
        return [...prev, casa];
      }

      return prev;
    });
  };

  return (
    <div className="mt-5 py-5 flex flex-col items-center">

      <p className="text-4xl text-center font-semibold mb-[50px] text-[#8a7b5e]">
        {tipo === 'alquiler' ? 'Alquileres' : 'Ventas'}
      </p>

      {/* Filtro */}
      <div className="mb-6">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Filtrar por dirección"
          value={direccionFilter}
          onChange={(e) => setDireccionFilter(e.target.value)}
        />
      </div>

      {filteredData.map((casa) => (
        <div key={casa.id} className="w-full flex justify-center">

          <Link href={`/casa/${casa.id}`}>
            <HorizontalCard
              image={casa.imagenes?.[0] ?? "/images/no-image.jpg"}
              ubicacion={casa.ubicacion}
              valor={casa.valor}
              dormitorios={casa.dormitorios}
              ambientes={casa.ambientes}
              banos={casa.banos}
              cochera={casa.cochera}
              tipo={casa.tipo}
              m2={casa.m2}
              id={casa.id}
            />
          </Link>

          <button
            className={`border my-5 px-4 rounded ${
              casasSeleccionadas.some(c => c.id === casa.id)
                ? 'bg-red-500 text-white'
                : 'text-black'
            }`}
            onClick={() => toggleSeleccionCasa(casa)}
          >
            {casasSeleccionadas.some(c => c.id === casa.id)
              ? "Quitar"
              : "Comparar"}
          </button>

        </div>
      ))}

      {casasSeleccionadas.length >= 2 && (
        <button
          onClick={() => setModalAbierto(true)}
          className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
        >
          Comparar {casasSeleccionadas.length} casas
        </button>
      )}

      {modalAbierto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">

            <h2 className="text-xl font-bold mb-4">
              Comparación de Casas
            </h2>

            <table className="w-full border-collapse border border-gray-300">

              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Ubicación</th>
                  <th className="border p-2">Valor</th>
                  <th className="border p-2">Dormitorios</th>
                  <th className="border p-2">Baños</th>
                  <th className="border p-2">M²</th>
                  <th className="border p-2">Cochera</th>
                </tr>
              </thead>

              <tbody>
                {casasSeleccionadas.map((casa) => (
                  <tr key={casa.id}>
                    <td className="border p-2">{casa.ubicacion}</td>
                    <td className="border p-2">{casa.valor}</td>
                    <td className="border p-2">{casa.dormitorios}</td>
                    <td className="border p-2">{casa.banos}</td>
                    <td className="border p-2">{casa.m2}</td>
                    <td className="border p-2">
                      {casa.cochera ? 'Sí' : 'No'}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

            <button
              onClick={() => setModalAbierto(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>

          </div>

        </div>
      )}

    </div>
  );
}