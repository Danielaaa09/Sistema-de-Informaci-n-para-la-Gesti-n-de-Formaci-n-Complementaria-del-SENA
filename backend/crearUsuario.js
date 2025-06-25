require('dotenv').config(); 
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('12345', 10); 

  const usuario = await prisma.usuario.create({
    data: {
      nombre_completo: 'Juan',
      correo: 'juan@sena.edu.co',
      contrasena: hashedPassword,
      id_rol: 1
    }
  });

  console.log('✅ Usuario creado:', usuario);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
