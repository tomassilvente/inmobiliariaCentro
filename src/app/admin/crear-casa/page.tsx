'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function CrearCasa() {
  const router = useRouter();

  const [imagenes, setImagenes] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    ubicacion: '',
    valor: '',
    tipo: 'casa',
    operacion: 'venta',
    ambientes: 1,
    dormitorios: 1,
    banos: 1,
    cochera: 0,
    m2: 30,
    contrato: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        e.target.type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagenes.length) {
      alert('Debe subir al menos una imagen');
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (k !== "imagenes") {
        data.append(k, String(v));
      }
    });

    imagenes.forEach(img => {
      data.append("imagenes", img);
    });


    await axios.post('/api/casas', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    router.push('/admin');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <Link href="/admin" className="text-sm text-blue-500">
        ← Volver
      </Link>

      <h1 className="text-3xl font-semibold mb-8">
        Crear nueva propiedad
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 grid gap-10"
      >

        {/* DATOS GENERALES */}
        <section>
          <h2 className="text-xl font-medium mb-4">Datos generales</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              name="ubicacion"
              placeholder="Ubicación"
              className="input"
              onChange={handleChange}
            />

            <select name="tipo" className="input" onChange={handleChange}>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="local">Local</option>
            </select>

            <select
              name="operacion"
              className="input"
              onChange={handleChange}
            >
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        <section>
          <h2 className="text-xl font-medium mb-4">Características</h2>

          <div className="grid md:grid-cols-5 gap-4">
            <input type="number" name="ambientes" className="input" placeholder="Ambientes" onChange={handleChange} />
            <input type="number" name="dormitorios" className="input" placeholder="Dormitorios" onChange={handleChange} />
            <input type="number" name="banos" className="input" placeholder="Baños" onChange={handleChange} />
            <input type="number" name="m2" className="input" placeholder="m²" onChange={handleChange} />

            <select name="cochera" className="input" onChange={handleChange}>
              <option value={0}>Sin cochera</option>
              <option value={1}>Con cochera</option>
            </select>
          </div>
        </section>

        {/* VALOR */}
        <section>
          <h2 className="text-xl font-medium mb-4">Valor</h2>

          <input
            name="valor"
            placeholder="Valor del inmueble"
            className="input max-w-sm"
            onChange={handleChange}
          />
        </section>

        {/* CONTRATO */}
        <section>
          <h2 className="text-xl font-medium mb-4">Contrato</h2>

          <input
            name="contrato"
            placeholder="dd/mm/aaaa"
            className="input max-w-sm"
            onChange={handleChange}
          />
        </section>

        {/* IMÁGENES */}
        <section>
          <h2 className="text-xl font-medium mb-4">Imágenes</h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={e =>
              setImagenes(Array.from(e.target.files || []))
            }
          />

          {/* PREVIEW */}
          {imagenes.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
              {imagenes.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full h-32 rounded-lg overflow-hidden border"
                >
                  <Image
                    src={URL.createObjectURL(img)}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-xl text-lg self-start"
        >
          Guardar propiedad
        </button>
      </form>
    </div>
  );
}
