import mysql from 'mysql2/promise';
import GuardarError from '../functions/GuardarError.mjs'

/**
 * Crea la conexión con la base de datos MySQL
 * @returns {object} devuelve un objeto con la configuración de conexión a MySQL
 */
export default async function ConectarMysql() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_SERVIDOR,
            user: process.env.MYSQL_USUARIO,
            password: process.env.MYSQL_CLAVE,
            database: process.env.MYSQL_BASE_DATOS,
            port: process.env.MYSQL_PUERTO
        });
        console.log('Conexión a MySQL establecida.');
        return connection;
    } catch (error) {
        GuardarError('Mysql: problemas de conexión', error)
        throw error;
    }
}