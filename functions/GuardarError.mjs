import FechaHora from "./FechaHora.mjs"
import GuardarJSON from "./GuardarJSON.mjs"
import LeerJSON from "./LeerJSON.mjs"

/**
 * Prepara un bojeto con la información de un error y lo almacena en fichero .json
 *  @param {string} aplicacion programa donde se ha generado el error 
 * @param {string} error el mensaje de error generado por la aplicación 
 */
export default async function GuardarError(aplicacion, error) {

    let errores_json = await LeerJSON('error.json')
    
    const fecha_hora = FechaHora()
    const { hora, fecha } = fecha_hora

    if (errores_json.length === 0) {
        let nuevo_error = [{
            aplicacion,
            error,
            fecha,
            hora
        }]

        await GuardarJSON(nuevo_error, 'error.json')
    } else {
        errores_json.push({
            aplicacion,
            error,
            fecha,
            hora
        })

        await GuardarJSON(errores_json, 'error.json')
    }
}