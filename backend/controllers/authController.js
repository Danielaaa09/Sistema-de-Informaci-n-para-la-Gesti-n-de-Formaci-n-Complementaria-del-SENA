const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

const generarContrasena = () => Math.random().toString(36).slice(-8);

const login = async (req, res) => {
  const { correo, password } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { correo },
    include: { rol: true }
  });

  if (!user) return res.status(401).json({ message: 'Correo inválido' });

  const match = await bcrypt.compare(password, user.contrasena);
  if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign(
    { id: user.id, rol: user.rol.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, rol: user.rol.nombre, requiereCambio: user.requiereCambioClave });
};

const register = async (req, res) => {
  const { nombre_completo, correo, nombre_rol } = req.body;

  try {
    const rol = await prisma.rol.findUnique({ where: { nombre: nombre_rol.toUpperCase() } });
    if (!rol) return res.status(400).json({ message: 'Rol no válido' });

    const contrasenaGenerada = generarContrasena();
    const hashedPassword = await bcrypt.hash(contrasenaGenerada, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        correo,
        contrasena: hashedPassword,
        id_rol: rol.id,
        requiereCambioClave: true
      },
      include: { rol: true }
    });

    await sendEmail(
      correo,
      'Registro en Plataforma ADSO',
      `
        <h3>Hola ${nombre_completo},</h3>
        <p>Has sido registrado como <strong>${rol.nombre}</strong>.</p>
        <p>Tu contraseña temporal es: <strong>${contrasenaGenerada}</strong></p>
        <p>Por seguridad, debes cambiarla al iniciar sesión.</p>
      `
    );

    res.status(201).json({
      message: 'Usuario creado y correo enviado',
      usuario: {
        id: usuario.id,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo,
        rol: usuario.rol.nombre
      }
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
};

module.exports = { login, register };
