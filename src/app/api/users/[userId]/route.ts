import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta"; // Utiliza variables de entorno en producción

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const [rows]: any = await (await connection).query(
      `
      SELECT id, documento, nombre, email, password
      FROM users
      WHERE email = ?
      `,
      [data.email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        documento: user.documento, // 👈 FUNDAMENTAL
        email: user.email,
        nombre: user.nombre,
      },
      process.env.SECRET_KEY!, // 👈 importante
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        nombre: user.nombre,
        email: user.email,
        documento: user.documento,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error interno del servidor" },
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = Number(params.id);
    const { nombre, documento, email, password } = await request.json();

    if (!nombre || !documento || !email) {
      return NextResponse.json(
        { message: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const conn = await connection;

    // 🔍 validar duplicados (EXCLUYENDO este usuario)
    const [exists]: any = await conn.query(
      `
      SELECT id
      FROM users
      WHERE (email = ? OR documento = ?)
        AND id <> ?
      LIMIT 1
      `,
      [email, documento, userId]
    );

    if (exists.length > 0) {
      return NextResponse.json(
        { message: "Ya existe otro cliente con ese email o DNI" },
        { status: 400 }
      );
    }

    // 🧠 armamos update dinámico
    let query = `
      UPDATE users
      SET nombre = ?, documento = ?, email = ?
    `;
    const values: any[] = [nombre, documento, email];

    // 🔐 solo si se quiere cambiar password
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      values.push(hashed);
    }

    query += ` WHERE id = ?`;
    values.push(userId);

    await conn.query(query, values);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error actualizando cliente" },
      { status: 500 }
    );
  }
}
