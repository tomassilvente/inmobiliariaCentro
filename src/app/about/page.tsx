"use client";
import Image from "next/image";

export default function Nosotros() {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Nuestra Historia
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
        <div className="md:w-1/2 lg:w-1/3 flex justify-center">
          <Image
            src="/images/unnamed.jpg"
            alt="Fachada de la inmobiliaria"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 lg:w-2/3">
          <p className="text-lg leading-relaxed text-gray-600 mb-4">
            Desde su fundación en 2005, Inmobiliaria Centro ha sido un pilar en
            la comunidad de Punta Alta. Creada por la Sra. María Ester Vivas,
            quien decidió abrir sus puertas en 25 de mayo 482, esta inmobiliaria
            comenzó con una simple misión: brindar a las familias de la ciudad
            un lugar seguro y confiable para encontrar el hogar de sus sueños.
          </p>
          <p className="text-lg leading-relaxed text-gray-600 mb-4">
            En sus primeros días, María Ester Vivas trabajaba con un pequeño
            equipo, dedicándose personalmente a cada cliente que cruzaba sus
            puertas. Su ética de trabajo, integridad y profundo conocimiento del
            mercado local pronto posicionaron a Inmobiliaria Vivas como una de
            las agencias más respetadas de la región.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            A lo largo de los años, la empresa ha crecido, pero su esencia sigue
            siendo la misma: ofrecer un servicio personalizado y cercano. Hoy,
            Inmobiliaria Vivas sigue guiada por los valores de su fundadora,
            comprometida en ayudar a la gente de Punta Alta a encontrar su hogar
            ideal y acompañarlos en cada paso del proceso.
          </p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p className="text-xl font-semibold text-green-700">
          Estamos aquí para acompañarte en cada decisión, porque tu hogar es
          nuestra pasión.
        </p>
      </div>
    </div>
  );
}
