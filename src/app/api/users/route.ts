import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

export async function POST(request: any) {
  try {
    const data = await request.json();

    console.log(data)
    const { nombre, documento, email, password } = data;

    // Verificar si el email ya está registrado
    let existingUser = ''
    if(email.length > 0) existingUser = await (await connection).query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return NextResponse.json({ message: "El email ya está registrado" }, { status: 400 });
    }

    // Encriptar contraseña
    let hashedPassword = ''
    if(password.length > 0){
      hashedPassword = await bcrypt.hash(password, 10);
    } 
    // Insertar el nuevo usuario en la base de datos
    const result = await (await connection).query("INSERT INTO users SET ?", {
      nombre,
      documento,
      email,
      password: hashedPassword,
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: result.insertId, email, nombre },
      SECRET_KEY,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    return NextResponse.json({
      message: "Usuario registrado con éxito",
      token, // Enviar el token al cliente
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(){
  try{
      const users = (await connection).query('SELECT * FROM users')
      return NextResponse.json((await users)[0])
  }
  catch(error:any){
      return NextResponse.json(
          {
              message: error.message,
          },
          {
              status:500
          }
      )
  }
}