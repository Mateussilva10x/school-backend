import { Request, Response } from 'express';
import * as subjectService from '../services/subjectService';

export const getAllSubjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar disciplinas' });
  }
};

export const getSubjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    if (!subject) {
      res.status(404).json({ message: 'Matéria não encontrada' });
      return;
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar disciplina' });
  }
};

export const createSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSubject = await subjectService.createSubject(req.body);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar disciplina' });
  }
};

export const updateSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSubject = await subjectService.updateSubject(req.params.id, req.body);
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar disciplina' });
  }
};

export const deleteSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar disciplina' });
  }
};
