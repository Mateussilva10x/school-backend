import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔹 Criar usuário
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    const newUser = await prisma.user.create({
      data: { email, password, role }
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: (error as Error).message });
  }
};

// 🔹 Buscar todos os usuários
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: (error as Error).message });
  }
};

// 🔹 Buscar usuário por ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: (error as Error).message });
  }
};

// 🔹 Atualizar usuário
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { email, password, role }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: (error as Error).message });
  }
};

// 🔹 Deletar usuário
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: (error as Error).message });
  }
};
