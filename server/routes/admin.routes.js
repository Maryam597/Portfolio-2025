const router = require('express').Router();
const adminController = require('../controllers/admin.controller');

router.get('/protected-route', adminController.verifyToken, (req, res) => {
  res.json({ message: 'Protected Route', adminId: req.adminId });
});

router.post('/register', adminController.createAdmin);  
// router.put('/me', adminController.updateAdmin);        
router.get('/images', adminController.getHeader);     
// router.post('/login', adminController.login);


module.exports = router;
