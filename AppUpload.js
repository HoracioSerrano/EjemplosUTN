const express = require('express');
const multer = require('multer');//npm install multer
const path = require('path');
const app = express();

// Configuración del almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos
app.use(express.static('Estatico'));

// Ruta para subir un archivo (campo 'archivo' en el form)
app.post('/upload', upload.single('archivo'), (req, res) => {
    if (!req.file) return res.status(400).send('No se subió ningún archivo');
    res.send(`Archivo subido correctamente: ${req.file.filename}`);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
