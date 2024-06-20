import fs from 'fs'
import path from 'path'

/**
 * Escribe un objeto JSON en un archivo .json con claves y valores entre comillas dobles.
 * @param json - Objeto JSON a escribir en el archivo.
 * @param fichero - Nombre del archivo donde se guardará el objeto.
 */
export default function GuardarJSON (json, fichero) {
    // Resuelve la ruta base del proyecto
    const ruta_base = path.resolve('.');

    // Combina la ruta base con 'logs' y el nombre del archivo
    const directorio = path.join(ruta_base, 'logs');
    const ruta_completa = path.join(directorio, fichero);

    // Convertimos el objeto a string usando JSON.stringify
    // Esto asegura que las claves y valores estén correctamente entre comillas dobles
    const jsonString = JSON.stringify(json, null, 2);  // null y 2 son para formatear el JSON con 2 espacios de indentación

    // Usamos el módulo fs para escribir el JSON en un archivo
    fs.writeFile(ruta_completa, jsonString, (error) => {
        if (error) {
            console.error('Error escribiendo el archivo:')
            console.log(error);
        }
    })
}