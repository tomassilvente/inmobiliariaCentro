'use client'
import { useEffect, useState } from 'react';
import HorizontalCard from '../../components/common/HorizontalCard';
import { Casa } from '@/types/casa.interface';

export default function alquiler(){

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
        <div className="mt-5 py-5">
            {
                Loading
                ? <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
                :
                data.filter(x => x.contrato).map((alquiler) => (
                    <HorizontalCard
                        image={alquiler.imagen}          ubicacion={alquiler.ubicacion} 
                        valor={alquiler.valor}           dormitorios={alquiler.dormitorios} 
                        ambientes={alquiler.ambientes}   banos={alquiler.banos} 
                        cochera={alquiler.cochera}       tipo={alquiler.tipo}
                        m2={alquiler.m2}                 id={alquiler.id}
                    />    
                ))
            }       
        </div>
    )
}