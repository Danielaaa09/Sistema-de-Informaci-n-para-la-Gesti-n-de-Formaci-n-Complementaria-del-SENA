const express = require('express');
const router = express.Router();

const { login, register, cambiarContrasena } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken'); 

router.post('/login', login);
router.post('/register', register);

router.post('/cambiar-contrasena', verifyToken, cambiarContrasena);

module.exports = router;
