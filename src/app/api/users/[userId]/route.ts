import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta"; // Utiliza variables de entorno en producción

export async function POST(request: any) {
  try {
    const data = await request.json();
    console.log(data)

    // Buscar al usuario por email
    const [rows] = await (await connection).query("SELECT * FROM users WHERE email = ?", [data.email]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    const user = rows[0];

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre }, // Información dentro del token
      SECRET_KEY,
      { expiresIn: "1h" } // Tiempo de expiración del token
    );

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      token,
      user
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context:any){
  const {params} = context
  console.log(params)
  const users = (await connection).query('DELETE FROM users WHERE documento = ?', params.documento)
  return NextResponse.json({
      body: 'Deleted'
  })
}

export async function GET(request: Request, context: any) {
  const { params } = context;
  console.log("Params recibidos:", params);

  if (!params || !params.userId) {
    return NextResponse.json({ error: "userId es requerido" }, { status: 400 });
  }

  try {
    const [users] = await (await connection).query(
      "SELECT * FROM users WHERE documento = ?",
      [params.userId]
    );

    if (users.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ user: users[0] });
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

