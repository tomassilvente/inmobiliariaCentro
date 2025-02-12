import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mi_clave_secreta";

export function middleware(request: any) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    request.user = decoded; // Añade los datos del usuario a la request
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Token inválido o expirado" },
      { status: 401 }
    );
  }
}

// Configura las rutas protegidas
export const config = {
  matcher: ["/*"], // Cambia según las rutas protegidas
};
