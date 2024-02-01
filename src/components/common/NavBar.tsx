import Image from "next/image";
import Link from "next/link";

export default function NavBar(){

    return(
        <nav className="bg-[#f7f2c7] flex text-black text-xl h-[60px] font-semibold">
            <ul className=" ml-[30px] w-[100%] flex">
                <Link href={'/'} className="md:mt-[6px] md:w-[110px] w-[75px] mt-[8px]">
                    <Image
                        src="/images/logo.png"
                        width={80}
                        height={80}
                        alt="instagram-icon"
                        priority
                        />
                </Link>
                <Link className="mt-4 mx-[30px] hover:text-gray-300" href={'/'}>Home</Link>
                <Link className="mt-4 mx-[30px] hover:text-gray-300" href={'/alquileres'}>Alquileres</Link>
                <Link className="mt-4 mx-[30px] hover:text-gray-300" href={'/venta'}>Venta</Link>
                <Link className="mt-4 mx-[30px] hover:text-gray-300" href={'/about'}>Nosotros</Link>
            </ul>
        </nav>
    )
}