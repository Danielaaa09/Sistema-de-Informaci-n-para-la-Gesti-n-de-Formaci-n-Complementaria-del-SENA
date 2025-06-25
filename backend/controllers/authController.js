const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { correo, password } = req.body;
  console.log('📩 Datos recibidos:', correo, password);

  try {
    const user = await prisma.usuario.findUnique({
      where: { correo },
      include: { rol: true }
    });

    console.log('👤 Usuario encontrado:', user);

    if (!user) return res.status(401).json({ message: 'Correo inválido' });

    const match = await bcrypt.compare(password, user.contrasena);
    console.log('🔐 Coincide contraseña:', match);

    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre_completo,
        correo: user.correo,
        rol: user.rol.nombre
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error interno al iniciar sesión' });
  }
};

const register = async (req, res) => {
  const { nombre_completo, correo, nombre_rol } = req.body;

  try {
 
    const rol = await prisma.rol.findUnique({
      where: { nombre: nombre_rol }
    });

    if (!rol) return res.status(400).json({ message: 'Rol no encontrado' });

    const existingUser = await prisma.usuario.findUnique({ where: { correo } });
    if (existingUser) return res.status(400).json({ message: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash('12345', 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        correo,
        contrasena: hashedPassword,
        id_rol: rol.id
      }
    });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario: {
        id: usuario.id,
        correo: usuario.correo,
        rol: nombre_rol
      }
    });

  } catch (error) {
    console.error('❌ Error en register:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

module.exports = { login, register };
