const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// LOGIN
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    if (!correo || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

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

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre_completo,
        rol: user.rol.nombre,
        requiereCambio: user.requiereCambioClave
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno al iniciar sesión', error: error.message });
  }
};

// REGISTER (temporal, mínimo viable)
const register = async (req, res) => {
  try {
    const { nombre_completo, correo, contrasena, id_rol } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        correo,
        contrasena: hashedPassword,
        id_rol,
        requiereCambioClave: true
      },
      include: { rol: true }
    });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre_completo: nuevoUsuario.nombre_completo,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol.nombre
      }
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error interno al registrar', error: error.message });
  }
};

// EXPORTAMOS AMBAS FUNCIONES
module.exports = { login, register };
