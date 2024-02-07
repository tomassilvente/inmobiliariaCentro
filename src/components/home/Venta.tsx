"use client"
import { useEffect, useState } from 'react'
import RecommendedCard from './RecommendedCards'
import { Casa } from '@/types/casa.interface'

export default function Venta(){

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
        <div className='mt-5 py-5 bg-white rounded-xl border '>
            <h1 className="text-center text-3xl font-semibold ">Últimos inmuebles en venta</h1>
            <div className='md:flex justify-center mt-8 hidden'>
            {
                Loading
                ? <h1 className='mt-[170px] mb-[150px] text-3xl font-semibold text-green-500'>Cargando Casas...</h1>
                :
                data.filter((x:any) => x.contrato == null).map((venta:any) => (
                    <RecommendedCard 
                        image={venta.imagen}          ubicacion={venta.ubicacion} 
                        valor={venta.valor}           dormitorios={venta.dormitorios} 
                        ambientes={venta.ambientes}   banos={venta.banos} 
                        cochera={venta.cochera}       id={venta.id}/>
                ))
            }
            </div>
            <div className='md:hidden justify-center mt-8 flex'>
            {
                Loading
                ? <h1 className='mt-[170px] mb-[150px] text-3xl font-semibold text-green-500'>Cargando Casas...</h1>
                :
                data.filter((x:any) => x.contrato == null).slice(0,2).map((venta:any) => (
                    <RecommendedCard 
                        image={venta.imagen}          ubicacion={venta.ubicacion} 
                        valor={venta.valor}           dormitorios={venta.dormitorios} 
                        ambientes={venta.ambientes}   banos={venta.banos} 
                        cochera={venta.cochera}       id={venta.id}
                    />
                ))
            }
            </div>
        </div>
    ) 
}
