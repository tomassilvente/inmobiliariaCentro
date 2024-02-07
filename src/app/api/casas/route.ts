import { NextResponse } from "next/server";
import data from '../../../../public/data/Data.json'
import { con } from "@/libs/db";

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

export async function PUT(){

}

export async function POST(){

}

export async function DELETE(){

}