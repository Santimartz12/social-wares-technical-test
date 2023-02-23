const { Router } = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = Router();

const db = new sqlite3.Database('./data/database.db');

// Crear un nuevo usuario
router.post('/register', ( req, res ) => {
    return res.json({
        ok: true,
        msg: 'Usuario creado exitosamente'
    });
});

// Login de usuario
router.post('/login', ( req, res ) => {

    return res.json({
        ok: true,
        msg: 'Login exitoso'
    });
});


module.exports = router;