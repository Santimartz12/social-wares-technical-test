const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

const { response } = require('express');
const { validationResult } = require('express-validator');

// Metodo para controlar el registro del usuario
const RegisterUser = (req, res = response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

    const { username, email, fullname, password } = req.body;

    db.run(`INSERT INTO users (username, email, fullname, password) VALUES (?, ?, ?, ?)`, [username, email, fullname, password],
        function(error) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    msg: error.message
                });
            } else {
                const id = this.lastID;
                return res.status(200).json({
                    id: id,
                    username: username,
                    email: email,
                    fullname: fullname,
                });
            }
        }
    );


}

module.exports = { RegisterUser }