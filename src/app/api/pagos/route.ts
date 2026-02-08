import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


export async function GET() {
  try {
    const conn = await connection;

    const [rows]: any = await conn.query(`
      SELECT
        p.id,
        p.monto,
        p.fecha_pago,
        p.comprobante_url AS comprobante,

        -- Inquilino
        u.nombre AS inquilino_nombre,
        u.documento AS inquilino,

        -- Casa
        ca.ubicacion

      FROM pagos p
      JOIN contratos c ON c.id = p.contrato_id
      JOIN users u ON u.id = c.inquilino_id   -- 🔥 CLAVE
      JOIN casas ca ON ca.id = c.casa_id

      ORDER BY p.fecha_pago DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("ERROR GET PAGOS:", error);
    return NextResponse.json(
      { message: "Error obteniendo pagos" },
      { status: 500 }
    );
  }
}

/*
POST → registrar pago
*/
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const contrato_id = formData.get("contrato_id");
    const fecha_pago = formData.get("fecha_pago");
    const monto = formData.get("monto");
    const metodo_pago = formData.get("metodo_pago") || "efectivo";
    const comprobante = formData.get("comprobante");

    let comprobante_url = null;

    // ☁️ subir comprobante si existe
    if (comprobante && comprobante instanceof Blob) {
      const buffer = Buffer.from(await comprobante.arrayBuffer());

      const upload: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      comprobante_url = upload.secure_url;
    }

    const [result]: any = await (await connection).query(
      `
      INSERT INTO pagos
      (contrato_id, fecha_pago, monto, metodo_pago, comprobante_url)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        contrato_id,
        fecha_pago,
        monto,
        metodo_pago,
        comprobante_url,
      ]
    );

    return NextResponse.json({
      success: true,
      pago_id: result.insertId,
      comprobante_url,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error registrando pago" },
      { status: 500 }
    );
  }
}