"use strict";

var express = require('express');
var authController = require('../controllers/auth');
var router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/sendMail', authController.sendMail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
module.exports = router;