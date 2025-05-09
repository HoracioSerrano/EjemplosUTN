/*
Ejemplo Hola Mundo en Express
Requiere:
npm install cors
*/
const express = require('express') 
const app = express()

app.use(express.json());

//utiliza CORS
var cors = require('cors')
//setea cors abierto para todos los dominios
//mas opciones de configuracion https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())//estoy seteando cors como middleware para todas las solicitudes

app.post('/concors',(req,res,next)=>{
    const contenido = req.body;
    contenido.recibido="ok";
    res.status(200).send(contenido);
});

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});




