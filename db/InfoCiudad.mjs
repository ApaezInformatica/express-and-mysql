import GuardarError from "../functions/GuardarError.mjs"
import ConectarMysql from "./ConectarMysql.mjs"

/**
 * Se conecta con MySQL y obtiene la información de la ciudad solicitada
 * @param {string} ciudad la ciudad que se usa como condición para obtener los datos
 * @returns {array} devuelve un array con toda la información obtenida de la base de datos
 */
export default async function InfoCiudad(ciudad) {
    
    // conexión con MySQL
    const conexion = await ConectarMysql()
    
    try {
        // Consulta para traerme la información de la ciudad solicitada
        const sql = 'CALL obtenerCiudad(?)'
        const [filas, campos] = await conexion.execute(sql, [ciudad])
        const resultado_sql = filas[0]
        const resultado_final = resultado_sql[0]

        return {
            estado: 200,
            mysql: resultado_final
        }
    } catch (error) {
        GuardarError(`Mysql: obtener información de ${ciudad}`, error)
        return {
            estado: 500,
            mysql: `No se ha podido obtener la información de ${ciudad}`
        }
    } finally {
        // siempre cierro la conexión
        conexion.end()
    }
}