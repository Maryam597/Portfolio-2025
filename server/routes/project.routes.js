const router = require('express').Router();
const projectController = require('../controllers/project.controller');
const adminController = require('../controllers/admin.controller');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');


router.get('/all', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', checkTokenMiddleware, projectController.createProject);
router.put('/:id', checkTokenMiddleware, projectController.updateProject);
router.delete('/:id', checkTokenMiddleware, projectController.deleteProject);

module.exports = router;
