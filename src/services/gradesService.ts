import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGradesByFilters = async (
  classId: string,
  schoolYear: string,
  subjectId: string,
  bimester: string
) => {
  return await prisma.grade.findMany({
    where: {
      refSubject: subjectId,
      refBimester: bimester,
      schoolYear,
    },
  });
};

export const getGradesByStudent = async (
  studentId: string,
  schoolYear: string
) => {
  return await prisma.grade.findMany({
    where: {
      refStudent: studentId,
      schoolYear,
    },
  });
};

export const getGradesByStudentAndBimester = async (
  studentId: string,
  bimester: string
) => {
  return await prisma.grade.findMany({
    where: {
      refStudent: studentId,
      refBimester: bimester,
    },
  });
};

export const saveGrade = async (grade: {
  refStudent: string;
  refSubject: string;
  refBimester: string;
  schoolYear: string;
  p1: number;
  p2: number;
  rec: number;
}) => {
  try {
    console.log("🔹 Recebendo nota:", grade);

    if (!grade.schoolYear) {
      console.error("❌ ERRO: schoolYear não foi enviado!");
      throw new Error("O campo schoolYear é obrigatório.");
    }

    const average = (grade.p1 + grade.p2) / 2;

    const existingGrade = await prisma.grade.findFirst({
      where: {
        refStudent: grade.refStudent,
        refSubject: grade.refSubject,
        refBimester: grade.refBimester,
        schoolYear: grade.schoolYear,
      },
    });

    if (existingGrade) {
      console.log("🟡 Atualizando nota existente:", existingGrade.id);
      return await prisma.grade.update({
        where: { id: existingGrade.id },
        data: {
          p1: grade.p1,
          p2: grade.p2,
          rec: grade.rec,
          average,
        },
      });
    } else {
      console.log("🟢 Criando nova nota...");
      return await prisma.grade.create({
        data: {
          refStudent: grade.refStudent,
          refSubject: grade.refSubject,
          refBimester: grade.refBimester,
          schoolYear: grade.schoolYear,
          p1: grade.p1,
          p2: grade.p2,
          rec: grade.rec,
          average,
        },
      });
    }
  } catch (error) {
    console.error("❌ Erro ao salvar nota:", error);
    throw new Error("Erro interno ao salvar nota.");
  }
};

export const calculateAverage = (p1: number, p2: number): number => {
  return (p1 + p2) / 2;
};
