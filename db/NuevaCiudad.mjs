import GuardarError from "../functions/GuardarError.mjs"
import ConectarMysql from "./ConectarMysql.mjs"

/**
 * Se conecta con MySQL y actualiza el campo meteo
 * @param {object} ciudad un objeto con la información de la ciudad que se quiere añadir
 * @returns {object} devuelve un objeto con la información de mysql2 sobre la operación
 */
export default async function NuevaCiudad(nueva_ciudad) {

    // conexión con MySQL
    const conexion = await ConectarMysql()

    try {
        const { ciudad, pais, ingles, seo, foto } = nueva_ciudad
        
        // Consulta para añadir la nueva ciudad
        const sql = 'INSERT INTO ciudades (ciudad, pais, ingles, seo, foto) VALUES (?, ?, ?, ?, ?)'

        const [resultado_sql] = await conexion.execute(sql, [ciudad, pais, ingles, seo, foto]);

        return {
            estado: 200,
            mysql: resultado_sql
        }
    } catch (error) {
        GuardarError(`Mysql: añadiendo una nueva ciudad`, error)
        return {
            estado: 500,
            mysql: `No se ha podido añadir una nueva ciudad`
        }
    } finally {
        // siempre cierro la conexión
        conexion.end()
    }
}