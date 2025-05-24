const mysql = require('mysql2/promise')


async function select() {
    const db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dbprueba'
    });
    const qry = 'select * from clientes';
    const resultado = await db.execute(qry);
    await db.end();
    console.log(resultado[0]);
}


async function selectId(id) {
    const db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dbprueba'
    });
    const qry = 'select * from clientes where id=?';
    const resultado = await db.execute(qry,[id]);
    await db.end();
    console.log(resultado[0][0]);
}

//select();

//selectId(1);

async function actualizar(id, nombre, telefono, fecha_alta){
    const db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dbprueba'
    });
    const qry = 'update clientes set nombre=?, telefono=?, fecha_alta=? where id=?';
    const resultado = await db.execute(qry,[nombre, telefono, fecha_alta, id]);
    await db.end();
    console.log(resultado);
}

async function ejecutar(){
    await select();
    await actualizar(1, 'Horacio Serrano', '40', '1990-01-03');
    await select();
}

//ejecutar();

async function eliminar(id){
    const db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dbprueba'
    });
    const qry = 'delete from clientes where id=?';
    const resultado = await db.execute(qry,[id]);
    await db.end();
    console.log(resultado);
}

async function ejecutar2(){
    await select();
    await eliminar(1);
    await select();
}

//ejecutar2();



async function insertar(nombre, telefono, fecha_alta){
    const db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dbprueba'
    });
    const qry = 'insert into clientes(nombre, telefono, fecha_alta)values(?,?,?)';
    const resultado = await db.execute(qry,[nombre, telefono, fecha_alta]);
    await db.end();
    console.log(resultado);
}

async function ejecutar3(){
    await select();
    await insertar('Juan Perez', '741852963', '2025-05-20');
    await select();
}

//ejecutar3();




async function inicializarBaseDeDatos() {
    const db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dbprueba'
    });

    try{
        let qry = 'drop table clientes';
        let resultado = await db.execute(qry);
    }catch{}

    try{
        let qry = 'CREATE TABLE clientes (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(100) NOT NULL, telefono VARCHAR(20), fecha_alta DATE DEFAULT CURRENT_DATE);';
        let resultado = await db.execute(qry);
    }catch{}

    try{
        let qry = 'insert into clientes(nombre, telefono, fecha_alta)values(?,?,?)';
        let resultado = await db.execute(qry,['Juan Perez', '741852963', '2025-05-20']);
    }catch{}


    await db.end();
}


inicializarBaseDeDatos();