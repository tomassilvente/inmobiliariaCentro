import { NextResponse } from "next/server";
import data from '../../../../../public/data/Data.json'


export async function GET(request: Request, context:any){

    const {params} = context
    const casa = data.filter(x => params.casaId === x.id.toString())

    return NextResponse.json({
        casa
    })

}