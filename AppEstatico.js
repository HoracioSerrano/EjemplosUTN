/*
Ejemplo Contenido Estatico
Requiere:
npm install express
*/
const express = require('express') 
const app = express()
const port = 3000

//Setea el contenido de la carpeta Estatico como ruta a partir de la rais
//http://localhost:3000/holamundo.html
app.use(express.static('Estatico'));

app.use('/ContenidoEstatico', express.static('Estatico'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})