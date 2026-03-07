import { getCasas } from "@/libs/data/casas";
import ListadoCasas from "@/components/common/ListadoCasas";

export default async function AlquilerPage() {
  const casas = await getCasas("alquiler");

  return <ListadoCasas casas={casas} tipo="alquiler" />;
}