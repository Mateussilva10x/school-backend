import { Request, Response } from 'express';
import { generateStudentReport } from '../services/reportService';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const pdfBuffer = await generateStudentReport(studentId);

    res.setHeader('Content-Disposition', `attachment; filename=boletim_${studentId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório', error: (error as Error).message });
  }
};
