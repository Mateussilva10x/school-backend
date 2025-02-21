import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClassDiaries = async (
  refClass?: string,
  refSubject?: string,
  startDate?: string,
  endDate?: string,
) => {
  let dateFilter = {};

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const differenceInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (differenceInDays > 30) {
      throw new Error("O intervalo máximo permitido é de 30 dias.");
    }

    dateFilter = { gte: start, lte: end };

  } else if (startDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    dateFilter = { gte: start, lte: end };
  }

  return await prisma.classDiary.findMany({
    where: {
      refClass: refClass || undefined,
      refSubject: refSubject || undefined,
      date: Object.keys(dateFilter).length ? dateFilter : undefined,
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
  createdBy: string
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
