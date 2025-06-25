require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json()); 

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  app.get('/', (req, res) => {
  res.send('Servidor backend activo ✅');
});

});
