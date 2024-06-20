import GuardarError from "../functions/GuardarError.mjs"
import ConectarMysql from "./ConectarMysql.mjs"

/**
 * Se conecta con MySQL y obtiene todos los registros de una tabla en concreto
 * @returns {array} devuelve un array con toda la información obtenida de la base de datos
 */
export default async function Ciudades() {

    // conexión con MySQL
    const conexion = await ConectarMysql()

    try {
        const sql = 'SELECT * FROM ciudades'
        
        const resultado_sql = await conexion.execute(sql);
        const ciudades = resultado_sql[0]

        return {
            estado: 200,
            mysql: ciudades
        }
    } catch (error) {
        GuardarError(`Mysql: obtener todas las ciudades`, error)
        return {
            estado: 500,
            mysql: `No se ha podido obtener la información de las ciudades`
        }
    } finally {
        // siempre cierro la conexión
        conexion.end()
    }
}