import Alquiler from "@/components/home/Alquiler";
import Venta from "@/components/home/Venta";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="section">
        <div className="left-side w-[40%]">

          <span className="eyebrow">Inmobiliaria Centro</span>

          <h1 className="section-title">
            Propiedades pensadas para vivir,
            invertir y crecer.
          </h1>

          <p className="section-subtitle">
            Más de 20 años acompañando operaciones inmobiliarias
            en Punta Alta y la región.
          </p>
        </div>

        <Image
            src="/images/inmocen.png"
            width={900}
            height={750}
            alt="Logo"
            priority
            className="w-[55%] rounded-2xl"
        />

        
      </section>

      <Alquiler />
      <Venta />
    </>
  );
}
