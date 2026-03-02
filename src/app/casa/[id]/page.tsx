import CasaClient from "@/components/casa/casa";
import { Casa } from "@/types/casa.interface";

async function getCasa(id: string): Promise<Casa | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/casas/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const { casa } = await res.json();
  return casa;
}

async function getRecomendadas(casa: Casa) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/casas?operacion=${casa.operacion}&exclude=${casa.id}&disponible=true`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data.casas) ? data.casas : [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const casa = await getCasa(params.id);

  if (!casa) return null;

  const recomendadas = await getRecomendadas(casa);

  return (
    <CasaClient
      casa={casa}
      recomendadas={recomendadas}
    />
  );
}