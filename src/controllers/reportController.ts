import { Request, Response } from 'express';
import { getStudentById } from '../services/studentService';
import { generateStudentReport } from '../services/reportService';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    // 🔹 Buscar aluno do banco (await necessário)
    const student = await getStudentById(studentId);

    // 🔹 Verificar se o aluno existe
    if (!student) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // 🔹 Gerar o PDF
    const pdfBuffer = generateStudentReport(student);

    // 🔹 Enviar o PDF como resposta
    res.setHeader('Content-Disposition', `attachment; filename=boletim_${student.name}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Erro ao gerar relatório', error: errorMessage });
  }
};
