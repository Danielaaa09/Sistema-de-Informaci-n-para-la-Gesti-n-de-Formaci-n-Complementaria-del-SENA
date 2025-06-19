const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function crearUsuario() {
  const contraseñaHash = await bcrypt.hash('123456', 10);
  await prisma.usuario.create({
    data: {
      nombre: 'Instructor Juan',
      correo: 'juan@sena.edu.co',
      contraseña: contraseñaHash,
      rol: 'INSTRUCTOR',
    },
  });

  console.log('✅ Usuario creado correctamente');
  await prisma.$disconnect();
}

crearUsuario().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
