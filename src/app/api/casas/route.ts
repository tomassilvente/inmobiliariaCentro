import { NextResponse } from "next/server";
import { connection } from "@/libs/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

/* ===============================
   GET → todas las casas
================================ */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const operacion = searchParams.get("operacion");
    const exclude = searchParams.get("exclude");
    const disponible = searchParams.get("disponible");

    let where = "WHERE 1 = 1";
    const params: any[] = [];

    if (operacion) {
      where += " AND ca.operacion = ?";
      params.push(operacion);
    }

    if (disponible === "true") {
      where += " AND c.id IS NULL";
    }

    if (exclude) {
      where += " AND ca.id != ?";
      params.push(exclude);
    }

    const [rows]: any = await (await connection).query(
      `
      SELECT
        ca.id,
        ca.ubicacion,
        ca.banos,
        ca.valor,
        ca.ambientes,
        ca.dormitorios,
        ca.m2,
        ca.tipo,
        ca.operacion,

        du.nombre AS dueno_nombre,
        iq.nombre AS inquilino_nombre,
        c.id AS contrato_id,

        IFNULL(GROUP_CONCAT(ci.url ORDER BY ci.id), '') AS imagenes

      FROM casas ca

      LEFT JOIN casacliente cc_dueno
        ON cc_dueno.casa_id = ca.id
        AND cc_dueno.rol = 'DUENO'
        AND cc_dueno.activo = 1

      LEFT JOIN users du
        ON du.id = cc_dueno.user_id

      LEFT JOIN contratos c
        ON c.casa_id = ca.id
        AND c.activo = 1

      LEFT JOIN users iq
        ON iq.id = c.inquilino_id

      LEFT JOIN casa_imagenes ci
        ON ci.casa_id = ca.id

      ${where}

      GROUP BY
        ca.id,
        du.nombre,
        iq.nombre,
        c.id

      ORDER BY ca.id DESC
      `,
      params
    );

    const casas = rows.map((casa: any) => ({
      ...casa,
      imagenes: casa.imagenes ? casa.imagenes.split(",") : [],
      imagen: casa.imagenes
        ? casa.imagenes.split(",")[0]
        : "/images/no-image.jpg",
      dueno: casa.dueno_nombre ?? "Sin dueño",
      contratoActivo: casa.contrato_id
        ? {
            id: casa.contrato_id,
            inquilino: { nombre: casa.inquilino_nombre },
          }
        : null,
    }));

    /**
     * 🔑 IMPORTANTE
     * - Si viene con filtros → frontend (recomendadas)
     * - Si NO → admin / listados
     */
    if (operacion || exclude || disponible) {
      return NextResponse.json({ casas });
    }

    return NextResponse.json(casas);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error obteniendo casas" },
      { status: 500 }
    );
  }
}



/* ===============================
   POST → crear casa
================================ */

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const ubicacion = formData.get("ubicacion");
    const valor = formData.get("valor");
    const dormitorios = formData.get("dormitorios");
    const ambientes = formData.get("ambientes");
    const banos = formData.get("banos");
    const cochera = formData.get("cochera");
    const tipo = formData.get("tipo");
    const m2 = formData.get("m2");
    const contrato = formData.get("contrato");

    const imagenes = formData.getAll("imagenes") as Blob[];

    // 1️⃣ crear casa
    const [result]: any = await (await connection).query(
      `
      INSERT INTO casas
      (ubicacion, valor, dormitorios, ambientes, banos, cochera, tipo, m2)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        ubicacion,
        valor,
        dormitorios,
        ambientes,
        banos,
        cochera,
        tipo,
        m2
      ]
    );

    const casaId = result.insertId;

    // 2️⃣ subir imágenes
    for (const file of imagenes) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const upload: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "inmobiliaria/casas" },
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      await (await connection).query(
        "INSERT INTO casa_imagenes (casa_id, url) VALUES (?, ?)",
        [casaId, upload.secure_url]
      );
    }

    return NextResponse.json({
      success: true,
      casa_id: casaId,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creando casa" },
      { status: 500 }
    );
  }
}


