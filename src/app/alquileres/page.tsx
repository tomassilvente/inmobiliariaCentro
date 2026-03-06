import { getCasas } from "@/libs/data/casas";
import ListadoCasasClient from "@/components/common/ListadoCasas";

export default async function AlquilerPage() {
  const casas = await getCasas("alquier");

  return <ListadoCasasClient casas={casas} tipo="alquiler" />;
}