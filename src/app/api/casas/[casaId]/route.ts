import { connection } from "@/libs/db";
import { Casa } from "@/types/casa.interface";
import { NextResponse } from "next/server";

export async function GET(request: Request, context:any){

    const {params} = context
    const casas:Array<Casa> = (await connection).query('SELECT * FROM casas')
    const casa = casas.filter(x => params.casaId === x.id.toString())

    return NextResponse.json({
        casa
    })

}

export async function PUT(){

}

export async function POST(){

}

export async function DELETE(){

}