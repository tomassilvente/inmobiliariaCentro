import { Casa } from "@/types/casa.interface";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCasas(operacion: string): Promise<Casa[]> {
  const res = await fetch(
    `${BASE}/api/casas?operacion=${operacion}&disponible=true`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.casas ?? data;
}