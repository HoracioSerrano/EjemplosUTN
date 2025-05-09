/*
Ejemplo .Env
A partir de las versiones recientes de Node, se incopora la funcionalidad sin necesidad de paquete.
Se debe lanzar la aplicacion con el parametro del archivo con las variables de entorno a utlizar.
node --env-file=.env AppEnv.js
*/
const express = require('express') 
const app = express()
const port = 3000

const n = process.env.NOMBRE;
const a = process.env.APELLIDO;

console.log(`Nombre:${n} Apellido:${a}`)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})