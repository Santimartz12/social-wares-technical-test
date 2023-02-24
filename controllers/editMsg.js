const { getAllMsg } = require('./getAllMsg');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const editMsg = (req, res) => {

    const { id } = req.query;
    const { title, message, user_id } = req.body;
    const time = new Date();

    db.get(`SELECT user_id FROM messages WHERE id = ?`, [id] , (error, row) => {
        if (error) {
            return res.json({
                ok: false,
                msg: error.message
            })
        }
        if (row.user_id !== user_id) {
            return res.json({
                ok: false,
                msg: "Solo el dueño de este mensaje puede editarlo"
            })
        } else {
            db.run(`
            UPDATE messages SET title = ?, message = ?, time = ? WHERE id = ?
            `, [title, message, time, id], function (error) {
                if (error) {
                    return console.error(error.message);
                }
                return res.json({
                    ok: true,
                    msg: 'Mensaje editado correctamente'
                })
            });
        }
    });



}


module.exports = { editMsg };