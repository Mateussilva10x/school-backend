import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Student } from '../models/Student';

interface Grade {
  subject: string;
  refBimester: string;
  p1: number;
  p2: number;
  rec: number;
  average: number;
}

const mockGrades: Grade[] = [
  { subject: 'Matemática', refBimester: '1', p1: 8.5, p2: 7.5, rec: 0, average: 8.0 },
  { subject: 'Português', refBimester: '1', p1: 6.0, p2: 7.0, rec: 8.0, average: 6.5 },
  { subject: 'Ciências', refBimester: '2', p1: 9.0, p2: 8.5, rec: 0, average: 8.75 },
  { subject: 'Matemática', refBimester: '3', p1: 7.0, p2: 6.5, rec: 7.5, average: 7.0 },
  { subject: 'Português', refBimester: '4', p1: 6.5, p2: 7.5, rec: 0, average: 7.0 }
];

export const generateStudentReport = (student: Student): Buffer => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Boletim Escolar`, 105, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Aluno: ${student.name}`, 20, 30);
  doc.text(`Ano Letivo: ${student.schoolYear}`, 150, 30);

  let startY = 50;

  // Organizar notas por bimestre
  const organizedGrades: Record<string, Grade[]> = { '1': [], '2': [], '3': [], '4': [] };
  mockGrades.forEach(grade => {
    organizedGrades[grade.refBimester].push(grade);
  });

  Object.keys(organizedGrades).forEach(bimester => {
    if (organizedGrades[bimester].length > 0) {
      doc.setFontSize(14);
      doc.text(`${bimester}º Bimestre`, 20, startY);
      startY += 10;

      const tableData = organizedGrades[bimester].map(g => [
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

  return doc.output('arraybuffer');
};
