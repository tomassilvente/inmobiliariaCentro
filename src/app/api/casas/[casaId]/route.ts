import { connection } from "@/libs/db";
import { Casa } from "@/types/casa.interface";
import { NextResponse } from "next/server";

export async function GET(request: Request, context:any){

    const {params} = context
    const casas:Array<Casa> = (await connection).query('SELECT * FROM casas')
    const casa = (await casas)[0].filter(x => params.casaId === x.id.toString())

    return NextResponse.json({
        casa
    })

}

export async function PUT(request: Request, context:any) {
    try {
        const formData = await request.json(); 
        const {params} = context
        console.log(params, formData)
        const result = await (await connection).query(`
            UPDATE casas
            SET ubicacion = ?, dueno = ?, valor = ?, imagen = ?, contrato = ?, ambientes = ?, cochera = ?, tipo = ?, m2 = ?, dormitorios = ?, banos = ?
            WHERE id = ?`,
            [
                formData.ubicacion,
                formData.dueno,
                formData.valor,
                formData.imagen,  // Valida si necesitas manejar `file` o `image path`.
                formData.contrato,
                parseInt(formData.ambientes),
                parseInt(formData.cochera),
                formData.tipo,
                parseInt(formData.m2),
                parseInt(formData.dormitorios),
                parseInt(formData.banos),
                parseInt(params.casaId) 
            ]
        );
        
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error actualizando casa:', error);
        return NextResponse.json({ success: false, error: 'Error al actualizar la casa' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context:any){
    const {params} = context
    console.log(params)
    const casas:Array<Casa> = (await connection).query('DELETE FROM casas WHERE id = ?', params.casaId)
    return NextResponse.json({
        body: 'Deleted'
    })
}