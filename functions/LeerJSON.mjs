import fs from 'fs/promises'
import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'
import GuardarLog from './guardarLog.mjs'

/**
 * Leer el archivo JSON de manera asíncrona. Para que funcione correctamente, si el fichero .json
 * está vacío tiene que tener un [] o un {} para que no sale la excepción
 * @param {string} fichero_json nombre del fichero json que se quiere leer
 * @returns {array || object} devuelve un array o un objeto, dependiendo del contenido del fichero .json
 */
export default async function LeerJSON(fichero_json) {
    // Obtener la ruta completa del directorio actual
    //? esto te devuelve la ruta donde se está ejecutando la función: por ejemplo
    //* /Users/usuario/proyectos/mi-proyecto/functions
    const directorio_actual = dirname(fileURLToPath(import.meta.url))

    // Obtener la ruta del directorio padre
    // es decir, la ruta del proyecto
    const directorio_proyecto = resolve(directorio_actual, '..')

    // Ruta al archivo JSON en el directorio padre
    const directorio_fichero_json = join(directorio_proyecto, `/logs/${fichero_json}`)

    // Leo el fichero json...
    try {
        const json = await fs.readFile(directorio_fichero_json, 'utf-8')
        const contenido_json = JSON.parse(json)
        
        return contenido_json
    } catch (error) {
        //! como este error no puedo almacenarlo en el json de errores
        //! voy a intentar almacenarlo en un log de errores (errores.txt)
        GuardarLog(fichero_json, error)

        console.error(`Se ha producido un error al leer el fichero ${fichero_json}`)
    }
}