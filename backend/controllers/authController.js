require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

function generarContrasenaAleatoria(length = 10) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
  let contrasena = '';
  for (let i = 0; i < length; i++) {
    contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return contrasena;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
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

// ✅ REGISTER con contraseña aleatoria
const register = async (req, res) => {
  const { nombre_completo, correo, nombre_rol } = req.body;

  try {
    const rol = await prisma.rol.findUnique({
      where: { nombre: nombre_rol }
    });

    if (!rol) return res.status(400).json({ message: 'Rol no encontrado' });

    const existingUser = await prisma.usuario.findUnique({ where: { correo } });
    if (existingUser) return res.status(400).json({ message: 'Correo ya registrado' });

    const defaultPassword = generarContrasenaAleatoria();
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

    try {
      await transporter.sendMail({
        from: `"Sistema SENA" <${process.env.EMAIL_USER}>`,
        to: correo,
        subject: 'Bienvenido al Sistema SENA',
        text: `Bienvenido estimado usuario, ${nombre_completo}

        Tu cuenta ha sido creada exitosamente. Por favor, inicia sesión con las siguientes credenciales:

        Usuario: ${correo}
        Contraseña: ${defaultPassword}

        Este correo es únicamente informativo y es de uso exclusivo del destinatario(a), puede contener información privilegiada y/o confidencial. Si no es usted el destinatario(a) deberá borrarlo inmediatamente. Queda notificado que el mal uso, divulgación no autorizada, alteración y/o  modificación malintencionada sobre este mensaje y sus anexos quedan estrictamente prohibidos y pueden ser legalmente sancionados. -El SENA  no asume ninguna responsabilidad por estas circunstancias-
        
        .`
      });
    } catch (emailError) {
      console.error('❌ Error al enviar correo:', emailError);
    
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

const recuperarContrasena = async (req, res) => {
  const { correo } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { correo } });

    if (!user) return res.status(404).json({ message: 'Correo no encontrado' });

    const nuevaPassword = generarContrasenaAleatoria();
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    await prisma.usuario.update({
      where: { id: user.id },
      data: {
        contrasena: hashedPassword,
        cambiar_contrasena: true
      }
    });

    await transporter.sendMail({
      from: `"Sistema SENA" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: 'Recuperación de contraseña - Sistema SENA',
      text: `Estimado usuario, ${user.nombre_completo}

      Hemos enviado una contraseña temporal para que puedas acceder a tu cuenta. Por favor, inicia sesión con la siguiente contraseña temporal y cámbiala inmediatamente:
      
      Usuario: ${correo}
      Contraseña: ${nuevaPassword}
      
      Este correo es únicamente informativo y es de uso exclusivo del destinatario(a), puede contener información privilegiada y/o confidencial. Si no es usted el destinatario(a) deberá borrarlo inmediatamente. Queda notificado que el mal uso, divulgación no autorizada, alteración y/o  modificación malintencionada sobre este mensaje y sus anexos quedan estrictamente prohibidos y pueden ser legalmente sancionados. -El SENA  no asume ninguna responsabilidad por estas circunstancias-
      .`
    });

    res.json({ message: 'Se envió una nueva contraseña al correo registrado.' });

  } catch (error) {
    console.error('❌ Error en recuperar contraseña:', error);
    res.status(500).json({ message: 'Error al recuperar contraseña' });
  }
};

const cambiarContrasena = async (req, res) => {
  const { id } = req.user;
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

module.exports = { login, register, cambiarContrasena, recuperarContrasena };
