const ejs = require('ejs');//npm install ejs.
const path = require('path');

const express = require('express') 
const app = express()

app.use(express.urlencoded({ extended: true })); //const datos = req.body;
app.use(express.json()); //const datos = req.body;


class Persona{
    apellido = "";
    nombre ="";
}


async function vistaEjemplo1(req,res){
    let html = await ejs.renderFile( path.join(__dirname, './', 'Vistas', 'persona.ejs') , {});
    res.status(200).send(html);
}




app.get('/', vistaEjemplo1)

const port=3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



