const { validationResult } = require('express-validator');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const editMsg = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
          ok: false,
          msg: errors.mapped()
        })
    }

    const { id } = req.query;
    const { title, message, user_id } = req.body;
    const time = new Date();

    // Buscamos primero el elemento
    db.get(`SELECT user_id FROM messages WHERE id = ?`, [id] , (error, row) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                msg: error.message
            })
        }

        // Si no se encuentra el elemento solicitado en la base de datos
        if(row == undefined){
            return res.status(400).json({
                ok: false,
                msg: "Este mensaje no se encuentra"
            })
        }

        // Si el usuario intenta editar un mensaje de otro usuario
        if (row.user_id !== user_id) {
            return res.status(401).json({
                ok: false,
                msg: "Solo el dueño de este mensaje puede editarlo"
            })
        }
        //La actualizacion del mensaje 
        else {
            db.run(`
            UPDATE messages SET title = ?, message = ?, time = ? WHERE id = ?
            `, [title, message, time, id], function (error) {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        msg: error.message
                    })
                }
                return res.status(200).json({
                    ok: true,
                    msg: 'Mensaje editado correctamente'
                })
            });
        }
    });

}


module.exports = { editMsg };