import { Request, Response } from 'express';
import { generateStudentReport } from '../services/reportService';
import { getStudentById } from '../services/studentService';

export const generateReport = (req: Request, res: Response): void => {
  const student = getStudentById(req.body.studentId);
  if (!student) {
    res.status(404).json({ message: 'Aluno não encontrado' });
    return;
  }

  const pdfBuffer = generateStudentReport(student);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=boletim_${student.name}.pdf`);
  res.send(Buffer.from(pdfBuffer));
};
