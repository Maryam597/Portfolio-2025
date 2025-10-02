const router = require('express').Router();
const projectController = require('../controllers/project.controller');
const adminController = require('../controllers/admin.controller'); 

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', adminController.verifyToken, projectController.createProject);
router.put('/:id', adminController.verifyToken, projectController.updateProject);
router.delete('/:id', adminController.verifyToken, projectController.deleteProject);

module.exports = router;
