const express = require('express');
const router = express.Router();

const { login } = require('../controllers/authController');

router.post('/login', login); // ✅ esta línea define la ruta POST

module.exports = router;
