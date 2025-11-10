const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const projectController = require('../controllers/project.controller');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/projectpics');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/all', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post(
    '/',
    checkTokenMiddleware,
    upload.single('image'),
    projectController.createProject
);

router.put('/:id', checkTokenMiddleware, upload.single('image'), projectController.updateProject);
router.delete('/:id', checkTokenMiddleware, projectController.deleteProject);

module.exports = router;
