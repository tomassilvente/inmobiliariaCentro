'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useNotificaciones from "@/hooks/useNotificaciones";
import SvgBell from "../../../public/assets/bell";

export default function NavBar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [nombre, setNombre] = useState<string | null>(null);
    const router = useRouter();
    const notificaciones = useNotificaciones();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedNombre = localStorage.getItem("nombre");
        setNombre(storedNombre);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("nombre");
        localStorage.removeItem("token");
        setNombre(null);
        setMenuVisible(false);
        router.push("/logearse");
    };

    return (
        <nav className="bg-[#f7f2c7] text-black font-semibold shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[60px] items-center">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src="/images/logo.png"
                                width={80}
                                height={80}
                                alt="Logo"
                                priority
                                className="w-[75px] md:w-[100px]"
                            />
                        </Link>
                    </div>

                    {/* Menú de navegación (oculto en móviles) */}
                    <div className="hidden md:flex space-x-6">
                        <Link className="hover:text-gray-500" href="/">Home</Link>
                        <Link className="hover:text-gray-500" href="/alquileres">Alquileres</Link>
                        <Link className="hover:text-gray-500" href="/venta">Venta</Link>
                        <Link className="hover:text-gray-500" href="/about">Nosotros</Link>
                    </div>

                    {/* Iconos a la derecha */}
                    <div className="flex items-center space-x-4">
                        {/* Notificaciones */}
                        {/* <div className="relative">
                            <button onClick={() => setOpen(!open)} className="relative">
                                <SvgBell width={25} height={30} />
                                {notificaciones.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {notificaciones.length}
                                    </span>
                                )}
                            </button> */}

                            {/* Dropdown de Notificaciones */}
                            {/* {open && (
                                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-50">
                                    {notificaciones.length === 0 ? (
                                        <p className="text-gray-500 text-sm">No hay notificaciones</p>
                                    ) : (
                                        <ul>
                                            {notificaciones.map((pago) => (
                                                <li key={pago.id} className="p-2 border-b last:border-none">
                                                    📌 Pago pendiente en <strong>{pago.ubicacion}</strong>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div> */}

                        {/* Usuario o botón de Login */}
                        {nombre ? (
                            <div className="relative">
                                <button className="hover:text-gray-500" onClick={() => setMenuVisible(!menuVisible)}>
                                    {nombre}
                                </button>
                                {menuVisible && (
                                    <div className="absolute right-0 mt-2 w-[150px] bg-white rounded-lg shadow-lg z-50">
                                        <Link href="/miscasas" className="block px-4 py-2 hover:bg-gray-100">
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
                            <Link className="hover:text-gray-500" href="/logearse">
                                Iniciar Sesión
                            </Link>
                        )}

                        {/* Botón Menú Mobile */}
                        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? 'X' : 'MENÚ'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Mobile */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#f7f2c7] shadow-md p-4">
                    <Link className="block py-2 hover:text-gray-500" href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link className="block py-2 hover:text-gray-500" href="/alquileres" onClick={() => setMobileMenuOpen(false)}>Alquileres</Link>
                    <Link className="block py-2 hover:text-gray-500" href="/venta" onClick={() => setMobileMenuOpen(false)}>Venta</Link>
                    <Link className="block py-2 hover:text-gray-500" href="/about" onClick={() => setMobileMenuOpen(false)}>Nosotros</Link>
                </div>
            )}
        </nav>
    );
}
