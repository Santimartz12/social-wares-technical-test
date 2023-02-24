const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const createMsg = ( req, res ) => {

    const {title, message, user_id} = req.body;
    const time = new Date();
    
    db.run(`INSERT INTO messages (message, time, user_id, title) VALUES (?, ?, ?, ?)`, [message, time, user_id, title], (error) => {
            if (error) {
                return res.json({
                ok: false,
                msg: error.message
                });
            } else {
                return res.json({
                ok: true,
                msg: 'Mensaje publicado'
                }
                );
            }
        }
    );
  
}


module.exports = {createMsg};