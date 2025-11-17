const mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});



const createService = async (req, res) => {
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
            if (err) return res.status(500).json({ error: 'Error creating service.' });
            res.status(201).json({ id: result.insertId });
        }
    );
};



const getAllServices = (req, res) => {
    const query = 'SELECT * FROM services';
    conn.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching services:', err);
            res.status(500).json({ error: 'Error fetching services.' });
        } else {
            res.status(200).json(result);
        }
    });
};

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
            if (err) return res.status(500).json({ error: 'Error updating service.' });
            res.status(200).json({ message: "Service updated successfully" });
        }
    );
};


const getServiceById = (req, res) => {
    const serviceId = req.params.id;

    const query = 'SELECT * FROM services WHERE ID = ?';
    conn.query(query, [serviceId], (err, result) => {
        if (err) {
            console.error('Error fetching service data:', err);
            res.status(500).json({ error: 'Error fetching service data.' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'service not found.' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const deleteService = (req, res) => {
    const serviceId = req.params.id;

    const query = 'DELETE FROM services WHERE ID = ?';
    conn.query(query, [serviceId], (err, result) => {
        if (err) {
            console.error('Error deleting service:', err);
            res.status(500).json({ error: 'Error deleting service.' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'service not found.' });
        } else {
            res.status(200).json({ message: 'service deleted successfully' });
        }
    });
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};