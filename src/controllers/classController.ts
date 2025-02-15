import { Request, Response } from 'express';
import * as classService from '../services/classService';

export const getFilteredClasses = (req: Request, res: Response): void => {
  const { schoolYear } = req.query;
  const classes = classService.getFilteredClasses(schoolYear as string | undefined);
  res.json(classes);
};

export const getClassById = (req: Request, res: Response): void => {
  const classItem = classService.getClassById(req.params.id);
  if (!classItem) {
    res.status(404).json({ message: 'Turma não encontrada' });
    return;
  }
  res.json(classItem);
};

export const createClass = (req: Request, res: Response): void => {
  const newClass = classService.createClass(req.body);
  res.status(201).json(newClass);
};

export const updateClass = (req: Request, res: Response): void => {
  const updatedClass = classService.updateClass(req.params.id, req.body);
  if (!updatedClass) {
    res.status(404).json({ message: 'Turma não encontrada' });
    return;
  }
  res.json(updatedClass);
};

export const deleteClass = (req: Request, res: Response): void => {
  const success = classService.deleteClass(req.params.id);
  if (!success) {
    res.status(404).json({ message: 'Turma não encontrada' });
    return;
  }
  res.status(204).send();
};
