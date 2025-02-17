import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔹 Buscar todas as disciplinas
export const getAllSubjects = async () => {
  return await prisma.subject.findMany();
};

// 🔹 Buscar disciplina por ID
export const getSubjectById = async (id: string) => {
  return await prisma.subject.findUnique({ where: { id } });
};

// 🔹 Criar nova disciplina
export const createSubject = async (newSubject: { name: string }) => {
  return await prisma.subject.create({ data: newSubject });
};

// 🔹 Atualizar disciplina
export const updateSubject = async (id: string, subjectData: Partial<{ name: string }>) => {
  return await prisma.subject.update({ where: { id }, data: subjectData });
};

// 🔹 Deletar disciplina
export const deleteSubject = async (id: string) => {
  return await prisma.subject.delete({ where: { id } });
};
