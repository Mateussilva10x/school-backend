import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔹 Filtrar notas por turma, ano letivo, disciplina e bimestre
export const getGradesByFilters = async (classId: string, schoolYear: string, subjectId: string, bimester: string) => {
  return await prisma.grade.findMany({
    where: {
      refSubject: subjectId,
      refBimester: bimester,
      schoolYear
    }
  });
};

// 🔹 Obter notas de um aluno
export const getGradesByStudent = async (studentId: string, schoolYear: string) => {
  return await prisma.grade.findMany({
    where: {
      refStudent: studentId,
      schoolYear
    }
  });
};

// 🔹 Obter notas de um aluno em um bimestre específico
export const getGradesByStudentAndBimester = async (studentId: string, bimester: string) => {
  return await prisma.grade.findMany({
    where: {
      refStudent: studentId,
      refBimester: bimester
    }
  });
};

// 🔹 Salvar ou atualizar uma nota
export const saveGrade = async (grade: { refStudent: string; refSubject: string; refBimester: string; schoolYear: string; p1: number; p2: number; rec: number }) => {
  const existingGrade = await prisma.grade.findFirst({
    where: {
      refStudent: grade.refStudent,
      refSubject: grade.refSubject,
      refBimester: grade.refBimester,
      schoolYear: grade.schoolYear
    }
  });

  const average = calculateAverage(grade.p1, grade.p2);

  if (existingGrade) {
    return await prisma.grade.update({
      where: { id: existingGrade.id },
      data: {
        p1: grade.p1,
        p2: grade.p2,
        rec: grade.rec,
        average
      }
    });
  } else {
    return await prisma.grade.create({
      data: {
        ...grade,
        average
      }
    });
  }
};

// 🔹 Calcular média das notas
export const calculateAverage = (p1: number, p2: number): number => {
  return (p1 + p2) / 2;
};
