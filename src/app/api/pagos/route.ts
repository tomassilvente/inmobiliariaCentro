import { connection } from "@/libs/db";
import { NextResponse } from "next/server";

// OBTENER HISTORIAL DE PAGOS
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const casaId = searchParams.get("casa_id");
        const inquilinoId = searchParams.get("inquilino_id");

        let query = `
            SELECT 
                c.id AS casa_id,
                c.ubicacion,
                c.valor,
                c.inquilino,
                u.nombre AS inquilino_nombre,
                c.valor AS monto,
                c.comprobanteUltimo AS comprobante,
                c.pago AS fecha_pago
            FROM casas c
            JOIN users u ON c.inquilino = u.documento
            WHERE contrato IS NOT NULL
        `;
        
        let values: any[] = [];
        let conditions: string[] = [];

        if (casaId) {
            conditions.push("c.id = ?");
            values.push(casaId);
        }

        if (inquilinoId) {
            conditions.push("c.inquilino = ?");
            values.push(inquilinoId);
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        const [pagos] = await (await connection).query(query, values);

        return NextResponse.json(pagos);
    } catch (error: any) {
        console.error("Error en la consulta:", error);
        return NextResponse.json(
            { message: "Error interno del servidor", error: error.message },
            { status: 500 }
        );
    }
}
