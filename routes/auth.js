const { Router } = require('express');

const { LoginUser } = require('../controllers/login');
const { RegisterUser } = require('../controllers/register');

const router = Router();


//* Crear un nuevo usuario
router.post('/register', RegisterUser);

//* Login de usuario
router.post('/login', LoginUser);


module.exports = router;