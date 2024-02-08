'use client'
import axios from "axios"
import { useState } from "react"

type FormData = {
    imagen: string,
    ubicacion: string,
    valor: string,
    dormitorios: number,
    ambientes: number,
    contrato?: string | null,
    tipo:string,
    m2:number,
    dueno:string,
    banos: number,
    cochera: boolean
}

export default function crearCasa(){
    
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
        cochera: true
      })

      const [errors, setErrors] = useState<Record<string, string>>({})
      const [file, setFile] = useState<any>(null)


      const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
      }

      const validateFormData = (): boolean => {

        let valid = true
        const errs: Record<string, string> = {}
        if(file !== null){
            formData.imagen = `/../images/${file.name}`
        }
        else errs.imagen = 'Al menos 1 imagen Requerida'
        if (!formData.ubicacion) errs.ubicacion = 'Ubicación Requerida'
        if (!formData.valor) errs.valor = 'Valor Requerido'
        if (!formData.tipo) errs.tipo = 'Tipo Requerido'
        if (formData.m2 < 1) errs.m2 = 'm2 Requerido'
        if (!formData.dueno) errs.dueno = 'Dueño Requerido'
        if (formData.banos < 1) errs.banos = 'Al menos 1 baño Requerida'
    
        if (Object.keys(errs).length > 0) valid = false
        setErrors(errs)

        return valid
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (!validateFormData()) {
            console.log(errors)
            return
        }

        console.log(formData)
        const res = await axios.post('/api/casas', formData,{
            headers:{
                'Content-Type': 'Multipar/form-data'
            }
        })
        console.log(res)
      }
    return(
        <div className="mx-[50px] bg-white rounded-xl pb-[50px] pt-[20px] my-[35px]">
            <h1></h1>
            <form onSubmit={handleSubmit} className=" p-[25px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:space-x-[15px] space-y-[15px]">
                <div className="md:ml-[15px] mt-[15px]">
                    <span className="text-sm ">Ubicación</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px] " 
                        onChange={handleChange}
                        name="ubicacion" 
                        type="text" 
                    />
                </div>
                <div>
                    <span className="text-sm">Valor</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]" 
                        name="valor" 
                        type="text" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span className="text-sm">Tipo de Inmueble</span>
                    <br />
                    <select 
                        defaultValue={'casa'} 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px] w-[175px]" 
                        name="tipo"
                        onChange={handleChange}
                    >
                        <option value={'casa'}>Casa</option>
                        <option value={'departamento'}>Departamento</option>
                        <option value={'local'}>Local</option>
                    </select>
                </div>
                <div>
                    <span className="text-sm">Ambientes</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]" 
                        name="ambientes" 
                        type="number"
                        defaultValue={1}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <span className="text-sm">Dormitorios</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]" 
                        name="dormitorios" 
                        type="number" 
                        defaultValue={1}
                        onChange={handleChange}
                        />
                </div>
                
                <div>
                    <span className="text-sm">Baños</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]" 
                        name="banos" 
                        type="number" 
                        defaultValue={1}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <span className="text-sm">Cochera</span>
                    <br />
                    <select 
                        defaultValue={'false'} 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px] w-[175px]" 
                        name="tipo"
                        onChange={handleChange}
                    >
                        <option value={'true'}>Si</option>
                        <option value={'false'}>No</option>
                    </select>
                </div>
                <div>
                    <span className="text-sm">Metros Cuadrados</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]" 
                        name="m2" 
                        type="number" 
                        defaultValue={30}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span className="text-sm">Fecha de Contrato (si hay)</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]"
                        name="contrato" 
                        type="text" 
                        placeholder="dd/mm/aaaa"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span className="text-sm">Dueño</span>
                    <br />
                    <input 
                        className="font-light bg-gray-200 mt-[5px] rounded-md h-[30px] p-[10px]" 
                        name="dueno" 
                        type="text"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span className="text-sm">Insertar Imágenes</span>
                    <br />
                    <input 
                        className="font-light mt-[5px] rounded-md h-[30px] md:w-[100%] w-[175px]" 
                        multiple 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        onChange={e => {setFile(e.target.files[0])}}
                    />
                </div>
                <br />
                <button 
                    type="submit" 
                    className="col-start-2 bg-green-500 h-[50px] rounded-xl text-white text-2xl"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}