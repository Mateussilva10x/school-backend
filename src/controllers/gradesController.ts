import { Request, Response } from 'express';
import * as gradeService from '../services/gradesService';

export const getGradesByFilters = (req: Request, res: Response): void => {
  const { classId, schoolYear, subjectId, bimester } = req.query;
  const grades = gradeService.getGradesByFilters(
    classId as string,
    schoolYear as string,
    subjectId as string,
    bimester as string
  );
  res.json(grades);
};

export const getGradesByStudent = (req: Request, res: Response): void => {
  const { studentId, schoolYear } = req.query;
  const grades = gradeService.getGradesByStudent(studentId as string, schoolYear as string);
  res.json(grades);
};

export const getGradesByStudentAndBimester = (req: Request, res: Response): void => {
  const { studentId, bimester } = req.query;
  const grades = gradeService.getGradesByStudentAndBimester(studentId as string, bimester as string);
  res.json(grades);
};

export const saveGrade = (req: Request, res: Response): void => {
  const savedGrade = gradeService.saveGrade(req.body);
  res.status(201).json(savedGrade);
};
