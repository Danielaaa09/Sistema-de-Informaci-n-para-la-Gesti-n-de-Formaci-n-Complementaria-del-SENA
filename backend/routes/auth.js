const express = require('express');
const router = express.Router();

const { login, register, cambiarContrasena, recuperarContrasena } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/login', login);
router.post('/register', verifyToken, register);
router.post('/cambiar-contrasena', verifyToken, cambiarContrasena);
router.post('/recuperar', recuperarContrasena);

module.exports = router;
