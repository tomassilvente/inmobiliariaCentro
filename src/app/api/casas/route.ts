import { NextResponse } from "next/server";
import data from '../../../../public/data/Data.json'

export async function GET(){
    return NextResponse.json({
        data
    });
}

