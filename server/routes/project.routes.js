const express = require('express');
const router = express.Router();
const multer = require('multer');
const projectController = require('../controllers/project.controller');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

// Configuration du stockage d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/projectpics'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });



router.get('/all', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/create', checkTokenMiddleware, upload.single('image'), projectController.createProject);
router.put('/:id', checkTokenMiddleware, upload.single('image'), projectController.updateProject);
router.delete('/:id', checkTokenMiddleware, projectController.deleteProject);

module.exports = router;
