import { Request, Response } from 'express';
import * as teacherService from '../services/teacherService';

export const getFilteredTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refSubject } = req.query;
    const teachers = await teacherService.getFilteredTeachers(refSubject as string | undefined);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar professores' });
  }
};

export const getTeacherById = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.id);
    if (!teacher) {
      res.status(404).json({ message: 'Professor não encontrado' });
      return;
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar professor' });
  }
};

export const createTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTeacher = await teacherService.createTeacher(req.body);
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar professor' });
  }
};

export const updateTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTeacher = await teacherService.updateTeacher(req.params.id, req.body);
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar professor' });
  }
};

export const deleteTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    await teacherService.deleteTeacher(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar professor' });
  }
};
