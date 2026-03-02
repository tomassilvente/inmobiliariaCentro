import { NextResponse } from "next/server";
import { connection } from "@/libs/db";

/* ======================================================
   GET → casas para vincular como dueño
   - sin dueño
   - o ya del cliente
====================================================== */
export async function GET(
  _: Request,
  { params }: { params: { documento: string } }
) {
  const documento = params.documento;
  const conn = await connection;

  const [rows]: any = await conn.query(`
    SELECT
      c.id,
      c.ubicacion,
      cc.user_id AS duenio
    FROM casas c
    LEFT JOIN casacliente cc ON cc.casa_id = c.id
  `);

  const casas = rows.filter((casa: any) =>
    !casa.duenio || casa.duenio === documento
  );

  return NextResponse.json(casas);
}


export async function POST(
  request: Request,
  { params }: { params: { documento: string } }
) {
  const documento = params.documento;
  const { casaId } = await request.json();
  const conn = await connection;

  /* 1️⃣ Buscar usuario por documento */
  const [users]: any = await conn.query(
    `SELECT id FROM users WHERE documento = ? LIMIT 1`,
    [documento]
  );

  if (users.length === 0) {
    return NextResponse.json(
      { message: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  const userId = users[0].id;

  /* 2️⃣ Verificar si la casa ya tiene dueño */
  const [exists]: any = await conn.query(
    `SELECT id FROM casacliente WHERE casa_id = ? LIMIT 1`,
    [casaId]
  );

  if (exists.length > 0) {
    return NextResponse.json(
      { message: "La casa ya tiene dueño asignado" },
      { status: 400 }
    );
  }

  /* 3️⃣ Vincular casa ↔ dueño */
  await conn.query(
    `INSERT INTO casacliente (user_id, casa_id) VALUES (?, ?)`,
    [userId, casaId]
  );

  return NextResponse.json({ success: true });
}


export async function DELETE(
  request: Request,
  { params }: { params: { documento: string } }
) {
  const documento = params.documento;
  const { casaId } = await request.json();
  const conn = await connection;

  await conn.query(
    `DELETE FROM casacliente WHERE user_id = ? AND casa_id = ?`,
    [documento, casaId]
  );

  return NextResponse.json({ success: true });
}
