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
const createProject = (req, res) => {
const { title, descriptionEn, descriptionFr, summaryEn, summaryFr, image, url, category, technologies, link_github } = req.body;

  const query = `
    INSERT INTO projects 
    (title, descriptionEn, descriptionFr, summaryEn, summaryFr, image, url, category, technologies, link_github)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conn.query(
    query,
    [title, descriptionEn, descriptionFr, summaryEn, summaryFr, image, url, category, technologies, link_github],
    (err, result) => {
      if (err) {
        console.error('Erreur création projet:', err);
        return res.status(500).json({ message: 'Erreur lors de la création du projet' });
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

// READ all
const getAllProjects = (req, res) => {
  const query = 'SELECT * FROM projects ORDER BY created_at DESC';
  conn.query(query, (err, result) => {
    if (err) {
      console.error('Erreur lors du chargement des projets:', err);
      return res.status(500).json({ error: 'Erreur lors du chargement des projets.' });
    }
    res.status(200).json(result);
  });
};

// READ by ID
const getProjectById = (req, res) => {
  const projectId = req.params.id;
  const query = 'SELECT * FROM projects WHERE ID = ?';
  conn.query(query, [projectId], (err, result) => {
    if (err) {
      console.error('Erreur récupération projet:', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération du projet.' });
    } else if (result.length === 0) {
      return res.status(404).json({ error: 'Projet introuvable.' });
    }
    res.status(200).json(result[0]);
  });
};

// UPDATE
const updateProject = (req, res) => {
  const { id } = req.params;
  const {
    title,
    descriptionEn,
    descriptionFr,
    summaryEn,
    summaryFr,
    image,
    url,
    category,
    technologies,
    link_github
  } = req.body;

  const query = `
    UPDATE projects SET 
      title = ?, descriptionEn = ?, descriptionFr = ?, 
      summaryEn = ?, summaryFr = ?, image = ?, url = ?, category = ?, technologies = ?, link_github = ?
    WHERE ID = ?
  `;

  conn.query(
    query,
    [title, descriptionEn, descriptionFr, summaryEn, summaryFr, image, url, category, technologies, link_github, id],
    (err, result) => {
      if (err) {
        console.error('Erreur mise à jour projet:', err);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du projet' });
      } else if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Projet introuvable.' });
      }
      res.json({ id: Number(id), ...req.body });
    }
  );
};

// DELETE
const deleteProject = (req, res) => {
  const projectId = req.params.id;
  const query = 'DELETE FROM projects WHERE ID = ?';
  conn.query(query, [projectId], (err, result) => {
    if (err) {
      console.error('Erreur suppression projet:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression du projet.' });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Projet introuvable.' });
    }
    res.status(200).json({ message: '🗑️ Projet supprimé avec succès.' });
  });
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
