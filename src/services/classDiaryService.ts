import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const getClassDiaryById = async (id: string) => {
  return await prisma.classDiary.findUnique({ where: { id } });
};

export const createClassDiary = async (data: {
  schoolYear: string;
  refClass: string;
  refSubject: string;
  summary: string;
}) => {
  return await prisma.classDiary.create({ data });
};

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

export const deleteClassDiary = async (id: string) => {
  return await prisma.classDiary.delete({ where: { id } });
};
