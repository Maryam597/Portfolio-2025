const router = require('express').Router();
const authController = require('../controllers/auth.controller');


router.post('/admin/login', authController.signIn);



module.exports = router;
