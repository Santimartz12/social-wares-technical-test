const { Router } = require('express');
const { createMsg } = require('../controllers/createMsg');
const { editMsg } = require('../controllers/editMsg');
const { getAllMsg } = require('../controllers/getAllMsg');

const router = Router();


// Publicar mensaje de usuario
router.post('/create', createMsg);

router.get('/', getAllMsg);

router.put('/edit', editMsg);


//Todo: Editar mensajes del usuario


module.exports = router;