/*
Ejemplo Hola Mundo en Express
Requiere:
npm install cors
*/
const express = require('express') 
const app = express()
const cookieParser = require('cookie-parser');//npm install cookie-parser

//utiliza CORS
var cors = require('cors');
//setea cors abierto para todos los dominios
app.use(cors());//estoy seteando cors como middleware para todas las solicitudes
app.use(cookieParser());

app.get('/setCookie',(req,res,next)=>{
    res.cookie('nombreMiCookie','valorMiCookie',{
        httpOnly: true,
        secure: false,          // usar solo en HTTPS
        sameSite: 'Lax',    // o 'Lax' según tu caso
        maxAge: 2 * 60 * 60 * 1000 // 2 horas parte de milisegundos
    });
    res.status(200).send('cookie seteada');
});

app.get('/readCookie',(req,res,next)=>{
    const cookie = req.cookies.nombreMiCookie;
    res.status(200).send(cookie);
});


const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
