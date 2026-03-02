'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      router.push("/");
    } catch {
      setErrorMessage("Ocurrió un error. Intentalo nuevamente.");
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 min-w-[500px]">

        {/* HEADER */}
        <div className="text-center mb-8">
          <span className="eyebrow">
            <Image
              src="/images/logo.png"
              width={120}
              height={100}
              alt="Logo"
              priority
              className="mx-auto"
            />
          </span>

          <h1 className="text-3xl font-bold text-[#212121] mt-2">
            Acceso al sistema
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Ingresá con tu cuenta para continuar
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Correo electrónico
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-[#8a7b5e]
                focus:border-[#8a7b5e]
              "
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Contraseña
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-gray-300
                focus:outline-none
                focus:ring-2
                focus:ring-[#8a7b5e]
                focus:border-[#8a7b5e]
              "
              required
            />
          </div>

          {/* ERROR */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-[#8a7b5e]
              text-white
              font-semibold
              hover:bg-[#766851]
              transition
              shadow-md
            "
          >
            Iniciar sesión
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-gray-500 text-center mt-6">
          ¿No tenés cuenta?{" "}
          <a
            href="/registro"
            className="text-[#8a7b5e] font-medium hover:underline"
          >
            Registrate
          </a>
        </p>
      </div>
    </section>
  );
}