'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    email: "",
    password: "",
    password2: "",
    tipoCliente: "NULL",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.password2) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Error al registrar usuario");
        return;
      }

      setSuccessMessage("Usuario registrado correctamente");
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch {
      setErrorMessage("Ocurrió un error. Intentalo nuevamente.");
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center my-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 min-w-[500px]">

        {/* HEADER */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            width={120}
            height={100}
            alt="Logo"
            priority
            className="mx-auto"
          />

          <h1 className="text-3xl font-bold text-[#212121] mt-4">
            Crear cuenta
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Completá tus datos para registrarte
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NOMBRE */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Nombre completo
            </label>
            <input
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#8a7b5e] focus:outline-none"
              required
            />
          </div>

          {/* DOCUMENTO */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Documento
            </label>
            <input
              id="documento"
              type="number"
              value={formData.documento}
              onChange={handleChange}
              placeholder="12345678"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#8a7b5e] focus:outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#8a7b5e] focus:outline-none"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#8a7b5e] focus:outline-none"
              required
            />
          </div>

          {/* PASSWORD 2 */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Repetir contraseña
            </label>
            <input
              id="password2"
              type="password"
              value={formData.password2}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:ring-2 focus:ring-[#8a7b5e] focus:outline-none"
              required
            />
          </div>

          {/* SELECT */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Situación habitacional
            </label>

            <select
              id="tipoCliente"
              value={formData.tipoCliente}
              onChange={handleChange}
              className="
                w-full px-4 py-3 rounded-xl border border-gray-300 bg-white
                focus:ring-2 focus:ring-[#8a7b5e] focus:outline-none
              "
            >
              <option value="NULL">No poseo ni alquilo</option>
              <option value="dueno">Poseo una propiedad</option>
              <option value="inquilino">Alquilo una propiedad</option>
            </select>
          </div>

          {/* ERRORS */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl
              bg-[#8a7b5e] text-white font-semibold
              hover:bg-[#766851]
              transition shadow-md
            "
          >
            Crear cuenta
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 text-center mt-6">
          ¿Ya tenés cuenta?{" "}
          <a
            href="/logearse"
            className="text-[#8a7b5e] font-medium hover:underline"
          >
            Iniciar sesión
          </a>
        </p>
      </div>
    </section>
  );
}