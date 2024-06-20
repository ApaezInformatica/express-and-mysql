import GuardarError from "../functions/GuardarError.mjs"
import ConectarMysql from "./ConectarMysql.mjs"  

/**
 * Se conecta con MySQL y actualiza el campo meteo
 * @param {number} ciudad la ciudad que se usa como condición para modificar el campo meteo
 * @param {object} meteo el objeto obtenido de wheaterstack
 * @returns {object} devuelve un objeto con la información de mysql2 sobre la operación
 */
export default async function ModificarCiudad(ciudad, meteo) {

    // conexión con MySQL
    const conexion = await ConectarMysql()

    try {
        // Consulta para traerme la información de la ciudad solicitada
        const sql = 'UPDATE ciudades SET meteo = ? WHERE ciudad = ?'

        const string_json = JSON.stringify(meteo);
        const [resultado_sql] = await conexion.execute(sql, [string_json, ciudad]);

        return {
            estado: 200,
            mysql: resultado_sql
        }
    } catch (error) {
        GuardarError(`Mysql: actualizando la información de ${ciudad}`, error)
        return {
            estado: 500,
            mysql: `No se ha podido actualizar información de ${ciudad}`
        }
    } finally {
        // siempre cierro la conexión
        conexion.end()
    }
}