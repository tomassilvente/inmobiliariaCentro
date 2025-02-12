'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar cualquier error previo

    try {
      const response = await fetch(`/api/users/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Si la API devuelve un error
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al iniciar sesión");
        return;
      }

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);
      console.log(data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.user.nombre)
      router.push('/')

      // Aquí puedes redirigir al usuario o guardar datos necesarios, como un token
    } catch (error) {
      console.error("Error durante la solicitud:", error);
      setErrorMessage("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          ¿No tienes cuenta?
          <a href="/registro" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
