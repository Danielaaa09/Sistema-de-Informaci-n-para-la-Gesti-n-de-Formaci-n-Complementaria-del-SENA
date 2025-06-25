const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const verifyCoordinator = require('../middleware/verifyCoordinator');

const { login } = require('../controllers/authController');


router.post('/login', authController.login);


router.post('/register', verifyToken, verifyCoordinator, authController.register);

module.exports = router;

