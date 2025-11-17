const mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connexion à la DB
conn.connect((err) => {
    if (err) {
        console.error('Erreur de connexion MySQL:', err);
    } else {
        console.log('Connecté à la base de données MySQL !');
    }
});

// CREATE
const createService = (req, res) => {
    const {
        title_fr, title_en,
        description_fr, description_en,
        features_fr, features_en,
        price
    } = req.body;

    if (!title_fr || !title_en || !description_fr || !description_en) {
        return res.status(400).json({ error: 'Missing multilingual fields.' });
    }

    const query = `
        INSERT INTO services 
        (title_fr, title_en, description_fr, description_en, features_fr, features_en, price, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    conn.query(
        query,
        [
            title_fr, title_en,
            description_fr, description_en,
            JSON.stringify(features_fr),
            JSON.stringify(features_en),
            price
        ],
        (err, result) => {
            if (err) {
                console.error('Erreur création service:', err);
                return res.status(500).json({ error: 'Error creating service.' });
            }
            res.status(201).json({ id: result.insertId });
        }
    );
};

// READ all
const getAllServices = (req, res) => {
    const query = 'SELECT * FROM services';
    conn.query(query, (err, result) => {
        if (err) {
            console.error('Erreur récupération services:', err);
            return res.status(500).json({ error: 'Error fetching services.' });
        }
        res.status(200).json(result);
    });
};

// READ by ID
const getServiceById = (req, res) => {
    const serviceId = req.params.id;

    const query = 'SELECT * FROM services WHERE ID = ?';
    conn.query(query, [serviceId], (err, result) => {
        if (err) {
            console.error('Erreur récupération service:', err);
            return res.status(500).json({ error: 'Error fetching service data.' });
        } else if (result.length === 0) {
            return res.status(404).json({ error: 'Service not found.' });
        }
        res.status(200).json(result[0]);
    });
};

// UPDATE
const updateService = (req, res) => {
    const id = req.params.id;
    const {
        title_fr, title_en,
        description_fr, description_en,
        features_fr, features_en,
        price
    } = req.body;

    const query = `
        UPDATE services
        SET title_fr=?, title_en=?, description_fr=?, description_en=?, 
            features_fr=?, features_en=?, price=?
        WHERE ID=?
    `;

    conn.query(
        query,
        [
            title_fr, title_en,
            description_fr, description_en,
            JSON.stringify(features_fr),
            JSON.stringify(features_en),
            price,
            id
        ],
        (err) => {
            if (err) {
                console.error('Erreur mise à jour service:', err);
                return res.status(500).json({ error: 'Error updating service.' });
            }
            res.status(200).json({ message: 'Service updated successfully' });
        }
    );
};

// DELETE
const deleteService = (req, res) => {
    const serviceId = req.params.id;

    const query = 'DELETE FROM services WHERE ID = ?';
    conn.query(query, [serviceId], (err, result) => {
        if (err) {
            console.error('Erreur suppression service:', err);
            return res.status(500).json({ error: 'Error deleting service.' });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Service not found.' });
        }
        res.status(200).json({ message: 'Service deleted successfully.' });
    });
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
