import {UserButton, auth, useUser} from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SvgNewHouse from '../../../public/assets/newHouse';
import SvgPaper from '../../../public/assets/paper';
import SvgHouseList from '../../../public/assets/houseList';

export default function Admin(){
    const {userId} = auth();

    if(!userId){
        redirect('/')
    }
            
    return(
        <div className="mx-[50px] bg-white rounded-xl pb-[50px] pt-[20px] my-[35px]">
            <p className="2xl:text-5xl text-3xl text-green-500 text-center">Bienvenido!</p>
            <div className='mx-[28%] 2xl:ml-[43%] xl:ml-[42%] lg:ml-[40%] md:ml-[34%] sm:ml-[33%] flex mt-[10px]'>
                <UserButton  afterSignOutUrl='/'/>
                <p className=' ml-3 text-xl md:text-2xl 2xl:text-3xl'>Praussello Yanina</p>
            </div>
            <div className='grid-cols-3 grid ml-[10%] 2xl:ml-[13%] mt-[30px] text-center lg:text-xl'>
                <Link className='w-[70%]' href={'/admin/crear-casa'}>
                    <div className='max-w-[280px] border rounded-lg p-5'>
                        Crear Inmueble
                        <SvgNewHouse className='w-[100%] h-[100%]' height={240} width={200}/>
                    </div>
                </Link>
                <Link className='w-[70%]' href={'/admin/casas'}>
                    <div className=' max-w-[280px] border rounded-lg p-5'>
                        Ver Inmuebles
                        <SvgHouseList className='w-[100%] h-[100%]' height={240} width={200}/>
                    </div>
                    </Link>
                <Link className='w-[70%]' href={'/admin/nosotros'}>
                    <div className='max-w-[280px] border rounded-lg p-5 '>
                        Modificar Nosotros
                        <SvgPaper className='w-[100%] h-[100%]' height={240} width={200}/>
                    </div>
                </Link>
            </div>
        </div>
    )
}