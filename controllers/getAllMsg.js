const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');


const getAllMsg = ( req, res ) => {

    if(Object.keys(req.query).length == 0){
        db.all('SELECT * FROM messages', [], (error, rows) => {
            if(error){
                return res.json({
                    ok: false,
                    msg: error.message
                });
            }
            else{
                return res.json(rows);
            }
        })
    }else{

        const keys = [];
        var request = `SELECT * FROM messages WHERE `;
        Object.keys(req.query).map((key,index) => {

            keys.push(key)
            if(index == 0){
                request = `${request} ${key.toString()} = ?`;
            }
            else{
                request = `${request} AND ${key.toString()} = ?`;
            }
        });
        

        db.all(request, keys, (error, rows) => {
            if(error){
                return res.json({
                    ok: false,
                    msg: error.message
                });
            }
            else{
                return res.json(rows);
            }
        })
    }


    
}

module.exports = {getAllMsg};