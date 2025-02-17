import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// 🔹 Criar usuário
export const createUser = async (email: string, password: string, role: 'ADMIN' | 'TEACHER') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { email, password: hashedPassword, role },
    select: { id: true, email: true, role: true, createdAt: true }
  });
};

// 🔹 Buscar todos os usuários
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true }
  });
};

// 🔹 Buscar usuário por ID
export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true, createdAt: true }
  });
};

// 🔹 Atualizar usuário (e criptografar senha se alterada)
export const updateUser = async (id: string, updateData: { email?: string; password?: string }) => {
  const updatedData: any = {};
  if (updateData.email) updatedData.email = updateData.email;
  if (updateData.password) updatedData.password = await bcrypt.hash(updateData.password, 10);

  return await prisma.user.update({
    where: { id },
    data: updatedData,
    select: { id: true, email: true, role: true, createdAt: true }
  });
};

// 🔹 Deletar usuário
export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id }
  });
};
