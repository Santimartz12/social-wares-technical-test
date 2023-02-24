const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/database.db');

// Metodo para controlar el login del usuario
const LoginUser = ( req, res ) => {

    const {email, password} = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        if (!row) {
          return res.status(401).json({ message: 'No se encuentra ninguna cuenta asociada con este correo'});
        }
        if (row.password !== password) {
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const user = {
          id: row.id,
          username: row.username,
          email: row.email,
          fullname: row.fullname,
        };
        return res.json( user );
      });

}

module.exports = {LoginUser};