import { Request, Response } from 'express';
import { generateStudentReport } from '../services/reportService';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    console.log(`📄 Gerando boletim para aluno: ${studentId}`);

    const pdfBuffer = await generateStudentReport(studentId);

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Erro ao gerar o boletim. Nenhum dado encontrado.');
    }

    res.setHeader('Content-Disposition', `attachment; filename=boletim_${studentId}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', pdfBuffer.length.toString());

    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error(`❌ Erro ao gerar relatório: ${(error as Error).message}`);
    res.status(500).json({ message: 'Erro ao gerar relatório', error: (error as Error).message });
  }
};
