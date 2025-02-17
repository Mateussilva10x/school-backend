import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const createAdminUser = async () => {
  const hashedPassword = bcrypt.hashSync('admin123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@school.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Usuário admin criado!');
};

createAdminUser();
