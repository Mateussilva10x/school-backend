import { Request, Response } from 'express';
import * as gradeService from '../services/gradesService';

export const getGradesByFilters = async (req: Request, res: Response) => {
  try {
    const { classId, schoolYear, subjectId, bimester } = req.query;
    const grades = await gradeService.getGradesByFilters(
      classId as string,
      schoolYear as string,
      subjectId as string,
      bimester as string
    );
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notas' });
  }
};

export const getGradesByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId, schoolYear } = req.query;
    const grades = await gradeService.getGradesByStudent(studentId as string, schoolYear as string);
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notas do aluno' });
  }
};

export const getGradesByStudentAndBimester = async (req: Request, res: Response) => {
  try {
    const { studentId, bimester } = req.query;
    const grades = await gradeService.getGradesByStudentAndBimester(studentId as string, bimester as string);
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notas do aluno no bimestre' });
  }
};

export const saveGrade = async (req: Request, res: Response) => {
  try {
    const savedGrade = await gradeService.saveGrade(req.body);
    res.status(201).json(savedGrade);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar nota' });
  }
};
