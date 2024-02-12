import { NextResponse } from "next/server";
import { con } from "@/libs/db";
import { writeFile } from "fs/promises";
import path from "path";

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

export async function POST(request:any){
    try{
        const {
            imagen,
            imagenBuffer,
            ubicacion,
            valor,
            dormitorios,
            ambientes,
            contrato ,
            tipo,
            m2,
            dueno,
            banos,
            cochera} = await request.json()

        await writeFile(imagen, imagenBuffer)

        const result = await con.query('INSERT INTO casas SET ?',{
            imagen: imagen,
            ubicacion: ubicacion,
            valor: valor,
            dormitorios: dormitorios,
            ambientes: ambientes,
            contrato:contrato ,
            tipo: tipo,
            m2: m2,
            dueno: dueno,
            banos: banos,
            cochera: cochera
            // imagen: data.get('imagen'),
            // ubicacion: data.get('ubicacion'),
            // valor: data.get('valor'),
            // dormitorios: data.get('dormitorios'),
            // ambientes: data.get('ambientes'),
            // contrato: data.get('contrato') ,
            // tipo: data.get('tipo'),
            // m2: data.get('m2'),
            // dueno: data.get('dueno'),
            // banos: data.get('banos'),
            // cochera: data.get('cochera')
        })

        console.log(result)

        return NextResponse.json('Casa Guardada')
    }
    catch(error:any){
        console.log(error)
        return NextResponse.json({
            message: error.message
        },{
            status: 500
        })
    }
}

export async function DELETE(){

}