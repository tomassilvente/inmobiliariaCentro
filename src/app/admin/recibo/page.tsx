'use client'
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";

export default function InvoiceGenerator() {
  const [casas, setCasas] = useState([]);
  const [selectedCasa, setSelectedCasa] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    ubicacion: "",
    inquilino: "",
    dueno: "",
    dniInquilino: "",
    dniDueno: "",
    montoAlquiler: "",
    date: new Date().toISOString().split("T")[0],
    inicioContrato: ""
  });

  const router = useRouter()

  useEffect(() => {
    const fetchCasas = async () => {
      try {
        const response = await fetch("/api/casas");
        const data = await response.json();
        const casasFiltradas = data.filter(casa => casa.inquilino !== null);
        setCasas(casasFiltradas);
      } catch (error) {
        console.error("Error al obtener las casas:", error);
      }
    };
    fetchCasas();
  }, []);

  const handleCasaChange = async (e) => {
    const casaId = e.target.value;
    try {
      const response = await fetch(`/api/casas/${casaId}`);
      let casaData = await response.json();
      casaData = casaData.casa;
      
      const inquilinoResponse = await fetch(`/api/users/${casaData.inquilino}`);
      const inquilinoData = await inquilinoResponse.json();
  
      const casaclienteResponse = await fetch(`/api/casacliente?casa_id=${casaId}`);
      const casaclienteData = await casaclienteResponse.json();
      
      const duenoResponse = await fetch(`/api/users/${casaclienteData[0].user_id}`);
      const duenoData = await duenoResponse.json();

      setSelectedCasa(casaData);
      setInvoiceData({
        ubicacion: casaData.ubicacion,
        inquilino: inquilinoData.user.nombre,
        dueno: duenoData.user.nombre,
        dniInquilino: inquilinoData.user.documento,
        dniDueno: duenoData.user.documento,
        montoAlquiler: casaData.valor,
        date: new Date().toISOString().split("T")[0],
        inicioContrato: casaData.contrato || ""
      });
    } catch (error) {
      console.error("Error al obtener los detalles de la casa:", error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage("/images/logo.png", "PNG", 10, 10, 50, 20);
    doc.setFontSize(14);
    doc.text(`Factura N°: 001`, 150, 20);
    doc.setFontSize(10);
    doc.text("C.U.I.T y PREVISION 20-05515193-9", 150, 30);
    doc.text("INGRESOS BRUTOS 20-05515193-9", 150, 35);
    doc.text("FECHA INICIO ACTIVIDADES 05/2012", 150, 40);
    doc.text("Inmobiliaria Centro", 14, 50);
    doc.text("25 de Mayo 482, PUNTA ALTA (8109) - BUENOS AIRES", 14, 55);
    doc.text("N° Tel (02932) - 434360", 14, 60);
    doc.text("Inmobiliaria.centro@yahoo.com.ar", 14, 65);
    doc.text("I.V.A: Responsable Monotributo", 14, 70);
    doc.text(`Fecha: ${invoiceData.date}`, 14, 80);

    autoTable(doc, {
      startY: 90,
      head: [["Inicio Contrato"]],
      body: [[invoiceData.inicioContrato]]
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Cliente", "D.N.I"]],
      body: [[invoiceData.inquilino, invoiceData.dniInquilino]]
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Propietario", "D.N.I"]],
      body: [[invoiceData.dueno, invoiceData.dniDueno]]
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Concepto", "Importe"]],
      body: [["Pago de Alquiler", `${invoiceData.montoAlquiler}`]]
    });

    doc.save("factura.pdf");
    marcarPagoEfectivo();
  };

  const marcarPagoEfectivo = async () => {
    try {
      const formData = new FormData();
      Object.entries(selectedCasa).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== 'pago') {
          formData.append(key, value);
        }
      });
      formData.append("pago", new Date().toISOString().split("T")[0]);
      await fetch(`/api/casas/${selectedCasa.id}`, {
        method: "PUT",
        body: formData,
      });
      router.push('/admin')
    } catch (error) {
      console.error("Error al marcar el pago en efectivo:", error);
    }
  };

  return (
    <div className="max-w-4xl my-16 mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Generador de Facturas</h2>
      <select onChange={handleCasaChange} className="w-full p-2 border rounded mb-4">
        <option value="">Selecciona una casa</option>
        {casas.map((casa) => (
          <option key={casa.id} value={casa.id}>{casa.ubicacion}</option>
        ))}
      </select>
      <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Generar Factura
      </button>
    </div>
  );
}
