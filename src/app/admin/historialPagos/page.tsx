'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { generarReciboPDF } from "@/utils/generarPdf";


const HistorialPagos = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchPagos = async () => {
      const res = await fetch('/api/pagos');
      const data = await res.json();
      setPagos(data);
    };
    fetchPagos();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Historial de Pagos</h2>
      <Link className="ml-5" href={'/admin'}>
            Volver
      </Link>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Inquilino</th>
            <th className="border p-2">Casa</th>
            <th className="border p-2">Monto</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Comprobante</th>
            <th className="border p-2">Recibo</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id} className="text-center">
              <td className="border p-2">
                {pago.inquilino_nombre} ({pago.inquilino}) {/* Muestra nombre y documento */}
              </td>
              <td className="border p-2">{pago.ubicacion}</td>
              <td className="border p-2">{pago.monto}</td>
              <td className="border p-2">
                {new Date(pago.fecha_pago).toLocaleDateString("es-AR")}
              </td>
              <td className={`border p-2 font-semibold 
                ${pago.fecha_pago ? 'text-green-600' : 'text-red-600' }`}>
                {pago.fecha_pago ? 'Pagado' : 'Vencido'}
              </td>
              <td className="border p-2">
                {pago.comprobante ? (
                  <a href={pago.comprobante} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Ver
                  </a>
                ) : 'EFECTIVO'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => generarReciboPDF(pago)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Reimprimir
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPagos;
