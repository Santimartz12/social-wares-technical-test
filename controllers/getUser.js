const { validationResult } = require('express-validator');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const getUser = (req, res) => {

    if (Object.keys(req.query).length == 0) {
        db.all('SELECT fullname, id FROM users', [], (error, rows) => {
            if (error) {
                return res.json({
                    ok: false,
                    msg: error.message
                });
            }
            else {
                return res.json(rows);
            }
        })
    } else {

        let query = 'SELECT fullname FROM users WHERE id = ?';
        let values = [req.query.user_id];

        db.all(query, values, (error, rows) => {
            if (error) {
                return res.json({
                    ok: false,
                    msg: error.message
                });
            }
            else {
                return res.json(rows);
            }
        });
    }

}


module.exports = { getUser };