import express from 'express'
import Ciudades from './db/Ciudades.mjs'
import InfoCiudad from './db/InfoCiudad.mjs'
import ModificarCiudad from './db/ModificarCiudad.mjs'
import EliminarCiudad from './db/EliminarCiudad.mjs'
import NuevaCiudad from './db/NuevaCiudad.mjs'

// inicializar la aplicación
const servidor = express()

// Middleware para parsear el cuerpo de la solicitud como JSON
servidor.use(express.json())

//* ruta de prueba => http://localhost:9000/prueba
// servidor.get('/prueba', (req, res) => {
//     res.send('probando el servidor de node')
// })

//* ruta para llamar al backend => http://localhost:9000/ciudades
servidor.get('/ciudades', async (req, res) => {
    //? obtener los datos de la base de datos
    const lista_ciudades = await Ciudades()
    const { estado } = lista_ciudades

    //? Devolver el objeto JSON recibido junto con el código de estado
    res.status(estado).json(lista_ciudades)
})

//* ruta para llamar al backend => http://localhost:9000/meteo
servidor.post('/meteo', async (req, res) => {
    const datos = req.body

    //? 1.- obtener los datos de weatherstack
    //? 2.- almacenar los datos o el error de weatherstack en la base de datos

    //? obtener los datos de la base de datos
    const info_ciudad = await InfoCiudad(datos.ciudad)
    const { estado } = info_ciudad

    //* Devolver el objeto JSON recibido junto con el código de estado
    res.status(estado).json(info_ciudad)
})

//* ruta llamar al backend => http://localhost:9000/modificar-ciudad
servidor.post('/modificar-ciudad', async (req, res) => {
    const datos = req.body
    const { ciudad, meteo } = datos

    //? actualizo una ciudad en la base de datos
    const actualizar_ciudad = await ModificarCiudad(ciudad, meteo)
    const { estado } = actualizar_ciudad

    //? Devolver el objeto JSON recibido junto con el código de estado
    res.status(estado).json(actualizar_ciudad)
})

//* ruta llamar al backend => http://localhost:9000/eliminar-ciudad
servidor.post('/eliminar-ciudad', async (req, res) => {
    const datos = req.body

    //? actualizo una ciudad en la base de datos
    const eliminar_ciudad = await EliminarCiudad(datos.ciudad)
    const { estado } = eliminar_ciudad

    //? Devolver el objeto JSON recibido junto con el código de estado
    res.status(estado).json(eliminar_ciudad)
})

//* ruta llamar al backend => http://localhost:9000/nueva-ciudad
servidor.post('/nueva-ciudad', async (req, res) => {
    const ciudad = req.body

    //? añado una nueva ciudad en la base de datos
    const nueva_ciudad = await NuevaCiudad(ciudad)
    const { estado } = nueva_ciudad

    //? Devolver el objeto JSON recibido junto con el código de estado
    res.status(estado).json(nueva_ciudad)
})

// iniciar el servidor
servidor.listen(process.env.EXPRESS_PUERTO, () => {
    console.log(`servidor ejecutandose en el puerto ${process.env.EXPRESS_PUERTO}`)
})