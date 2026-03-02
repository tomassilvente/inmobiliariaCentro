import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connection } from "@/libs/db";

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

export async function GET(request: Request) {
  try {
    /* ──────────────────────────────
       1️⃣ Validar token
    ────────────────────────────── */
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded: any;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch {
      return NextResponse.json(
        { message: "Token inválido" },
        { status: 401 }
      );
    }

    const documentoUsuario = decoded.documento;

    if (!documentoUsuario) {
      return NextResponse.json(
        { message: "Token malformado" },
        { status: 401 }
      );
    }

    /* ──────────────────────────────
       2️⃣ Query principal (JOIN)
    ────────────────────────────── */
    const [rows]: any = await (await connection).query(
      `
      SELECT 
        c.id,
        c.ubicacion,
        c.valor,
        c.imagen,
        c.contrato,
        c.ambientes,
        c.cochera,
        c.tipo,
        c.m2,
        c.dormitorios,
        c.banos,
        c.inquilino,
        c.pago,
        c.comprobanteUltimo,
        u.nombre AS inquilino_nombre
      FROM casas c
      INNER JOIN casacliente cc ON cc.casa_id = c.id
      LEFT JOIN users u ON u.documento = c.inquilino
      WHERE cc.user_id = ?
      `,
      [documentoUsuario]
    );

    /* ──────────────────────────────
       3️⃣ Separar venta / alquiler
    ────────────────────────────── */
    const sale = [];
    const rent = [];

    for (const casa of rows) {
      const formattedCasa = {
        id: casa.id,
        ubicacion: casa.ubicacion,
        valor: casa.valor,
        imagen: casa.imagen,
        contrato: casa.contrato,
        ambientes: casa.ambientes,
        cochera: casa.cochera,
        tipo: casa.tipo,
        m2: casa.m2,
        dormitorios: casa.dormitorios,
        banos: casa.banos,
        pago: casa.pago,
        comprobanteUltimo: casa.comprobanteUltimo,
        inquilino: casa.inquilino
          ? {
              documento: casa.inquilino,
              nombre: casa.inquilino_nombre,
            }
          : null,
      };

      if (casa.inquilino) {
        rent.push(formattedCasa);
      } else {
        sale.push(formattedCasa);
      }
    }

    /* ──────────────────────────────
       4️⃣ Respuesta final
    ────────────────────────────── */
    return NextResponse.json({
      sale,
      rent,
    });

  } catch (error) {
    console.error("Error en /api/me/properties:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
