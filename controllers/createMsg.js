const { validationResult } = require('express-validator');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const createMsg = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }

    const { title, message, user_id } = req.body;
    const time = new Date();

    db.run(`INSERT INTO messages (message, time, user_id, title) VALUES (?, ?, ?, ?)`, [message, time, user_id, title], (error) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                msg: error.message
            });
        } else {
            const id = this.lastID;
            return res.status(200).json({
                id: id,
                message,
                time,
                user_id,
                title
            }
            );
        }
    }
    );

}


module.exports = { createMsg };