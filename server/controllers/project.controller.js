const mysql = require('mysql');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const createProject = async (req, res) => {
    const { title, summary, description, image, technologies, link_demo, link_github, created_at } = req.body;

    // Validate request data
    if (!title || !summary || !description || !image || !technologies || !link_demo || !link_github || !created_at) {
        return res.status(400).json({
            error: 'Missing data for project registration.',
        });
    }
    
    const imagePath = `/projectpics/${image}`;

    const query = 'INSERT INTO projects (title, summary, description, image, technologies, link_demo, link_github, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    conn.query(query, [title, summary, description, imagePath, JSON.stringify(technologies), link_demo, link_github, created_at], (err, result) => {
        if (err) {
            console.error('Error registering a project:', err);
            res.status(500).json({ error: 'Error registering a project.' });
        } else {
            const projectId = result.insertId;
            res.status(201).json({ projectId, message: 'project registered successfully' });
        }
    });
};

const getAllProjects = (req, res) => {
    const query = 'SELECT * FROM projects';
    conn.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).json({ error: 'Error fetching projects.' });
        } else {
            res.status(200).json(result);
        }
    });
};

const updateProject = (req, res) => {
    const projectId = req.params.id;
    const { title, summary, description, image, technologies, link_demo, link_github, created_at } = req.body;

    if (!title || !summary || !description || !image || !Array.isArray(technologies) || technologies.length === 0 || !link_demo || !link_github || !created_at) {
        return res.status(400).json({
            error: 'Missing data for project update.',
        });
    }

    const imagePath = `/projectpics/${image}`;

    const query = 'UPDATE projects SET title = ?, summary = ?, description = ?, image = ?, technologies = ?, link_demo = ?, link_github = ?, created_at = ? WHERE ID = ?';
    conn.query(query, [title, summary, description, imagePath, JSON.stringify(technologies), link_demo, link_github, created_at, projectId], (err) => {
        if (err) {
            console.error('Error updating project:', err);
            res.status(500).json({ error: 'Error updating project.' });
        } else {
            res.status(200).json({ message: 'project updated successfully' });
        }
    });
};

const getProjectById = (req, res) => {
    const projectId = req.params.id;

    const query = 'SELECT * FROM projects WHERE ID = ?';
    conn.query(query, [projectId], (err, result) => {
        if (err) {
            console.error('Error fetching project data:', err);
            res.status(500).json({ error: 'Error fetching project data.' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'project not found.' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const deleteProject = (req, res) => {
    const projectId = req.params.id;

    const query = 'DELETE FROM projects WHERE ID = ?';
    conn.query(query, [projectId], (err, result) => {
        if (err) {
            console.error('Error deleting project:', err);
            res.status(500).json({ error: 'Error deleting project.' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'project not found.' });
        } else {
            res.status(200).json({ message: 'project deleted successfully' });
        }
    });
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};