const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/sendMail', authController.sendMail);
router.post('/forgot-password', authController.forgotPassword); 
router.post('/reset-password', authController.resetPassword);

module.exports = router;