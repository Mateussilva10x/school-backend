import { Request, Response } from 'express';
import { login } from '../services/authService';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
