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
