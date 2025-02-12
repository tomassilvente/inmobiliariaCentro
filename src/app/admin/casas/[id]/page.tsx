'use client'
import { getCasa } from "@/server-actions/casas/getCasa"
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export type FormData = {
    imagen: any,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    contrato?: any,
    tipo: string,
    m2: number,
    banos: number,
    cochera: number,
    pago?: string,  // Día del último pago
    comprobanteUltimo?: string, // URL del comprobante
    inquilino: number, // Guardará el DNI del inquilino
    dueno: number
}

export default function EditCasa(context: any){
    const {params} = context
    const id = params.id
    
    const [formData, setFormData] = useState<FormData>({
        imagen: '',
        ubicacion: '',
        valor: '',
        dormitorios: 0,
        ambientes: 0,
        contrato: null,
        tipo: '',
        m2: 0,
        banos: 0,
        cochera: 0,
        pago: '', 
        comprobanteUltimo: '',
        inquilino: 0,
        dueno: 0
    });

    const [users, setUsers] = useState<{ nombre: string, documento: number }[]>([]) // Lista de usuarios
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [file, setFile] = useState<any>(null)
    const [comprobante, setComprobante] = useState<any>(null)

    const router = useRouter()

    useEffect(() => {
        console.log('ID:', id);
      
        const fetchCasa = async () => {
          if (id) {
            const respuesta = await getCasa(id);
            if (respuesta) {
              setFormData(respuesta.casa);
              console.log(respuesta.casa)
            }
          } else {
            console.error('ID no válido');
          }
        };
      
        fetchCasa();

        // Obtener los usuarios
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users'); // Ajusta la ruta según tu API
                setUsers(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        fetchUsers();
    }, [id]);

    const handleChange = async(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (name === "dueno" && Number(value) !== 0) {
            await axios.post("/api/casacliente", {
                user_id: Number(value),
                casa_id: id
            });
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const updatedFormData = { ...formData, imagen: formData.imagen, comprobanteUltimo: comprobante }
    
        try {
            const response = await axios.put(`/api/casas/${id}`, updatedFormData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response)
            if(response) router.push('/admin')
        } catch (error) {
            console.error("Error al actualizar la propiedad:", error);
        }
    }

    return (
        <div className="mx-auto max-w-screen-lg px-4 bg-black bg-opacity-20 rounded-xl pb-8 pt-6 my-8 shadow-lg">
            <Link className="ml-5" href={'/admin'}>
                Volver
            </Link>
            <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">{formData.ubicacion || "Editar Propiedad"}</h1>
            <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6 rounded-lg">
            <div>
                    <label className="text-sm block">Ubicación</label>
                    <input
                        value={formData.ubicacion}
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        onChange={handleChange}
                        name="ubicacion" 
                        type="text" 
                    />
                </div>

                <div>
                    <label className="text-sm block">Valor</label>
                    <input 
                        value={formData.valor}
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="valor" 
                        type="text" 
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm block">Tipo de Inmueble</label>
                    <select 
                        defaultValue={formData.tipo} 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="tipo"
                        onChange={handleChange}
                    >
                        <option value="casa">Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="local">Local</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm block">Ambientes</label>
                    <input 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="ambientes" 
                        type="number"
                        defaultValue={formData.ambientes}
                        value={formData.ambientes}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm block">Dormitorios</label>
                    <input 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="dormitorios" 
                        type="number" 
                        defaultValue={formData.dormitorios}
                        value={formData.dormitorios}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm block">Baños</label>
                    <input 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="banos" 
                        type="number" 
                        defaultValue={formData.banos}
                        value={formData.banos}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm block">Cochera</label>
                    <select 
                        defaultValue={formData.cochera} 
                        value={formData.cochera} 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="tipo"
                        onChange={handleChange}
                    >
                        <option value={1}>Sí</option>
                        <option value={0}>No</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm block">Metros Cuadrados</label>
                    <input 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="m2" 
                        type="number" 
                        defaultValue={formData.m2}
                        value={formData.m2}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm block">Inquilino</label>
                    <select
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2"
                        name="inquilino"
                        value={formData.inquilino}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar Inquilino</option>
                        {users.map((user) => (
                            <option key={user.documento} value={user.documento}>
                                {user.nombre} - {user.documento}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm block">Dueño</label>
                    <select 
                        value={formData.dueno} 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="dueno"
                        onChange={handleChange}
                    >
                        <option value={0}>Seleccionar</option>
                        {users.map(user => (
                            <option key={user.documento} value={user.documento}>{user.nombre} - {user.documento}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-sm block">Fecha de Contrato (si hay)</label>
                    <input
                        defaultValue={formData.contrato} 
                        value={formData.contrato} 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="contrato" 
                        type="text" 
                        placeholder="dd/mm/aaaa"
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label className="text-sm block">Insertar Imágenes</label>
                    <input 
                        defaultValue={formData.imagen}
                        className="w-full font-light mt-2 rounded-md h-10" 
                        multiple 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        onChange={e => setFile(e.target.files)}
                    />
                </div>

                <div>
                    <label className="text-sm block">Último Pago de Alquiler</label>
                    <input 
                        defaultValue={formData.pago || ""} 
                        value={formData.pago} 
                        className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                        name="ultimoPago" 
                        type="date" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="text-sm block">Subir Comprobante de Pago</label>
                    <input 
                        defaultValue={formData.comprobanteUltimo}
                        className="w-full font-light mt-2 rounded-md h-10"
                        name="comprobanteUltimo"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={e => setComprobante(e.target.files[0])}
                    />
                </div>

                <button type="submit" className="col-span-full bg-green-500 h-12 rounded-xl text-white text-xl mt-4 w-full sm:w-1/2 mx-auto">
                    Enviar
                </button>
            </form>
        </div>
    )
}
