const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

const { response } = require('express');

// Metodo para controlar el registro del usuario
const RegisterUser = ( req, res = response ) => {

    
    const { username, email, fullname, password } = req.body;
    
    db.run(`INSERT INTO users (username, email, fullname, password) VALUES (?, ?, ?, ?)`, [username, email, fullname, password],
        (error) => {
            if (error) {
                return res.json({
                    ok: false,
                    msg: error.message
                });
            } else {
                return res.json({
                    ok: true,
                    msg: 'Usuario creado exitosamente'
                });
            }
        }
    );

    
}

module.exports = {RegisterUser}