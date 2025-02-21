import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'my-secret-key';
const prisma = new PrismaClient();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true }, // ✅ Agora só pegamos os campos necessários
    });

    if (!user) {
      res.status(401).json({ message: "Usuário não encontrado" });
      return;
    }

    req.user = user; // ✅ Sem erro de tipagem agora
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido" });
  }
};