# Ejemplo de servidor express para conectarse con MySQL

## Requisitos: Node 21.6.2

## Iniciar proyecto
* npm run nodemon
* pnpm run nodemon

## Estructura de archivos y carpetas
* **.nvmrc:** versión de node si usas nvm
* **.env:** donde tienes que poner tu configuración de MySQL
* **servidor.mjs**: fichero principal de la aplicación
* **db:** todas las funciones necesarias para trabajar con MySQL
* **functions:** funciones necesarias principalmente para el control de errores
* **logs:** donde se almacenan los errores generados
    * **error.json:** si vacias el contenido de este fichero recuerda que siempre tiene que ser un array vacio