import Image from "next/image";
import Link from "next/link";
import SvgFB from "../../../public/assets/fb";
import SvgX from "../../../public/assets/X";
import SvgInstagram from "../../../public/assets/Instagram";
import SvgThreads from "../../../public/assets/Threads";

export default function Footer(){

    return(
      <footer className="bg-[#111827] text-gray-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">
    
        {/* LOGO */}
        <div>
          <img src="/images/logoblanco.png" className="w-40 mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed">
            Brindando el mejor servicio inmobiliario desde 2005.
          </p>
        </div>
    
        {/* NAV */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/alquileres">Alquileres</Link></li>
            <li><Link href="/venta">Ventas</Link></li>
            <li><Link href="/about">Nosotros</Link></li>
          </ul>
        </div>
    
        {/* CONTACTO */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 25 de Mayo 482, Punta Alta</li>
            <li>📞 02932 43-4360</li>
            <li>✉ inmobiliaria.centro@yahoo.com.ar</li>
          </ul>
        </div>
    
        {/* ADMIN */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            Administración
          </h4>
    
          <Link
            href="/admin"
            className="
              inline-block mt-3
              px-6 py-2 rounded-full
              bg-white
              hover:bg-[#111827]
              hover:text-white
              text-[#111827] text-sm
              transition
            "
          >
            Acceso interno
          </Link>
        </div>
    
      </div>
    
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Inmobiliaria Centro · Todos los derechos reservados
      </div>
    </footer>
    )
}