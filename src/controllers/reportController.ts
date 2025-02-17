import { Request, Response } from 'express';
import { generateStudentReport } from '../services/reportService';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // 🔹 Gerar o PDF com os dados reais do banco
    const pdfBuffer = await generateStudentReport(studentId);

    // 🔹 Enviar o PDF como resposta
    res.setHeader('Content-Disposition', `attachment; filename=boletim_${studentId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório', error: (error as Error).message });
  }
};
