import Alquiler from "@/components/home/Alquiler";
import Venta from "@/components/home/Venta";

export default function Home() {
  return (
    <div>
      <p className="text-4xl text-center font-semibold my-[50px] text-[#8a7b5e]">Inmobiliaria Centro</p>
      <Alquiler />
      <Venta />
    </div>
  );
}
