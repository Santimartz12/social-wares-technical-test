const express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/database.db');

//Para poder trabajar con Angular
app.use(cors());

// Para poder los datos que nos envie el usuario en tipo JSON 
app.use( express.json() );

// Para el registro, login y cierre de sesion de los usuarios
app.use( '/api/auth', require('./routes/auth'));

// Para la publicación, edicion, visualización y filtro de mensajes
app.use( '/api/message', require('./routes/message'));


app.listen(4000, () => {

    //Aqui creamos la tabla de users
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    fullname TEXT NOT NULL,
    password TEXT NOT NULL
    )
    `, (error) => {
    if (error) { console.log(error.message) } 
    else { console.log('Tabla "users" creada exitosamente.') }
    });

    //Aqui creamos la tabla de messages
    db.run(`
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    time DATETIME NOT NULL,
    user_id INTEGER NOT NULL
    )
    `, (error) => {
    if (error) { console.log(error.message)} 
    else { console.log('Tabla "messages" creada exitosamente.')}
    });


    console.log(`Servidor corriendo en puerto ${4000}`);
});