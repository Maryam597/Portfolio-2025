const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const auth = require('../services/auth.service');
// const emailController = require('./email.controller');
const router = require('express').Router();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})


const queryAsync = (query, values) => {
  return new Promise((resolve, reject) => {
    conn.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

function isStrongPassword(password) {
  const lengthCheck = password.length >= 8;
  const lowercaseCheck = /[a-z]/.test(password);
  const uppercaseCheck = /[A-Z]/.test(password);
  const digitCheck = /\d/.test(password);
  const specialCharCheck = /[@$!%*?&]/.test(password);

  return lengthCheck && lowercaseCheck && uppercaseCheck && digitCheck && specialCharCheck;
}

const createAdmin = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!isStrongPassword(password)) {
    let errorMessage = 'Le mot de passe doit contenir';

    if (password.length < 8) {
      errorMessage += ' au moins 8 caractères';
    }

    if (!/[A-Z]/.test(password)) {
      errorMessage += ' au moins une majuscule';
    }

    if (!/[a-z]/.test(password)) {
      errorMessage += ' au moins une minuscule';
    }

    if (!/[1-9]/.test(password)) {
      errorMessage += ' au moins un chiffre';
    }

    if (!/[^a-zA-Z\d]/.test(password)) {
      errorMessage += ' au moins un caractère spécial';
    }

    return res.status(400).json({
      message: errorMessage
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({
      error: 'Données manquantes ',
    });
  }

  const emailCheckQuery = 'SELECT * FROM admin WHERE email = ?';
  try {
    const existingadmin = await queryAsync(emailCheckQuery, [email]);
    if (existingadmin.length > 0) {
      return res.status(400).json({ success: false, message: 'Email déjà utilisé' });
    }
  } catch (emailCheckError) {
    console.error('Erreur lors de la vérification de l\'email :' + emailCheckError);
    return res.status(500).json({ success: false, message: 'Erreur lors de la vérification de l\'email' });
  }

  const query = 'INSERT INTO admin (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
  try {
    const result = await queryAsync(query, [firstname, lastname, email, hashedPassword]);
    console.log('Result after admin insertion:', result);

    // Generate token
    const adminId = result.insertId;
    const token = auth.generateAuthToken(adminId);

    // await emailController.sendWelcomeEmail({ name: `${firstname} ${lastname}`, email });

    res.status(200).json({ success: true, adminId, token, message: 'Utilisateur enregistré' });
  } catch (err) {
    console.error('Erreur lors de l\'insertion d\'un utilisateur :' + err);
    res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
  }
};





const getHeader = (req, res) => {

  const query = 'SELECT * FROM images'
  conn.query(query, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des données :" + err);
      res.status(500).json({ error: "Erreur lors de la récupération des données" })
    } else {
      res.status(200).json(result)
    }
  })
}


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    req.adminId = decoded.adminId;
    next();
  });

};


router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Protected Route', adminId: req.adminId });
});


module.exports = {
  createAdmin,
  getHeader,
  verifyToken,
};