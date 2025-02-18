import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'my-secret-key';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
