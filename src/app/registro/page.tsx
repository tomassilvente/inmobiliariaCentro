'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    email: "",
    password: "",
    password2: "",
    tipoCliente:""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    
    // Validar contraseñas
    if (formData.password !== formData.password2) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar usuario");
        return;
      }

      const data = await response.json();
      setSuccessMessage("Usuario registrado exitosamente");
      console.log("Registro exitoso:", data);
      localStorage.setItem("token", data.token);
      router.push('/')
      
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center my-10 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Pepito Juarez"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">
              Documento
            </label>
            <input
              type="number"
              id="documento"
              value={formData.documento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="12345678"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
              Repetir Contraseña
            </label>
            <input
              type="password"
              id="password2"
              value={formData.password2}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
              required
            />
          </div>
          <div>
            <label className="text-sm block">Posee usted casa o alquila aquí?</label>
            <select 
                defaultValue="NULL" 
                id="tipoCliente"
                className="w-full font-light bg-white mt-2 rounded-md h-10 p-2 focus:ring-blue-500 focus:outline-none" 
                name="tipoCliente"
                onChange={handleChange}
            >
                <option value="dueno">Poseo casa aquí</option>
                <option value="inquilino">Alquilo una casa aquí</option>
                <option value="NULL">No tengo casa ni alquilo aquí</option>
            </select>
        </div>

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          ¿Tienes cuenta?{" "}
          <a href="/logearse" className="text-blue-500 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
