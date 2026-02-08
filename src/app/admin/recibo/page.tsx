'use client'

import { useEffect, useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { useRouter } from "next/navigation"

export default function RecibosPage() {
  const [contratos, setContratos] = useState<any[]>([])
  const [contrato, setContrato] = useState<any>(null)

  const router = useRouter()

  useEffect(() => {
    fetch("/api/contratos")
      .then(res => res.json())
      .then(data => {
        const activos = data.filter((c: any) => c.activo === 1)
        setContratos(activos)
      })
  }, [])

  const generarPDF = () => {
    if (!contrato) return

    const doc = new jsPDF()

    doc.addImage("/images/logo.png", "PNG", 10, 10, 50, 20)

    doc.setFontSize(14)
    doc.text("RECIBO DE ALQUILER", 105, 20, { align: "center" })

    doc.setFontSize(10)
    doc.text("Inmobiliaria Centro", 14, 45)
    doc.text("25 de Mayo 482 - Punta Alta", 14, 50)
    doc.text("Tel: (02932) 434360", 14, 55)

    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 70)

    autoTable(doc, {
      startY: 80,
      head: [["Inquilino", "DNI"]],
      body: [[contrato.inquilino_nombre, contrato.inquilino_dni]]
    })

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [["Propietario", "DNI"]],
      body: [[contrato.dueno_nombre, contrato.dueno_dni]]
    })

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [["Inmueble"]],
      body: [[contrato.ubicacion]]
    })

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [["Concepto", "Importe"]],
      body: [["Pago de alquiler mensual", `$ ${contrato.monto}`]]
    })

    doc.text(
      "Recibí conforme la suma indicada en concepto de alquiler mensual.",
      14,
      doc.lastAutoTable.finalY + 20
    )

    doc.text("__________________________", 30, doc.lastAutoTable.finalY + 40)
    doc.text("Firma Inmobiliaria", 45, doc.lastAutoTable.finalY + 46)

    doc.save(`Recibo_${contrato.ubicacion}.pdf`)

    marcarPago()
  }

  const marcarPago = async () => {
    if (!contrato) return;
  
    const formData = new FormData();
    formData.append("contrato_id", contrato.id);
    formData.append(
      "fecha_pago",
      new Date().toISOString().split("T")[0]
    );
    formData.append("monto", contrato.monto);
    formData.append("metodo_pago", "efectivo");
  
    await fetch("/api/pagos", {
      method: "POST",
      body: formData,
    });
  
    router.push("/admin");
  };
  

  return (
    <div className="max-w-4xl mx-auto my-16 bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Generar recibo de alquiler
      </h1>

      <select
        className="w-full border p-2 rounded mb-6"
        onChange={e =>
          setContrato(
            contratos.find(c => c.id === Number(e.target.value))
          )
        }
      >
        <option value="">Seleccionar contrato</option>

        {contratos.map(c => (
          <option key={c.id} value={c.id}>
            {c.ubicacion} — {c.inquilino_nombre}
          </option>
        ))}
      </select>

      <button
        onClick={generarPDF}
        disabled={!contrato}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Generar recibo
      </button>

    </div>
  )
}