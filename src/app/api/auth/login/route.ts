import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const [rows]: any = await (await connection).query(
      `
      SELECT id, documento, nombre, email, password
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        documento: user.documento,
        email: user.email,
        nombre: user.nombre,
      },
      process.env.SECRET_COOKIE_PASSWORD!,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      token,
      user: {
        nombre: user.nombre,
        email: user.email,
        documento: user.documento,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
