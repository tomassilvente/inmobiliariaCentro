'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const [menuVisible, setMenuVisible] = useState(false); // Para manejar el menú desplegable
    const router = useRouter(); // Para redirigir al usuario después de cerrar sesión

    const [nombre, setNombre] = useState<string | null>(null);

    useEffect(() => {
      // Solo se ejecuta en el cliente
      const storedNombre = localStorage.getItem("nombre");
      console.log(storedNombre)
      setNombre(storedNombre);
    }, []);

    const handleLogout = () => {
        // Eliminar datos de localStorage y redirigir al login
        localStorage.removeItem("nombre");
        localStorage.removeItem("token");
        setNombre(null);
        setMenuVisible(false);
        router.push("/logearse"); // Redirige al usuario a la página de inicio de sesión
    };

    return (
        <nav className="bg-[#f7f2c7] flex text-black text-xl h-[60px] font-semibold relative">
            <ul className="ml-[30px] w-[90%] flex">
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
            {nombre ? (
                <div className="relative w-[15%]">
                    <button
                        className="mt-4 hover:text-gray-300"
                        onClick={() => setMenuVisible(!menuVisible)}
                    >
                        {nombre}
                    </button>
                    {menuVisible && (
                        <div className="mt-5 w-[150px] bg-white rounded-lg shadow-lg z-10">
                            <Link
                                href={'/miscasas'}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                            >
                                Mis Casas
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                        
                    )}
                </div>
            ) : (
                <Link className="mt-4 w-[10%] hover:text-gray-300" href={'/logearse'}>
                    Iniciar Sesión
                </Link>
            )}
        </nav>
    );
}
