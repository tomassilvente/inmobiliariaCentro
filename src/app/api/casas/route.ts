import { NextResponse } from "next/server";
import { con } from "@/libs/db";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dgs3my0h4', 
  api_key: '728714138724513', 
  api_secret: 'XttfGuZz77rzEIKMezwHvLR_ubQ' 
});
          
export async function GET(){
    try{
        const casas = await con.query('SELECT * FROM casas')
        return NextResponse.json(casas);
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

export async function PUT(request:any){

    const data = await request.json()

    return NextResponse.json('Casa Guardada')
}

export async function POST(request:any) {
    try {
      const data = await request.formData();
      const image = data.get("imagen");
  
      console.log(data, image)
      if (!image) {
        return NextResponse.json(
          {
            message: "Image is required",
          },
          {
            status: 400,
          }
        );
      }
  
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      const res:any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
            },
            async (err:any, result:any) => {
              if (err) {
                console.log(err);
                reject(err);
              }
  
              resolve(result);
            }
          )
          .end(buffer);
      });
  
      const result = await con.query("INSERT INTO product SET ?", {
            ubicacion: data.get('ubicacion'),
            valor: data.get('valor'),
            dormitorios: data.get('dormitorios'),
            ambientes: data.get('ambientes'),
            contrato: data.get('contrato') ,
            tipo: data.get('tipo'),
            m2: data.get('m2'),
            dueno: data.get('dueno'),
            banos: data.get('banos'),
            cochera: data.get('cochera'),
            imagen: res.secure_url,
      });
  
      return NextResponse.json({
        result
      });
    } catch (error:any) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
}

export async function DELETE(){

}