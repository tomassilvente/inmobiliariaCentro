import { NextResponse } from "next/server";
import { connection } from "@/libs/db";

export async function GET(
  _: Request,
  { params }: { params: { userId: string } }
) {
  const documento = params.userId;
  const conn = await connection;

  const [users]: any = await conn.query(
    `SELECT id FROM users WHERE documento = ? LIMIT 1`,
    [documento]
  );

  if (users.length === 0) {
    return NextResponse.json([]);
  }

  const userId = users[0].id;

  const [rows]: any = await conn.query(
    `
    SELECT
      c.id,
      c.ubicacion,
      u.documento AS duenio
    FROM casas c
    LEFT JOIN casacliente cc ON cc.casa_id = c.id
    LEFT JOIN users u ON u.id = cc.user_id
    WHERE cc.user_id IS NULL OR cc.user_id = ?
    `,
    [userId]
  );

  return NextResponse.json(rows);
}


export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const documento = params.userId;
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
  { params }: { params: { userId: string } }
) {
  const documento = params.userId;
  const { casaId } = await request.json();
  const conn = await connection;

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
  
  await conn.query(
    `DELETE FROM casacliente WHERE user_id = ? AND casa_id = ?`,
    [userId, casaId]
  );

  return NextResponse.json({ success: true });
}
