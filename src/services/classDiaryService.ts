import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔹 Buscar resumos filtrados por turma, matéria ou data
export const getClassDiaries = async (
  refClass?: string,
  refSubject?: string,
  date?: string
) => {
  return await prisma.classDiary.findMany({
    where: {
      refClass: refClass || undefined,
      refSubject: refSubject || undefined,
      date: date ? new Date(date) : undefined,
    },
    orderBy: { date: "desc" },
  });
};

// 🔹 Buscar um resumo pelo ID
export const getClassDiaryById = async (id: string) => {
  return await prisma.classDiary.findUnique({ where: { id } });
};

// 🔹 Criar um novo resumo
export const createClassDiary = async (data: {
  schoolYear: string;
  refClass: string;
  refSubject: string;
  summary: string;
}) => {
  return await prisma.classDiary.create({ data });
};

// 🔹 Atualizar um resumo existente
export const updateClassDiary = async (
  id: string,
  data: Partial<{
    schoolYear: string;
    refClass: string;
    refSubject: string;
    summary: string;
  }>
) => {
  return await prisma.classDiary.update({ where: { id }, data });
};

// 🔹 Deletar um resumo
export const deleteClassDiary = async (id: string) => {
  return await prisma.classDiary.delete({ where: { id } });
};
