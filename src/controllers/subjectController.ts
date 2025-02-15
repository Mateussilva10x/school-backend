import { Request, Response } from 'express';
import * as subjectService from '../services/subjectService';

export const getAllSubjects = (req: Request, res: Response): void => {
  res.json(subjectService.getAllSubjects());
};

export const getSubjectById = (req: Request, res: Response): void => {
  const subject = subjectService.getSubjectById(req.params.id);
  if (!subject) {
    res.status(404).json({ message: 'Matéria não encontrada' });
    return;
  }
  res.json(subject);
};

export const createSubject = (req: Request, res: Response): void => {
  const newSubject = subjectService.createSubject(req.body);
  res.status(201).json(newSubject);
};

export const updateSubject = (req: Request, res: Response): void => {
  const updatedSubject = subjectService.updateSubject(req.params.id, req.body);
  if (!updatedSubject) {
    res.status(404).json({ message: 'Matéria não encontrada' });
    return;
  }
  res.json(updatedSubject);
};

export const deleteSubject = (req: Request, res: Response): void => {
  const success = subjectService.deleteSubject(req.params.id);
  if (!success) {
    res.status(404).json({ message: 'Matéria não encontrada' });
    return;
  }
  res.status(204).send();
};
