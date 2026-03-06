import { getCasas } from "@/libs/data/casas";
import ListadoCasasClient from "@/components/common/ListadoCasas";

export default async function VentasPage() {
  const casas = await getCasas("venta");

  return <ListadoCasasClient casas={casas} tipo="venta" />;
}