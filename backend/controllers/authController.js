const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { correo, password } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { correo }
  });

  if (!user) return res.status(401).json({ message: 'Correo inválido' });

  const match = await bcrypt.compare(password, user.contrasena);
  if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { login };
