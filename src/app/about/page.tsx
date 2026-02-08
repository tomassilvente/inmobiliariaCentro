"use client";

import Image from "next/image";

export default function Nosotros() {
  return (
    <section className="bg-[#fafafa] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-widest uppercase text-[#8a7b5e] font-semibold">
            Desde 2005
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#212121] mt-3">
            Inmobiliaria Centro
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Más de 20 años acompañando a las familias de Punta Alta en uno de los
            momentos más importantes de sus vidas.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-[#8a7b5e]/40 rounded-2xl" />

            <Image
              src="/images/unnamed.jpg"
              alt="Inmobiliaria Centro Punta Alta"
              width={520}
              height={520}
              className="relative rounded-2xl shadow-xl object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-2xl font-semibold text-[#212121] mb-6">
              Nuestra historia
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              Inmobiliaria Centro nació en el año 2005 de la mano de la Sra.
              <strong> María Ester Vivas</strong>, con el objetivo de brindar un
              servicio inmobiliario honesto, cercano y profesional en la ciudad
              de Punta Alta.
            </p>

            <p className="text-gray-600 leading-relaxed mb-5">
              Desde sus inicios en <strong>25 de Mayo 482</strong>, la empresa se
              consolidó gracias al trato personalizado, el profundo conocimiento
              del mercado local y el compromiso real con cada cliente.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Hoy, más de dos décadas después, seguimos trabajando con la misma
              filosofía: acompañar a cada familia con transparencia, confianza y
              dedicación en cada operación.
            </p>

            {/* HIGHLIGHT */}
            <div className="mt-8 p-6 border-l-4 border-[#8a7b5e] bg-white rounded-xl shadow-sm">
              <p className="text-lg font-medium text-[#212121]">
                Tu hogar no es solo una propiedad.
              </p>
              <p className="text-gray-600 mt-1">
                Es el lugar donde empieza tu historia.
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-center">

          <div>
            <p className="text-4xl font-bold text-[#8a7b5e]">+20</p>
            <p className="text-gray-600 mt-1">Años de experiencia</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-[#8a7b5e]">+1000</p>
            <p className="text-gray-600 mt-1">Operaciones realizadas</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-[#8a7b5e]">100%</p>
            <p className="text-gray-600 mt-1">Atención personalizada</p>
          </div>

          <div>
            <p className="text-4xl font-bold text-[#8a7b5e]">Punta Alta</p>
            <p className="text-gray-600 mt-1">Desde 2005</p>
          </div>

        </div>
      </div>
    </section>
  );
}