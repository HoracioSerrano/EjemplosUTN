const express = require('express') 
const app = express()
const port = 3000


function funcion1(req,res,next){
    console.log("Dentro de funcion 1");
    next();
}
function funcion2(req,res,next){
    console.log("Dentro de funcion 2");
    next();
}
function funcion3(req,res,next){
    console.log("Dentro de funcion 3");
    res.status(200).send("Final de cadena");//se ejecuta next aunque se envie respuesta
    next();
}
function funcion4(req,res,next){
    console.log("Dentro de funcion 4");
}

app.use(express.json());

app.get("/mid", funcion1, funcion2, funcion3, funcion4);

app.use((req,res)=>{
    res.status(404).send("no hay nada aqui");
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})