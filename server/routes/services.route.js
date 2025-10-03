const router = require('express').Router();
const serviceController = require('../controllers/services.controller');
const adminController = require('../controllers/admin.controller');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');


router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

router.post('/create', checkTokenMiddleware, serviceController.createService);
router.put('/:id', checkTokenMiddleware, serviceController.updateService);
router.delete('/:id', checkTokenMiddleware, serviceController.deleteService);

module.exports = router;
