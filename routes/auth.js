const { Router } = require('express');
const { check } = require('express-validator');

const { LoginUser } = require('../controllers/login');
const { RegisterUser } = require('../controllers/register');

const router = Router();


//* Crear un nuevo usuario
router.post('/register', 
[ //Validamos los datos obligatorios
    check('username', "El nombre de usuario es obligatorio").isLength({min: 3}),
    check('email', "El email es obligatorio").isEmail(),
    check('fullname', "Debes agregar tu nombre completo").isLength({min: 8}),
    check('password', "La constraseña es obligatoria y mayor a 6 caracteres").isLength({min: 6}),
],
RegisterUser);

//* Login de usuario
router.post('/login', 
[ //Validamos los datos obligatorios
    check('email', "El email es obligatorio").isEmail(),
    check('password', "La constraseña es obligatoria").isLength({min: 6}),
],
LoginUser);


module.exports = router;