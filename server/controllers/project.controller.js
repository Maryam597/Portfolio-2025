const mysql = require('mysql');


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


export const createProject = async (req, res) => {
  try {
    const {
      title,
      descriptionEn,
      descriptionFr,
      summaryEn,
      summaryFr,
      images,
      url,
      category
    } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        descriptionEn,
        descriptionFr,
        summaryEn,
        summaryFr,
        images,
        url,
        category
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du projet" });
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



export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      descriptionEn,
      descriptionFr,
      summaryEn,
      summaryFr,
      images,
      url,
      category
    } = req.body;

    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        title,
        descriptionEn,
        descriptionFr,
        summaryEn,
        summaryFr,
        images,
        url,
        category
      }
    });

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du projet" });
  }
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
