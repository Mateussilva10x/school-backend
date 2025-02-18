import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'my-secret-key';

const generateToken = (id: string, email: string, role: string): string => {
  return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: '1h' });
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Credenciais inválidas');
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
    token: generateToken(user.id, user.email, user.role)
  };
};
