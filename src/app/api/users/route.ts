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
    const { nombre, documento, email, password } =
      await request.json();

    if (!nombre || !documento || !email || !password) {
      return NextResponse.json(
        { message: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const conn = await connection;

    // 🔍 validar duplicados
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
        { message: "Ya existe un usuario con ese email o documento" },
        { status: 400 }
      );
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 crear usuario
    await conn.query(
      `
      INSERT INTO users (nombre, documento, email, password)
      VALUES (?, ?, ?, ?)
      `,
      [nombre, documento, email, hashedPassword]
    );

    // 🔑 generar JWT (CLAVE)
    const token = jwt.sign(
      {
        documento,
        email,
        nombre,
      },
      process.env.SECRET_KEY!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Usuario registrado correctamente",
      token,
      user: { nombre, documento, email },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}