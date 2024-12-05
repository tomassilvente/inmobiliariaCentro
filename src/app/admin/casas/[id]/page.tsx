'use client'
import { getCasa } from "@/server-actions/casas/getCasa"
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Context } from "vm"

export type FormData = {
    imagen: any,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    contrato?: string | null,
    tipo:string,
    m2:number,
    dueno:string,
    banos: number,
    cochera: number
}

export default function EditCasa(context: Context){

    const {params} = context
    const id = params.id
    
    const [formData, setFormData] = useState<FormData>({
        imagen: '',
        ubicacion: '',
        valor: '',
        dormitorios: 0,
        ambientes: 0,
        contrato: null,
        tipo:'', 
        m2:0,
        dueno:'',
        banos: 0,
        cochera: 0
      })

      const [errors, setErrors] = useState<Record<string, string>>({})
      const [file, setFile] = useState<any>(null)

      let errores = 'Falta'
      const router = useRouter()

      const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
      }

      const validateFormData = (): boolean => {

        let valid = true
        const errs: Record<string, string> = {}
        if (!formData.ubicacion) {errs.ubicacion = 'Ubicación Requerida'; errores = errores + ' Ubicación'}
        if (!formData.valor) {errs.valor = 'Valor Requerido'; errores = errores + ' Valor'}
        if (!formData.tipo) {errs.tipo = 'Tipo Requerido'; errores = errores + ' Tipo'}
        if (formData.m2 < 1) {errs.m2 = 'm2 Requerido'; errores = errores + ' M2'}
        if (!formData.dueno) {errs.dueno = 'Dueño Requerido'; errores = errores + ' Dueño'}
        if (formData.banos < 1) {errs.banos = 'Al menos 1 baño Requerida'; errores = errores + ' Baños'}
    
        if (Object.keys(errs).length > 0) valid = false
        setErrors(errs)
        
        console.log(errores)
        return valid
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        
        errores = 'Falta'
        if (!validateFormData()) {
            console.log(errors)
            alert(errores)
            return
        }

        console.log(formData)
        const response = await axios.put(`/api/casas/${id}`, formData, {
            next: {
                revalidate: 5000
            }
        })
        console.log(response)
        if(response) router.push('/admin')
      }

      useEffect(() => {
        const fetchCasa = async () => {
            const respuesta = await getCasa(parseInt(id))
            
            if (respuesta) {
                setFormData(respuesta.casa[0])
            };    
        };
        fetchCasa();
    }, []);
    return(
        <div className="mx-auto max-w-screen-lg px-4 bg-black bg-opacity-20 rounded-xl pb-8 pt-6 my-8 shadow-lg">
            <Link className="ml-5" href={'/admin'}>
                Volver
            </Link>
    <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">{formData.ubicacion || "Editar Propiedad"}</h1>
    <form 
        onSubmit={handleSubmit} 
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  p-6 rounded-lg"
    >
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
                onChange={handleChange}
            />
        </div>

        <div>
            <label className="text-sm block">Cochera</label>
            <select 
                defaultValue={formData.cochera} 
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
                onChange={handleChange}
            />
        </div>

        <div>
            <label className="text-sm block">Fecha de Contrato (si hay)</label>
            <input
                value={formData.contrato} 
                className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                name="contrato" 
                type="text" 
                placeholder="dd/mm/aaaa"
                onChange={handleChange}
            />
        </div>

        <div>
            <label className="text-sm block">Dueño</label>
            <input 
                value={formData.dueno}
                className="w-full font-light bg-gray-200 mt-2 rounded-md h-10 p-2" 
                name="dueno" 
                type="text"
                onChange={handleChange}
            />
        </div>

        <div>
            <label className="text-sm block">Insertar Imágenes</label>
            <input 
                className="w-full font-light mt-2 rounded-md h-10" 
                multiple 
                type="file" 
                accept=".png, .jpg, .jpeg"
                onChange={e => setFile(e.target.files)}
            />
        </div>

        <button 
            type="submit" 
            className="col-span-full bg-green-500 h-12 rounded-xl text-white text-xl mt-4 w-full sm:w-1/2 mx-auto"
        >
            Enviar
        </button>
    </form>
</div>

    )
}