'use client';

import { generarContratoPDF } from "@/utils/generarPdf";
import { useState } from "react";


export default function IniciarAlquilerModal({
  casa,
  usuarios,
  onClose,
  onSuccess,
}: any) {

  console.log("MODAL VERSION 2026-01-30 🚀");
  console.log("USUARIOS:", usuarios);

  const [form, setForm] = useState({
    inquilino_id: "",
    fecha_inicio: "",
    fecha_fin: "",
    monto: "",
  });

  const submit = async () => {
    const inquilinoId = Number(form.inquilino_id);
  
    console.log("ENVIANDO INQUILINO:", inquilinoId);
  
    if (!inquilinoId || Number.isNaN(inquilinoId)) {
      alert("Seleccioná un inquilino");
      return;
    }
  
    await fetch("/api/contratos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        casa_id: casa.id,
        inquilino_id: inquilinoId,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
        monto: form.monto,
      }),
    });
  
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Iniciar alquiler
        </h2>

        <div className="space-y-4">

        <select
          className="input-admin"
          value={form.inquilino_id}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              inquilino_id: e.target.value
            }))
          }
        >
          <option value="0">Seleccionar inquilino</option>

          {usuarios.map((u: any) => (
            <option value={u.documento}>
            {u.nombre} ({u.documento})
          </option>
          ))}
        </select>

        <p className="text-sm text-red-500">
          Valor seleccionado: {form.inquilino_id}
        </p>

          <input
            type="date"
            className="input-admin"
            value={form.fecha_inicio}
            onChange={e =>
              setForm({ ...form, fecha_inicio: e.target.value })
            }
          />

          <input
            type="date"
            className="input-admin"
            value={form.fecha_fin}
            onChange={e =>
              setForm({ ...form, fecha_fin: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Monto mensual"
            className="input-admin"
            value={form.monto}
            onChange={e =>
              setForm({ ...form, monto: e.target.value })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>
            Cancelar
          </button>

          <button
            onClick={submit}
            className="bg-[#8a7b5e] text-white px-4 py-2 rounded-lg"
          >
            Confirmar alquiler
          </button>
        </div>

      </div>
    </div>
  );
}