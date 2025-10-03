const mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const createService = async (req, res) => {
    const { title, price, description, features } = req.body;

    if (!title || !price || !description || !features) {
        return res.status(400).json({
            error: 'Missing data for service registration.',
        });
    }

    const query = 'INSERT INTO services (title, price, description, features, created_at) VALUES (?, ?, ?, ?, NOW())';
    conn.query(query, [title, price, description, JSON.stringify(features)], (err, result) => {
        if (err) {
            console.error('Error registering a service:', err);
            res.status(500).json({ error: 'Error registering a service.' });
        } else {
            const serviceId = result.insertId;
            res.status(201).json({ serviceId, message: 'Service registered successfully' });
        }
    });
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
    const serviceId = req.params.id;
    const { title, price, description, features, created_at } = req.body;

    if (!title || !price || !description || !Array.isArray(features) || features.length === 0) {
        return res.status(400).json({ error: 'Missing or invalid data for service update.' });
    }



const query = 'UPDATE services SET title = ?, price = ?, description = ?, features = ?, created_at = ? WHERE ID = ?';
conn.query(query, [title, price, description, JSON.stringify(features), created_at, serviceId], (err) => {
    if (err) {
        console.error('Error updating service:', err);
        res.status(500).json({ error: 'Error updating service.' });
    } else {
        res.status(200).json({ message: 'service updated successfully' });
    }
});
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