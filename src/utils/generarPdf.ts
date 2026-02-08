import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function generarContratoPDF(contrato: any) {
  const doc = new jsPDF();

  const marginX = 15;
  let cursorY = 20;

  doc.setFont("times", "normal");
  doc.setFontSize(14);

  // TÍTULO
  doc.text(
    "CONTRATO DE LOCACIÓN DE INMUEBLE DESTINADO A VIVIENDA",
    105,
    cursorY,
    { align: "center" }
  );

  cursorY += 15;
  doc.setFontSize(11);

  const texto = `
Entre el Sr. ${contrato.dueno_nombre}, DNI ${contrato.dueno_dni}, en adelante denominado "EL LOCADOR", y el Sr. ${contrato.inquilino_nombre}, DNI ${contrato.inquilino_dni}, en adelante denominado "EL LOCATARIO", se celebra el presente contrato de locación, sujeto a las siguientes cláusulas:

PRIMERA: OBJETO
EL LOCADOR da en locación al LOCATARIO el inmueble destinado exclusivamente a vivienda familiar, ubicado en ${contrato.ubicacion}.

SEGUNDA: PLAZO
El plazo del presente contrato será de DOCE (12) meses, comenzando el día ${contrato.fecha_inicio} y finalizando el día ${contrato.fecha_fin}.

TERCERA: CANON LOCATIVO
El precio del alquiler se fija en la suma mensual de PESOS ${contrato.monto}, pagaderos del día 1 al 10 de cada mes en el domicilio del LOCADOR o en el lugar que éste indique.

CUARTA: DESTINO
El inmueble será destinado exclusivamente para vivienda, quedando prohibido darle otro destino sin autorización escrita del LOCADOR.

QUINTA: SERVICIOS
Serán a cargo del LOCATARIO los servicios de luz, gas, agua, internet, tasas municipales y todo otro servicio que grave el inmueble durante la vigencia del contrato.

SEXTA: CONSERVACIÓN
El LOCATARIO se obliga a mantener el inmueble en perfecto estado de conservación, haciéndose responsable por los daños que excedan el desgaste normal por uso.

SÉPTIMA: PROHIBICIONES
Queda prohibido subalquilar total o parcialmente el inmueble sin autorización expresa del LOCADOR.

OCTAVA: RESCISIÓN
Cualquiera de las partes podrá rescindir el contrato conforme a lo establecido por el Código Civil y Comercial de la Nación.

NOVENA: JURISDICCIÓN
Para cualquier divergencia judicial, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la ciudad de Punta Alta, renunciando a cualquier otro fuero.

En prueba de conformidad, se firman dos ejemplares de un mismo tenor y a un solo efecto.

Lugar y fecha: Punta Alta, ${new Date().toLocaleDateString()}.
`;

  const lines = doc.splitTextToSize(texto, 180);
  doc.text(lines, marginX, cursorY);

  cursorY += lines.length * 6 + 20;

  // FIRMAS
  doc.text("__________________________", 30, cursorY);
  doc.text("EL LOCADOR", 55, cursorY + 6);

  doc.text("__________________________", 120, cursorY);
  doc.text("EL LOCATARIO", 140, cursorY + 6);

  doc.save(`Contrato_${contrato.ubicacion}.pdf`);
}

export const generarReciboPDF = (pago: any) => {
  const doc = new jsPDF();

  doc.addImage("/images/logo.png", "PNG", 10, 10, 50, 20);

  doc.setFontSize(14);
  doc.text("RECIBO DE ALQUILER", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text("Inmobiliaria Centro", 14, 45);
  doc.text("25 de Mayo 482 - Punta Alta", 14, 50);
  doc.text("Tel: (02932) 434360", 14, 55);

  doc.text(
    `Fecha: ${new Date(pago.fecha_pago).toLocaleDateString("es-AR")}`,
    14,
    70
  );

  autoTable(doc, {
    startY: 80,
    head: [["Inquilino", "DNI"]],
    body: [[pago.inquilino_nombre, pago.inquilino]],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable?.finalY + 8,
    head: [["Inmueble"]],
    body: [[pago.ubicacion]],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable?.finalY + 8,
    head: [["Concepto", "Importe"]],
    body: [["Pago de alquiler", `$ ${pago.monto}`]],
  });

  doc.text(
    "Recibí conforme la suma indicada en concepto de alquiler mensual.",
    14,
    doc.lastAutoTable.finalY + 20 
  );

  doc.text("__________________________", 30, doc.lastAutoTable.finalY + 40);
  doc.text("Firma Inmobiliaria", 45, doc.lastAutoTable.finalY + 46);

  doc.save(
    `Recibo_${pago.ubicacion}_${pago.fecha_pago.split("T")[0]}.pdf`
  );
};
