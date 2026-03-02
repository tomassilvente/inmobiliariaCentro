import Link from "next/link";
import { getDashboardStats } from "@/libs/data/dashboard";

export default async function AdminPage() {
  const stats = await getDashboardStats();

  const formatARS = (n: number) =>
    n.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#212121] mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-10">Panel de administración general</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Stat title="Inmuebles" value={stats.inmuebles} />
        <Stat title="Alquileres activos" value={stats.alquileres} />
        <Stat title="Pagos del mes" value={formatARS(stats.pagosMes)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Action title="Crear inmueble" href="/admin/crear-casa" />
        <Action title="Ver propiedades" href="/admin/casas" />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-[#212121] mt-2">{value}</p>
    </div>
  );
}

function Action({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="
        bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition
        flex justify-between items-center
      "
    >
      <span className="text-lg font-medium">{title}</span>
      <span className="text-[#8a7b5e] font-bold text-xl">→</span>
    </Link>
  );
}