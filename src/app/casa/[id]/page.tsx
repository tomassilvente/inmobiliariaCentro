'use client'
import { Casa } from "@/types/casa.interface"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function casas({params}:any){
    const [data, setData] = useState<Array<Casa>>([])
    const [Loading, setLoading] = useState<boolean>(true)
    
    const getCasa = async()=>{
        try{
            const response = await fetch(`http://localhost:3000/api/casas/${params.id}`,{
                method:'GET',
                next:{
                    revalidate: 5000
                }
            })
            if(response){ 
                const {casa} = await response.json()
                console.log(casa)
                if(casa) setData(casa)
            }
    }
        catch(error){ console.log(error)}
        finally {setLoading(false)}
    }

    useEffect(()=>{
        getCasa()
    }, [])
    return(
        
        <div className="m-5 bg-white border shadow-lg rounded-xl ">
            {
                Loading? <p className="text-3xl text-center text-green-500 m-[150px]">Cargando...</p>
                :<div className="md:flex">
                    <Image className="my-[20px] m-[20px] md:w-[40%] lg:w-[50%] lg:max-h-[500px] lg:max-w-[500px] w-[93%] rounded-xl md:rounded-none" src={data[0]?.imagen} alt='' width={500} height={500}/>
                    <div className=" w-[12%] hidden lg:block">
                        <Image className="mt-[20px] ml-[10px]" src={data[0]?.imagen} alt='' width={110} height={110}/>
                        <Image className="mt-[12px] ml-[10px]" src={data[0]?.imagen} alt='' width={110} height={110}/>
                        <Image className="mt-[12px] ml-[10px]" src={data[0]?.imagen} alt='' width={110} height={110}/>
                        <Image className="mt-[12px] ml-[10px]" src={data[0]?.imagen} alt='' width={110} height={110}/>
                    </div>
                    <div className=" md:block flex md:w-[60%] lg:w-[30%] lg:ml-[15px] xl:ml-0 xl:w-[20%] 2xl:w-[22%] 3xl:w-[25%]">
                        <div className="xl:w-[100%] md:w-[90%] w-[65%] mb-[100px] xl:mb-0 md:mb-0 lg:text-center">
                            <p className="text-5xl lg:text-center md:mx-0 mx-[25px] lg:mx-0 mt-[20px]">{data[0]?.ubicacion}</p>
                            <p className=" lg:text-xl mx-[25px] lg:mt-[25px] mt-[10px] md:mx-0">{data[0].tipo === 'casa' ? 'Casa' : 'Departamento'} de {data[0].m2} metros cuadrados</p>
                            <p className=" lg:text-xl mx-[25px] md:mx-0">Cuenta con {data[0].ambientes} ambientes, de los cuales son {data[0].dormitorios} {data[0].dormitorios>1 ? 'dormitorios' : 'dormitorio'} y {data[0].banos} {data[0].banos>1 ? 'baños' : 'baño'}.</p>
                            <p className=" lg:text-xl mx-[25px] md:mx-0">  {data[0].cochera ? 'No cuenta' : 'Cuenta'} con cochera. </p>
                        </div>
                        <div className="font-light xl:w-[100%] w-[35%] md:w-[90%] lg:ml-[0px] mr-[15px] md:mb-[20px] xl:mb-0 text-center">
                            <p className=" text-green-500 md:mt-[15px] xl:mt-[10px] mt-[30px] lg:mt-[55px]">Este inmueble se encuentra disponible, si te interesa no dudes en contactarte con nosotros para comenzar a gestionar un futuro alquiler.</p>
                            <Link className="" href='/contacto'><button className="hover:cursor-pointer border rounded-full text-xl md:text-lg lg:text-xl mt-[10px] bg-green-500 h-[50px] w-[85%] md:h-[35px] md:w-[50%] text-white">Contacto</button></Link>
                        </div>
                    </div>
                    <div className="hidden xl:block xl:w-[20%] 2xl:w-[25%] ml-[25px] 2xl:ml-[50px]">
                        <form className="border border-green-700 p-5 mt-[45px] rounded-lg">
                            <p className="text-center text-lg font-light">Dejanos tu información para futuros alquileres y promociones.</p>
                            <hr className="my-[10px]"/>
                            <span>Teléfono</span>
                            <br className="2xl:hidden"/>
                            <input className="bg-gray-300 rounded-xl border pl-2 mb-[10px] mt-[5px] 2xl:ml-[75px]" type='tel' placeholder="Télefono"/>
                            <br />
                            <span>Email</span>
                            <br className="2xl:hidden"/>
                            <input className="bg-gray-300 rounded-xl pl-2 mb-[10px] mt-[5px] 2xl:ml-[92px]" type='email' placeholder="Email"/>
                            <br />
                            <span>Nombre Completo</span>
                            <br className="2xl:hidden"/>
                            <input className="bg-gray-300 rounded-xl pl-2 mb-[10px] mt-[5px] 2xl:ml-[20px]" type='text' placeholder="Nombre Completo"/>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}