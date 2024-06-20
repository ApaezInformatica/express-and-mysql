/**
 * Obtiene la hora y fecha del sistema formateados en dd/mm/aaaa y h/m/s
 * @returns {object} objeto donde tienes por separado la hora y la fecha
 */
export default function FechaHora() {
    // Obtener la fecha y hora actual
    const now = new Date();

    // Formatear la fecha en dd/mm/aaaa
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const anio = now.getFullYear();
    const fecha = `${dia}/${mes}/${anio}`;

    // Formatear la hora en h/m/s
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');
    const hora = `${horas}:${minutos}:${segundos}`;

    return {
        fecha,
        hora
    }
}