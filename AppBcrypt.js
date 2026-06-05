const bcrypt = require('bcrypt');

async function ejemplo() {
    const password = 'MiPassword123';

    // Generar hash
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);//<---------hash

    console.log('Password original:', password);
    console.log('Hash:', hash);

    
    /////////////////////////////////
    const HashDeLaBaseDeDatos = hash; //<--------Recupero desde la base de datos
    /////////////////////////////////


    // Verificar contraseña correcta
    const coincide = await bcrypt.compare('MiPassword123', HashDeLaBaseDeDatos);
    console.log('Contraseña correcta:', coincide);

    // Verificar contraseña incorrecta
    const coincide2 = await bcrypt.compare('ContraseñaEquivocada', HashDeLaBaseDeDatos);
    console.log('Contraseña incorrecta:', coincide2);
}

ejemplo();