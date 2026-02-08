'use client';

import { useEffect, useState } from "react";

export default function PagosPage({ params }: any) {
  const contratoId = params.contratoId;

  const [pagos, setPagos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fecha_pago: "",
    monto: "",
    metodo_pago: "efectivo",
    comprobante: null as File | null,
  });

  const cargarPagos = async () => {
    const res = await fetch(`/api/pagos?contrato_id=${contratoId}`);
    const data = await res.json();
    setPagos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("contrato_id", contratoId);
    fd.append("fecha_pago", form.fecha_pago);
    fd.append("monto", form.monto);
    fd.append("metodo_pago", form.metodo_pago);

    if (form.comprobante) {
      fd.append("comprobante", form.comprobante);
    }

    await fetch("/api/pagos", {
      method: "POST",
      body: fd,
    });

    setForm({
      fecha_pago: "",
      monto: "",
      metodo_pago: "efectivo",
      comprobante: null,
    });

    cargarPagos();
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Pagos del contrato #{contratoId}
      </h1>

      {/* FORM */}
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-2xl border shadow-sm mb-10 grid grid-cols-1 md:grid-cols-4 gap-4"
      >

        <input
          type="date"
          required
          value={form.fecha_pago}
          onChange={e => setForm({ ...form, fecha_pago: e.target.value })}
          className="input-admin"
        />

        <input
          type="number"
          required
          placeholder="Monto"
          value={form.monto}
          onChange={e => setForm({ ...form, monto: e.target.value })}
          className="input-admin"
        />

        <select
          value={form.metodo_pago}
          onChange={e => setForm({ ...form, metodo_pago: e.target.value })}
          className="input-admin"
        >
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="debito">Débito</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={e =>
            setForm({
              ...form,
              comprobante: e.target.files?.[0] || null,
            })
          }
        />

        <button
          type="submit"
          className="col-span-full bg-[#8a7b5e] text-white py-3 rounded-xl font-semibold hover:bg-[#766851]"
        >
          Registrar pago
        </button>

      </form>

      {/* LISTADO */}
      {loading ? (
        <p>Cargando pagos...</p>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Monto</th>
                <th className="p-3 text-left">Método</th>
                <th className="p-3 text-left">Comprobante</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.fecha_pago}</td>
                  <td className="p-3">${p.monto}</td>
                  <td className="p-3 capitalize">{p.metodo_pago}</td>
                  <td className="p-3">
                    {p.comprobante_url ? (
                      <a
                        href={p.comprobante_url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Ver
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}