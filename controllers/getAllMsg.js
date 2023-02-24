const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const getAllMsg = (req, res) => {

    if (Object.keys(req.query).length == 0) {
        db.all('SELECT * FROM messages', [], (error, rows) => {
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

        let query = 'SELECT * FROM messages WHERE 1=1';
        let values = [];

        if (req.query.id) {
            query += ' AND id = ?';
            values.push(req.query.id);
        }

        if (req.query.title) {
            query += ' AND title LIKE ?';
            values.push(`%${req.query.title}%`);
        }

        if (req.query.username) {
            query += ' AND user_id IN (SELECT user_id FROM users WHERE username LIKE ?)';
            values.push(`${req.query.username}%`);
        }

        if (req.query.user_id) {
            query += ' AND user_id = ?';
            values.push(req.query.user_id);
        }

        if (req.query.time) {
            console.log(req.query.time);
            query += ' AND time >= ?';
            values.push(req.query.time);
        }

        db.all(query, values, (error, rows) => {
            if (error) {
                return res.json({
                    ok: false,
                    msg: error.message
                });
            }
            else {
                rows.map((value) => value.time = new Date(value.time).toISOString());
                return res.json(rows);
            }
        });
    }

}
module.exports = { getAllMsg };

