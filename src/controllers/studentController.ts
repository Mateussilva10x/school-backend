import { Request, Response } from 'express';
import * as studentService from '../services/studentService';

export const getFilteredStudents = (req: Request, res: Response): void => {
  const { name, classId, schoolYear } = req.query;
  const students = studentService.getFilteredStudents(
    name as string | undefined,
    classId as string | undefined,
    schoolYear as string | undefined
  );
  res.json(students);
};

export const getStudentById = (req: Request, res: Response): void => {
  const student = studentService.getStudentById(req.params.id);
  if (!student) {
    res.status(404).json({ message: 'Aluno não encontrado' });
    return;
  }
  res.json(student);
};

export const createStudent = (req: Request, res: Response): void => {
  const newStudent = studentService.createStudent(req.body);
  res.status(201).json(newStudent);
};

export const updateStudent = (req: Request, res: Response): void => {
  const updatedStudent = studentService.updateStudent(req.params.id, req.body);
  if (!updatedStudent) {
    res.status(404).json({ message: 'Aluno não encontrado' });
    return;
  }
  res.json(updatedStudent);
};

export const deleteStudent = (req: Request, res: Response): void => {
  const success = studentService.deleteStudent(req.params.id);
  if (!success) {
    res.status(404).json({ message: 'Aluno não encontrado' });
    return;
  }
  res.status(204).send();
};
