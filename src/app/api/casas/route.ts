import { NextResponse } from "next/server";
import { client } from "@/libs/db";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dgs3my0h4', 
  api_key: '728714138724513', 
  api_secret: 'XttfGuZz77rzEIKMezwHvLR_ubQ' 
});
          
export async function GET(){
    try{
        let casas = await client.execute('SELECT * FROM casas')
        return NextResponse.json(casas.rows)
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
      const dormitorios = parseInt(data.get('dormitorios'))
      const m2 = data.get('m2')
      const cochera = data.get('cochera')
      const banos = data.get('banos')
      const ambientes = data.get('ambientes')
  
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

       const response = await client.batch([{
            sql: `INSERT INTO Casas (ubicacion, valor, dormitorios, ambientes, contrato, tipo, m2, dueno, banos, cochera) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            args : [
              data.get('ubicacion'),
              data.get('valor'),
              dormitorios,
              parseInt(ambientes),
              data.get('contrato') ,
              data.get('tipo'),
              parseInt(m2),
              data.get('dueno'),
              parseInt(banos),
              parseInt(cochera),
              res.secure_url,
        ],
      }], 'write');

      return response
    }
      catch (error:any) {
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