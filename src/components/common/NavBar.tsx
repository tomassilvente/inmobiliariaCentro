'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {

  const [menuVisible, setMenuVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nombre, setNombre] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setNombre(localStorage.getItem("nombre"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/logearse");
  };

  return (
    <nav className="bg-[#0f172a] text-white border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 py-2">
          <Image
          className="pt-2"
            src="/images/logoblanco.png"
            alt="Inmobiliaria Centro"
            width={110}
            height={60}
            priority
          />
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex gap-8 font-medium">

          {[
            { href: "/", label: "Home" },
            { href: "/alquileres", label: "Alquileres" },
            { href: "/venta", label: "Ventas" },
            { href: "/about", label: "Nosotros" },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group"
            >
              {link.label}
              <span className="
                absolute left-0 -bottom-1 h-[2px] w-0
                bg-[#c6b07e]
                transition-all group-hover:w-full
              "/>
            </Link>
          ))}

        </div>

        {/* USER */}
        <div className="flex items-center gap-4">

          {nombre ? (
            <div className="relative">
              <button
                onClick={() => setMenuVisible(!menuVisible)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                {nombre}
              </button>

              {menuVisible && (
                <div className="absolute right-0 mt-3 w-48 bg-[#020617] rounded-xl shadow-xl overflow-hidden border border-white/10">
                  <Link
                    href="/miscasas"
                    className="block px-4 py-3 hover:bg-white/5"
                  >
                    Mis casas
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-400 hover:bg-white/5"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/logearse"
              className="border border-[#c6b07e] px-5 py-2 rounded-lg text-[#c6b07e] hover:bg-[#c6b07e] hover:text-black transition"
            >
              Ingresar
            </Link>
          )}

          {/* MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-lg"
          >
            ☰
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617] border-t border-white/10 px-6 py-6 space-y-4">
          <Link href="/" className="block">Home</Link>
          <Link href="/alquileres" className="block">Alquileres</Link>
          <Link href="/venta" className="block">Ventas</Link>
          <Link href="/about" className="block">Nosotros</Link>
        </div>
      )}
    </nav>
  );
}
