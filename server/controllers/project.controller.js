const mysql = require('mysql');


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


const createProject = (req, res) => {
  try {
    const { title, summary, description, technologies, link_demo, link_github } = req.body;
    const created_at = new Date();


    const imagePath = req.file ? `/projectpics/${req.file.filename}` : null;

    if (!title || !summary || !description || !imagePath) {
      return res.status(400).json({ error: 'Champs manquants.' });
    }


    let techArray = [];
    try {
      techArray = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    } catch {
      techArray = [technologies];
    }

    const query = `
      INSERT INTO projects 
      (title, summary, description, image, technologies, link_demo, link_github, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    conn.query(
      query,
      [title, summary, description, imagePath, JSON.stringify(techArray), link_demo, link_github, created_at],
      (err, result) => {
        if (err) {
          console.error('Erreur insertion projet:', err);
          return res.status(500).json({ error: 'Erreur lors de la création du projet.' });
        }
        res.status(201).json({ message: '✅ Projet ajouté avec succès', id: result.insertId });
      }
    );
  } catch (error) {
    console.error('Erreur serveur interne:', error);
    res.status(500).json({ error: 'Erreur serveur interne.' });
  }
};



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



const updateProject = (req, res) => {
  const projectId = req.params.id;
  const { title, summary, description, technologies, link_demo, link_github } = req.body;
  const imagePath = req.file ? `/projectpics/${req.file.filename}` : null;
  const updated_at = new Date();

  if (!title || !summary || !description) {
    return res.status(400).json({ error: 'Champs requis manquants.' });
  }

  let techArray = [];
  try {
    techArray = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
  } catch {
    techArray = [technologies];
  }

  const query = `
    UPDATE projects 
    SET title = ?, summary = ?, description = ?, 
        ${imagePath ? 'image = ?, ' : ''}
        technologies = ?, link_demo = ?, link_github = ?, created_at = ?
    WHERE ID = ?
  `;

  const values = imagePath
    ? [title, summary, description, imagePath, JSON.stringify(techArray), link_demo, link_github, updated_at, projectId]
    : [title, summary, description, JSON.stringify(techArray), link_demo, link_github, updated_at, projectId];

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error('Erreur mise à jour projet:', err);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour du projet.' });
    }
    res.status(200).json({ message: '✅ Projet mis à jour avec succès.' });
  });
};



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
