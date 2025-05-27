const ejs = require('ejs');//npm install ejs.
const path = require('path');

const express = require('express') 
const app = express()

app.use(express.urlencoded({ extended: true })); //const datos = req.body;
app.use(express.json()); //const datos = req.body;


class Persona{
    id="";
    apellido = "";
    nombre ="";
}

var p = new Persona();
p.apellido="serrano";
p.nombre="horacio";

async function vistaEjemplo1(req,res){
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'persona.ejs') , p );
    res.status(200).send(html);
}

async function vistaEjemplo2(req,res){
    const datos = req.body;
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'persona2.ejs') , {nom:datos.nombre,ape:datos.apellido} );
    res.status(200).send(html);
}

async function vistaEjemploAlta(req,res){
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'personaABM.ejs') , {nombre:'Horacio',apellido:'Serrano',abm:'A'} );
    res.status(200).send(html);
}

async function vistaEjemploBaja(req,res){
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'personaABM.ejs') , {nombre:'Horacio',apellido:'Serrano',abm:'B'} );
    res.status(200).send(html);
}

async function vistaEjemploModificacion(req,res){
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'personaABM.ejs') , {nombre:'Horacio',apellido:'Serrano',abm:'M'} );
    res.status(200).send(html);
}

async function loopColecion(req,res){
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'coleccion.ejs') , {v:['Horacio','Serrano','juan','pedro','lucas']} );
    res.status(200).send(html);
}

app.get('/', vistaEjemplo1);
app.post('/', vistaEjemplo2);

app.get('/alta', vistaEjemploAlta)
app.get('/baja',vistaEjemploBaja)
app.get('/modificacion',vistaEjemploModificacion)
app.get('/coleccion', loopColecion)

const port=3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



