export interface Casa{
    id:number,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    tipo:string,
    m2:number,
    banos: number,
    cochera: boolean,
    operacion: 'alquiler' | 'venta',
    contrato_id_activo?: number | null
}
