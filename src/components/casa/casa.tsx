'use client'

import { useState } from "react";
import { Casa } from "@/types/casa.interface";
import Image from "next/image";
import Link from "next/link";
import SvgSofa from "../../../public/assets/sofa";
import SvgBed from "../../../public/assets/bed";
import SvgBath from "../../../public/assets/bath";
import SvgSquare from "../../../public/assets/square";
import SvgCar from "../../../public/assets/car";
import SvgHouse from "../../../public/assets/house";

export default function CasaClient({
  casa,
  recomendadas,
}: {
  casa: Casa;
  recomendadas: Casa[];
}) {

  const [activeImage, setActiveImage] = useState(0);

  if (!casa) return null;

  return (
    <div className="w-full px-8 lg:px-16 py-12">
      <div className="max-w-[1300px] mx-auto">

        {/* ===== GALERÍA ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-20">

          <div className="flex flex-col gap-4">
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image
                src={casa.imagenes[activeImage]}
                alt="Imagen propiedad"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {casa.imagenes?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border
                    ${i === activeImage ? 'border-blue-500' : 'border-gray-200'}
                  `}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ===== INFO ===== */}
          <div className="flex flex-col gap-6">
            <span
              className={`w-fit px-3 py-1 rounded-full text-sm font-semibold
                ${casa.operacion === 'venta'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
                }`}
            >
              {casa.operacion === 'venta' ? 'EN VENTA' : 'EN ALQUILER'}
            </span>

            <h1 className="text-3xl font-semibold text-gray-800">
              {casa.ubicacion}
            </h1>

            <p className="text-2xl font-bold">
              {casa.operacion === 'venta' ? 'USD' : '$'} {casa.valor}
            </p>

            <ul className="grid grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-center gap-2"><SvgSofa width={35} height={35}/> {casa.ambientes} ambientes</li>
              <li className="flex items-center gap-2"><SvgBed width={35} height={35}/> {casa.dormitorios} dormitorios</li>
              <li className="flex items-center gap-2"><SvgBath width={35} height={35}/> {casa.banos} baños</li>
              <li className="flex items-center gap-2"><SvgSquare width={35} height={35}/> {casa.m2} m²</li>
              <li className="flex items-center gap-2"><SvgCar width={35} height={35}/> {casa.cochera ? 'Con cochera' : 'Sin cochera'}</li>
              <li className="flex items-center gap-2"><SvgHouse width={35} height={35}/> {casa.tipo}</li>
            </ul>
          </div>
        </div>

        {/* ===== DESCRIPCIÓN ===== */}
        {casa.descripcion && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {casa.descripcion}
            </p>
          </div>
        )}

        {/* ===== RECOMENDADAS ===== */}
        {recomendadas.length > 0 && (
          <section className="mt-20">
            <h3 className="text-2xl font-semibold mb-6">
              Otras propiedades en {casa.operacion}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recomendadas.map((item) => (
                <Link
                  key={item.id}
                  href={`/casa/${item.id}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative h-40">
                    <Image
                      src={item.imagenes[0]}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="font-medium text-lg">{item.ubicacion}</p>
                    <ul className="grid grid-cols-2 gap-4 text-gray-700">
                      <li className="flex items-center gap-2"><SvgSofa width={35} height={35}/> {item.ambientes} ambientes</li>
                      <li className="flex items-center gap-2"><SvgBed width={35} height={35}/> {item.dormitorios} dormitorios</li>
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}