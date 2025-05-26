// importar desde jose
const jwt = require('jsonwebtoken'); //npm install jsonwebtoken

// Clave secreta para firmar (debe ser Uint8Array)
const secret = 'clave_super_secreta_pero_enserio';

// Función para generar el token
async function generarJWT(payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '10s', algorithm: 'HS256' });
    console.log('Token:', token);
    return token;
}

// Función para verificar el token
async function verificarJWT(token) {
    try {
        const payload = jwt.verify(token, secret);
        console.log('Payload:', payload);
        return payload;
    }catch(e){
        console.log('Firma invalida o Token Expirado')
        return null;
    }
}

//funcion para frenar ejecucion con await hasta presionar tecla.
function esperarTecla() {
    console.log("Presionar tecla para continuar");
    return new Promise(resolve => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.once('data', () => {
            process.stdin.setRawMode(false);
            process.stdin.pause();
            resolve();
        });
    });
}


async function prueba1(){
    const payload = {nomre:'horacio', apellido:'serrano'}
    const jwt = await generarJWT(payload);
    await esperarTecla();
    verificarJWT(jwt);
}

prueba1();