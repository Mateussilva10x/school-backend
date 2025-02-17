import { Request, Response } from 'express';
import * as studentService from '../services/studentService';

export const getFilteredStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, classId, schoolYear } = req.query;
    const students = await studentService.getFilteredStudents(
      name as string | undefined,
      classId as string | undefined,
      schoolYear as string | undefined
    );
    res.json(students); // 🔹 Agora não retornamos `Response`
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos' });
  }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Aluno não encontrado' });
      return;
    }
    res.json(student); // 🔹 Agora não retornamos `Response`
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar aluno' });
  }
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar aluno' });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar aluno' });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar aluno' });
  }
};
