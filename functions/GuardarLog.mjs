import { appendFile } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import FechaHora from './FechaHora.mjs'

/**
 * Almacena en un fichero de texto los errores de las aplicaciones que no puedo almacenar en el .json
 * @param {string} fichero el el fichero que ha generado el error
 * @param {string} mensaje_error el mensaje de error generado en node
 */
export default function GuardarLog(fichero, mensaje_error) {

    const fecha_hora = FechaHora()
    const { hora, fecha } = fecha_hora

    // Obtener la ruta completa del directorio actual
    //? esto te devuelve la ruta donde se está ejecutando la función: por ejemplo
    //* /Users/usuario/proyectos/mi-proyecto/functions
    const directorio_actual = dirname(fileURLToPath(import.meta.url))

    // Obtener la ruta del directorio padre
    // es decir, la ruta del proyecto
    const directorio_proyecto = resolve(directorio_actual, '..')

    // Ruta al archivo donde se encuentra el fichero de logs
    const directorio_fichero_log = join(directorio_proyecto, `/logs/errores.txt`)

    const error_completo = `${fecha} - ${hora} - ${fichero}: ${mensaje_error}`

    appendFile(directorio_fichero_log, error_completo + '\n', (error) => {
        if (error) {
            //! este error ya no lo puedo almacenar, tengo que verlo en la consola
            console.log('Se ha producido un error al intentar escribir en el fichero errores.txt')
            console.log(error)
        }
    })
}