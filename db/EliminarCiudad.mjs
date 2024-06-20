import GuardarError from "../functions/GuardarError.mjs"
import ConectarMysql from "./ConectarMysql.mjs"

/**
 * Se conecta con MySQL y elimina un registro
 * @param {number} ciudad la ciudad que se usa como condición para modificar el campo meteo
 * @returns {object} devuelve un objeto con la información de mysql2 sobre la operación
 */
export default async function EliminarCiudad(ciudad) {

    // conexión con MySQL
    const conexion = await ConectarMysql()

    try {
        // Consulta para traerme la información de la ciudad solicitada
        const sql = 'DELETE FROM ciudades WHERE ciudad = ?'

        const [resultado_sql] = await conexion.execute(sql, [ciudad]);

        return {
            estado: 200,
            mysql: resultado_sql
        }
    } catch (error) {
        GuardarError(`Mysql: eliminando ${ciudad}`, error)
        return {
            estado: 500,
            mysql: `No no he podido eliminar ${ciudad}`
        }
    } finally {
        // siempre cierro la conexión
        conexion.end()
    }
}