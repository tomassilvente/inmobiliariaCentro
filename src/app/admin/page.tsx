import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SvgNewHouse from '../../../public/assets/newHouse';
import SvgPaper from '../../../public/assets/paper';
import SvgHouseList from '../../../public/assets/houseList';
import SvgPeople from '../../../public/assets/people';

export default function Admin() {
    const { userId } = auth();

    if (!userId) {
        redirect('/')
    }

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
                <p className="text-4xl text-green-500 text-center font-semibold">Bienvenido!</p>
                
                <div className="flex flex-col items-center mt-4">
                    <UserButton afterSignOutUrl='/' />
                    <p className="mt-2 text-xl md:text-2xl 2xl:text-3xl font-medium">Praussello Yanina</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 place-items-center">
                    <Link className="w-full max-w-[280px]" href={'/admin/crear-casa'}>
                        <div className="border rounded-lg p-5 text-center bg-white shadow-md hover:shadow-lg transition">
                            <p className="font-semibold text-lg mb-2">Crear Inmueble</p>
                            <SvgNewHouse className="w-full h-auto" height={200} width={180} />
                        </div>
                    </Link>
                    <Link className="w-full max-w-[280px]" href={'/admin/casas'}>
                        <div className="border rounded-lg p-5 text-center bg-white shadow-md hover:shadow-lg transition">
                            <p className="font-semibold text-lg mb-2">Ver Inmuebles</p>
                            <SvgHouseList className="w-full h-auto" height={200} width={180} />
                        </div>
                    </Link>
                    <Link className="w-full max-w-[280px]" href={'/admin/clientes'}>
                        <div className="border rounded-lg p-5 text-center bg-white shadow-md hover:shadow-lg transition">
                            <p className="font-semibold text-lg mb-2">Clientes</p>
                            <SvgPeople className="w-full h-auto" height={200} width={180} />
                        </div>
                    </Link>
                    <Link className="w-full max-w-[280px]" href={'/admin/recibo'}>
                        <div className="border rounded-lg p-5 text-center bg-white shadow-md hover:shadow-lg transition">
                            <p className="font-semibold text-lg mb-2">Generar Recibo</p>
                            <SvgPaper className="w-full h-auto" height={200} width={180} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
