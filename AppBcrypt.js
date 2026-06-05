const bcrypt = require('bcrypt');

async function ejemplo() {
    const password = 'MiPassword123';

    // Generar hash
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log('Password original:', password);
    console.log('Hash:', hash);

    // Verificar contraseña correcta
    const coincide = await bcrypt.compare('MiPassword123', hash);
    console.log('Contraseña correcta:', coincide);

    // Verificar contraseña incorrecta
    const coincide2 = await bcrypt.compare('OtraPassword', hash);
    console.log('Contraseña incorrecta:', coincide2);
}

ejemplo();