const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.get('/protected-route', checkTokenMiddleware, (req, res) => {
  res.json({ message: 'Protected Route', adminId: req.decodedToken.adminId });
});


router.post('/register', adminController.createAdmin);
// router.put('/me', adminController.updateAdmin);        
router.get('/images', adminController.getHeader);
// router.post('/login', adminController.login);


module.exports = router;
