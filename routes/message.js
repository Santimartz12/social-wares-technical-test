const { Router } = require('express');

const router = Router();


// Publicar mensaje de usuario
router.post('/create', ( req, res ) => {

    const mensaje = "Hola Mundo";
    const hora = new Date();
    const uid = 1;
    
    console.log(mensaje,hora,uid);
    
    
    console.log('Estoy funcionando');
    db.run(`INSERT INTO messages (message, time, user_id) VALUES (?, ?, ?)`, [mensaje, hora, uid], (error) => {
        if (error) {
           console.log(error.message);
        } else {
           console.log('Mensaje guardado en la base de datos.');
        }
     });
    console.log('Estoy Ya lo envie');

    return res.json({
        ok: true,
        msg: 'Mensaje publicado'
    });
});

//Todo: Ver todos los mensajes
//Todo: Ver mensajes del usuario
//Todo: Editar mensajes del usuario


module.exports = router;