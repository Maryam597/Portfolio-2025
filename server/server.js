require('dotenv').config();
const express = require('express');   
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const emailRoutes = require('./routes/email.route');
const bodyParser = require('body-parser');

// Middlewares
const app = express(); 
app.use(express.json()); 
app.use(bodyParser.json()); // analyse le corps des requêtes en format JSON

// analyse le corps des requêtes avec le type de contenu
app.use(bodyParser.urlencoded({ extended: true })); // urlencoded : pr laisser l'url tel qu'il est 
app.use(
    cors({
        origin: 'http://localhost:5173', 
        optionSuccessStatus: 200,
    })
);

//Routes 
app.use('/', adminRoutes);
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/email', emailRoutes);


app.use(express.static('public'));

const start = async () => {  
    try {
        await connectDB();
        const port = process.env.PORT || 6000;  
        app.listen(port, () => {
            console.log(`Le serveur a démarré sur le port ${port}`);
        })
    } catch {
        console.log(`Erreur lors du démarrage du serveur`);
    }
}; 

start(); 