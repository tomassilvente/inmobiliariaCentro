import { connection } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const casaId = searchParams.get("casa_id");

        let query = "SELECT * FROM casacliente";
        let values: any[] = [];

        if (casaId) {
            query += " WHERE casa_id = ?";
            values.push(casaId);
        }

        const [casas] = await (await connection).query(query, values);

        return NextResponse.json(casas);
    } catch (error: any) {
        console.error("Error en la consulta:", error);
        return NextResponse.json(
            { message: "Error interno del servidor", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: any){

    const data = await request.json();

    console.log(data)
    const { user_id, casa_id } = data;

    try{
        const result = await (await connection).query("INSERT INTO casacliente SET ?", {
            user_id,
            casa_id,
        });

        if(result){
            return NextResponse.json({
                message: "Usuario registrado con éxito",
            });
        }
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

export async function PUT(request: any) {
    const data = await request.json();
    const { user_id, casa_ids } = data;

    if (!user_id || !Array.isArray(casa_ids)) {
        return NextResponse.json({ message: "Datos inválidos" }, { status: 400 });
    }

    try {
        const conn = await connection;

        // 1. Eliminar todas las asociaciones previas del usuario
        await conn.query("DELETE FROM casacliente WHERE user_id = ?", [user_id]);

        // 2. Insertar las nuevas asociaciones
        for (const casa_id of casa_ids) {
            await conn.query("INSERT INTO casacliente (user_id, casa_id) VALUES (?, ?)", [user_id, casa_id]);
        }

        return NextResponse.json({ message: "Asociaciones actualizadas correctamente" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: any){
    const data = await request.json();
    console.log(data)
    const users = (await connection).query('DELETE FROM casacliente WHERE user_id = ?', data.user_id)
    return NextResponse.json({
        body: 'Deleted'
    })
}