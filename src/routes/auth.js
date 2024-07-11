const express = require('express');
const authController = require('../controllers/auth');
const pollsController = require('../controllers/polls');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/test', authController.sendMail);
router.post('/forgot-password', authController.forgotPassword); 
router.post('/reset-password', authController.resetPassword);
router.post('/create-polls', pollsController.createPolls);

module.exports = router;