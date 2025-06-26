require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Configuración del correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // O tu proveedor de correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ LOGIN
const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { correo },
      include: { rol: true }
    });

    if (!user) return res.status(401).json({ message: 'Correo inválido' });

    const match = await bcrypt.compare(password, user.contrasena);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      cambiarContrasena: user.cambiar_contrasena,
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

// ✅ REGISTRO CON CORREO SEGURO
const register = async (req, res) => {
  const { nombre_completo, correo, nombre_rol } = req.body;

  try {
    const rol = await prisma.rol.findUnique({
      where: { nombre: nombre_rol }
    });

    if (!rol) return res.status(400).json({ message: 'Rol no encontrado' });

    const existingUser = await prisma.usuario.findUnique({ where: { correo } });
    if (existingUser) return res.status(400).json({ message: 'Correo ya registrado' });

    const defaultPassword = '12345';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        correo,
        contrasena: hashedPassword,
        id_rol: rol.id,
        cambiar_contrasena: true
      }
    });

    // Enviar correo separado para no romper el flujo si falla
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: correo,
        subject: 'Bienvenido al Sistema SENA',
        text: `Hola ${nombre_completo}, tu contraseña temporal es: ${defaultPassword}. Por favor cámbiala al iniciar sesión.`
      });
    } catch (emailError) {
      console.error('❌ Error al enviar correo:', emailError);
      // El registro continúa aunque falle el correo
    }

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

// ✅ CAMBIAR CONTRASEÑA
const cambiarContrasena = async (req, res) => {
  const { id } = req.user; // Este id lo obtiene verifyToken
  const { nuevaContrasena } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    await prisma.usuario.update({
      where: { id },
      data: {
        contrasena: hashedPassword,
        cambiar_contrasena: false
      }
    });

    res.json({ message: 'Contraseña actualizada correctamente' });

  } catch (error) {
    console.error('❌ Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al actualizar contraseña' });
  }
};

module.exports = { login, register, cambiarContrasena };
