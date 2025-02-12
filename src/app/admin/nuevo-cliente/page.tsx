'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    email: "",
    password: "",
    tipoCliente: "NULL",
    casaId: ''
  });

  const [casasDisponibles, setCasasDisponibles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCasas = async () => {
      
        const casasResponse = await fetch(`http://localhost:3000/api/casas/`);
      
        const casasData = await casasResponse.json();
        console.log(casasData)
      
        const casaClienteResponse = await fetch("/api/casacliente");
        const casaClienteData = await casaClienteResponse.json();
        console.log(casaClienteData)
        
        const casasDisponiblesFiltradas = casasData.filter(casa => 
          !casaClienteData.some(cc => cc.casa_id === casa.id)
        );

        setCasasDisponibles(casasDisponiblesFiltradas);
     
      
    };
    fetchCasas();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");


    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar usuario");
        return;
      }

      const data = await response.json();
      setSuccessMessage("Usuario registrado exitosamente");

      await fetch("/api/casacliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ casa_id: formData.casaId, user_id: formData.documento }),
      });

      localStorage.setItem("token", data.token);
      router.push('/');
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Nuevo Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
            <input type="number" id="documento" value={formData.documento} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label className="text-sm block">Posee usted casa o alquila aquí?</label>
            <select id="tipoCliente" value={formData.tipoCliente} onChange={handleChange} required
              className="w-full font-light bg-white mt-2 rounded-md h-10 p-2 focus:ring-blue-500 focus:outline-none">
              <option value="dueno">Poseo casa aquí</option>
              <option value="inquilino">Alquilo una casa aquí</option>
              <option value="NULL">No tengo casa ni alquilo aquí</option>
            </select>
          </div>
          {formData.tipoCliente === "dueno" && (
            <div className="mb-4">
              <label htmlFor="casaId" className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Casa</label>
              <select id="casaId" value={formData.casaId} onChange={handleChange} required
                className="w-full bg-white mt-2 rounded-md h-10 p-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Seleccione una casa</option>
                {casasDisponibles.map((casa) => (
                  <option key={casa.id} value={casa.id}>{casa.ubicacion}</option>
                ))}
              </select>
            </div>
          )}
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
          <button type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 my-5 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition">
            Crear Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
