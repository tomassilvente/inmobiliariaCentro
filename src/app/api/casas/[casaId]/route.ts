import { connection } from "@/libs/db";
import { Casa } from "@/types/casa.interface";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

export async function GET(
  request: Request,
  { params }: { params: { casaId: string } }
) {
  try {
    const casaId = params.casaId;

    // 1️⃣ traer casa
    const [casas]: any = await (await connection).query(
      "SELECT * FROM casas WHERE id = ?",
      [casaId]
    );

    if (!casas.length) {
      return NextResponse.json(
        { error: "Casa no encontrada" },
        { status: 404 }
      );
    }

    const casa = casas[0];

    // 2️⃣ traer imágenes
    const [imagenes]: any = await (await connection).query(
      "SELECT url FROM casa_imagenes WHERE casa_id = ?",
      [casaId]
    );

    casa.imagenes = imagenes.map((img: any) => img.url);

    return NextResponse.json({ casa });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: any
) {
  try {
    const { params } = context;
    const casaId = params.casaId;

    const formData = await request.formData();

    const ubicacion = formData.get("ubicacion");
    const valor = formData.get("valor");
    const ambientes = formData.get("ambientes");
    const dormitorios = formData.get("dormitorios");
    const banos = formData.get("banos");
    const cochera = formData.get("cochera");
    const tipo = formData.get("tipo");
    const m2 = formData.get("m2");
    const contrato = formData.get("contrato");

    const imagenesNuevas = formData.getAll("imagenes") as Blob[];

    /* ======================
       1️⃣ actualizar casa
    ======================= */

    await (await connection).query(
      `
      UPDATE casas SET
        ubicacion = ?,
        valor = ?,
        ambientes = ?,
        dormitorios = ?,
        banos = ?,
        cochera = ?,
        tipo = ?,
        m2 = ?,
        contrato = ?
      WHERE id = ?
      `,
      [
        ubicacion,
        valor,
        ambientes,
        dormitorios,
        banos,
        cochera,
        tipo,
        m2,
        contrato,
        casaId
      ]
    );

    /* ======================
       2️⃣ si vienen imágenes → borrar anteriores
    ======================= */

    if (imagenesNuevas.length > 0) {
      await (await connection).query(
        "DELETE FROM casa_imagenes WHERE casa_id = ?",
        [casaId]
      );
    }

    /* ======================
       3️⃣ subir nuevas imágenes
    ======================= */

    for (const file of imagenesNuevas) {
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
        `
        INSERT INTO casa_imagenes (casa_id, url)
        VALUES (?, ?)
        `,
        [casaId, upload.secure_url]
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("PUT CASA ERROR:", error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
