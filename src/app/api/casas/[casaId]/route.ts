import { connection } from "@/libs/db";
import { Casa } from "@/types/casa.interface";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

export async function GET(request: Request, context: any) {
    try {
        const { params } = context;
        const casas: Array<Casa> = (await connection).query('SELECT * FROM casas');
        const casa = (await casas)[0].find(x => params.casaId === x.id.toString());

        if (!casa) {
            return NextResponse.json({ error: "Casa no encontrada" }, { status: 404 });
        }

        return NextResponse.json({ casa });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, context: any) {
    try {
      const formData = await request.formData();
      const { params } = context;
      console.log(formData)
  
      // Obtener valores del formulario
      const comprobante = formData.get("comprobanteUltimo");
      const imagen = formData.get("imagen");
      console.log(imagen);
      
      let comprobanteUrl = formData.get("comprobanteUltimo") || null;
      let imagenUrl = formData.get("imagen");
  
      // Subir nuevo comprobante si se envía
      if (comprobante && comprobante instanceof Blob) {
        const bytes = await comprobante.arrayBuffer();
        const buffer = Buffer.from(bytes);
  
        const res: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (err, result) => {
              if (err) {
                console.error("Error en Cloudinary:", err);
                reject(err);
              }
              resolve(result);
            }
          ).end(buffer);
        });
  
        comprobanteUrl = res.secure_url;
      }
  
      // Subir nueva imagen de la propiedad si se envía
      if (imagen && imagen instanceof Blob) {
        const bytes = await imagen.arrayBuffer();
        const buffer = Buffer.from(bytes);
  
        const res: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (err, result) => {
              if (err) {
                console.error("Error en Cloudinary:", err);
                reject(err);
              }
              resolve(result);
            }
          ).end(buffer);
        });
  
        imagenUrl = res.secure_url;
      }
  
      // Actualizar la base de datos
      const result = await (await connection).query(
        `UPDATE casas
         SET ubicacion = ?, valor = ?, imagen = ?, contrato = ?, ambientes = ?, cochera = ?, tipo = ?, m2 = ?, dormitorios = ?, banos = ?, inquilino = ?, pago = ?, comprobanteUltimo = ?
         WHERE id = ?`,
        [
          formData.get("ubicacion"),
          formData.get("valor"),
          imagenUrl,
          formData.get("contrato"),
          parseInt(formData.get("ambientes") as string),
          formData.get("cochera") === "true" ? 1 : 0, // Convertir a número
          formData.get("tipo"),
          parseInt(formData.get("m2") as string),
          parseInt(formData.get("dormitorios") as string),
          parseInt(formData.get("banos") as string),
          formData.get("inquilino"),
          formData.get("pago"),
          comprobanteUrl,
          parseInt(params.casaId),
        ]
      );
  
      return NextResponse.json({
        success: true,
        result,
        comprobante_pago: comprobanteUrl,
        imagen: imagenUrl,
      });
  
    } catch (error) {
      console.error("Error actualizando casa:", error);
      return NextResponse.json(
        { success: false, error: "Error al actualizar la casa" },
        { status: 500 }
      );
    }
  }