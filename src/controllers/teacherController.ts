import { Request, Response } from 'express';
import * as teacherService from '../services/teacherService';

export const getFilteredTeachers = (req: Request, res: Response): void => {
  const { refSubject } = req.query;
  const teachers = teacherService.getFilteredTeachers(refSubject as string | undefined);
  res.json(teachers);
};

export const getTeacherById = (req: Request, res: Response): void => {
  const teacher = teacherService.getTeacherById(req.params.id);
  if (!teacher) {
    res.status(404).json({ message: 'Professor não encontrado' });
    return;
  }
  res.json(teacher);
};

export const createTeacher = (req: Request, res: Response): void => {
  const newTeacher = teacherService.createTeacher(req.body);
  res.status(201).json(newTeacher);
};

export const updateTeacher = (req: Request, res: Response): void => {
  const updatedTeacher = teacherService.updateTeacher(req.params.id, req.body);
  if (!updatedTeacher) {
    res.status(404).json({ message: 'Professor não encontrado' });
    return;
  }
  res.json(updatedTeacher);
};

export const deleteTeacher = (req: Request, res: Response): void => {
  const success = teacherService.deleteTeacher(req.params.id);
  if (!success) {
    res.status(404).json({ message: 'Professor não encontrado' });
    return;
  }
  res.status(204).send();
};
