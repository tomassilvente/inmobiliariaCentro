'use client'
import HorizontalCard from '@/components/common/HorizontalCard';
import { Casa } from '@/types/casa.interface';
import { useEffect, useState } from 'react';

export default function ventas(){

    const [data, setData] = useState<Array<Casa>>([])
    const [Loading, setLoading] = useState<boolean>(true)

    const getCasas = async()=>{
        try{
            const response = await fetch(`http://localhost:3000/api/casas/`,{
                method:'GET',
                next:{
                    revalidate: 5000
                }
            })
            if(response){ 
            const data = await response.json()
            console.log(data)
            if(data) setData(data)
            }
        }
        catch(error){ console.log(error)}
        finally {setLoading(false)}
    }

    useEffect(()=>{
        getCasas()
    })

    return(
        <div className=" py-5">
            {
                Loading
                ? <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
                :
                data.filter(x => x.contrato == null).map((venta) => (
                    <HorizontalCard
                    image={venta.imagen}          ubicacion={venta.ubicacion} 
                    valor={venta.valor}           dormitorios={venta.dormitorios} 
                    ambientes={venta.ambientes}   banos={venta.banos} 
                    cochera={venta.cochera}       tipo={venta.tipo}
                    m2={venta.m2}                 id={venta.id}
                />    
                ))
            }       
        </div>
    )
}