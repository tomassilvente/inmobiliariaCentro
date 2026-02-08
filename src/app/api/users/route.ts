import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

/* ===========================
   ✅ GET — listar usuarios
=========================== */

export async function GET() {
  try {
    const [rows]: any = await (await connection).query(`
      SELECT
        id,
        documento,
        nombre,
        email
      FROM users
      ORDER BY nombre ASC
    `);

    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("ERROR USERS GET:", error);

    return NextResponse.json(
      { message: "Error obteniendo usuarios" },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, documento, email, password } = data;

    if (!nombre || !documento || !email) {
      return NextResponse.json(
        { message: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const conn = await connection;

    // 🔍 validar duplicados (EMAIL o DNI)
    const [exists]: any = await conn.query(
      `
      SELECT id
      FROM users
      WHERE email = ? OR documento = ?
      LIMIT 1
      `,
      [email, documento]
    );

    if (exists.length > 0) {
      return NextResponse.json(
        { message: "Ya existe un cliente con ese email o DNI" },
        { status: 400 }
      );
    }

    let hashedPassword = null;

    // 🔐 solo si viene password
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const [result]: any = await conn.query(
      `
      INSERT INTO users (nombre, documento, email, password)
      VALUES (?, ?, ?, ?)
      `,
      [nombre, documento, email, hashedPassword]
    );

    // 👉 si NO hay password (admin), no generamos token
    if (!password) {
      return NextResponse.json({
        success: true,
        id: result.insertId,
      });
    }

    // 👉 si hay password (registro/login), generamos token
    const token = jwt.sign(
      {
        id: result.insertId,
        email,
        nombre,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Usuario registrado con éxito",
      token,
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
