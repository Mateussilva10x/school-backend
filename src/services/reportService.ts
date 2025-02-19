import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generateStudentReport = async (studentId: string): Promise<Buffer> => {
  const student = await prisma.student.findUnique({
    where: { id: studentId }
  });

  if (!student) {
    throw new Error('Aluno não encontrado');
  }

  const grades = await prisma.grade.findMany({
    where: { refStudent: studentId },
    include: { subject: true, bimester: true }
  });

  const bimesters = await prisma.bimester.findMany();
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Boletim Escolar`, 105, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Aluno: ${student.name}`, 20, 30);
  doc.text(`Ano Letivo: ${student.schoolYear}`, 150, 30);

  let startY = 50;

  // 🔹 Inicializa um objeto organizado por bimestres
  const organizedGrades: Record<string, any[]> = {};
  bimesters.forEach(bimester => {
    organizedGrades[bimester.id] = [];
  });

  // 🔹 Insere as notas nos bimestres corretos
  grades.forEach(grade => {
    if (!organizedGrades[grade.refBimester]) {
      organizedGrades[grade.refBimester] = [];
    }
    organizedGrades[grade.refBimester].push({
      subject: grade.subject?.name || 'Desconhecido',
      p1: grade.p1,
      p2: grade.p2,
      average: grade.average,
      rec: grade.rec
    });
  });

  // 🔹 Adiciona os bimestres ao PDF
  bimesters.forEach(bimester => {
    const bimesterId = bimester.id;
    if (organizedGrades[bimesterId].length > 0) {
      doc.setFontSize(14);
      doc.text(`${bimester.name}`, 20, startY);
      startY += 10;

      const tableData = organizedGrades[bimesterId].map(g => [
        g.subject,
        g.p1 ?? '-',
        g.p2 ?? '-',
        g.average ?? '-',
        g.rec ?? '-'
      ]);

      (doc as any).autoTable({
        startY,
        head: [['Matéria', 'P1', 'P2', 'Média', 'Recuperação']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' },
        columnStyles: { 0: { cellWidth: 50 } }
      });

      startY = (doc as any).lastAutoTable.finalY + 10;
    }
  });

  // 🔹 Retorna o PDF como buffer corretamente
  return Buffer.from(doc.output('arraybuffer'));
};
