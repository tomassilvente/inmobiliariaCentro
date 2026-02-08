import { NextResponse } from "next/server";
import { connection } from "@/libs/db";

export async function GET() {
  try {
    const conn = await connection;

    const [rows]: any = await conn.query(`
      SELECT
        c.id,
        c.casa_id,
        c.inquilino_id,  
        c.fecha_inicio,
        c.fecha_fin,
        c.monto,
        c.activo,

        -- Inquilino
        ui.nombre AS inquilino_nombre,
        ui.documento AS inquilino_dni,

        -- Dueño
        ud.nombre AS dueno_nombre,
        ud.documento AS dueno_dni,

        ca.ubicacion

      FROM contratos c
      JOIN casas ca ON ca.id = c.casa_id

      -- 🔥 ESTE ERA EL ERROR
      JOIN users ui ON ui.id = c.inquilino_id

      LEFT JOIN casacliente cc ON cc.casa_id = ca.id
      LEFT JOIN users ud ON ud.id = cc.user_id

      ORDER BY c.id DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("ERROR GET CONTRATOS:", error);
    return NextResponse.json(
      { message: "Error obteniendo contratos" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("BODY CONTRATO:", body);

    const {
      casa_id,
      inquilino_id, // ⬅️ esto es el DOCUMENTO (DNI)
      fecha_inicio,
      fecha_fin,
      monto,
    } = body;

    const conn = await connection;

    // 🔎 1. Buscar el ID real del usuario por documento
    const [users]: any = await conn.query(
      "SELECT id FROM users WHERE documento = ?",
      [inquilino_id]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: "El inquilino no existe" },
        { status: 400 }
      );
    }

    const userId = users[0].id;

    // 🔴 2. Desactivar contratos anteriores de la casa
    await conn.query(
      "UPDATE contratos SET activo = 0 WHERE casa_id = ?",
      [casa_id]
    );

    // ✅ 3. Crear contrato nuevo con el ID correcto
    const [result]: any = await conn.query(
      `
      INSERT INTO contratos
      (casa_id, inquilino_id, fecha_inicio, fecha_fin, monto, activo)
      VALUES (?, ?, ?, ?, ?, 1)
      `,
      [
        casa_id,
        userId, // ✅ AHORA ES users.id
        fecha_inicio,
        fecha_fin,
        monto,
      ]
    );

    return NextResponse.json({
      success: true,
      contrato_id: result.insertId,
    });

  } catch (error: any) {
    console.error("ERROR CREANDO CONTRATO:", error);

    return NextResponse.json(
      { message: "Error creando contrato" },
      { status: 500 }
    );
  }
}
