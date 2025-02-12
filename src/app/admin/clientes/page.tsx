'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/types/user.interface";
import { Casa } from "@/types/casa.interface";
import { CasaCliente } from "@/types/casacliente.interface";

export default function Casas() {
    const [data, setData] = useState<Array<User>>([]);
    const [casaCliente, setCasaCliente] = useState<Array<CasaCliente>>([]);
    const [casas, setCasas] = useState<Array<Casa>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [selectedCasas, setSelectedCasas] = useState<number[]>([]);
    const [selectedCasasRoles, setSelectedCasasRoles] = useState<{ [key: number]: string }>({});
    const [ubicacionFiltro, setUbicacionFiltro] = useState<string>("");
    const [ordenarPor, setOrdenarPor] = useState<string>("alfabetico");

    useEffect(() => {
        getUsers();
        getCasas();
        getCasaCliente();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch("/api/users/");
            if (response.ok) setData(await response.json());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getCasas = async () => {
        try {
            const response = await fetch("/api/casas/");
            if (response.ok) setCasas(await response.json());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getCasaCliente = async () => {
        try {
            const response = await fetch("/api/casacliente/");
            if (response.ok) setCasaCliente(await response.json());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const obtenerCasasDeCliente = (documento: number) => {
        // Casas donde el usuario es dueño
        const casasDePropietario = casaCliente.filter((relacion) => relacion.user_id === documento);
        
        // Casas donde el usuario es inquilino
        const casasDeInquilino = casas.filter((casa) => casa.inquilino === documento);
    
        // Combina ambas listas sin duplicados
        const casasAsociadas = [
            ...casasDePropietario.map((relacion) => casas.find(casa => casa.id === relacion.casa_id)),
            ...casasDeInquilino
        ].filter((casa, index, self) => self.findIndex((c) => c?.id === casa?.id) === index); // Evita duplicados
    
        return casasAsociadas;
    };
    

    const casasDisponibles = casas.filter(casa => !casaCliente.some(rel => rel.casa_id === casa.id));

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setSelectedCasas(obtenerCasasDeCliente(user.documento).map(c => c.id));
    };

    const handleSaveUser = async () => {
        if (!editingUser) return;
    
        try {
            // Primero, guardamos los cambios del usuario
            await fetch(`/api/users/${editingUser.documento}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingUser)
            });
    
            // Asociamos las casas como dueños
            await fetch(`/api/casacliente`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: editingUser.documento, casa_ids: selectedCasas })
            });
    
            // Asociamos las casas como inquilino, actualizando el campo 'inquilino' de la casa
            const casasParaInquilinos = selectedCasas.filter(casaId => {
                const casa = casas.find(c => c.id === casaId);
                return casa && casa.inquilino !== editingUser.documento; // Solo actualizamos casas donde no haya inquilino asignado
            });
    
            // Actualizar casas donde el usuario es inquilino
            for (let casaId of casasParaInquilinos) {
                await fetch(`/api/casas/${casaId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ inquilino: editingUser.documento })
                });
            }
    
            getUsers();
            getCasaCliente();
            setEditingUser(null);
        } catch (error) {
            console.log("Error al actualizar usuario", error);
        }
    };
    
    const handleDesvincularCasa = async (casaId: number, userId: number) => {
        try {
            // Eliminar la relación de 'dueño' o 'inquilino' en la tabla casacliente
            await fetch("/api/casacliente", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ casa_id: casaId, user_id: userId })
            });
    
            // Si el usuario es un inquilino, limpiamos el campo 'inquilino' en la casa
            await fetch(`/api/casas/${casaId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inquilino: null })
            });
    
            getCasaCliente(); // Recargar la relación de casas con clientes
        } catch (error) {
            console.log("Error al desvincular casa", error);
        }
    };
    

    const obtenerRolesDeCasa = (user: User) => {
        const casasDelUsuario = obtenerCasasDeCliente(user.documento);
        return casasDelUsuario.map(casa => {
            const esDueño = casaCliente.some(rel => rel.casa_id === casa.id && rel.user_id === user.documento);
            return {
                casa,
                rol: esDueño ? "Dueño" : "Inquilino"
            };
        });
    };

     // Filtrar clientes por nombre
     const clientesFiltrados = data.filter(client =>
        client.nombre.toLowerCase().includes(ubicacionFiltro.toLowerCase())
    );

    // Ordenar clientes por nombre o por número de casas asociadas
    const ordenarClientes = (clientes: Array<User>) => {
        if (ordenarPor === "alfabetico") {
            return clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (ordenarPor === "casas") {
            return clientes.sort((a, b) => obtenerCasasDeCliente(b.documento).length - obtenerCasasDeCliente(a.documento).length);
        }
        return clientes;
    };

    return (
        <div className="py-5 m-5 bg-[#fffce0]">
            <Link className="ml-5" href={'/admin'}>
                Volver
            </Link>
            <p className="text-4xl text-center font-semibold mb-[30px] text-[#a49271]">CLIENTES</p>
            
            <div className="grid grid-cols-2 items-center text-center">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={ubicacionFiltro}
                        onChange={(e) => setUbicacionFiltro(e.target.value)}
                        className="px-4 py-2 border rounded-lg md:w-[50%]"
                    />
                </div>

                <div className="mb-4">
                    <select
                        value={ordenarPor}
                        onChange={(e) => setOrdenarPor(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        <option value="alfabetico">Orden Alfabético</option>
                        <option value="casas">Ordenar por número de casas</option>
                    </select>
                </div>
            </div>
            {loading ? (
                <h1 className='m-[150px] text-3xl font-semibold text-white'>Cargando usuarios...</h1>
            ) : (
                
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        {ordenarClientes(clientesFiltrados).map((user) => (
                            <div key={user.documento} className="my-2 w-[90%] ml-[5%] py-2 px-4 bg-white rounded-lg shadow-md">
                                {editingUser?.documento === user.documento ? (
                                    <div className="flex flex-col gap-2">
                                        <input
                                            className="border p-1"
                                            type="text"
                                            value={editingUser.nombre}
                                            onChange={(e) =>
                                                setEditingUser({ ...editingUser, nombre: e.target.value })
                                            }
                                        />
                                        <input
                                            className="border p-1"
                                            type="text"
                                            value={editingUser.email}
                                            onChange={(e) =>
                                                setEditingUser({ ...editingUser, email: e.target.value })
                                            }
                                        />
                                        <strong>Casas asociadas:</strong>
                                        <div className="flex flex-col gap-2">
                                            {/* Casas actuales del cliente */}
                                            {obtenerRolesDeCasa(user).map(({ casa, rol }) => (
                                                <div key={casa.id} className="flex items-center space-x-2">
                                                    <p >{casa.ubicacion} ({rol})</p>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleDesvincularCasa(casa.id, user.documento)}
                                                    >
                                                        Desvincular
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Selección de nuevas casas para asociar */}
                                            {casasDisponibles.map((casa) => (
                                                <div key={casa.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCasas.includes(casa.id)}
                                                        onChange={(e) => {
                                                            const newSelection = e.target.checked
                                                                ? [...selectedCasas, casa.id]
                                                                : selectedCasas.filter((id) => id !== casa.id);
                                                            setSelectedCasas(newSelection);
                                                        }}
                                                    />
                                                    <span>{casa.ubicacion}</span>

                                                    {/* Selector de rol (dueño o inquilino) */}
                                                    <select
                                                        value={
                                                            selectedCasas.includes(casa.id)
                                                                ? (selectedCasasRoles[casa.id] || "dueño")
                                                                : "dueño"
                                                        }
                                                        onChange={(e) => {
                                                            const newRole = e.target.value;
                                                            setSelectedCasasRoles((prevRoles) => ({
                                                                ...prevRoles,
                                                                [casa.id]: newRole,
                                                            }));
                                                        }}
                                                    >
                                                        <option value="dueño">Dueño</option>
                                                        <option value="inquilino">Inquilino</option>
                                                    </select>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={handleSaveUser}>Guardar</button>
                                            <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setEditingUser(null)}>Cancelar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-lg font-medium text-gray-800">{user.nombre}</p>
                                        <p className=" text-gray-500">Documento: {user.documento}</p>
                                        <p className=" text-gray-500">Email: {user.email}</p>
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2" onClick={() => handleEditUser(user)}>Editar</button>
                                        <hr className="my-2" />
                                        <div>
                                            <strong>Casas asociadas:</strong>
                                            {obtenerRolesDeCasa(user).map(({ casa, rol }) => (
                                                <div key={casa.id}>
                                                    <Link href={`/admin/casas/${casa.id}`}>
                                                        <p className={`${rol == 'Dueño' ? 'text-green-600' : 'text-gray-400'}`}>{casa.ubicacion} - - {rol}</p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                
                )}
                <div className="mx-[35%] my-4 w-[30%] py-5 px-4 bg-white rounded-lg shadow-md">
                    <p className="text-lg text-center font-medium text-gray-800"> Agregar nuevo Cliente </p>
                        <div className="text-center text-4xl">
                            <Link href={'./nuevo-cliente'}> + </Link>
                        </div>
                </div>
            </div>
            
    );
}
