const { Router } = require('express');
const { check } = require('express-validator');
const { createMsg } = require('../controllers/createMsg');
const { editMsg } = require('../controllers/editMsg');
const { getAllMsg } = require('../controllers/getAllMsg');

const router = Router();


//* Publicar mensaje de usuario
router.post('/create',
    [ //Validamos los datos obligatorios
        check('title', "El titulo es obligatorio").isLength({ min: 4 }),
        check('message', "El mensaje es obligatorio").isLength({ min: 4 }),
    ],
    createMsg);

//* Obtener los mensajes de la base de datos
router.get('/', getAllMsg);

//* Para editar los mensajes
router.put('/edit',
    [ //Validamos los datos obligatorios
        check('title', "El titulo es obligatorio").isLength({ min: 4 }),
        check('message', "El mensaje es obligatorio").isLength({ min: 4 }),
        check('user_id', "El user_id es obligatorio").isNumeric(),
    ],
    editMsg);


module.exports = router;