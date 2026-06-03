const express = require('express');
const {rutasUsuario} = require('./RutasUsuarios');
const app = express();
const PORT = 3000;



// Multiple routing
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

router1.get('/user', function (req, res, next) {
    console.log("/User");
    res.send("user");
});

router2.get('/admin', function (req, res, next) {
    console.log("/Admin");
    res.end();
});

router3.get('/estudiante', function (req, res, next) {
    console.log("/Estudiante");
    res.end();
});

app.use('/',router1);
app.use('/',router2);
app.use('/',router3);
app.use('/api', rutasUsuario);



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Escuchando en Puerto", PORT);
});