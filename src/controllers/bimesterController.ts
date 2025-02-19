import { Request, Response } from 'express';
import { getBimesters } from '../services/bimesterService';

export const listBimesters = async (req: Request, res: Response) => {
  try {
    const bimesters = await getBimesters();
    res.json(bimesters);
  } catch (error) {
    console.error('Erro ao buscar bimestres:', error);
    res.status(500).json({ message: 'Erro ao buscar bimestres' });
  }
};
