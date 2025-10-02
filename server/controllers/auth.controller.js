const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service'); 
const mysql = require('mysql2');


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

const signIn = async (req, res) => {
  console.log('Logging in admin...');

  const { email, password } = req.body;

  const query = 'SELECT * FROM admin WHERE email = ?';
  conn.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error querying database', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const admin = results[0];

    try {
      const { adminId, token } = await authService.signIn(admin, password); 

      res.status(200).json({ status: 'success', message: 'Admin logged in successfully', adminId, token });
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
};

module.exports = {
  signIn,
};


