/*
Ejemplo Contenido Estatico
Requiere:
npm install express
*/
const express = require('express') 
const app = express()
const port = 3000

//Setea el contenido de la carpeta Estatico como ruta a partir de la raiz
//http://localhost:3000/holamundo.html
app.use(express.static('Estatico'));

//Setea el contenido de la carpeta Estatico como ruta a partir de la raiz
//http://localhost:3000/ContenidoEstatico/holamundo.html
app.use('/ContenidoEstatico', express.static('Estatico'));

//Setea el contenido de la carpeta Estatico como ruta a partir de la raiz
//http://localhost:3000/miOtraRuta/holamundo.html
app.use('/miOtraRuta', express.static('Estatico'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})