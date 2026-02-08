import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="w-[260px] bg-white border-r border-gray-200 px-6 py-8">

          <h2 className="text-xl font-bold text-[#212121] mb-10">
            Inmobiliaria Centro
          </h2>

          <nav className="flex flex-col gap-2 text-sm">

            <Link className="admin-link" href="/admin">
              Dashboard
            </Link>

            <Link className="admin-link" href="/admin/casas">
              Inmuebles
            </Link>

            <Link className="admin-link" href="/admin/crear-casa">
              Crear inmueble
            </Link>

            <Link className="admin-link" href="/admin/clientes">
              Clientes
            </Link>

            <Link className="admin-link" href="/admin/historialPagos">
              Pagos
            </Link>

            <Link className="admin-link" href="/admin/recibo">
              Generar recibo
            </Link>
          </nav>

          <div className="mt-auto pt-10">
            <UserButton afterSignOutUrl="/" />
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 px-12 py-10 min-w-[950px]">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
}