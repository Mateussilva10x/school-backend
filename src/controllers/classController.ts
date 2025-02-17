import { Request, Response } from 'express';
import * as classService from '../services/classService';

export const getFilteredClasses = async (req: Request, res: Response) => {
  try {
    const { schoolYear } = req.query;
    const classes = await classService.getFilteredClasses(schoolYear as string | undefined);
    res.json(classes); // 🔹 Removemos `return`
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turmas' });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const classItem = await classService.getClassById(req.params.id);
    if (!classItem) {
      res.status(404).json({ message: 'Turma não encontrada' });
      return;
    }
    res.json(classItem); // 🔹 Removemos `return`
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar turma' });
  }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar turma' });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const updatedClass = await classService.updateClass(req.params.id, req.body);
    res.json(updatedClass); // 🔹 Removemos `return`
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar turma' });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    await classService.deleteClass(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar turma' });
  }
};
