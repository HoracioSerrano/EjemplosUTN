/*
Ejemplo Hola Mundo en Express
Requiere:
npm install cors
*/
const express = require('express') 
const app = express()

app.use(express.json());//si viene una solicitud con header content-type aplication/json

//utiliza CORS
var cors = require('cors');
//setea cors abierto para todos los dominios
//mas opciones de configuracion https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());//estoy seteando cors como middleware para todas las solicitudes


//ejemplo http://localhost:3000/api/1/5
app.get('/api/:id/:id2',async (req,res,next) => {
    const id = req.params.id;
    const id2 = req.params.id2;
    res.status(200).send("El id Recibido fue: "+id+" y el id2 fue:"+id2);
});

//ejemplo http://localhost:3000/api/busqueda?nombre=horacio
app.get('/api/busqueda',async (req, res) => {
    res.send(`Buscando: ${req.query.nombre}`);
});

app.post('/api', async (req,res,next)=>{
    const datos = req.body;
    //grabo los datos
    console.log(datos);
    res.status(200).send({id:2158354});
});

app.put('/api', async (req,res,next)=>{
    const datos = req.body;
    //grabo los datos
    console.log(datos);
    res.status(200).send({status:"update ejecutado"});
});

app.delete('/api', async (req,res,next)=>{
    const datos = req.body;
    //grabo los datos
    console.log(datos);
    res.status(200).send({status:"eliminado"});
});

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});




