import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSubjects = async () => {
  return await prisma.subject.findMany();
};

export const getSubjectById = async (id: string) => {
  return await prisma.subject.findUnique({ where: { id } });
};

export const createSubject = async (newSubject: { name: string }) => {
  return await prisma.subject.create({ data: newSubject });
};

export const updateSubject = async (id: string, subjectData: Partial<{ name: string }>) => {
  return await prisma.subject.update({ where: { id }, data: subjectData });
};

export const deleteSubject = async (id: string) => {
  return await prisma.subject.delete({ where: { id } });
};
