'use client'

import { Casa } from "@/types/casa.interface"
import { useEffect, useState } from "react"
import HorizontalCardAdmin from "./components/HorizontalCardAdmin"

export default function Casas(){

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
  
    getCasas()
    

    return(
        <div className="py-5 m-5">
            <p className="text-4xl text-center font-semibold mb-[30px] text-[#fffce0]">INMUEBLES</p>
            {
                Loading
                ? <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando Casas...</h1>
                :
                    <div className="items-center flex flex-col">
                        {data && data.sort(function(a: Casa,b: Casa):number{
                            if(a.ubicacion < b.ubicacion) return -1
                            else return 1
                        }).map((casa) => (
                            <HorizontalCardAdmin
                                key={casa.id}
                                image={casa.imagen}          ubicacion={casa.ubicacion} 
                                valor={casa.valor}           dormitorios={casa.dormitorios} 
                                ambientes={casa.ambientes}   banos={casa.banos} 
                                cochera={casa.cochera}       tipo={casa.tipo}
                                m2={casa.m2}                 id={casa.id}
                            />   
                            
                        ))}
                </div>
            }       
        </div>
    )
}