const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json()); // necesario para leer el body

// importar rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // ✅ esta línea activa /api/auth/login

// puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
