/*
Ejemplo Hola Mundo en Express
Requiere:
npm install express
npm install mysql2
*/
const express = require('express') 
const app = express()
const mysql = require('mysql2')//npm install mysql2
const port = 3000


// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',//url para coneccion http a la base de datos
  user: 'root',//si tubiese usuario va aqui
  password: '',//si tubiese contraseña va aqui
  database: 'cartasmagic'//nombre de la base a utilizar
});


// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Endpoint con select de prueba
app.get('/cartas', (req, res) => {
    db.query('SELECT * FROM cartasmagic.carta', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta' });
      return;
    }
    res.json(results);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})